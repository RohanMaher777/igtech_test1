const express = require("express")
const router = express.Router()
const {generatePDF} = require("../controller/pdf_generator")

router.post("/generate_pdf", generatePDF)

module.exports = router