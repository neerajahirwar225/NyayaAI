const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const testPdf = () => {
  const doc = new PDFDocument();
  const filePath = path.join(__dirname, '../test-verification.pdf');
  const stream = fs.createWriteStream(filePath);
  
  doc.pipe(stream);
  doc.fontSize(20).fillColor('#1e1b4b').text('NyayaAI PDF Generation Verification', 100, 100);
  doc.fontSize(12).fillColor('#334155').text('PDFKit configuration and writing are working properly on this platform.', 100, 140);
  doc.end();
  
  stream.on('finish', () => {
    console.log('PDF successfully verified. Saved to:', filePath);
    // Cleanup
    try { fs.unlinkSync(filePath); } catch (e) {}
  });
};

testPdf();
