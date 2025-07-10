// // https/index.js
// import axios from "axios";
// const API = axios.create({ baseURL: "http://localhost:5000/api" });

// export const login = (data) => API.post("/auth/login", data);
// export const register = (data) => API.post("/auth/register", data);


// export const logout = () => {
//   // Optional: clear anything if needed, e.g., tokens
//   return Promise.resolve(); // allows react-query `useMutation` to work
// };


import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Auth for employees/admin
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);

// Auth for customers
export const registerCustomer = (data) => API.post("/auth/customer/register", data);
export const loginCustomer = (data) => API.post("/auth/customer/login", data);

export const logout = () => Promise.resolve();

