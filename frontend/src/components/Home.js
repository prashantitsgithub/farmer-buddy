import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles.css";

const Home = () => {
    const [showHowItWorks, setShowHowItWorks] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        // Disable clicking links if user is not logged in
        const handleClick = (e) => {
            if (!token) {
                e.preventDefault();
                alert("Please login to access this feature");
            }
        };

        // Attach click blocking to all internal links (except home, login, register, forgot-password)
        const links = document.querySelectorAll("a[href^='/']");
        links.forEach(link => {
            const href = link.getAttribute("href");
            if (!['/', '/login', '/register', '/forgot-password'].includes(href)) {
                link.addEventListener("click", handleClick);
            }
        });

        return () => {
            links.forEach(link => {
                link.removeEventListener("click", handleClick);
            });
        };
    }, []);

    const toggleHowItWorks = () => {
        setShowHowItWorks((prev) => !prev);
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <div className="hero">
                <div className="overlay"></div>
                <div className="hero-content">
                    <h1>Empowering Farmers for a Better Tomorrow</h1>
                    <p>Your ultimate agricultural partner for modern farming solutions.</p>
                    
                </div>
            </div>

            {/* About Section */}
            <section className="about">
                <h2>Welcome to Farmer Buddy</h2>
                <p>
                    Farmer Buddy is designed to help small farmers and agricultural students 
                    by providing real-time solutions, and essential resources 
                    to improve agricultural productivity.
                </p>
            </section>

            

            {/* Future of Farming */}
            <section className="future-farming">
                <h2>The Future of Farming is Here</h2>
                <p>
                    Leverage data, technology, and sustainable farming practices to ensure 
                    a profitable and eco-friendly agricultural future.
                </p>
               
            </section>

            

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section company">
                        <h3>Farmer Buddy</h3>
                        <p>Empowering Farmers with Smart Agriculture Solutions</p>
                    </div>

                    <div className="footer-section contact">
                        <h4>Contact Us</h4>
                        <p><strong>Address:</strong> plot no 128, Belgaum, Karnataka, India</p>
                        <p><strong>Email:</strong> jotibapatil568@gmail.com</p>
                        <p><strong>Phone:</strong> +91 7026210507</p>
                    </div>

                    
                </div>
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} Farmer Buddy. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
