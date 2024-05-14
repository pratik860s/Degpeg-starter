import { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router";
import { login } from "../../../Api/ApiConfig";
import LoggedInMessage from "./ThankYou";
import Joi from 'joi';


const Loginx = () => {
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fnameReg, setfNameReg] = useState("");
  const [lnameReg, setlNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [errors, setErrors] = useState({});

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
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    const handleRegisterClick = () => {
      container.classList.add("active");
    };

    const handleLoginClick = () => {
      container.classList.remove("active");
    };

    registerBtn.addEventListener("click", handleRegisterClick);
    loginBtn.addEventListener("click", handleLoginClick);

    return () => {
      registerBtn.removeEventListener("click", handleRegisterClick);
      loginBtn.removeEventListener("click", handleLoginClick);
    };
  }, []);




  const handleSignIn = async (e) => {
    e.preventDefault();
    const errors = validateSignInForm({ email, password });
    if (errors) {
      setErrors(errors);
      console.log(errors);
      return;
    }
    console.log(email, password);
    await login(email, password);
    setIsLogged(true);
    navigate("/loggedin");
  };

  const expertLoginStyle = {
    color: "white",
  };

  const navigateToExpertRegistration = () => {
    navigate("/register/expert");
  };

  const handleModalClose = () => {
    setIsLogged(false);
    navigate("/")
    // Additional logic to redirect if needed
    // navigate("/other-page");
  };


  // JOI code begins

  const signInSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).required(),
  });

  const validateSignInForm = (data) => {
    const { error } = signInSchema.validate(data);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  


  return (
    <>
      <div className="container" id="container">
        <div className="form-container sign-up">
          <form>
            <h1>Create Account</h1>
            <br></br>
            <span>or use your email for registration</span>
            <input
              onChange={handleFirstNameChange}
              type="text"
              placeholder="First name"
            />
            {errors && errors.firstName && <div className="error">{errors.firstName}</div>}
            <input
              onChange={handleLastNameChange}
              type="text"
              placeholder="Last name"
            />
            {errors && errors.lastName && <div className="error">{errors.lastName}</div>}
            <input
              onChange={handleEmailRegChange}
              type="email"
              placeholder="Email"
            />
            {errors && errors.email && <div className="error">{errors.email}</div>}
            <input
              onChange={handlePasswordRegChange}
              type="password"
              placeholder="Password"
              required
            />
            {errors && errors.password && <div className="error">{errors.password}</div>}
            <button>Sign Up</button>
            <br></br>
            <span id="register-link">
              Already a member?{" "}
              <a id="login" style={{ cursor: "pointer" }}>
                <u>Log in</u>
              </a>
            </span>

            <p
              className="expert-register"
              onClick={navigateToExpertRegistration}
            >
              <u>Expert Registration</u>
            </p>
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
            <h1>Sign In</h1>
            <br></br>
            <span>or use your email password</span>
            <input
              onChange={handleEmailChange}
              type="email"
              placeholder="Email"
              required
            />
            {/* Display email validation error */}
            {errors && errors.email && <div className="error">{errors.email}</div>}
            <input
              onChange={handlePasswordChange}
              type="password"
              placeholder="Password"
              required
            />
            {/* Display password validation error */}
            {errors && errors.password && <div className="error">{errors.password}</div>}
            <a href="#">Forget Your Password?</a>
            <button onClick={handleSignIn}>Sign In</button>
            <br></br>
            <span id="register-link">
              Don't have an account?{" "}
              <a id="register" style={{ cursor: "pointer" }}>
                <u>Register</u>
              </a>
            </span>
          </form>
        </div>
        {isLogged && <LoggedInMessage isOpen={isLogged} onClose={handleModalClose} />}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Hello!</h1>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Welcome Back!</h1>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default Loginx;
