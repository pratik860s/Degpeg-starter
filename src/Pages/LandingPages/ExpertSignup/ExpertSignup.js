import React, { useState } from "react";
import axios from "axios";
import Joi from "joi";
import "./ExpertSignup.css";

const ExpertSignup = () => {

  const [email,setEmail] = useState("");
// all hooks


  const emailHandler = (e)=>{
    setEmail(e.target.value);
  }


  const handleRegistrationForm = ()=>{
    //calling registerExpert api
  }

  return (
    <div className="container-expert" id="container-expert">
      <div className="form-container-expert sign-in-expert">
        <form>
          
          <h1 style={{marginTop : "20px"}}>Expert Register</h1><br></br>
          <table>
            <tbody>
              <tr>
                <td><input type="text" id="firstName" placeholder="First Name" /></td>
                <td><input type="text" id="lastName" placeholder="Last Name" /></td>
              </tr>
              <tr>
                <td><input onChange={emailHandler} type="text" id="email" placeholder="Email" /></td>
                <td><input type="text" id="mobile" placeholder="Mobile No." /></td>
              </tr>
              <tr>
                <td><input type="text" id="location" placeholder="Location" /></td>
                <td><input type="text" id="gst" placeholder="GST" /></td>
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
                <td><input type="text" id="bankBranch" placeholder="Bank/Branch Name" /></td>
                <td><input type="text" id="accountNo" placeholder="Account No." /></td>
              </tr>
              <tr>
                <td><input type="text" id="ifsc" placeholder="IFSC Code" /></td>
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
