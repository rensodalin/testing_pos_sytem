import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [
    {
      id: "101",
      customer: "Amrit Raj",
      status: "Ready",
      dateTime: "January 18, 2025 08:32 PM",
      items: 2,
      tableNo: 3,
      total: 250.0,
      orderType: "dine-in", // "dine-in" or "online"
      paymentStatus: "paid", // "paid" or "pending"
      customerId: null,
      orderItems: [
        { id: 1, name: "Cappuccino", price: 120, quantity: 2 },
        { id: 2, name: "Masala Dosa", price: 180, quantity: 1 }
      ]
    },
    {
      id: "102",
      customer: "John Doe",
      status: "In Progress",
      dateTime: "January 18, 2025 08:45 PM",
      items: 2,
      tableNo: 4,
      total: 180.0,
      orderType: "dine-in",
      paymentStatus: "pending",
      customerId: null,
      orderItems: [
        { id: 3, name: "Latte", price: 140, quantity: 1 },
        { id: 4, name: "Samosa", price: 40, quantity: 1 }
      ]
    },
    {
      id: "103",
      customer: "Emma Smith",
      status: "Ready",
      dateTime: "January 18, 2025 09:00 PM",
      items: 1,
      tableNo: 5,
      total: 120.0,
      orderType: "dine-in",
      paymentStatus: "paid",
      customerId: null,
      orderItems: [
        { id: 5, name: "Green Tea", price: 60, quantity: 2 }
      ]
    },
    {
      id: "104",
      customer: "Chris Brown",
      status: "In Progress",
      dateTime: "January 18, 2025 09:15 PM",
      items: 2,
      tableNo: 6,
      total: 220.0,
      orderType: "dine-in",
      paymentStatus: "pending",
      customerId: null,
      orderItems: [
        { id: 6, name: "Cold Coffee", price: 150, quantity: 1 },
        { id: 7, name: "Gulab Jamun", price: 70, quantity: 1 }
      ]
    }
  ],
  recentOrders: []
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        ...action.payload,
        id: `ORD${Date.now()}`,
        dateTime: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        status: action.payload.paymentStatus === "paid" ? "Ready" : "In Progress",
        items: action.payload.items ? action.payload.items.length : 0,
        orderItems: action.payload.items || []
      };
      
      state.orders.unshift(newOrder);
      state.recentOrders.unshift(newOrder);
      
      // Keep only last 10 recent orders
      if (state.recentOrders.length > 10) {
        state.recentOrders = state.recentOrders.slice(0, 10);
      }
    },

    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.status = status;
      }
      
      // Update in recent orders too
      const recentOrder = state.recentOrders.find(o => o.id === orderId);
      if (recentOrder) {
        recentOrder.status = status;
      }
    },

    updatePaymentStatus: (state, action) => {
      const { orderId, paymentStatus } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.paymentStatus = paymentStatus;
        // Update status based on payment
        if (paymentStatus === "paid" && order.status === "In Progress") {
          order.status = "Ready";
        }
      }
      
      // Update in recent orders too
      const recentOrder = state.recentOrders.find(o => o.id === orderId);
      if (recentOrder) {
        recentOrder.paymentStatus = paymentStatus;
        if (paymentStatus === "paid" && recentOrder.status === "In Progress") {
          recentOrder.status = "Ready";
        }
      }
    },

    completeOrder: (state, action) => {
      const { orderId } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.status = "Completed";
      }
      
      // Update in recent orders too
      const recentOrder = state.recentOrders.find(o => o.id === orderId);
      if (recentOrder) {
        recentOrder.status = "Completed";
      }
    },

    removeOrder: (state, action) => {
      const orderId = action.payload;
      state.orders = state.orders.filter(o => o.id !== orderId);
      state.recentOrders = state.recentOrders.filter(o => o.id !== orderId);
    },

    clearRecentOrders: (state) => {
      state.recentOrders = [];
    }
  }
});

export const { 
  addOrder, 
  updateOrderStatus, 
  updatePaymentStatus, 
  completeOrder, 
  removeOrder, 
  clearRecentOrders 
} = ordersSlice.actions;

// Selectors
export const selectAllOrders = (state) => state.orders.orders;
export const selectRecentOrders = (state) => state.orders.orders.slice(0, 5); // Get the 5 most recent orders
export const selectOrdersByStatus = (state, status) => 
  state.orders.orders.filter(order => status === "all" || order.status === status);
export const selectOrdersByPaymentStatus = (state, paymentStatus) => 
  state.orders.orders.filter(order => order.paymentStatus === paymentStatus);

export default ordersSlice.reducer; 