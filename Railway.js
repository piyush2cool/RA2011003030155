const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Define the base URL of the John Doe Railways API
const johnDoeRailwaysAPI = axios.create({
    baseURL: 'http://20.244.56.144/train/register', 
});

// Authentication data
let authToken = '';

// Register and authenticate if not already done
async function registerAndAuthenticate() {
    if (!authToken) {
        const registrationResponse = await johnDoeRailwaysAPI.post('http://20.244.56.144/train/auth/', {
            companyName: 'Train Central',
            ownerName: 'Rahul',
            ownerEmail: 'rahul@abc.edu',
            rollNo: '1',
            clientSecret: 'XOyo1ORPasKWODAN',
        });

        const authResponse = await johnDoeRailwaysAPI.post('/train/auth', {
            clientID: registrationResponse.data.clientID,
            clientSecret: registrationResponse.data.clientSecret,
        });

        authToken = authResponse.data.access_token;
    }
}

// Fetch train data from the John Doe Railways API using the obtained token
async function fetchTrainData() {
    const response = await johnDoeRailwaysAPI.get('/train/trains', {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });

    return response.data;
}

// Process train data here
async function processTrainData(trainData) {
    // Your processing logic here
    console.log(trainData);
}

app.get('/trains', async (req, res) => {
    await registerAndAuthenticate();
    const trainData = await fetchTrainData();
    await processTrainData(trainData);

    res.json(trainData);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});