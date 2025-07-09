const axios = require('axios');

async function testMembersEndpoint() {
  try {
    console.log('🧪 Testing members endpoint...');
    
    // Test GET request
    console.log('📝 Testing GET /api/members...');
    const getResponse = await axios.get('http://localhost:5000/api/members');
    console.log('✅ GET Success:', getResponse.data);
    
    // Test POST request
    console.log('📝 Testing POST /api/members...');
    const postData = {
      fullName: 'Test User',
      email: 'test@example.com',
      phone: '123-456-7890',
      age: '25',
      membershipPlan: 'basic'
    };
    
    const postResponse = await axios.post('http://localhost:5000/api/members', postData);
    console.log('✅ POST Success:', postResponse.data);
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testMembersEndpoint();
