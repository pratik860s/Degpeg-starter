import React, { useState } from "react";
import axios from "axios";
import "./ExpertSignup.css";
import { expertRegister } from "./../../../Api/ApiConfig"
import Joi from "joi";

const ExpertSignup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [contactNumber, setcontactNumber] = useState("");

  const [location, setLocation] = useState("");
  const [gst, setGst] = useState("");
  const [bankName, setbankName] = useState("");
  const [bankAccountNumber, setbankAccountNumber] = useState("");
  const [ifscCode, setifscCode] = useState("");
  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState({});
  // all hooks

  const schemas = [
    Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email({ tlds: { allow: false } }).required(),
      password: Joi.string().min(6).required(),
      confirmPass: Joi.ref("password"),
      contactNumber: Joi.string().required(),
      location: Joi.string().required(),
    }),
    Joi.object({
      gst: Joi.string().required(),
    }),
    Joi.object({
      bankName: Joi.string().required(),
      bankAccountNumber: Joi.string().required(),
      ifscCode: Joi.string().required(),
    }),
  ];

  const emailHandler = (e) => {
    setEmail(e.target.value);
  }
  const nameHandler = (e) => {
    setName(e.target.value);
  }
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  }
  const confirmPassHandler = (e) => {
    setConfirmPass(e.target.value);
  }
  const contactNumberHandler = (e) => {
    setcontactNumber(e.target.value);
  }
  const gstHandler = (e) => {
    setGst(e.target.value);
  }
  const locationHandler = (e) => {
    setLocation(e.target.value);
  }
  const bankNameHandler = (e) => {
    setbankName(e.target.value);
  }
  const bankAccountNumberHandler = (e) => {
    setbankAccountNumber(e.target.value);
  }
  const ifscCodeHandler = (e) => {
    setifscCode(e.target.value);
  }

  const handleRegistrationForm = async (e) => {
    //calling registerExpert api
    e.preventDefault();
    console.log(name, email, password, contactNumber, location, gst, bankName, bankAccountNumber, ifscCode);
    const response = await expertRegister(name, email, password, contactNumber, location, gst, bankName, bankAccountNumber, ifscCode);
  }

  const handleBack = (e) => {
    e.preventDefault();
    if (step === 1) { return; }  setStep(step - 1);
  }

  const handleNext = (e)=>{
    e.preventDefault();
    
    if(step === 1){
      const {error} = schemas[0].validate({name,email,password,confirmPass,contactNumber,location})
      
      if(error){
        setErrors({ ...errors, name: error.details.find(detail => detail.context.key === 'name')?.message || '', email: error.details.find(detail => detail.context.key === 'email')?.message || '', password: error.details.find(detail => detail.context.key === 'password')?.message || '', confirmPass: error.details.find(detail => detail.context.key === 'confirmPass')?.message || '', contactNumber: error.details.find(detail => detail.context.key === 'contactNumber')?.message || '', location: error.details.find(detail => detail.context.key === 'location')?.message || '' });
        return;
      }

    }else if(step === 2){
      const { error } = schemas[1].validate({ gst });
      if (error) {
        setErrors({ ...errors, gst: error.details.find(detail => detail.context.key === 'gst')?.message || '' });
        return;
      }
    }else{
      const { error } = schemas[2].validate({ bankName, bankAccountNumber, ifscCode });
      if (error) {
        setErrors({ ...errors, bankName: error.details.find(detail => detail.context.key === 'bankName')?.message || '', bankAccountNumber: error.details.find(detail => detail.context.key === 'bankAccountNumber')?.message || '', ifscCode: error.details.find(detail => detail.context.key === 'ifscCode')?.message || '' });
        return;
      }
    }
    setStep(step + 1);
  }

  return (
    <div className="container-expert" id="container-expert">
      <div className="form-container-expert sign-in-expert">
        <form>
          <h1 style={{ marginTop: "20px" }}>Expert Register</h1><br />

          {step === 1 ? (
  <table>
    <tbody>
      <tr>
        <td>
          <input type="text" onChange={nameHandler} id="Name" placeholder="Full Name" />
          {errors.name && <div className="error">{errors.name}</div>}
        </td>
        <td>
          <input type="password" onChange={passwordHandler} id="password" placeholder="Password" />
          {errors.password && <div className="error">{errors.password}</div>}
        </td>
      </tr>
      <tr>
        <td>
          <input onChange={emailHandler} type="text" id="email" placeholder="Email" />
          {errors.email && <div className="error">{errors.email}</div>}
        </td>
        <td>
          <input onChange={confirmPassHandler} type="password" id="confirmPass" placeholder="Confirm Password" />
          {errors.confirmPass && <div className="error">{errors.confirmPass}</div>}
        </td>
      </tr>
      <tr>
        <td>
          <input type="text" onChange={locationHandler} id="location" placeholder="Location" />
          {errors.location && <div className="error">{errors.location}</div>}
        </td>
        <td>
          <input onChange={contactNumberHandler} type="text" id="contactNumber" placeholder="contactNumber No." />
          {errors.contactNumber && <div className="error">{errors.contactNumber}</div>}
        </td>
      </tr>
    </tbody>
  </table>
) : step === 2 ? (
  <table>
    <tbody>
      <tr>
        <td><span>GST </span></td>
        <td>
          <input type="text" onChange={gstHandler} id="gst" placeholder="GST" />
          {errors.gst && <div className="error">{errors.gst}</div>}
        </td>
      </tr>
    </tbody>
  </table>
) : (
  <table>
    <tbody>
      <tr>
        <td>
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
        </td>
      </tr>
    </tbody>
  </table>
)}


          {step === 3 ? (<button onClick={handleRegistrationForm}>Submit</button>) : <button onClick={handleNext}>Next</button>}
          <u><span style={{ cursor: 'pointer' }} onClick={handleBack}>Back</span></u>
          <br />
        </form>
      </div>
      <div className="toggle-container-expert">
        <h1 class="expert-h1">Be THE<br></br>EXPERT</h1>
        <img
          src="../../../../../images/expert.jpg"
          style={{
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.4
          }}
        />
      </div>
    </div>
  );
};

export default ExpertSignup;
