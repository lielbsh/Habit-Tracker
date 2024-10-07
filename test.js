const axios = require('axios');

const API_URL = 'http://localhost:3000';

const testRegister = async () => {
  try {
    // 1. Register a new user
    console.log('Registering a new user...');
    const registerResponse = await axios.post(`${API_URL}/auth/register`, {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'TestPassword123!',
    });
    console.log('Register Response:', registerResponse.data);

  } catch (error) {
    if (error.response) {
      console.error('Error Response:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
};


const testLogin = async () => {
    try {
        // 2. Login with the new user
        console.log('Logging in...');
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        email: 'testuser@example.com',
        password: 'TestPassword123!',
        });
        console.log('Login Response:', loginResponse.data);
    
        const token = loginResponse.data.token;

        // 3. Fetch User Profile
        console.log('Fetching user profile...');
        const profileResponse = await axios.get(`${API_URL}/users/me`, 
        {userId: '6702b0bf677a1ee0eb45742b'},  
        {  
        headers: {
            'x-auth-token': token, // Include the token in the request header
        },
        });
        console.log('Profile Response:', profileResponse.data);

    } catch (error) {
        if (error.response) {
            console.error('Error Response:', error.response.data);
          } else {
            console.error('Error:', error.message);
          }
    }
}

// testLogin()


