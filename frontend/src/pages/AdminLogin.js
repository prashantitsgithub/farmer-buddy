
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔐 Replace with your fixed admin credentials
    const fixedUsername = "admin";
    const fixedPassword = "admin123";

    if (username === fixedUsername && password === fixedPassword) {
      // ✅ Mark user as admin
      localStorage.setItem("isAdmin", "true");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Admin Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
