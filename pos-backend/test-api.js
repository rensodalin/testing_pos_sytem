const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '1234567890',
  password: 'test123',
  role: 'staff'
};

const testOrder = {
  customerName: 'John Doe',
  customerPhone: '9876543210',
  tableId: 1,
  tableNo: '1',
  guests: 2,
  orderType: 'dine-in',
  items: [
    {
      menuItemId: 1,
      quantity: 2,
      notes: 'Extra hot'
    },
    {
      menuItemId: 3,
      quantity: 1
    }
  ],
  paymentMethod: 'cash',
  paymentStatus: 'paid'
};

let authToken = '';

// Test functions
async function testHealthCheck() {
  try {
    console.log('🏥 Testing health check...');
    const response = await axios.get('http://localhost:5000/');
    console.log('✅ Health check passed:', response.data.message);
    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
}

async function testMenuEndpoints() {
  try {
    console.log('\n🍽️ Testing menu endpoints...');
    
    // Test get categories
    const categoriesResponse = await axios.get(`${BASE_URL}/menu/categories`);
    console.log('✅ Categories fetched:', categoriesResponse.data.data.length, 'categories');
    
    // Test get menu items
    const itemsResponse = await axios.get(`${BASE_URL}/menu/items`);
    console.log('✅ Menu items fetched:', itemsResponse.data.data.length, 'items');
    
    // Test get popular items
    const popularResponse = await axios.get(`${BASE_URL}/menu/items/popular`);
    console.log('✅ Popular items fetched:', popularResponse.data.data.length, 'items');
    
    return true;
  } catch (error) {
    console.error('❌ Menu endpoints failed:', error.message);
    return false;
  }
}

async function testTableEndpoints() {
  try {
    console.log('\n🪑 Testing table endpoints...');
    
    const tablesResponse = await axios.get(`${BASE_URL}/tables`);
    console.log('✅ Tables fetched:', tablesResponse.data.length, 'tables');
    
    return true;
  } catch (error) {
    console.error('❌ Table endpoints failed:', error.message);
    return false;
  }
}

async function testAuthEndpoints() {
  try {
    console.log('\n🔐 Testing authentication endpoints...');
    
    // Test staff login
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@cafio.com',
      password: 'admin123'
    });
    
    authToken = loginResponse.data.token;
    console.log('✅ Staff login successful');
    
    return true;
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
    return false;
  }
}

async function testOrderEndpoints() {
  try {
    console.log('\n📋 Testing order endpoints...');
    
    if (!authToken) {
      console.log('⚠️ Skipping order tests - no auth token');
      return false;
    }
    
    // Test create order
    const createOrderResponse = await axios.post(`${BASE_URL}/orders`, testOrder, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Order created:', createOrderResponse.data.data.orderNumber);
    
    // Test get orders
    const ordersResponse = await axios.get(`${BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Orders fetched:', ordersResponse.data.data.length, 'orders');
    
    // Test get recent orders
    const recentResponse = await axios.get(`${BASE_URL}/orders/recent`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Recent orders fetched:', recentResponse.data.data.length, 'orders');
    
    return true;
  } catch (error) {
    console.error('❌ Order endpoints failed:', error.message);
    return false;
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting API tests...\n');
  
  const tests = [
    { name: 'Health Check', fn: testHealthCheck },
    { name: 'Menu Endpoints', fn: testMenuEndpoints },
    { name: 'Table Endpoints', fn: testTableEndpoints },
    { name: 'Auth Endpoints', fn: testAuthEndpoints },
    { name: 'Order Endpoints', fn: testOrderEndpoints }
  ];
  
  let passed = 0;
  let total = tests.length;
  
  for (const test of tests) {
    const result = await test.fn();
    if (result) passed++;
  }
  
  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}/${total}`);
  console.log(`❌ Failed: ${total - passed}/${total}`);
  
  if (passed === total) {
    console.log('\n🎉 All tests passed! API is working correctly.');
  } else {
    console.log('\n⚠️ Some tests failed. Please check the server and database connection.');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests }; 