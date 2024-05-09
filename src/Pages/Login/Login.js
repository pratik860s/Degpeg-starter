// Importing necessary modules from React and React Router
import React, { useState } from "react";
import axios from "axios"
import Modal from "react-modal"
import { Link } from "react-router-dom";
// Importing the CSS stylesheet for styling the component
import "./Login.css";

// Login component definition
const Login = () => {
  // State hooks for managing email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);


  // Event handler for form submission
  const handleSubmit = (event) => {
    // Prevents the default form submission action
    event.preventDefault();
    const apiEndpoint = "http://43.204.221.144:3000/api/v1/user/login";

    // Making a POST request using axios to submit the form data
    axios
      .post(apiEndpoint, {email,password}, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Success:", response.data); // Log success message and data
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Error:", error); // Log Any Error
      });

  };


  // JSX for rendering the login form
  return (
    <div className="login-container">
      <div className="login-poster">
      <img className="login-image" src={process.env.PUBLIC_URL + "/images/logo-poster.jpeg"} alt='poster' />
          <h1 className="h1-login">Welcome</h1>
          <p className="paragraph">
          Lorem ipsum dolor sit amet,
          consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua.
          </p>
      </div>
      <div className="login-card">
        {/* <img src={logoImage} alt="Logo" className="logo" /> */}
        {/* Form element with an onSubmit event handler */}
        <form onSubmit={handleSubmit}>
          <h1>Log In</h1>
          {/* Email input field */}
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password input field */}
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Login button */}
          <button className="buttons" type="submit">
            Login
          </button>
          {/* Links for navigating to user or expert registration */}
          <p>
            Register as
            <Link className="link" to="/register/user">
              {" "}
              User
            </Link>{" "}
            or{" "}
            <Link className="link" to="/register/expert">
              Expert
            </Link>
          </p>
        </form>
        <LoggedInMessage isOpen={submitted} onClose={() => setSubmitted(false)} />
      </div>
    </div>
  );
};
const customStyles = {
  content: {
    width: '50%',
    height: '50%',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    textAlign: 'center',
    background: 'linear-gradient(to top left, #a4a1ff, #ffffff)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  }
};
const LoggedInMessage = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2>Thank you for logging in.</h2>
      <p className="paragraph">We will notify you when we are live.</p>
      <button className="buttons" onClick={onClose}>Close</button>
    </Modal>
  );
};
// Exporting the Login component for use in other parts of the application
export default Login;
