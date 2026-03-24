const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3030;
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://ai-service:5050/chat';

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Forward message to AI service
        const response = await axios.post(AI_SERVICE_URL, { message });
        
        res.json(response.data);
    } catch (error) {
        console.error('Error communicating with AI service:', error.message);
        res.status(500).json({ error: 'Failed to get response from AI service' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
