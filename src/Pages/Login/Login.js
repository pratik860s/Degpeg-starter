// Importing necessary modules from React and React Router
import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Joi from "joi"

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  // MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

// Importing the CSS stylesheet for styling the component
import "./Login.css";

// Login component definition
const Login = () => {
  // State hooks for managing email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const customTlds = ["com", "org", "net"]; // Add your desired TLDs here

  const schema = Joi.object({
    email: Joi.string()
    .email({ tlds: { allow: customTlds } })
    .required(),    password: Joi.string().required(),
  });

  // Event handler for form submission
  const handleSubmit = (event) => {
    // Prevents the default form submission action
    event.preventDefault();
    const { error } = schema.validate({ email, password });

    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return; // Exit the function if validation fails
    }
    const apiEndpoint = "http://43.204.221.144:3000/api/v1/user/login";

    // Making a POST request using axios to submit the form data
    axios
      .post(
        apiEndpoint,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
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
    <MDBContainer className="my-4 ">
      <MDBCard className="login-card">
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src={process.env.PUBLIC_URL + "/images/logo-poster.jpeg"}
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              {/* <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">Logo</span>
              </div> */}

              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Sign into your account
              </h5>
              <form onSubmit={handleSubmit}>
              <MDBInput
                placeholder="Email address"
                wrapperClass="mb-4"
                id="email"
                type="email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Password"
                id="password"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="mb-4 px-5"
                color="dark"
                size="lg"
              >
                Login
              </button>
              {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Don't have an account? Register as{" "}
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
              <LoggedInMessage
                isOpen={submitted}
                onClose={() => setSubmitted(false)}
              />
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};
const customStyles = {
  content: {
    width: "50%",
    height: "50%",
    margin: "auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    textAlign: "center",
    background: "linear-gradient(to top left, rgb(255, 223, 95), #ffffff)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
};
const LoggedInMessage = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2>Thank you for logging in.</h2>
      <p className="paragraph">We will notify you when we are live.</p>
      <button onClick={onClose}>Close</button>

    </Modal>
  );
};
// Exporting the Login component for use in other parts of the application
export default Login;
