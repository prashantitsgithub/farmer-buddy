import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Opportunities from "./components/Opportunities";
import SaveMoneyTime from "./components/SaveMoneyTime";
import HowItWorks from "./components/Queries";
import CropCategory from "./components/CropCategory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Footer from "./components/Footer";
import BestPesticidesFertilizers from "./components/BestPesticidesFertilizers";

import VegetableFarming from "./pages/VegetableFarming";
import CerealCrops from "./pages/CerealCrops";
import FruitFarming from "./pages/FruitFarming";
import OilseedCrops from "./pages/OilseedCrops";
import CashCrops from "./pages/CashCrops";
import FlowerPlants from "./pages/FlowerPlants";
import OtherCrops from "./pages/OtherCrops";
import AdminDashboard from "./components/AdminDashboard";
import FeedbackForm from "./components/FeedbackForm";
import PesticideAdvisor from "./pages/PesticideAdvisor";
import CropDetail from "./pages/CropDetail";

import RoleSelector from "./pages/RoleSelector";
import AdminLogin from "./pages/AdminLogin";

import "./styles.css";
import { CropDetailsPage } from "./pages/CropDetailsPage";
import ChatBot from "./components/ChatBot";

function AppRoutes() {
  const isLoggedIn = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!isLoggedIn && isAdmin) {
    localStorage.removeItem("isAdmin");
  }

  return (
    <>
      {isLoggedIn && <Navbar />}

      <Routes>
        {/* 🔰 Show Role Selector by default */}
        <Route
          path="/"
          element={
            !isLoggedIn && !isAdmin ? (
              <RoleSelector />
            ) : isAdmin && !isLoggedIn ? (
              <Navigate to="/admin-login" />
            ) : isAdmin ? (
              <Navigate to="/admin-dashboard" />
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/home" replace /> : <Register />}
        />
        <Route
          path="/forgot-password"
          element={
            isLoggedIn ? <Navigate to="/home" replace /> : <ForgotPassword />
          }
        />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Protected Routes (Farmer) */}
        {isLoggedIn ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/save" element={<SaveMoneyTime />} />
            <Route path="/Queries" element={<HowItWorks />} />
            <Route path="/future" element={<CropCategory />} />
            <Route path="/VegetableFarming" element={<VegetableFarming />} />
            <Route path="/CerealCrops" element={<CerealCrops />} />
            <Route path="/FruitFarming" element={<FruitFarming />} />
            <Route path="/OilseedCrops" element={<OilseedCrops />} />
            <Route path="/CashCrops" element={<CashCrops />} />
            <Route path="/FlowerPlants" element={<FlowerPlants />} />
            <Route path="/OtherCrops" element={<OtherCrops />} />
            <Route path="/PesticideAdvisor" element={<PesticideAdvisor />} />
            <Route path="/crop/:id" element={<CropDetail />} />
            <Route path="/FeedbackForm" element={<FeedbackForm />} />
            <Route path="/search/:searchQuery" element={<CropDetailsPage />} />
            <Route
              path="/BestPesticidesFertilizers"
              element={<BestPesticidesFertilizers />}
            />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>

      {isLoggedIn && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
      <ChatBot />
    </Router>
  );
}
