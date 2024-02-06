const userToken = localStorage.getItem("userToken");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${userToken}`,
  // Add any other custom headers as needed
};

export default headers;
