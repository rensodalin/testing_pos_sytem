# Customer Initials Feature

## Overview
The POS system now displays customer initials on table cards when a table is booked. This helps staff quickly identify which customer is seated at each table.

## How It Works

### 1. Order Creation
When a new dine-in order is created:
- The system extracts the customer's name from the order
- Generates initials using the `getInitials()` function:
  - Single name: First letter (e.g., "TRI" → "T")
  - Full name: First letter of first and last name (e.g., "John Doe" → "JD")
- Updates the table's `initial` field with the generated initials
- Sets the table status to "Booked"

### 2. Table Display
The `TableCard` component displays:
- The generated initials in a colored avatar circle
- Table status (Available/Booked)
- Number of seats

### 3. Order Completion
When an order is completed:
- The table status is reset to "Available"
- The `initial` field is cleared (set to "-")
- The table becomes available for new customers

## Implementation Details

### Backend Changes
1. **Order Controller** (`pos-backend/controllers/orderController.js`):
   - `createOrder()`: Sets table initial when order is created
   - `updateOrderStatus()`: Resets table when order status is "completed"
   - `completeOrder()`: Dedicated endpoint for completing orders
   - `deleteOrder()`: Resets table when order is deleted

2. **Helper Function**:
   ```javascript
   const getInitials = (name) => {
     const parts = name.trim().split(" ");
     if (parts.length === 1) return parts[0][0].toUpperCase();
     return (parts[0][0] + parts[1][0]).toUpperCase();
   };
   ```

### Frontend Changes
1. **Redux Slice** (`pos-frontend/src/redux/slices/ordersSlice.js`):
   - Added async thunks for API calls
   - `updateOrderStatusAsync`
   - `updatePaymentStatusAsync`
   - `completeOrderAsync`

2. **Order Actions** (`pos-frontend/src/components/orders/OrderActions.jsx`):
   - Updated to use async thunks
   - Proper error handling for API calls

## API Endpoints

### Create Order
```
POST /api/orders
```
- Automatically sets table initial when `orderType` is "dine-in"

### Complete Order
```
PATCH /api/orders/:id/complete
```
- Sets order status to "completed"
- Resets table status to "Available"
- Clears table initial

### Update Order Status
```
PUT /api/orders/:id/status
```
- Updates order status
- If status is "completed", resets table

## Testing

Run the test script to verify functionality:
```bash
cd pos-backend
node test-customer-initials.js
```

This will test:
1. Creating orders with different customer names
2. Verifying initials are set correctly
3. Completing orders and verifying table reset

## Example Usage

1. **Create order for "TRI" on table 11**:
   - Table 11 shows "T" as initial
   - Table status becomes "Booked"

2. **Create order for "John Doe" on table 12**:
   - Table 12 shows "JD" as initial
   - Table status becomes "Booked"

3. **Complete order for table 11**:
   - Table 11 status becomes "Available"
   - Initial is cleared (shows "-")

## Notes

- The feature only works for dine-in orders (`orderType: "dine-in"`)
- Table initials are automatically generated from customer names
- Tables are automatically reset when orders are completed or deleted
- The system handles edge cases (empty names, single names, multiple words) 