
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const db = require("../../config/db.config")
const add_pdf = db.pdf_content

exports.generatePDF = async (req, res) => {
    try {
        const { title, content } = req.body;
        const pdfDir = path.join(__dirname, '../../public/pdf');
        if (!fs.existsSync(pdfDir)) {
            fs.mkdirSync(pdfDir, { recursive: true });
        }

        const doc = new PDFDocument();

        const pdfPath = path.join(pdfDir, `${title}.pdf`);
        
        const writeStream = fs.createWriteStream(pdfPath);
  

        doc.pipe(writeStream);

        // Add dynamic content to the PDF}
        doc.fontSize(24).text(title, {  textalign: 'left', });
        doc.moveDown();
        doc.fontSize(20).text(content, {  textalign: 'left', });

        // Add static image to the PDF
        const imagePath = path.join(__dirname, "../../public/pdf/dummy_image.png");
        doc.image(imagePath, { width: 200, align: 'center' });

        // Finalize the PDF
        doc.end();
        const store_pdf = await add_pdf.create({
            title : title,
            content : content,
            pdf_path : pdfPath
        })


        // return pdfPath;
        res.status(200).json({
            status : true,
             message: 'PDF generated successfully',
             path : pdfPath,
             data : store_pdf
             });
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


