const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testCustomerInitials() {
  try {
    console.log('🧪 Testing Customer Initials Functionality...\n');

    // 1. First, let's get all tables to see current state
    console.log('1. Getting current tables...');
    const tablesResponse = await axios.get(`${API_BASE}/tables`);
    console.log('Current tables:', tablesResponse.data);
    console.log('');

    // 2. Create an order with customer name "TRI" for table 11
    console.log('2. Creating order for customer "TRI" on table 11...');
    const orderData = {
      customerName: "TRI",
      customerPhone: "+91-9999999999",
      guests: 2,
      tableId: 11, // Assuming table 11 exists
      tableNo: 11,
      orderType: "dine-in",
      items: [],
      paymentMethod: "cash",
      paymentStatus: "pending"
    };

    const orderResponse = await axios.post(`${API_BASE}/orders`, orderData);
    console.log('Order created:', orderResponse.data);
    console.log('');

    // 3. Check if table 11 now shows "T" as initial
    console.log('3. Checking if table 11 now shows "T" as initial...');
    const updatedTablesResponse = await axios.get(`${API_BASE}/tables`);
    const table11 = updatedTablesResponse.data.find(t => t.tableNo === 11);
    console.log('Table 11 after order creation:', table11);
    console.log('');

    if (table11 && table11.initial === 'T') {
      console.log('✅ SUCCESS: Table 11 shows "T" as initial for customer "TRI"');
    } else {
      console.log('❌ FAILED: Table 11 does not show correct initial');
    }

    // 4. Test with another customer name "John Doe"
    console.log('\n4. Testing with customer "John Doe"...');
    const orderData2 = {
      customerName: "John Doe",
      customerPhone: "+91-8888888888",
      guests: 3,
      tableId: 12, // Assuming table 12 exists
      tableNo: 12,
      orderType: "dine-in",
      items: [],
      paymentMethod: "cash",
      paymentStatus: "pending"
    };

    const orderResponse2 = await axios.post(`${API_BASE}/orders`, orderData2);
    console.log('Order created for John Doe:', orderResponse2.data);
    console.log('');

    // 5. Check if table 12 shows "JD" as initial
    console.log('5. Checking if table 12 shows "JD" as initial...');
    const tablesAfterSecondOrder = await axios.get(`${API_BASE}/tables`);
    const table12 = tablesAfterSecondOrder.data.find(t => t.tableNo === 12);
    console.log('Table 12 after order creation:', table12);
    console.log('');

    if (table12 && table12.initial === 'JD') {
      console.log('✅ SUCCESS: Table 12 shows "JD" as initial for customer "John Doe"');
    } else {
      console.log('❌ FAILED: Table 12 does not show correct initial');
    }

    // 6. Test completing an order to reset table
    console.log('\n6. Testing order completion to reset table...');
    const orderId = orderResponse.data.data.id;
    await axios.patch(`${API_BASE}/orders/${orderId}/complete`);
    console.log('Order completed');
    console.log('');

    // 7. Check if table 11 is reset to available
    console.log('7. Checking if table 11 is reset to available...');
    const tablesAfterCompletion = await axios.get(`${API_BASE}/tables`);
    const table11AfterCompletion = tablesAfterCompletion.data.find(t => t.tableNo === 11);
    console.log('Table 11 after order completion:', table11AfterCompletion);
    console.log('');

    if (table11AfterCompletion && table11AfterCompletion.status === 'Available' && table11AfterCompletion.initial === '-') {
      console.log('✅ SUCCESS: Table 11 is reset to available with no initial');
    } else {
      console.log('❌ FAILED: Table 11 is not reset correctly');
    }

    console.log('\n🎉 Customer Initials Test Completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the test
testCustomerInitials(); 