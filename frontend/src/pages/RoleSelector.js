
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles.css";

// const RoleSelector = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       // User is already logged in, redirect to home or dashboard
//       navigate("/"); // You can change this to "/dashboard" if needed
//     }
//   }, [navigate]);

//   const handleRoleSelect = (role) => {
//     if (role === "admin") {
//       navigate("/admin-login");
//     } else {
//       navigate("/login"); // Redirect to farmer login
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Select Login Type</h2>
//         <button className="login-btn" onClick={() => handleRoleSelect("farmer")}>
//           Farmer Login
//         </button>
//         <button className="login-btn" onClick={() => handleRoleSelect("admin")}>
//           Admin Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RoleSelector;


import { useNavigate } from "react-router-dom";
import "../styles.css";

const RoleSelector = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === "admin") {
      navigate("/admin-login");
    } else {
      navigate("/login");  // Redirect to farmer login
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Select Login Type</h2>
        <button className="login-btn" onClick={() => handleRoleSelect("farmer")}>
          Farmer Login
        </button>
        <button className="login-btn" onClick={() => handleRoleSelect("admin")}>
          Admin Login
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;