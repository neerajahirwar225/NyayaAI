const mongoose = require('mongoose');

const UploadedFileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  analysis: {
    explanation: { type: String },
    risks: [{ type: String }],
    penalties: [{ type: String }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UploadedFile', UploadedFileSchema);
