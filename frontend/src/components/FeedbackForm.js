import { useState } from "react";
import axios from "axios";
import "../styles.css";

const FeedbackForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/feedback", {
                name,
                email,
                message,
            });

            if (response.status === 200) {
                setSuccess(true);
                setName("");
                setEmail("");
                setMessage("");
            } else {
                alert("Feedback not sent. Please try again.");
            }
        } catch (error) {
            console.error("Feedback submission error:", error);
            alert("Failed to send feedback.");
        }
    };

    return (
        <div className="feedback-wrapper">
            <div className="feedback-container">
                <h2>Feedback</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Your Feedback"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <button type="submit">Submit Feedback</button>
                    {success && <p className="success-message">Thanks for your feedback!</p>}
                </form>
            </div>

            {/* Footer below feedback */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section company">
                        <h3>Farmer Buddy</h3>
                        <p>Empowering Farmers with Smart Agriculture Solutions</p>
                    </div>

                    <div className="footer-section contact">
                        <h4>Contact Us</h4>
                        <p><strong>Address:</strong> Plot No. 42, Agri Tech Park, Pune, India</p>
                        <p><strong>Email:</strong> support@farmerbuddy.in</p>
                        <p><strong>Phone:</strong> +91 98765 43210</p>
                    </div>

                    <div className="footer-section links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/team">Our Team</a></li>
                            <li><a href="/careers">Careers</a></li>
                            <li><a href="/feedback">Feedback</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} Farmer Buddy. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default FeedbackForm;
