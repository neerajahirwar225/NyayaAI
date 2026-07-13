const express = require('express');
const router = express.Router();
const { generateDocument, getGeneratedDocuments, analyzeDocument, getUploadedFiles } = require('../controllers/docController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/generate', protect, generateDocument);
router.get('/', protect, getGeneratedDocuments);
router.post('/analyze', protect, upload.single('file'), analyzeDocument);
router.get('/uploads', protect, getUploadedFiles);

module.exports = router;
