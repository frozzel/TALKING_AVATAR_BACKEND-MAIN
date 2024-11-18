const axios = require('axios');
var textToSpeech = require('../helpers/tts');

////////// ChatGPT API //////////

const apiKey = process.env.OPENAI_API_KEY;
const chatGPTApiUrl = 'https://api.openai.com/v1/chat/completions';


exports.chatGpt = async (req, res) => {
    
    // try {
        const userMessage  = req.body.text;
        console.log(userMessage)
        if (!userMessage) {
          return res.status(400).json({ error: 'User message is required.' });
        }
    
        const response = await axios.post(
          chatGPTApiUrl,
          {
            model: 'gpt-4o',
            messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              { role: 'user', content: userMessage },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
          }
        );
          
        const reply = response.data.choices[0].message.content;
        textToSpeech(reply, req.body.voice)
        .then(result => {
            res.json(result)

        })
        .catch(err =>{
            res.json({})
        })

};