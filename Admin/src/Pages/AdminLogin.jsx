import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/admin/check-auth`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setIsAuthenticated(true);
          navigate("/"); // Redirect to dashboard if already logged in
        }
      } catch (error) {
        // User is not authenticated, do nothing
      }
    };

    checkAuth();
  }, [navigate]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const otpString = otp.join("");
      const adminLoginObj = { otpPassword: otpString };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/login`,
        adminLoginObj,
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log("Error in login", error);
    }
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleSubmit} className="otp-form">
        <span className="main-heading">Enter OTP</span>
        <p className="otp-subheading">
          Enter the key that was assigned to you via email.
        </p>
        <div className="input-container">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              required
              maxLength="1"
              type="text"
              className="otp-input"
              id={`otp-input${i + 1}`}
              ref={(el) => (inputRefs.current[i] = el)}
              onChange={(e) => handleInputChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>
        <button className="verify-button">Verify</button>
        <button onClick={() => navigate("/signup")} className="exit-btn">
          ×
        </button>
        <div className="text-sm text-center mt-[1.6rem]">
          Dont have an account?{" "}
          <Link to="/signup" className="signup-link">
            Signup!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
