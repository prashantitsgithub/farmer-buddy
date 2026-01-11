import { useState } from "react";
import axios from "axios";
import "../styles.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const sendOtp = async () => {
        setMessage("");
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/send-otp", { email });
            setOtpSent(true);
            setMessage(res.data.message || "OTP sent successfully.");
        } catch (err) {
            setMessage(err.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/reset-password", {
                email,
                otp,
                newPassword,
            });
            setMessage(res.data.message || "Password reset successful.");
        } catch (err) {
            setMessage(err.response?.data?.message || "Error resetting password");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        otpSent ? handleReset(e) : sendOtp();
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Reset Password</h2>
                <p>{otpSent ? "Enter OTP and new password" : "Enter your email to receive OTP"}</p>

                {message && <p className="error-message">{message}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={otpSent} // lock email after OTP sent
                        />
                    </div>

                    {otpSent && (
                        <>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Processing..." : otpSent ? "Reset Password" : "Send OTP"}
                    </button>
                </form>

                <div className="login-links">
                    <a href="/login">Back to Login</a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
