import { useState } from "react";
import axios from "axios";
import "../styles.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // ✅ Email must end with @gmail.com
  const isValidGmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  // ✅ Password: min 8 chars, includes letters, numbers, special chars
  const isStrongPassword = (password) => {
    const strongRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Custom validations
    if (!isValidGmail(email)) {
      setError("Please enter a valid @gmail.com email address.");
      return;
    }

    if (!isStrongPassword(password)) {
      setError(
        "Password must be at least 8 characters and include letters, numbers, and a special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/register", {
        name: username,
        email: email,
        password: password,
      });
      setSuccess(res.data.message);
      navigate("/login");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Create Account</h2>
        <p>Register to start using Farmer Buddy</p>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email (must be @gmail.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="login-links">
          <a href="/login">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
