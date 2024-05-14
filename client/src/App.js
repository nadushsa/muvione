import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const handleClick = async () => {
    try {
      // Make a POST request to your backend to generate the access token
      const response = await axios.post('http://localhost:5000/generate-token');
      
      // Log the access token to the console
      console.log('Access Token:', response.data.access_token);
      
      // Set the access token in state
      setAccessToken(response.data.access_token);
      
      // Now add the category using the access token
      await addCategory(response.data.access_token);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error generating access token');
    }
  };

  const addCategory = async (accessToken) => {
    try {
      // Make a POST request to add a category using the access token
      const categoryData = {
        category_name: 'Test Category',
        app_token: ':app_token', // Replace with actual app token
        product_key: ':product_key', // Replace with actual product key
        store_key: ':store_key' // Replace with actual store key
      };

      const categoryResponse = await axios.post('http://localhost:5000/add-category', {
        access_token: accessToken,
        categoryData: categoryData
      });

      console.log('Category Response:', categoryResponse.data);

      // Set success message
      setSuccessMessage('Category added successfully');
    } catch (error) {
      console.error('Error adding category:', error);
      setMessage('Error adding category');
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Generate Access Token and Add Category</button>
      {message && <p>{message}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default App;
