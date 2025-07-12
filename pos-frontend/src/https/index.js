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
export const createOrder = (data) => API.post("/orders", data);
// https/index.js
export const getOrders = () => API.get("/orders");
export const updateOrderStatusApi = (id, status) => API.patch(`/orders/${id}/status`, { status });
export const updatePaymentStatusApi = (id, paymentStatus) =>
  API.patch(`/orders/${id}/payment`, { paymentStatus });
export const completeOrderApi = (id) => API.patch(`/orders/${id}/complete`);

// tableNo and seats must be numbers
export const createTable = (data) => API.post("/tables", data);
export const updateOrderStatus = (orderId, newStatus) =>
  axios.put(`/api/orders/${orderId}/status`, { status: newStatus });
// Fetch all tables
export const getTables = () => API.get("/tables");


export const logout = () => Promise.resolve();

