import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// =======================
// 🔐 Auth (Admin/Employee)
// =======================
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);

// =======================
// 🔐 Auth (Customer)
// =======================
export const registerCustomer = (data) => API.post("/auth/customer/register", data);
export const loginCustomer = (data) => API.post("/auth/customer/login", data);

// =======================
// 🛒 Orders
// =======================
export const createOrder = (data) => API.post("/orders", data);
export const getOrders = () => API.get("/orders");
export const updateOrderStatusApi = (id, status) =>
  API.patch(`/orders/${id}/status`, { status });
export const updatePaymentStatusApi = (id, paymentStatus) =>
  API.patch(`/orders/${id}/payment`, { paymentStatus });
export const completeOrderApi = (id) => API.patch(`/orders/${id}/complete`);

// =======================
// 🍽️ Tables
// =======================
export const createTable = (data) => API.post("/tables", data);
export const getTables = () => API.get("/tables");

// =======================
// 🚪 Logout
// =======================
export const logout = () => Promise.resolve();
