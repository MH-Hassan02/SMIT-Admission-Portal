import React, { useEffect, useState } from "react";
import Logo from "../Images/logo-OpazD70S.png";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import loadingAnimation from "../Images/Animation - 1722673258330.gif";

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formValues.email) errors.email = "Email is required";
    if (!formValues.password) errors.password = "Password is required";
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/login`,
          formValues
        );
        if (response.data.token) {
          // Save token to local storage or any other preferred method
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard");
        }
      } catch (error) {
        toast.error("Invalid credentials. Please try again.", {
          pauseOnHover: false,
          autoClose: 3000,
          style: {
            backgroundColor: "#FFEBEE",
          },
        });
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLoginClick(e);
    }
  };

  return (
    <div className="loginMain">
      <div className="loginContent">
        {loading ? (
          <div className="loaderImg">
            <img
              src={loadingAnimation}
              height="100"
              width="100"
              alt="Loading Animation"
            />
          </div>
        ) : (
          <>
            <div className="sideContainerLogin"></div>
            <div className="contentContainer">
              <img src={Logo} alt="SMIT Logo" />
              <h2>Student Portal</h2>
              <div className="emailSec">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  style={{ borderColor: formErrors.email ? "red" : "" }}
                />
              </div>
              <div className="pwordSec">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  style={{ borderColor: formErrors.password ? "red" : "" }}
                />
              </div>
              <div className="buttonSec">
                <label htmlFor="">
                  Not registered yet?{" "}
                  <span onClick={() => navigate("/register")}>
                    Fill the form here!
                  </span>
                </label>
                <button onClick={handleLoginClick}>Login</button>
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
