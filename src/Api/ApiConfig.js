import axios from "axios";

const BASE_URL = "http://43.204.221.144";
const PORT = "3000";


const login = async (email,password)=>{
    console.log("loginoijasdiofjaoisdjfaoksdjf");
    const response = await axios
      .post(
        `${BASE_URL}:${PORT}/api/v1/user/login`,
        { email:email,password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
    );
    console.log(response);
}

const expertRegister = ({})=>{
    //axios logic
}


export default login;