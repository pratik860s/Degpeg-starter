import React, { useState } from "react";
import axios from "axios";
import "./ExpertSignup.css";
import {
  expertRegister,
  sendOtpEmail,
} from "./../../../Api/ApiConfig";
import Joi from "joi";

const ExpertSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [verifyOtp, setverifyOtp] = useState("");
  const [location, setLocation] = useState("");
  const [linkedinUrl, setlinkedinUrl] = useState("");
  const [twitterUrl, settwitterUrl] = useState("");
  // const [gst, setGst] = useState("");
  // const [bankName, setbankName] = useState("");
  // const [bankAccountNumber, setbankAccountNumber] = useState("");
  // const [ifscCode, setifscCode] = useState("");
  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState({});
  // all hooks

  const schemas = [
    Joi.object({
      name: Joi.string().required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(6).required(),
      confirmPass: Joi.ref("password"),
      contactNumber: Joi.string().required(),
      location: Joi.string().required(),
    }),
    Joi.object({
      linkedinUrl: Joi.string().uri().required(),
      twitterUrl: Joi.string().uri(),
    }),
    // Joi.object({
    //   bankName: Joi.string().required(),
    //   bankAccountNumber: Joi.string().required(),
    //   ifscCode: Joi.string().required(),
    // }),
  ];

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const confirmPassHandler = (e) => {
    setConfirmPass(e.target.value);
  };
  const contactNumberHandler = (e) => {
    setcontactNumber(e.target.value);
  };
  // const gstHandler = (e) => {
  //   setGst(e.target.value);
  // }

  const linkedinHandler = (e) => {
    setlinkedinUrl(e.target.value);
  };

  const twitterHandler = (e) => {
    settwitterUrl(e.target.value);
  };

  const locationHandler = (e) => {
    setLocation(e.target.value);
  };

  const otpHandler = (e) => {
    setverifyOtp(e.target.value);
  };
  // const bankNameHandler = (e) => {
  //   setbankName(e.target.value);
  // }
  // const bankAccountNumberHandler = (e) => {
  //   setbankAccountNumber(e.target.value);
  // }
  // const ifscCodeHandler = (e) => {
  //   setifscCode(e.target.value);
  // }

  const handleRegistrationForm = async (e) => {
    //calling registerExpert api
    e.preventDefault();
    console.log(
      name,
      email,
      password,
      contactNumber,
      location,
      linkedinUrl,
      twitterUrl
    );
    const response = await expertRegister(
      name,
      email,
      password,
      contactNumber,
      location,
      linkedinUrl,
      twitterUrl
    );
  };



  const handleBack = (e) => {
    e.preventDefault();
    if (step === 1) {
      return;
    }
    setStep(step - 1);
  };

  const handleNext = async (e) => {
    e.preventDefault();

    if (step === 1) {
      const { error } = schemas[0].validate({
        name,
        email,
        password,
        confirmPass,
        contactNumber,
        location,
      });

      if (error) {
        setErrors({
          ...errors,
          name:
            error.details.find((detail) => detail.context.key === "name")
              ?.message || "",
          email:
            error.details.find((detail) => detail.context.key === "email")
              ?.message || "",
          password:
            error.details.find((detail) => detail.context.key === "password")
              ?.message || "",
          confirmPass:
            error.details.find((detail) => detail.context.key === "confirmPass")
              ?.message || "",
          contactNumber:
            error.details.find(
              (detail) => detail.context.key === "contactNumber"
            )?.message || "",
          location:
            error.details.find((detail) => detail.context.key === "location")
              ?.message || "",
        });
        return;
      }
    } else {
      const { error } = schemas[1].validate({ linkedinUrl, twitterUrl });
      if (error) {
        setErrors({
          ...errors,
          linkedinUrl:
            error.details.find((detail) => detail.context.key === "linkedinUrl")
              ?.message || "",
          twitterUrl:
            error.details.find((detail) => detail.context.key === "twitterUrl")
              ?.message || "",
        });
        return;
      }
    }
    // }else{
    //   const { error } = schemas[2].validate({ bankName, bankAccountNumber, ifscCode });
    //   if (error) {
    //     setErrors({ ...errors, bankName: error.details.find(detail => detail.context.key === 'bankName')?.message || '', bankAccountNumber: error.details.find(detail => detail.context.key === 'bankAccountNumber')?.message || '', ifscCode: error.details.find(detail => detail.context.key === 'ifscCode')?.message || '' });
    //     return;
    //   }
    // }
    const response = await sendOtpEmail(email);
    setStep(step + 1);
  };

  return (
    <div className="container-expert" id="container-expert">
      <div className="form-container-expert sign-in-expert">
        <form>
          <h1 style={{ marginTop: "20px" }}>Expert Register</h1>
          <br />

          {step === 1 ? (
            <table>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      onChange={nameHandler}
                      value={name}
                      id="Name"
                      placeholder="Full Name"
                    />
                    {errors.name && <div className="error">{errors.name}</div>}
                  </td>
                  <td>
                    <input
                      onChange={emailHandler}
                      type="text"
                      value={email}
                      id="email"
                      placeholder="Email"
                    />
                    {errors.email && (
                      <div className="error">{errors.email}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="password"
                      onChange={passwordHandler}
                      value={password}
                      id="password"
                      placeholder="Password"
                    />
                    {errors.password && (
                      <div className="error">{errors.password}</div>
                    )}
                  </td>
                  <td>
                    <input
                      onChange={confirmPassHandler}
                      type="password"
                      value={confirmPass}
                      id="confirmPass"
                      placeholder="Confirm Password"
                    />
                    {errors.confirmPass && (
                      <div className="error">{errors.confirmPass}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      onChange={locationHandler}
                      value={location}
                      id="location"
                      placeholder="Location"
                    />
                    {errors.location && (
                      <div className="error">{errors.location}</div>
                    )}
                  </td>
                  <td>
                    <input
                      onChange={contactNumberHandler}
                      type="text"
                      id="contactNumber"
                      value={contactNumber}
                      placeholder="Contact No."
                    />
                    {errors.contactNumber && (
                      <div className="error">{errors.contactNumber}</div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table>
              <tbody>
                <tr></tr>
                <tr>
                  <td>
                    {
                      <div className="error">
                        We have sent an OTP to your email
                      </div>
                    }
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      onChange={otpHandler}
                      value={verifyOtp}
                      id="verifyOtp"
                      placeholder="Enter Email OTP"
                    />
                    {/* <td>
                      <button className="otpBtn" >
                        Verify OTP
                      </button>
                      <button
                        className="otpBtn"
                        // onClick={handleResendOtp}
                        // disabled={resendButtonDisabled}
                      >
                        Resend OTP
                      </button>
                    </td> */}
                    {/* {errors.verifyOtp && (
                      <div className="error">{errors.verifyOtp}</div>
                    )} */}
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      onChange={linkedinHandler}
                      value={linkedinUrl}
                      id="linkedinUrl"
                      placeholder="LinkedIn URL"
                    />
                    {errors.linkedinUrl && (
                      <div className="error">{errors.linkedinUrl}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      onChange={twitterHandler}
                      id="twitterUrl"
                      value={twitterUrl}
                      placeholder="Twitter URL"
                    />
                    {errors.twitterUrl && (
                      <div className="error">{errors.twitterUrl}</div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            // ) : (
            //   <table>
            //     <tbody>
            //       <tr>
            /* <td>
          <input type="text" onChange={bankNameHandler} id="bankName" placeholder="Bank/Branch Name" />
          {errors.bankName && <div className="error">{errors.bankName}</div>}
        </td>
        <td>
          <input type="text" onChange={bankAccountNumberHandler} id="bankAccountNumber" placeholder="Account No." />
          {errors.bankAccountNumber && <div className="error">{errors.bankAccountNumber}</div>}
        </td>
      </tr>
      <tr>
        <td>
          <input type="text" onChange={ifscCodeHandler} id="ifscCode" placeholder="ifscCode Code" />
          {errors.ifscCode && <div className="error">{errors.ifscCode}</div>}
        </td> */
            //     </tr>
            //   </tbody>
            // </table>
          )}

          {step === 2 ? (
            <button className="buttons" onClick={handleRegistrationForm}>
              Submit
            </button>
          ) : (
            <button className="buttons" onClick={handleNext}>
              Next
            </button>
          )}
          <u>
            <span style={{ cursor: "pointer" }} onClick={handleBack}>
              Back
            </span>
          </u>
          <br />
        </form>
      </div>
      <div className="toggle-container-expert">
        <h1 class="expert-h1">
          Be THE<br></br>EXPERT
        </h1>
        <img
          src="../../../../../images/expert.jpg"
          style={{
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.4,
          }}
        />
      </div>
    </div>
  );
};

export default ExpertSignup;
