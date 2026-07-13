const express = require('express');
const router = express.Router();
const { askChatbot, getChatHistory } = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

router.route('/')
  .post(protect, askChatbot)
  .get(protect, getChatHistory);

module.exports = router;
