
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "../styles.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState();

  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      // ✅ Save token and user info to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("email", res.data.email); // <-- ✅ Add this line
      console.log("user looged in", res.data.email);
      // Redirect to home
      setData(res.data);
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p>Sign in to continue</p>

        {error && <p className="error-message">{error}</p>}

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
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="login-links">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/register">Create an Account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
