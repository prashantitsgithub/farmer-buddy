// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import "../styles.css";

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUsername = localStorage.getItem("username");

//     setIsLoggedIn(!!token);
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }
//   }, [location]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="logo">Farmer Buddy</div>
//       <ul className="nav-links">
//         <li>
//           <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
//         </li>

//         {isLoggedIn && (
//           <>
//             <li><NavLink to="/save">Save Money & Time</NavLink></li>

//             <li className="dropdown-container">
//               <NavLink to="/opportunities">Opportunities</NavLink>
//               <ul className="dropdown">
//                 <li><NavLink to="/BestPesticidesFertilizers">Best Pesticides & Fertilizers</NavLink></li>
//               </ul>
//             </li>

//             <li className="dropdown-container">
//               <NavLink to="/crop-category">Crop Category</NavLink>
//               <ul className="dropdown">
//                 <li><NavLink to="/VegetableFarming">Vegetable Farming</NavLink></li>
//                 <li><NavLink to="/CerealCrops">Cereal Crops</NavLink></li>
//                 <li><NavLink to="/FruitFarming">Fruit Farming</NavLink></li>
//                 <li><NavLink to="/OilseedCrops">Oilseed Crops</NavLink></li>
//                 <li><NavLink to="/CashCrops">Cash Crops</NavLink></li>
//                 <li><NavLink to="/FlowerPlants">Flower Plants</NavLink></li>
//                 <li><NavLink to="/OtherCrops">Other Crops</NavLink></li>
//               </ul>
//             </li>

//             <li className="dropdown-container">
//               <NavLink to="/queries">Queries</NavLink>
//             </li>

//             <li>
//               <NavLink to="/FeedbackForm" className={({ isActive }) => (isActive ? "active" : "")} style={{ color: "white" }}>
//                 Feedback
//               </NavLink>
//             </li>
//           </>
//         )}
//       </ul>

//       {/* Show Welcome + Logout or Login button */}
//       <div className="auth-section">
//         {isLoggedIn ? (
//           <>
//             <span className="welcome-text">WELCOME, {username}</span>
//             <button onClick={handleLogout} className="login-btn">Logout</button>
//           </>
//         ) : (
//           <NavLink to="/login" className="login-btn">Login</NavLink>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from "react";
import {
  NavLink,
  useNavigate,
  useLocation,
  Link,
  Navigate,
} from "react-router-dom";
import "../styles.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername || ""); // fallback in case it's null
    } else {
      setIsLoggedIn(false);
      setUsername(""); // clear username if not logged in
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    return <Navigate to="/login" replace />;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery(""); // Clear the search input after submission
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Login clicked");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">Farmer Buddy</div>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>

        {isLoggedIn && (
          <>
            <li>
              <NavLink to="/save">Save Money & Time</NavLink>
            </li>

            {/* <li className="dropdown-container">
              <NavLink to="/opportunities">Opportunities</NavLink>
              <ul className="dropdown"> */}
            <li>
              <NavLink to="/BestPesticidesFertilizers">
                Best Pesticides & Fertilizers
              </NavLink>
            </li>
            {/* </ul>
            </li> */}

            <li className="dropdown-container">
              <NavLink to="/crop-category">Crop Category</NavLink>
              <ul className="dropdown">
                <li>
                  <NavLink to="/VegetableFarming">Vegetable Farming</NavLink>
                </li>
                <li>
                  <NavLink to="/CerealCrops">Cereal Crops</NavLink>
                </li>
                <li>
                  <NavLink to="/FruitFarming">Fruit Farming</NavLink>
                </li>
                <li>
                  <NavLink to="/OilseedCrops">Oilseed Crops</NavLink>
                </li>
                <li>
                  <NavLink to="/CashCrops">Cash Crops</NavLink>
                </li>
                <li>
                  <NavLink to="/FlowerPlants">Flower Plants</NavLink>
                </li>
                <li>
                  <NavLink to="/OtherCrops">Other Crops</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/queries">Queries</NavLink>
            </li>

            <li>
              <NavLink
                to="/FeedbackForm"
                className={({ isActive }) => (isActive ? "active" : "")}
                style={{ color: "white" }}
              >
                Feedback
              </NavLink>
            </li>
          </>
        )}
      </ul>
      {isLoggedIn && (
        <form onSubmit={handleSearch}>
          <input
            style={{
              width: "200px",
              height: "30px",
              borderRadius: "5px",
              marginLeft: "20px",
              paddingLeft: "10px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "14px",
              color: "#333",
            }}
            type="text"
            placeholder="Search for crops..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            style={{
              height: "30px",
              borderRadius: "5px",
              marginLeft: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              padding: "0 10px",
            }}
            className="search-btn"
            type="submit"
          >
            Search
          </button>
        </form>
      )}
      {/* Auth Section */}
      <div className="auth-section">
        {isLoggedIn ? (
          <>
            <span className="welcome-text">WELCOME, {username}</span>
            <button onClick={handleLogout} className="login-btn">
              Logout
            </button>
          </>
        ) : (
          // <Link to="/login" >

          // </Link>
          <a type="button" href="/login" className="login-btn">
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
