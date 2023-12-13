const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/v1/flights', async (req, res) => {
  try {
    const apiKey = '217d11f1a4e54bf1025ae92176192a45';
    const apiUrl = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}`;
    
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching flight data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
