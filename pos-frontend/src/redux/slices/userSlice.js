import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    name: "",
    email : "",
    phone: "",
    role: "", // "admin", "customer", "waiter", "cashier"
    isAuth: false,
    // Customer specific fields
    address: "",
    preferences: [],
    loyaltyPoints: 0,
    isCustomer: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { _id, name, phone, email, role, address, preferences, loyaltyPoints } = action.payload;
            state._id = _id;
            state.name = name;
            state.phone = phone;
            state.email = email;
            state.role = role;
            state.isAuth = true;
            state.isCustomer = role === "customer";
            state.address = address || "";
            state.preferences = preferences || [];
            state.loyaltyPoints = loyaltyPoints || 0;
            
            // Save to localStorage
            localStorage.setItem('cafio_user', JSON.stringify({
                _id, name, phone, email, role, address, preferences, loyaltyPoints,
                isCustomer: role === "customer"
            }));
        },

        removeUser: (state) => {
            state._id = "";
            state.email = "";
            state.name = "";
            state.phone = "";
            state.role = "";
            state.isAuth = false;
            state.isCustomer = false;
            state.address = "";
            state.preferences = [];
            state.loyaltyPoints = 0;
            
            // Remove from localStorage
            localStorage.removeItem('cafio_user');
        },

        updateCustomerProfile: (state, action) => {
            const { name, phone, address, preferences } = action.payload;
            if (name) state.name = name;
            if (phone) state.phone = phone;
            if (address) state.address = address;
            if (preferences) state.preferences = preferences;
            
            // Update localStorage
            const updatedUser = {
                _id: state._id,
                name: state.name,
                phone: state.phone,
                email: state.email,
                role: state.role,
                address: state.address,
                preferences: state.preferences,
                loyaltyPoints: state.loyaltyPoints,
                isCustomer: state.isCustomer
            };
            localStorage.setItem('cafio_user', JSON.stringify(updatedUser));
        },

        addLoyaltyPoints: (state, action) => {
            state.loyaltyPoints += action.payload;
            
            // Update localStorage
            const updatedUser = {
                _id: state._id,
                name: state.name,
                phone: state.phone,
                email: state.email,
                role: state.role,
                address: state.address,
                preferences: state.preferences,
                loyaltyPoints: state.loyaltyPoints,
                isCustomer: state.isCustomer
            };
            localStorage.setItem('cafio_user', JSON.stringify(updatedUser));
        }
    }
})

export const { setUser, removeUser, updateCustomerProfile, addLoyaltyPoints } = userSlice.actions;
export default userSlice.reducer;