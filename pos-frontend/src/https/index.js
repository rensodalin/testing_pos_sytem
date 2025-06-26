// Deprecated: No longer used. All backend/API logic has been removed. Use constants and local state only.

// Mocked API functions for UI-only operation
export const login = (data) => Promise.resolve({ data: { data: { _id: 'mock', name: 'Mock User', email: data.email, phone: '0000000000', role: 'admin' }, message: 'Login successful (mock)' } });
export const register = (data) => Promise.resolve({ data: { message: 'Registration successful (mock)' } });
export const getUserData = () => Promise.resolve({ data: { data: { _id: 'mock', name: 'Mock User', email: 'mock@example.com', phone: '0000000000', role: 'admin' } } });
export const logout = () => Promise.resolve({ data: { message: 'Logout successful (mock)' } });
export const addTable = (data) => Promise.resolve({ data: { message: 'Table added (mock)' } });
export const getTables = () => Promise.resolve({ data: { data: [] } });
export const updateTable = ({ tableId, ...tableData }) => Promise.resolve({ data: { message: 'Table updated (mock)' } });
export const createOrderRazorpay = (data) => Promise.resolve({ data: { message: 'Order created (mock)' } });
export const verifyPaymentRazorpay = (data) => Promise.resolve({ data: { message: 'Payment verified (mock)' } });
export const addOrder = (data) => Promise.resolve({ data: { message: 'Order added (mock)' } });
export const getOrders = () => Promise.resolve({ data: { data: [] } });
export const updateOrderStatus = ({ orderId, orderStatus }) => Promise.resolve({ data: { message: 'Order status updated (mock)' } });
