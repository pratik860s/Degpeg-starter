import React, { useState } from "react";
import axios from "axios";
import "./ExpertSignup.css";
import {expertRegister} from "./../../../Api/ApiConfig"

const ExpertSignup = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [contactNumber,setcontactNumber] = useState("");

  const [location,setLocation] = useState("");
  const [gst,setGst] = useState("");
  const [bankName,setbankName] = useState("");
  const [bankAccountNumber,setbankAccountNumber] = useState("");
  const [ifscCode,setifscCode] = useState("");
  // all hooks


  const emailHandler = (e)=>{
    setEmail(e.target.value);
  }
  const nameHandler = (e)=>{
    setName(e.target.value);
  }
  const passwordHandler = (e)=>{
    setPassword(e.target.value);
  }
  const contactNumberHandler = (e)=>{
    setcontactNumber(e.target.value);
  }
  const gstHandler = (e)=>{
    setGst(e.target.value);
  }
  const locationHandler = (e)=>{
    setLocation(e.target.value);
  }
  const bankNameHandler = (e)=>{
    setbankName(e.target.value);
  }
  const bankAccountNumberHandler = (e)=>{
    setbankAccountNumber(e.target.value);
  }
  const ifscCodeHandler = (e)=>{
    setifscCode(e.target.value);
  }
  
  const handleRegistrationForm = async (e)=>{
    //calling registerExpert api
    e.preventDefault();
    console.log(name,email,password,contactNumber,location,gst,bankName,bankAccountNumber,ifscCode);
    await expertRegister(name,email,password,contactNumber,location,gst,bankName,bankAccountNumber,ifscCode);
  }

  return (
    <div className="container-expert" id="container-expert">
      <div className="form-container-expert sign-in-expert">
        <form>
          
          <h1 style={{marginTop : "20px"}}>Expert Register</h1><br></br>
          <table>
            <tbody>
              <tr>
                <td><input type="text" onChange={nameHandler} id="Name" placeholder="First Name" /></td>
                <td><input type="password" onChange={passwordHandler} id="password" placeholder="Password" /></td>
              </tr>
              <tr>
                <td><input onChange={emailHandler} type="text" id="email" placeholder="Email" /></td>
                <td><input onChange={contactNumberHandler} type="text" id="contactNumber" placeholder="contactNumber No." /></td>
              </tr>
              <tr>
                <td><input type="text" onChange={locationHandler} id="location" placeholder="Location" /></td>
                <td><input type="text" onChange={gstHandler} id="gst" placeholder="GST" /></td>
              </tr>
              {/* <tr>
                <td><label for="cancelledCheque">Cancelled Cheque</label></td>
                <td><input type="file" id="cancelledCheque" accept="image/*" /></td>
              </tr>
              <tr>
                <td><label for="addressProof">Address Proof</label></td>
                <td><input type="file" id="addressProof" accept="image/*" /></td>
              </tr> */}
              <tr>
                <td><input type="text" onChange={bankNameHandler} id="bankName" placeholder="Bank/Branch Name" /></td>
                <td><input type="text" onChange={bankAccountNumberHandler} id="bankAccountNumber" placeholder="Account No." /></td>
              </tr>
              <tr>
                <td><input type="text" onChange={ifscCodeHandler} id="ifscCode" placeholder="ifscCode Code" /></td>
              </tr>
            </tbody>
          </table>
          <button onClick={handleRegistrationForm}>Register</button><br></br>
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
