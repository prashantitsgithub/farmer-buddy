const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const OpenAI = require("openai");
const { geminiPrompt, chatbotPrompt } = require("./constants.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "farmer_buddy",
});

db.connect((err) => {
  if (err) {
    console.error("DB Error:", err);
    return;
  }
  console.log("✅ MySQL Connected");
});
// Create pesticides table if it doesn't exist
const createPesticidesTable = `
  CREATE TABLE IF NOT EXISTS pesticides (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    size VARCHAR(100) NOT NULL,
    form VARCHAR(100) NOT NULL,
    target TEXT NOT NULL,
    content TEXT NOT NULL,
    dose VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

db.query(createPesticidesTable, (err, result) => {
  if (err) {
    console.error("❌ Error creating pesticides table:", err.message || err);
  } else {
    console.log("✅ Pesticides table ready");
  }
});

// Create feedback table if it doesn't exist
const createFeedbackTable = `
  CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

db.query(createFeedbackTable, (err) => {
  if (err) {
    console.error("Error creating feedback table:", err);
  } else {
    console.log("✅ Feedback table ready");
  }
});

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
db.query(createUsersTable, (err) => {
  if (err) {
    console.error("Error creating users table:", err);
  } else {
    console.log("✅ Users table ready");
  }
});

// OTP Store
const otpStore = new Map();

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yuvarajdaddikar@gmail.com",
    pass: "cdhswbsqtkypcfwl",
  },
});

// ✅ FIXED sendEmail function
const sendEmail = async (to, otp) => {
  const mailOptions = {
    from: "farmingbuddy@gmail.com",
    to,
    subject: "Farmer Buddy System",
    html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
  };
  await transporter.sendMail(mailOptions);
};

// User Registration
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  const checkSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkSql, [email], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Database error");
    }

    if (results.length > 0) {
      return res.status(409).send("Email already registered");
    }

    // Only hash and insert if email is not found
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql =
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      db.query(insertSql, [name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error("Insert error:", err);
          return res.status(500).send("Registration failed");
        }

        res.send({
          message: "Registration successful",
          userId: result.insertId,
        });
      });
    } catch (err) {
      console.error("Hashing error:", err);
      return res.status(500).send("Server error");
    }
  });
});

// User Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE name = ?";
  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).send("Database error");
    if (results.length === 0) return res.status(401).send("Invalid username");

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send("Error checking password");
      if (!isMatch) return res.status(401).send("Incorrect password");

      res.send({
        message: "Login successful",
        token: "dummy-jwt-token",
        username: user.name,
        email: user.email,
      });
    });
  });
});

// Send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send({ message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000;
  otpStore.set(email, { otp, expiresAt });

  try {
    await sendEmail(email, otp);
    res.send({ message: "OTP sent successfully to your email" });
  } catch (err) {
    console.error("❌ Email Error:", err);
    res.status(500).send({ message: "Failed to send OTP email" });
  }
});

// Reset Password
app.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const stored = otpStore.get(email);
  if (!stored)
    return res.status(400).send({ message: "No OTP sent for this email" });
  if (stored.otp !== otp)
    return res.status(401).send({ message: "Invalid OTP" });
  if (Date.now() > stored.expiresAt)
    return res.status(410).send({ message: "OTP expired" });

  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    const sql = "UPDATE users SET password = ? WHERE email = ?";
    db.query(sql, [hashed, email], (err) => {
      if (err) return res.status(500).send({ message: "Database error" });
      otpStore.delete(email);
      res.send({ message: "Password reset successful" });
    });
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
});

// Submit Feedback
app.post("/feedback", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const sql = "INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("❌ Feedback insert error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res
      .status(200)
      .json({ success: true, message: "Feedback submitted successfully" });
  });
});

// Get all feedback (Admin view)
app.get("/get-feedback", (req, res) => {
  const query = "SELECT * FROM feedback ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching feedback:", err);
      res.status(500).json({ success: false, message: "Database error" });
    } else {
      res.json(results);
    }
  });
});

// Submit User Query
app.post("/submit-query", (req, res) => {
  const { name, email, question } = req.body;
  if (!name || !email || !question) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const sql =
    "INSERT INTO user_queries (name, email, question) VALUES (?, ?, ?)";
  db.query(sql, [name, email, question], (err) => {
    if (err) {
      console.error("❌ Error saving query:", err);
      return res.status(500).send({ message: "Internal server error" });
    }
    res
      .status(200)
      .send({ message: "Your query has been submitted successfully" });
  });
});

// Get all user queries (Admin view)
app.get("/get-queries", (req, res) => {
  const query = "SELECT * FROM user_queries ORDER BY id DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching queries:", err);
      res.status(500).json({ success: false, message: "Database error" });
    } else {
      res.json(results);
    }
  });
});

// Admin answers a query
app.post("/answer-query", (req, res) => {
  const { id, answer } = req.body;
  if (!id || !answer)
    return res
      .status(400)
      .send({ message: "Query ID and answer are required" });

  const query = "UPDATE user_queries SET answer = ? WHERE id = ?";
  db.query(query, [answer, id], (err, result) => {
    if (err) {
      console.error("Error updating answer:", err);
      res.status(500).json({ success: false, message: "Database error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ success: false, message: "Query not found" });
    } else {
      res.json({ success: true, message: "Answer saved successfully" });
    }
  });
});

// User Delete Query
app.delete("/delete-query/:id", (req, res) => {
  const queryId = req.params.id;
  const { email } = req.body;

  if (!email)
    return res
      .status(400)
      .send({ message: "Email is required to delete the query" });

  const sql = "DELETE FROM user_queries WHERE id = ? AND email = ?";
  db.query(sql, [queryId, email], (err, result) => {
    if (err) {
      console.error("❌ Delete query error:", err);
      return res.status(500).send({ message: "Internal server error" });
    }
    if (result.affectedRows === 0) {
      return res
        .status(403)
        .send({ message: "Unauthorized or query not found" });
    }
    res.status(200).send({ message: "Query deleted successfully" });
  });
});

// Clean expired OTPs every 1 minute
setInterval(() => {
  const now = Date.now();
  for (const [email, { expiresAt }] of otpStore.entries()) {
    if (now > expiresAt) otpStore.delete(email);
  }
}, 60 * 1000);

// Get all pesticides
app.get("/get-pesticides", (req, res) => {
  const query = "SELECT * FROM pesticides ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching pesticides:", err);
      res.status(500).json({ success: false, message: "Database error" });
    } else {
      res.json(results);
    }
  });
});

// Add new pesticide
app.post("/add-pesticide", (req, res) => {
  const { name, brand, size, form, target, content, dose, image } = req.body;

  if (
    !name ||
    !brand ||
    !size ||
    !form ||
    !target ||
    !content ||
    !dose ||
    !image
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const query =
    "INSERT INTO pesticides (name, brand, size, form, target, content, dose, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [name, brand, size, form, target, content, dose, image],
    (err, result) => {
      if (err) {
        console.error("Error adding pesticide:", err);
        res.status(500).json({ success: false, message: "Database error" });
      } else {
        res.json({
          success: true,
          message: "Pesticide added successfully",
          id: result.insertId,
        });
      }
    }
  );
});

// Update pesticide
app.put("/update-pesticide/:id", (req, res) => {
  const { id } = req.params;
  const { name, brand, size, form, target, content, dose, image } = req.body;

  if (
    !name ||
    !brand ||
    !size ||
    !form ||
    !target ||
    !content ||
    !dose ||
    !image
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const query =
    "UPDATE pesticides SET name = ?, brand = ?, size = ?, form = ?, target = ?, content = ?, dose = ?, image = ? WHERE id = ?";
  db.query(
    query,
    [name, brand, size, form, target, content, dose, image, id],
    (err, result) => {
      if (err) {
        console.error("Error updating pesticide:", err);
        res.status(500).json({ success: false, message: "Database error" });
      } else if (result.affectedRows === 0) {
        res
          .status(404)
          .json({ success: false, message: "Pesticide not found" });
      } else {
        res.json({ success: true, message: "Pesticide updated successfully" });
      }
    }
  );
});

// Delete pesticide
app.delete("/delete-pesticide/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM pesticides WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting pesticide:", err);
      res.status(500).json({ success: false, message: "Database error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ success: false, message: "Pesticide not found" });
    } else {
      res.json({ success: true, message: "Pesticide deleted successfully" });
    }
  });
});

// Gemini model configuration
const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// Get crops information
app.get("/crop", async (req, res) => {
  const name = req.query.name;
  if (!name?.length) {
    return res
      .status(400)
      .json({ success: false, message: "Crop name is required" });
  }

  // let response = null;
  try {
    const response = await client.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: geminiPrompt },
        {
          role: "user",
          content: `Provide detailed farming information about the crop "${name}"`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const data = response.choices[0].message.content;
    const jsonData = JSON.parse(data);
    return res.status(200).json(jsonData);
  } catch (error) {
    console.error("Error fetching crop data from gemini:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch crop information",
    });
  }
});

app.post("/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages) {
    return res
      .status(400)
      .json({ success: false, message: "Messages is required" });
  }

  try {
    const response = await client.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: chatbotPrompt },
        {
          role: "user",
          content: JSON.stringify(messages),
        },
      ],
      response_format: { type: "json_object" },
    });

    const data = response.choices[0].message.content;
    const jsonData = JSON.parse(data);
    return res.status(200).json(jsonData);
  } catch (error) {
    console.error("Error fetching chat data from gemini:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch chat information",
    });
  }
});

// Start Server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
