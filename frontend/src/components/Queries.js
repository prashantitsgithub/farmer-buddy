

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Queries() {
//   const [allQueries, setAllQueries] = useState([]);
//   const [userQueries, setUserQueries] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     question: "",
//   });

//   const [userEmail, setUserEmail] = useState("");

//   useEffect(() => {
//     fetchQueries();
//   }, []);

//   useEffect(() => {
//     const filtered = allQueries.filter((q) => q.email === userEmail);
//     setUserQueries(filtered);
//   }, [userEmail, allQueries]);

//   const fetchQueries = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/get-queries");
//       setAllQueries(res.data);
//     } catch (err) {
//       console.error("Failed to fetch queries", err);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (e.target.name === "email") {
//       setUserEmail(e.target.value);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/submit-query", formData);
//       setFormData({ name: "", email: "", question: "" });
//       fetchQueries();
//     } catch (err) {
//       console.error("Failed to submit query", err);
//     }
//   };

//   const deleteQuery = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/delete-query/${id}`, {
//         data: { email: userEmail },
//       });
//       fetchQueries();
//     } catch (err) {
//       console.error("Failed to delete query", err);
//     }
//   };

//   return (
//     <div className="container" style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
//       <h2 style={{ color: "green", textAlign: "center" }}>My Submitted Queries</h2>

//       <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Your Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
//         />
//         <textarea
//           name="question"
//           placeholder="Enter your question..."
//           value={formData.question}
//           onChange={handleChange}
//           required
//           style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
//         />
//         <button type="submit" style={{ padding: "10px", backgroundColor: "#28a745", color: "white", border: "none" }}>
//           Submit Query
//         </button>
//       </form>

//       {userEmail && userQueries.length === 0 && (
//         <p style={{ color: "gray", textAlign: "center" }}>No queries found for your email.</p>
//       )}

//       {userQueries.map((query) => (
//         <div
//           key={query.id}
//           className="query-box"
//           style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px", borderRadius: "5px" }}
//         >
//           <p><strong>Name:</strong> {query.name}</p>
//           <p><strong>Email:</strong> {query.email}</p>
//           <p><strong>Question:</strong> {query.question}</p>
//           <p><strong>Answer:</strong> {query.answer || "Pending"}</p>
//           <button
//             onClick={() => deleteQuery(query.id)}
//             style={{ background: "red", color: "white", padding: "8px", border: "none", marginTop: "10px" }}
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Queries;

import React, { useEffect, useState } from "react";
import axios from "axios";

function Queries() {
  const [allQueries, setAllQueries] = useState([]);
  const [userQueries, setUserQueries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
  });

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Automatically fill name and email from localStorage on mount
    const savedName = localStorage.getItem("username");
    const savedEmail = localStorage.getItem("email");

    if (savedName && savedEmail) {
      setFormData((prev) => ({
        ...prev,
        name: savedName,
        email: savedEmail,
      }));
      setUserEmail(savedEmail);
    }

    fetchQueries();
  }, []);

  useEffect(() => {
    const filtered = allQueries.filter((q) => q.email === userEmail);
    setUserQueries(filtered);
  }, [userEmail, allQueries]);

  const fetchQueries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/get-queries");
      setAllQueries(res.data);
    } catch (err) {
      console.error("Failed to fetch queries", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/submit-query", formData);
      setFormData((prev) => ({
        ...prev,
        question: "",
      }));
      fetchQueries();
    } catch (err) {
      console.error("Failed to submit query", err);
    }
  };

  const deleteQuery = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete-query/${id}`, {
        data: { email: userEmail },
      });
      fetchQueries();
    } catch (err) {
      console.error("Failed to delete query", err);
    }
  };

  return (
    <div className="container" style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ color: "green", textAlign: "center" }}>My Submitted Queries</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          readOnly
          style={{ width: "100%", padding: "8px", marginBottom: "10px", backgroundColor: "#f5f5f5" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          readOnly
          style={{ width: "100%", padding: "8px", marginBottom: "10px", backgroundColor: "#f5f5f5" }}
        />
        <textarea
          name="question"
          placeholder="Enter your question..."
          value={formData.question}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px", backgroundColor: "#28a745", color: "white", border: "none" }}>
          Submit Query
        </button>
      </form>

      {userEmail && userQueries.length === 0 && (
        <p style={{ color: "gray", textAlign: "center" }}>No queries found for your email.</p>
      )}

      {userQueries.map((query) => (
        <div
          key={query.id}
          className="query-box"
          style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px", borderRadius: "5px" }}
        >
          <p><strong>Name:</strong> {query.name}</p>
          <p><strong>Email:</strong> {query.email}</p>
          <p><strong>Question:</strong> {query.question}</p>
          <p><strong>Answer:</strong> {query.answer || "Pending"}</p>
          <button
            onClick={() => deleteQuery(query.id)}
            style={{ background: "red", color: "white", padding: "8px", border: "none", marginTop: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Queries;
