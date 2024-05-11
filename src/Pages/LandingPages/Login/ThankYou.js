import React from "react";
import Modal from "react-modal";
import "./style.css"

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
    <div isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2>Thank you for logging in.</h2><br/>
      <p className="paragraph">We will notify you when we are live.</p>
    </div>
  );
};

export default LoggedInMessage;
