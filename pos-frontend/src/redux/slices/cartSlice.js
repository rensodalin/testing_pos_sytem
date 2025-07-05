import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addItems : (state, action) => {
            const newItem = action.payload;
            const existingItem = state.find(item => item.id === newItem.id);
            
            if (existingItem) {
                existingItem.quantity += newItem.quantity || 1;
            } else {
                state.push({
                    ...newItem,
                    quantity: newItem.quantity || 1
                });
            }
        },

        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.find(item => item.id === newItem.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push({
                    ...newItem,
                    quantity: 1
                });
            }
        },

        removeItem: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },

        removeAllItems: (state) => {
            return [];
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.find(item => item.id === id);
            if (item) {
                if (quantity <= 0) {
                    return state.filter(item => item.id !== id);
                } else {
                    item.quantity = quantity;
                }
            }
        }
    }
})

export const getTotalPrice = (state) => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
export const getTotalItems = (state) => state.cart.reduce((total, item) => total + item.quantity, 0);
export const { addItems, addItem, removeItem, removeAllItems, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;