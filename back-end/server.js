const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_TOKEN = process.env.token;

// Serve static files from the "public" directory
app.use(cors());
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('http://127.0.0.1:1337/api/blogs?populate=*', {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from external API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/blogs/:postId', async (req, res) => {
    try {
      const postId = req.params.postId;
      const response = await axios.get(`http://127.0.0.1:1337/api/blogs/${postId}?populate=*`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`
        }
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching data from external API:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
