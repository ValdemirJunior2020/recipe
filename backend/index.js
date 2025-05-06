const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/gemini', async (req, res) => {
  const { prompt } = req.body;

  try {
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `${prompt}\nMake sure to give a different recipe each time, and vary the region or country.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 1.2, // higher = more variety
          topK: 40,
          topP: 0.95
        }
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    res.json(geminiRes.data);
  } catch (err) {
    console.error('Gemini backend error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch from Gemini' });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('✅ Gemini backend is running');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
