const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const GeneratedDocument = require('../models/GeneratedDocument');
const UploadedFile = require('../models/UploadedFile');
const { protect } = require('../middleware/auth');

router.get('/stats', protect, async (req, res) => {
  try {
    const userId = req.user.id;

    const chatCount = await Chat.countDocuments({ userId });
    const docCount = await GeneratedDocument.countDocuments({ userId });
    const uploadCount = await UploadedFile.countDocuments({ userId });

    const recentChats = await Chat.find({ userId }).sort({ createdAt: -1 }).limit(5);
    const recentDocs = await GeneratedDocument.find({ userId }).sort({ createdAt: -1 }).limit(5);
    const recentUploads = await UploadedFile.find({ userId }).sort({ createdAt: -1 }).limit(5);

    const activity = [];
    
    recentChats.forEach(c => {
      activity.push({
        id: c._id,
        type: 'chat',
        title: 'Asked AI Chatbot',
        detail: c.question.length > 50 ? `${c.question.slice(0, 50)}...` : c.question,
        createdAt: c.createdAt
      });
    });

    recentDocs.forEach(d => {
      activity.push({
        id: d._id,
        type: 'document',
        title: `Generated ${d.type}`,
        detail: `Saved template`,
        pdfUrl: d.pdfUrl,
        createdAt: d.createdAt
      });
    });

    recentUploads.forEach(u => {
      activity.push({
        id: u._id,
        type: 'upload',
        title: `Analyzed Document`,
        detail: u.filename,
        createdAt: u.createdAt
      });
    });

    activity.sort((a, b) => b.createdAt - a.createdAt);
    const recentActivity = activity.slice(0, 7);

    const chartData = {
      labels: ['AI Chats', 'Generated Documents', 'Uploaded Files'],
      data: [chatCount, docCount, uploadCount]
    };

    return res.json({
      success: true,
      stats: {
        totalChats: chatCount,
        totalDocs: docCount,
        totalUploads: uploadCount
      },
      recentActivity,
      chartData
    });

  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving dashboard analytics' });
  }
});

module.exports = router;
