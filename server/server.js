// server.js

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors({
    origin: '*',
})); // Enable CORS for all routes

// Endpoint to generate and return access token
app.post('/generate-token', async (req, res) => {
    try {
        // Retrieve app_id and secret_key from environment variables
        const muviAppId = process.env.APP_ID;
        const muviSecretKey = process.env.SECRET_KEY;

        console.log('Request received from:', req.headers.origin); // Debug: Log the origin of the request

        // Make request to Muvi One API to generate access token
        const response = await axios.post('https://apigateway.muvi.com/get-user-token-details', {
            secret_key: muviSecretKey,
            app_id: muviAppId
        });
        
        // Debug: Log the response from Muvi One API
        console.log('Response from Muvi One API:', response.data);

        // Return the generated access token in the response
        res.json({ success: true, access_token: response.data.response.access_token });
    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ error: 'Unable to generate token' });
    }
});

// Endpoint to add a category
app.post('/add-category', async (req, res) => {
    try {
        // Retrieve access token from request body
        const accessToken = req.body.access_token;

        // Retrieve category data from request body
        const categoryData = req.body.categoryData;

        // Make request to Muvi One API to add a category
        const response = await axios.post('https://apigateway.muvi.com/category/add', categoryData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        // Debug: Log the response from Muvi One API
        console.log('Response from Muvi One API (Add Category):', response.data);

        // Return success response
        res.json({ success: true, message: 'Category added successfully' });
    } catch (error) {
        console.error('Error adding category:', error.response.data);
        res.status(500).json({ error: 'Unable to add category' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
