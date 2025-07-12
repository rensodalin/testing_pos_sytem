const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing API endpoints...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing health check...');
    const healthResponse = await axios.get('http://localhost:5000/');
    console.log('✅ Health check:', healthResponse.data.message);

    // Test 2: Order routes test
    console.log('\n2. Testing order routes...');
    const orderTestResponse = await axios.get(`${BASE_URL}/orders/test`);
    console.log('✅ Order routes:', orderTestResponse.data.message);

    // Test 3: Menu routes test
    console.log('\n3. Testing menu routes...');
    const menuTestResponse = await axios.get(`${BASE_URL}/menu/test`);
    console.log('✅ Menu routes:', menuTestResponse.data.message);

    // Test 4: Get categories (should work without auth)
    console.log('\n4. Testing get categories...');
    const categoriesResponse = await axios.get(`${BASE_URL}/menu/categories`);
    console.log('✅ Categories fetched:', categoriesResponse.data.data.length, 'categories');

    // Test 5: Get menu items
    console.log('\n5. Testing get menu items...');
    const itemsResponse = await axios.get(`${BASE_URL}/menu/items`);
    console.log('✅ Menu items fetched:', itemsResponse.data.data.length, 'items');

    // Test 6: Get tables
    console.log('\n6. Testing get tables...');
    const tablesResponse = await axios.get(`${BASE_URL}/tables`);
    console.log('✅ Tables fetched:', tablesResponse.data.length, 'tables');

    console.log('\n🎉 All basic tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testAPI(); 