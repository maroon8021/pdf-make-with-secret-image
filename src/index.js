const PdfPrinter = require("pdfmake");
const fs = require("fs");
const path = require("path");
const image = require("./images/encrypted-image"); //require("./images/image");
const encryption = require("./lib/encryption");

const decodedImage = encryption.decrypt(
  image,
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
);

console.log(decodedImage);

const fonts = {
  Roboto: {
    normal: path.join(__dirname, "./fonts/Roboto-Regular.ttf"),
    bold: path.join(__dirname, "./fonts/Roboto-Medium.ttf"),
    italics: path.join(__dirname, "./fonts/Roboto-Italic.ttf"),
    bolditalics: path.join(__dirname, "./fonts/Roboto-MediumItalic.ttf"),
  },
};

const printer = new PdfPrinter(fonts);

const docDefinition = {
  content: [
    "pdfmake (since it's based on pdfkit) supports JPEG and PNG format",
    "If no width/height/fit is provided, image original size will be used",
    {
      image: decodedImage,
    },
  ],
};

const now = new Date();
const pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream(path.join(__dirname, "./pdfs/images.pdf")));
pdfDoc.end();
console.log(new Date() - now);
