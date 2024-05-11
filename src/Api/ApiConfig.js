import axios from "axios";

const BASE_URL = "http://43.204.221.144";
const PORT = "3000";

const login = async (email, password) => {
  console.log("loginoijasdiofjaoisdjfaoksdjf");
  const response = await axios.post(
    `${BASE_URL}:${PORT}/api/v1/user/login`,
    { email: email, password: password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
};

const expertRegister = async (
  name,
  email,
  password,
  contactNumber,
  location,
  gst,
  bankName,
  bankAccountNumber,
  ifscCode
) => {
  const response = await axios.post(
    `${BASE_URL}:${PORT}/api/v1/user/register`,
    {
      type: "expert",
      email: email,
      password: password,
      name: name,
      contactNumber: contactNumber,
      location: location,
      gst: gst,
      bankName: bankName,
      bankAccountNumber: bankAccountNumber,
      ifscCode: ifscCode,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
};

export { expertRegister, login };

