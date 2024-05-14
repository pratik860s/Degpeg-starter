import axios from "axios";

const BASE_URL = "http://43.204.221.144";
const PORT = "3000";

const login = async (email, password) => {
  try {
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
  } catch (error) {
    console.error("Error logging in:", error);
  }
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
  try {
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
    return response;
  } catch (error) {
    console.error("Error registering expert:", error);
    return null;
  }
};

export { expertRegister, login };
