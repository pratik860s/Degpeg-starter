import { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router";
import login from "../../../Api/ApiConfig";
const Loginx = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fnameReg, setfNameReg] = useState("");
  const [lnameReg, setlNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const handleFirstNameChange = (event) => {
    setfNameReg(event.target.value);
  };
  
  const handleLastNameChange = (event) => {
    setlNameReg(event.target.value);
  };
  
  const handleEmailRegChange = (event) => {
    setEmailReg(event.target.value);
  };
  
  const handlePasswordRegChange = (event) => {
    setPasswordReg(event.target.value);
  };
  
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  useEffect(() => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    const handleRegisterClick = () => {
      container.classList.add("active");
    };

    const handleLoginClick = () => {
      container.classList.remove("active");
    };

    registerBtn.addEventListener('click', handleRegisterClick);
    loginBtn.addEventListener('click', handleLoginClick);

    return () => {
      registerBtn.removeEventListener('click', handleRegisterClick);
      loginBtn.removeEventListener('click', handleLoginClick);
    };
  }, []);

  const handleSignIn = async (e)=>{
    e.preventDefault();
    console.log(email,password);
    await login(email,password);
  }

  const expertLoginStyle = {
    color : "white",
  };

  const navigateToExpertRegistration= ()=>{
    navigate("/register/expert");
  }

  return (
    <>
    <div className="container" id="container">
      
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1><br></br>
          <span>or use your email for registeration</span>
          <input onChange={handleFirstNameChange} type="text" placeholder="First name" />
          <input onChange={handleLastNameChange} type="text" placeholder="Last name" />
          <input onChange={handleEmailRegChange} type="email" placeholder="Email" />
          <input onChange={handlePasswordRegChange} type="password" placeholder="Password" />
          <button>Sign Up</button>
          <br></br>
          <span id="register-link" >Already a member? <a  id="login" style={{cursor:"pointer"}}><u>Log in</u></a></span>

            <p className="expert-register" onClick={navigateToExpertRegistration}><u>Expert Registration</u></p>
          
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1><br></br>
          <span>or use your email password</span>
          <input onChange={handleEmailChange}  type="email" placeholder="Email" />
          <input onChange={handlePasswordChange}  type="password" placeholder="Password" />
          <a href="#">Forget Your Password?</a>
          <button onClick={handleSignIn}>Sign In</button><br></br>
          <span id="register-link" >Don't have an account? <a  id="register" style={{cursor:"pointer"}}><u>Register</u></a></span>
        </form>
      </div>
      <div class="toggle-container">
        <div class="toggle">
          <div class="toggle-panel toggle-left">
            <h1>Hello!</h1>
          </div>
          <div class="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
          </div>
        </div>
        
      </div>
    </div>
    </>
  );


}

export default Loginx;