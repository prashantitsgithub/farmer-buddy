const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/farmerbuddy", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model("User", UserSchema);

// Register Route
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error registering user" });
    }
});

// Login Route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, "secret_key", { expiresIn: "1h" });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
