import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminSignup.css";

const AdminSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);

  const validateFields = () => {
    let valid = true;
    if (name.trim() === "") {
      setIsNameValid(false);
      valid = false;
    } else {
      setIsNameValid(true);
    }

    if (email.trim() === "") {
      setIsEmailValid(false);
      valid = false;
    } else {
      setIsEmailValid(true);
    }

    return valid;
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }
    try {
      const adminObj = {
        email: email,
        name: name,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/register`,
        adminObj
      );
      // console.log(response);
      navigate("/login");
    } catch (error) {
      console.log("error in registerUser(Admin)", error);
    }
  };

  return (
    <div className="admin-signup-container">
      <div className="admin-signup-form">
        <div className="admin-signup-header">
          Welcome <span>Admin</span>
        </div>
        <div className="admin-signup-subheader">Sign up now!</div>
        <form onSubmit={registerUser} className="flex flex-col gap-3">
          <div className="form-input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={!isNameValid ? "invalid" : ""}
            />
            {!isNameValid && (
              <div className="error-message">Name is required</div>
            )}
          </div>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={!isEmailValid ? "invalid" : ""}
            />
            {!isEmailValid && (
              <div className="error-message">Email is required</div>
            )}
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        <div className="text-sm text-center mt-[1.6rem]">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
