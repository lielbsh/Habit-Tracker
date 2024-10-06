const axios = require('axios');

const API_URL = 'http://localhost:3000';

const test = async () => {
  try {
    // 1. Register a new user
    console.log('Registering a new user...');
    const registerResponse = await axios.post(`${API_URL}/auth/register`, {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'TestPassword123!',
    });
    console.log('Register Response:', registerResponse.data);

    // 2. Login with the new user
    console.log('Logging in...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'testuser@example.com',
      password: 'TestPassword123!',
    });
    console.log('Login Response:', loginResponse.data);

    const token = loginResponse.data.token;
;

  } catch (error) {
    if (error.response) {
      console.error('Error Response:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
};

test();
