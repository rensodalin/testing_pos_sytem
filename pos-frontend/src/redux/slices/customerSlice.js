import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderId: "",
    customerName: "",
    customerPhone: "",
    guests: 0,
    table: null,
    // Customer order history
    orderHistory: [],
    // Delivery preferences
    deliveryAddress: "",
    deliveryInstructions: "",
    // Order tracking
    currentOrder: null,
    orderStatus: "", // "pending", "confirmed", "preparing", "ready", "delivered", "completed"
    estimatedDeliveryTime: null
}

const customerSlice = createSlice({
    name : "customer",
    initialState,
    reducers : {
        setCustomer: (state, action) => {
            const { name, phone, guests } = action.payload;
            state.orderId = `${Date.now()}`;
            state.customerName = name;
            state.customerPhone = phone;
            state.guests = guests;
        },

        removeCustomer: (state) => {
            state.customerName = "";
            state.customerPhone = "";
            state.guests = 0;
            state.table = null;
        },

        updateTable: (state, action) => {
            state.table = action.payload.table;
        },

        setDeliveryInfo: (state, action) => {
            const { address, instructions } = action.payload;
            state.deliveryAddress = address || "";
            state.deliveryInstructions = instructions || "";
        },

        setCurrentOrder: (state, action) => {
            state.currentOrder = action.payload;
            state.orderStatus = action.payload.status || "pending";
            state.estimatedDeliveryTime = action.payload.estimatedTime || null;
        },

        updateOrderStatus: (state, action) => {
            state.orderStatus = action.payload.status;
            if (action.payload.estimatedTime) {
                state.estimatedDeliveryTime = action.payload.estimatedTime;
            }
        },

        addToOrderHistory: (state, action) => {
            state.orderHistory.unshift(action.payload);
        },

        clearCurrentOrder: (state) => {
            state.currentOrder = null;
            state.orderStatus = "";
            state.estimatedDeliveryTime = null;
        }
    }
})

export const { 
    setCustomer, 
    removeCustomer, 
    updateTable, 
    setDeliveryInfo, 
    setCurrentOrder, 
    updateOrderStatus, 
    addToOrderHistory, 
    clearCurrentOrder 
} = customerSlice.actions;
export default customerSlice.reducer;