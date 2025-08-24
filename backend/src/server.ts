import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
const pdfParse = require('pdf-parse');
import { analyzeInsurancePolicy } from './analyzer';
import { createHighlightedPdf } from './pdfHighlighter';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - More permissive CORS for deployment
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (process.env.NODE_ENV === 'production') {
      // In production, allow all Vercel domains
      if (origin.includes('.vercel.app')) {
        return callback(null, true);
      }
      // Also allow your specific domains
      const allowedOrigins = [
        'https://insurance-policy-analyzer.vercel.app',
        'https://insurance-policy-analyzer-git-main-robinttt333.vercel.app',
        'https://insurance-policy-analyzer-robinttt333.vercel.app'
      ];
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    } else {
      // In development, allow localhost
      if (origin.includes('localhost')) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Routes
app.post('/api/analyze', upload.single('policyFile'), async (req, res) => {
  try {
    console.log('Received analysis request');
    
    if (!req.file) {
      console.error('No file uploaded in request');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('File uploaded:', req.file.originalname, 'Size:', req.file.size);
    
    const pdfBuffer = fs.readFileSync(req.file.path);
    console.log('PDF buffer read, size:', pdfBuffer.length);
    
    const pdfData = await pdfParse(pdfBuffer);
    console.log('PDF parsed, text length:', pdfData.text.length);
    
    const policyText = pdfData.text;

    // Analyze the policy text for red flags
    console.log('Starting policy analysis...');
    const analysisResults = analyzeInsurancePolicy(policyText);
    console.log('Analysis complete, red flags found:', analysisResults.redFlags.length);

    let highlightedPdfUrl = null;
    
    // If red flags found, create highlighted PDF
    if (analysisResults.redFlags.length > 0) {
      try {
        const highlightedPath = path.join(__dirname, '../uploads', `highlighted-${req.file.filename}`);
        console.log('Creating highlighted PDF at:', highlightedPath);
        console.log('Red flags found:', analysisResults.redFlags.length);
        
        await createHighlightedPdf(req.file.path, highlightedPath, analysisResults.redFlags);
        
        // Verify the highlighted PDF was created
        if (fs.existsSync(highlightedPath)) {
          highlightedPdfUrl = `/api/highlighted-pdf/${path.basename(highlightedPath)}`;
          console.log('Highlighted PDF created successfully:', highlightedPdfUrl);
        } else {
          console.error('Highlighted PDF file was not created');
        }
      } catch (highlightError) {
        console.error('Error creating highlighted PDF:', highlightError);
        if (highlightError instanceof Error) {
          console.error('Stack trace:', highlightError.stack);
        }
        // Continue without highlighted PDF if there's an error
      }
    }

    // Delete the original uploaded file after processing
    fs.unlinkSync(req.file.path);

    res.json({
      ...analysisResults,
      highlightedPdfUrl
    });
  } catch (error) {
    console.error('Error processing PDF:', error);
    
    let errorMessage = 'Error processing PDF file';
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack trace:', error.stack);
      
      // Provide more specific error messages
      if (error.message.includes('Invalid PDF')) {
        errorMessage = 'The uploaded file appears to be corrupted or not a valid PDF';
      } else if (error.message.includes('password')) {
        errorMessage = 'This PDF is password protected and cannot be analyzed';
      } else if (error.message.includes('encrypted')) {
        errorMessage = 'This PDF is encrypted and cannot be analyzed';
      }
    }
    
    res.status(500).json({ error: errorMessage });
  }
});

// Serve highlighted PDFs
app.get('/api/highlighted-pdf/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);
    
    console.log('PDF requested:', filename);
    console.log('Full file path:', filePath);
    console.log('File exists:', fs.existsSync(filePath));
    
    if (!fs.existsSync(filePath)) {
      console.error('PDF file not found:', filePath);
      return res.status(404).json({ error: 'File not found' });
    }
    
    const stats = fs.statSync(filePath);
    console.log('File size:', stats.size);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Accept-Ranges', 'bytes');
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error serving highlighted PDF:', error);
    res.status(500).json({ error: 'Error serving PDF file' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});