import React, { useState } from "react";
import axios from "axios";
import Joi from "joi";
import "./ExpertSignup.css";

const customTlds = ["com", "org", "net"]; // Add your desired TLDs here

const level1Schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: customTlds } })
    .required(),
  contactNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .required(),
  location: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

const level2Schema = Joi.object({
  gst: Joi.string()
    .pattern(/^[A-Z0-9]{15}$/)
    .required(),
  // cancelledCheque: Joi.any().required(),
  // addressProof: Joi.any().required(),
});

const level3Schema = Joi.object({
  bankName: Joi.string().required(),
  bankAccountNumber: Joi.string().required(),
  ifscCode: Joi.string()
    .pattern(/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/)
    .required(),
});

const ExpertSignup = () => {
  // State hooks to manage the form's current level, password visibility, and form data
  const [level, setLevel] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Initial form data state with all fields set to default values
    name: "",
    email: "",
    contactNumber: "",
    location: "",
    password: "",
    confirmPassword: "",
    gst: "",
    // cancelledCheque: null,
    bankName: "",
    bankAccountNumber: "",
    ifscCode: "",
  });

  // Function to toggle the visibility of the password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle the 'Next' button click, advancing the form level
  const handleNext = () => {
    let validationSchema;
    let validationFields = {};

    switch (level) {
      case 1:
        validationSchema = level1Schema;
        validationFields = {
          name: formData.name,
          email: formData.email,
          contactNumber: formData.contactNumber,
          location: formData.location,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        };
        break;
      case 2:
        validationSchema = level2Schema;
        validationFields = {
          gst: formData.gst,
          // cancelledCheque: formData.cancelledCheque,
          // addressProof: formData.addressProof,
        };
        break;
      default:
        break;
    }

    const { error } = validationSchema.validate(validationFields, {
      abortEarly: false,
    });
    if (error) {
      alert(error.details[0].message);
      return;
    }

    if (level < 3) {
      setLevel(level + 1);
    }
  };

  // Function to handle changes in the form inputs and update the form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const { error } = level3Schema.validate({
      bankName: formData.bankName,
      bankAccountNumber: formData.bankAccountNumber,
      ifscCode: formData.ifscCode,
    });
  
    if (error) {
      // Validation failed
      alert(error.details[0].message);
      return;
    }

    // Check if passwords match before submitting
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // API endpoint for form submission
    const apiEndpoint = "http://43.204.221.144:3000/api/v1/user/register";

    // Creating a FormData object to hold the form data for submission
    const formPayload = new FormData();

    // Appending each form field to the FormData object
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "confirmPassword") {
        formPayload.append(key, value);
      }
    });
    formPayload.append("type", "expert");

    // Making a POST request using axios to submit the form data
    axios
      .post(apiEndpoint, formPayload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Success:", response.data); // Log success message and data
        alert(
          "We have sent you a confirmation email. Please check your email."
        );
        // Redirect to login page
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error:", error); // Log Any Error
      });
  };

  // JSX to render the multi-level form with conditional rendering based on the current level
  return (
    <div className="expertSignup-container">
      <div className="expert-poster">
        <img
          className="expert-image"
          src={process.env.PUBLIC_URL + "/images/expert-poster.jpeg"}
          alt="poster"
        />
        <h1 className="h1-expert">Become An Expert</h1>
        <p className="paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="expertSignup-card">
        <h2>Expert Registration</h2>
        {level === 1 && (
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Business/Expert Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Business/Expert Email"
              required
            />
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Mobile number"
              required
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Business/Expert Location"
              required
            />
            <div
              className="password-input"
              style={{ position: "relative", width: "fit-content" }}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create Password"
                required
                style={{ paddingRight: "10px", marginLeft: "57px" }}
              />
              <button
                className="showButton"
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "6px",
                  top: "6px",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
            {formData.password !== formData.confirmPassword && (
              <p style={{ color: "red" }}>Passwords do not match.</p>
            )}
          </div>
        )}

        {level === 2 && (
          <div>
            <input
              type="text"
              name="gst"
              value={formData.gst}
              onChange={handleChange}
              placeholder="GST Number"
              required
            />
            {/* <label htmlFor="cancelledCheque">
              Cancelled Cheque (Max size: 50KB)
            </label> */}
            {/* <input
              type="file"
              id="cancelledCheque"
              name="cancelledCheque"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.size > 50 * 1024) {
                  alert("File size should not exceed 50KB");
                  e.target.value = "";
                } else {
                  setFormData({ ...formData, cancelledCheque: file });
                }
              }}
              required
            /> */}

            {/* <label htmlFor="addressProof">Address Proof (Max size: 50KB)</label> */}
            {/* <input
              type="file"
              id="addressProof"
              name="addressProof"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.size > 50 * 1024) {
                  // 500KB limit
                  alert("File size should not exceed 50KB");
                  e.target.value = ""; // Clear the file input
                } else {
                  setFormData({ ...formData, addressProof: file });
                }
              }}
              required
            /> */}
          </div>
        )}

        {level === 3 && (
          <div>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="Bank/Branch Name"
              required
            />
            <input
              type="text"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleChange}
              placeholder="Bank Account No."
              required
            />
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              placeholder="Bank IFSC Code"
              required
            />
          </div>
        )}

        {level < 3 ? (
          <button className="buttons" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className="buttons" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default ExpertSignup;
