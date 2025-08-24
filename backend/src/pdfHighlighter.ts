import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';
import { RedFlag, TextMatch } from './analyzer';

export async function highlightPdfRedFlags(
  pdfPath: string,
  redFlags: RedFlag[]
): Promise<Buffer> {
  try {
    console.log('Reading PDF from:', pdfPath);
    const pdfBuffer = fs.readFileSync(pdfPath);
    console.log('PDF buffer size:', pdfBuffer.length);
    
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    console.log('PDF loaded successfully');
    
    // For now, let's just return the original PDF with minimal modifications
    // to avoid complex text positioning issues
    const pages = pdfDoc.getPages();
    console.log('Number of pages:', pages.length);
    
    if (redFlags.length > 0) {
      // Add annotations to all pages with red flags
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      
      // Add a prominent banner on the first page
      firstPage.drawRectangle({
        x: 20,
        y: height - 60,
        width: width - 40,
        height: 40,
        color: rgb(1, 0.9, 0.9), // Light red background
        opacity: 0.9,
      });
      
      // Add border to the banner (draw as outline)
      // Top border
      firstPage.drawRectangle({
        x: 20,
        y: height - 20,
        width: width - 40,
        height: 2,
        color: rgb(0.8, 0, 0),
      });
      // Bottom border
      firstPage.drawRectangle({
        x: 20,
        y: height - 60,
        width: width - 40,
        height: 2,
        color: rgb(0.8, 0, 0),
      });
      // Left border
      firstPage.drawRectangle({
        x: 20,
        y: height - 60,
        width: 2,
        height: 40,
        color: rgb(0.8, 0, 0),
      });
      // Right border
      firstPage.drawRectangle({
        x: width - 22,
        y: height - 60,
        width: 2,
        height: 40,
        color: rgb(0.8, 0, 0),
      });
      
      // Add warning text
      firstPage.drawText(`⚠️ POLICY ANALYSIS: ${redFlags.length} RED FLAGS DETECTED`, {
        x: 30,
        y: height - 35,
        size: 12,
        color: rgb(0.8, 0, 0),
      });
      
      firstPage.drawText('This document has been analyzed for potential issues. See analysis results.', {
        x: 30,
        y: height - 50,
        size: 8,
        color: rgb(0.6, 0, 0),
      });
      
      // Add red flag indicators on pages with issues
      let flagCount = 0;
      redFlags.forEach(flag => {
        flag.textMatches.forEach(match => {
          if (match.pageIndex < pages.length) {
            const page = pages[match.pageIndex];
            const pageSize = page.getSize();
            
            // Add a red flag icon in the margin
            const flagY = pageSize.height - 100 - (flagCount % 10) * 30;
            
            // Red flag background
            page.drawRectangle({
              x: pageSize.width - 80,
              y: flagY,
              width: 70,
              height: 25,
              color: rgb(1, 0.8, 0.8),
              opacity: 0.9,
            });
            
            // Red flag icon (triangle)
            page.drawRectangle({
              x: pageSize.width - 75,
              y: flagY + 5,
              width: 15,
              height: 15,
              color: rgb(1, 0, 0),
              opacity: 1,
            });
            
            // Flag text
            page.drawText(`🚩 ${flag.name.substring(0, 8)}`, {
              x: pageSize.width - 55,
              y: flagY + 10,
              size: 6,
              color: rgb(0.8, 0, 0),
            });
            
            flagCount++;
          }
        });
      });
    }
    
    const savedPdf = await pdfDoc.save();
    console.log('PDF saved successfully, size:', savedPdf.length);
    return Buffer.from(savedPdf);
  } catch (error) {
    console.error('Error highlighting PDF:', error);
    // Return the original PDF if highlighting fails
    return fs.readFileSync(pdfPath);
  }
}

export async function createHighlightedPdf(
  originalPdfPath: string,
  outputPath: string,
  redFlags: RedFlag[]
): Promise<string> {
  try {
    const highlightedBuffer = await highlightPdfRedFlags(originalPdfPath, redFlags);
    fs.writeFileSync(outputPath, highlightedBuffer);
    return outputPath;
  } catch (error) {
    console.error('Error creating highlighted PDF:', error);
    throw error;
  }
}