var express = require('express');
const router = express.Router();
var textToSpeech = require('../helpers/tts');
const {chatGpt}= require('../controllers/chatGpt')


/* GET home page. */
router.post('/talk2', function(req, res, next) {
  textToSpeech(req.body.text, req.body.voice)
  .then(result => {
    res.json(result);    
  })
  .catch(err => {
    res.json({});
  });


});
router.post('/talk', chatGpt)


module.exports = router;
