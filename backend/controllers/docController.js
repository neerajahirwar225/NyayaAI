const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const Tesseract = require('tesseract.js');
const GeneratedDocument = require('../models/GeneratedDocument');
const UploadedFile = require('../models/UploadedFile');
const { getModel } = require('../config/gemini');

// Ensure output directories exist
const generatedDocsDir = path.join(__dirname, '../generated_docs');
if (!fs.existsSync(generatedDocsDir)) {
  fs.mkdirSync(generatedDocsDir, { recursive: true });
}

// Helper to generate PDFs using PDFKit
const createPDF = (docType, data, filename) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const filePath = path.join(generatedDocsDir, filename);
      const writeStream = fs.createWriteStream(filePath);

      doc.pipe(writeStream);

      // Styles & Header
      doc.fillColor('#1e1b4b').fontSize(24).text('NYAYAAI LEGAL DOCUMENT ASSISTANT', { align: 'center' });
      doc.moveDown(0.2);
      doc.fillColor('#4338ca').fontSize(10).text('AUTO-GENERATED LEGAL TEMPLATE (INDIAN LAW)', { align: 'center' });
      doc.moveDown(0.5);
      doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(50, doc.y).lineTo(562, doc.y).stroke();
      doc.moveDown(1.5);

      // Title
      doc.fillColor('#0f172a').fontSize(18).text(docType.toUpperCase(), { align: 'center', underline: true });
      doc.moveDown(1.5);

      // Content based on docType
      doc.fillColor('#334155').fontSize(11).lineGap(6);

      if (docType === 'Rent Agreement') {
        doc.text(`This DEED OF RENT AGREEMENT is made and executed on this date: ${data.date || new Date().toLocaleDateString()}, by and between:`);
        doc.moveDown(0.8);
        doc.fillColor('#0f172a').text(`LANDLORD (First Party):`, { underline: true });
        doc.fillColor('#334155').text(`Name: ${data.landlordName}\nAddress: ${data.landlordAddress}`);
        doc.moveDown(0.8);
        doc.fillColor('#0f172a').text(`TENANT (Second Party):`, { underline: true });
        doc.fillColor('#334155').text(`Name: ${data.tenantName}\nAddress: ${data.tenantAddress}`);
        doc.moveDown(1);
        doc.fillColor('#0f172a').text(`WHEREAS:`, { bold: true });
        doc.fillColor('#334155').text(`1. The Landlord is the absolute owner of the property situated at: ${data.propertyAddress}.`);
        doc.text(`2. The Tenant has requested the Landlord to let out the said premises for residential/commercial purposes for a period of ${data.duration || '11'} months, starting from ${data.startDate || 'today'}.`);
        doc.text(`3. The Tenant has agreed to pay a monthly rent of Rs. ${data.rentAmount}/- and security deposit of Rs. ${data.securityDeposit}/-.`);
        doc.moveDown(1.5);
        doc.text(`IN WITNESS WHEREOF, both parties have set their signatures on this document:`);
        doc.moveDown(3);
        doc.text(`_______________________                     _______________________`, { align: 'left' });
        doc.text(`LANDLORD SIGNATURE                          TENANT SIGNATURE`, { align: 'left' });

      } else if (docType === 'Non-Disclosure Agreement (NDA)') {
        doc.text(`This NON-DISCLOSURE AGREEMENT is entered into on ${data.date || new Date().toLocaleDateString()} between:`);
        doc.moveDown(0.8);
        doc.fillColor('#0f172a').text(`DISCLOSING PARTY:`, { underline: true });
        doc.fillColor('#334155').text(`Company/Name: ${data.disclosingParty}\nRepresentative: ${data.disclosingRep || 'N/A'}`);
        doc.moveDown(0.8);
        doc.fillColor('#0f172a').text(`RECEIVING PARTY:`, { underline: true });
        doc.fillColor('#334155').text(`Company/Name: ${data.receivingParty}\nRepresentative: ${data.receivingRep || 'N/A'}`);
        doc.moveDown(1);
        doc.fillColor('#0f172a').text(`1. PURPOSE:`, { bold: true });
        doc.fillColor('#334155').text(`The parties wish to explore a business opportunity concerning: ${data.purpose}. In connection with this, the Disclosing Party may disclose proprietary, confidential information to the Receiving Party.`);
        doc.moveDown(0.5);
        doc.fillColor('#0f172a').text(`2. CONFIDENTIAL INFORMATION:`, { bold: true });
        doc.fillColor('#334155').text(`Confidential Information shall include all information or material that has or could have commercial value in the business in which Disclosing Party is engaged.`);
        doc.moveDown(0.5);
        doc.fillColor('#0f172a').text(`3. TERM:`, { bold: true });
        doc.fillColor('#334155').text(`The obligations of confidentiality under this Agreement shall survive for a period of ${data.term || '2'} years from the date of disclosure.`);
        doc.moveDown(2);
        doc.text(`_______________________                     _______________________`, { align: 'left' });
        doc.text(`DISCLOSING PARTY                            RECEIVING PARTY`, { align: 'left' });

      } else if (docType === 'Affidavit') {
        doc.text(`I, ${data.deponentName}, ${data.relationType || 'S/o, D/o'} ${data.relativeName}, aged about ${data.age || 'N/A'} years, resident of ${data.deponentAddress}, do hereby solemnly affirm and state on oath as follows:`);
        doc.moveDown(1);
        const statements = data.statements ? data.statements.split('\n') : ['1. That the facts stated herein are true to the best of my knowledge and belief.'];
        statements.forEach((stmt, idx) => {
          if (stmt.trim()) {
            doc.text(`${stmt.startsWith(idx+1) ? '' : (idx + 1) + '. '}${stmt.trim()}`);
            doc.moveDown(0.4);
          }
        });
        doc.moveDown(1.5);
        doc.fillColor('#0f172a').text(`DEPONENT`, { align: 'right' });
        doc.moveDown(1.5);
        doc.fillColor('#334155').text(`VERIFICATION:`, { underline: true });
        doc.text(`Verified at ${data.place || 'Delhi'} on this ${data.date || new Date().toLocaleDateString()} that the contents of this affidavit are true and correct, and nothing material has been concealed therefrom.`);
        doc.moveDown(2);
        doc.fillColor('#0f172a').text(`DEPONENT`, { align: 'right' });

      } else if (docType === 'Legal Notice') {
        doc.text(`Date: ${data.date || new Date().toLocaleDateString()}`);
        doc.text(`To,`);
        doc.text(`${data.recipientName}\n${data.recipientAddress}`);
        doc.moveDown(1);
        doc.fillColor('#0f172a').text(`SUBJECT: LEGAL NOTICE FOR ${data.subject.toUpperCase()}`);
        doc.moveDown(1);
        doc.fillColor('#334155').text(`Under instruction from my client ${data.clientName}, resident of ${data.clientAddress}, I hereby serve you with the following legal notice:`);
        doc.moveDown(0.8);
        doc.text(`1. That my client has the following claim/grievance: ${data.grievanceDetails}.`);
        doc.text(`2. That you are hereby called upon to pay/perform: ${data.demands} within a period of ${data.daysLimit || '15'} days of receipt of this notice.`);
        doc.text(`3. If you fail to comply, my client will be constrained to initiate appropriate civil and criminal legal proceedings against you in a court of competent jurisdiction.`);
        doc.moveDown(2);
        doc.fillColor('#0f172a').text(`Yours faithfully,`, { align: 'left' });
        doc.moveDown(0.5);
        doc.text(`${data.advocateName || 'Advocate'}\nOffice: ${data.advocateAddress || 'N/A'}`);

      } else if (docType === 'Consumer Complaint') {
        doc.text(`BEFORE THE DISTRICT CONSUMER DISPUTES REDRESSAL COMMISSION, AT: ${data.district || 'District Forum'}`);
        doc.moveDown(1);
        doc.text(`In the Matter of:`);
        doc.fillColor('#0f172a').text(`${data.complainantName}\n${data.complainantAddress}`);
        doc.fillColor('#334155').text(`...Complainant`);
        doc.moveDown(0.5);
        doc.text(`VERSUS`);
        doc.moveDown(0.5);
        doc.fillColor('#0f172a').text(`${data.oppositePartyName}\n${data.oppositePartyAddress}`);
        doc.fillColor('#334155').text(`...Opposite Party`);
        doc.moveDown(1);
        doc.fillColor('#0f172a').text(`COMPLAINT UNDER SECTION 35 OF THE CONSUMER PROTECTION ACT, 2019`, { underline: true });
        doc.moveDown(1);
        doc.fillColor('#334155').text(`Most Respectfully Showeth:`);
        doc.text(`1. That the Complainant purchased ${data.productName} on ${data.purchaseDate || 'N/A'} for Rs. ${data.amountPaid}/-.`);
        doc.text(`2. That the said product/service is defective/deficient in the following manner: ${data.defectDetails}.`);
        doc.text(`3. That the Complainant approached the Opposite Party multiple times, but they refused to resolve the grievance, causing mental agony and financial loss.`);
        doc.moveDown(0.8);
        doc.fillColor('#0f172a').text(`PRAYER:`, { underline: true });
        doc.fillColor('#334155').text(`It is prayed that this Hon'ble Commission may be pleased to direct the Opposite Party to:`);
        doc.text(`a) Refund the purchase amount of Rs. ${data.amountPaid}/- along with interest.`);
        doc.text(`b) Pay compensation of Rs. ${data.compensationAmount || '10,000'}/- for mental harassment.`);
        doc.text(`c) Pass any other order as deemed fit.`);
        doc.moveDown(2);
        doc.text(`_______________________`, { align: 'right' });
        doc.text(`COMPLAINANT`, { align: 'right' });

      } else if (docType === 'FIR Draft') {
        doc.text(`To,`);
        doc.text(`The Officer-in-Charge,\nPolice Station: ${data.policeStation}\nDistrict: ${data.district || 'N/A'}`);
        doc.moveDown(1);
        doc.fillColor('#0f172a').text(`SUBJECT: APPLICATION FOR FILING FIR REGARDING ${data.incidentType.toUpperCase()}`);
        doc.moveDown(1);
        doc.fillColor('#334155').text(`Respected Sir/Madam,`);
        doc.text(`I, ${data.complainantName}, residing at ${data.complainantAddress}, wish to report a cognizable offense as detailed below:`);
        doc.moveDown(0.8);
        doc.text(`1. Date and Time of Incident: ${data.incidentDateTime || 'N/A'}`);
        doc.text(`2. Location of Incident: ${data.incidentLocation}`);
        doc.text(`3. Details of Accused (if known): ${data.accusedDetails || 'Unknown'}`);
        doc.text(`4. Description of Incident: ${data.incidentDescription}`);
        doc.moveDown(0.8);
        doc.text(`Please register an FIR under relevant sections of the Indian Penal Code / Bhartiya Nyaya Sanhita and initiate an investigation at the earliest.`);
        doc.moveDown(2);
        doc.text(`Yours sincerely,`, { align: 'left' });
        doc.moveDown(0.5);
        doc.text(`${data.complainantName}\nMobile: ${data.complainantPhone || 'N/A'}`);
      }

      // Legal Disclaimer
      doc.moveDown(2);
      doc.strokeColor('#e2e8f0').lineWidth(0.5).moveTo(50, doc.y).lineTo(562, doc.y).stroke();
      doc.moveDown(0.5);
      doc.fillColor('#94a3b8').fontSize(8).text('Disclaimer: This document is an AI-generated draft template prepared by NyayaAI. It does not constitute formal legal counsel. Users should verify details and consult a registered legal practitioner before executing the document.', { align: 'center' });

      doc.end();
      writeStream.on('finish', () => {
        resolve(filePath);
      });
      writeStream.on('error', (err) => {
        reject(err);
      });
    } catch (err) {
      reject(err);
    }
  });
};

// @desc    Generate legal document PDF
// @route   POST /api/docs/generate
// @access  Private
const generateDocument = async (req, res) => {
  try {
    const { type, content } = req.body;
    if (!type || !content) {
      return res.status(400).json({ success: false, message: 'Please provide document type and contents' });
    }

    const docSafeName = type.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const filename = `${docSafeName}-${req.user.id}-${Date.now()}.pdf`;

    await createPDF(type, content, filename);

    // Store in DB
    const docRecord = await GeneratedDocument.create({
      userId: req.user.id,
      type,
      content,
      pdfUrl: `/generated_docs/${filename}`
    });

    return res.status(201).json({
      success: true,
      data: docRecord
    });
  } catch (error) {
    console.error('Document Generation Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to generate document', error: error.message });
  }
};

// @desc    Get user's generated documents
// @route   GET /api/docs
// @access  Private
const getGeneratedDocuments = async (req, res) => {
  try {
    const docs = await GeneratedDocument.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.json({
      success: true,
      data: docs
    });
  } catch (error) {
    console.error('Fetch Documents Error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving documents' });
  }
};

// Helper to extract text from buffer (mock PDF reader/character scanner)
const extractPDFText = (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    // Standard basic extraction to grab printable text inside PDF
    let text = '';
    const bufferString = dataBuffer.toString('utf-8');
    
    // Attempting a simple text extraction of BT/ET objects or ASCII strings
    const matches = bufferString.match(/\(([^)]+)\)/g);
    if (matches && matches.length > 5) {
      text = matches.map(m => m.slice(1, -1)).join(' ');
    }
    
    // If text extraction yielded nothing, return a fallback message or file properties
    if (text.length < 50) {
      text = `PDF File uploaded: ${path.basename(filePath)}. Raw PDF file containing vector or scanned images. Metadata Size: ${dataBuffer.length} bytes.`;
    }
    return text.slice(0, 10000); // Limit size
  } catch (error) {
    console.error('PDF text extraction error:', error);
    return 'Failed to extract text from PDF file.';
  }
};

// @desc    Analyze uploaded document (OCR & Gemini analysis)
// @route   POST /api/docs/analyze
// @access  Private
const analyzeDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a PDF, JPG, or PNG file' });
    }

    const filePath = req.file.path;
    const isPDF = req.file.mimetype === 'application/pdf';
    let extractedText = '';

    // Step 1: Text extraction / OCR
    if (isPDF) {
      extractedText = extractPDFText(filePath);
    } else {
      // Image OCR using Tesseract.js
      try {
        const ocrResult = await Tesseract.recognize(filePath, 'eng+hin', {
          logger: m => console.log('OCR Progress:', m.status, `${Math.round(m.progress * 100)}%`)
        });
        extractedText = ocrResult.data.text;
      } catch (ocrErr) {
        console.error('OCR Processing Error:', ocrErr);
        extractedText = `Image File: ${req.file.originalname}. Failed to parse via OCR, analyzing file parameters directly.`;
      }
    }

    if (!extractedText || extractedText.trim().length === 0) {
      extractedText = 'No text content could be extracted from this document.';
    }

    // Step 2: Use Gemini to analyze text
    let model;
    let analysisResult = {
      explanation: 'Unable to analyze text due to API key configurations.',
      risks: ['Review API key setups'],
      penalties: ['Review API key setups']
    };

    try {
      model = getModel();
      
      const analysisPrompt = `You are a professional legal auditor specializing in Indian Law. Analyze the legal document text provided below.
Provide a thorough legal analysis formatted as JSON. The JSON must follow this schema:
{
  "summary": "A clear, detailed summary of what the document is, who the parties are, and its purpose.",
  "explanation": "A simplified, layperson-friendly explanation of the main clauses and details of the document.",
  "risks": [
    "List specific risky conditions, hidden terms, unequal obligations, or one-sided liability clauses."
  ],
  "penalties": [
    "List specific financial penalties, interest rates, exit fees, or criminal liability warnings mentioned in the document or related to breach of its terms."
  ]
}

Only return the raw JSON object. Do not wrap it in markdown code blocks or add any other text. Here is the document text:
"${extractedText}"`;

      const result = await model.generateContent(analysisPrompt);
      const responseText = result.response.text();
      
      // Clean potential JSON markdown blocks if Gemini wraps it
      const cleanJsonStr = responseText.replace(/```json/i, '').replace(/```/, '').trim();
      
      try {
        const parsed = JSON.parse(cleanJsonStr);
        analysisResult = {
          summary: parsed.summary || 'Summary not resolved.',
          explanation: parsed.explanation || 'Explanation not resolved.',
          risks: parsed.risks || [],
          penalties: parsed.penalties || []
        };
      } catch (jsonErr) {
        console.error('Failed to parse Gemini JSON response:', jsonErr, responseText);
        // Fallback if Gemini doesn't output valid JSON
        analysisResult = {
          summary: 'Failed to parse JSON analysis. Raw response saved.',
          explanation: responseText,
          risks: ['Review raw explanation for potential warnings'],
          penalties: ['Review raw explanation for penalties']
        };
      }
    } catch (geminiErr) {
      console.error('Gemini Analysis Error:', geminiErr);
      analysisResult = {
        summary: `Document uploaded: ${req.file.originalname}. API analysis bypassed.`,
        explanation: 'The Google Gemini API client encountered an error or was not initialized. Here is the raw extracted text:\n\n' + extractedText.slice(0, 500),
        risks: ['Could not run AI risk analysis'],
        penalties: ['Could not run AI penalty checks']
      };
    }

    // Save upload to DB
    const uploadedRecord = await UploadedFile.create({
      userId: req.user.id,
      filename: req.file.originalname,
      summary: analysisResult.summary || 'A legal document uploaded by the user.',
      analysis: {
        explanation: analysisResult.explanation,
        risks: analysisResult.risks,
        penalties: analysisResult.penalties
      }
    });

    // Cleanup local uploaded file to prevent disk clutter
    try {
      fs.unlinkSync(filePath);
    } catch (unlinkErr) {
      console.warn('Failed to delete temp upload file:', filePath, unlinkErr);
    }

    return res.status(201).json({
      success: true,
      data: uploadedRecord
    });

  } catch (error) {
    console.error('Analyze Document Route Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to analyze document', error: error.message });
  }
};

// @desc    Get user's uploaded files analyses
// @route   GET /api/docs/uploads
// @access  Private
const getUploadedFiles = async (req, res) => {
  try {
    const files = await UploadedFile.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.json({
      success: true,
      data: files
    });
  } catch (error) {
    console.error('Fetch Uploads Error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving uploaded file logs' });
  }
};

module.exports = {
  generateDocument,
  getGeneratedDocuments,
  analyzeDocument,
  getUploadedFiles
};
