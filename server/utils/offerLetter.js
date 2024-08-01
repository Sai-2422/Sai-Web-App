import PDFDocument from "pdfkit";
import axios from "axios";

export const createOfferLetterPDF = async (intern) => {
  const doc = new PDFDocument();

  let buffers = [];
  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {
    const pdfData = Buffer.concat(buffers);
    return pdfData;
  });

  const fetchImage = async (url) => {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return Buffer.from(response.data, "binary");
  };

  const msmeImageBuffer = await fetchImage(
    "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722103913/SAI%20WebApp/msme.png"
  );
  const aicteImageBuffer = await fetchImage(
    "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722083782/SAI%20WebApp/aicte.png"
  );

  const newImageBuffer = await fetchImage(
    "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722255123/SAI%20WebApp/saiLogo.jpg"
  );

  const signatureImageBuffer = await fetchImage(
    "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722310640/SAI%20WebApp/Signature.jpg"
  );

  doc.image(newImageBuffer, 30, 30, { height: 100 });

  const titleStyle = {
    align: "center",
    color: "#003366",
    size: 30,
    bold: true,
  };
  const headerStyle = { align: "left", color: "#666666", size: 12 };
  const nameStyle = { align: "left", color: "#003366", size: 14, bold: true };
  const bodyStyle = { size: 12, color: "#333333" };
  const signOffStyle = { size: 12, color: "#003366" };
  const welcomeStyle = { align: "center", color: "#4B4B4B", size: 25 };

  doc
    .fontSize(titleStyle.size)
    .fillColor(titleStyle.color)
    .text(`Shivshakti Agro Industries`, {
      align: titleStyle.align,
      bold: titleStyle.bold,
    });
  doc.moveDown();

  doc
    .fontSize(bodyStyle.size)
    .fillColor(bodyStyle.color)
    .text(`Date: ${new Date().toLocaleDateString()}`);
  doc.moveDown();

  doc
    .fontSize(headerStyle.size)
    .fillColor(headerStyle.color)
    .text(`ID: ${intern.ID}`, { align: headerStyle.align });
  doc.moveDown();

  doc
    .fontSize(welcomeStyle.size)
    .fillColor(welcomeStyle.color)
    .text(`Welcome Letter`, { align: welcomeStyle.align });
  doc.moveDown();

  doc
    .fontSize(nameStyle.size)
    .fillColor(nameStyle.color)
    .text(`Dear ${intern.userId?.name},`);
  doc.moveDown();

  doc
    .fontSize(bodyStyle.size)
    .fillColor(bodyStyle.color)
    .text(
      `Welcome to Shivshakti Agro Industries! We are thrilled to have you join our fellowship for the ${intern.field}, hosted by Shivshakti Agro Industries, starting from ${intern.from} and concluding on ${intern.to}. Over the next ${intern.duration} months, you will immerse yourself in a dynamic learning environment, where the focus is on acquiring new skills and gaining a deeper understanding of key concepts through hands-on application.`
    );
  doc.moveDown();
  doc.text(
    `During your time with us, we expect you to approach your tasks with dedication and enthusiasm, striving to excel in every project assigned to you. Our team at Shivshakti Agro Industries believes in providing a supportive and enriching experience, and we are confident that your contributions will be valuable to our ongoing projects.`
  );
  doc.moveDown();
  doc.text(
    `We look forward to a successful and rewarding collaboration, equipping you with the skills and experiences necessary for future endeavors.`
  );
  doc.moveDown(4);

  const msmeImageHeight = 80;
  const aicteImageHeight = 60;
  const imageHeight = 75;
  const imageWidth = 100;
  const spacing = 10;

  const signOffX = doc.page.margins.left;
  const signOffY =
    doc.page.height - doc.page.margins.bottom - imageHeight - 100;
  const imagesX = doc.page.width / 2 + 50;

  doc
    .fontSize(signOffStyle.size)
    .fillColor(signOffStyle.color)
    .text(`Best Regards,`, signOffX, signOffY + 30);
  doc.text(`Revansidha Kanchangire`, signOffX, signOffY + 45);
  doc.text(`Proprietor, Shivshakti Agro Industries`, signOffX, signOffY + 60, {
    align: "left",
  });
  doc.text(`shivshaktiagroindustries12@gmail.com`, signOffX, signOffY + 75);

  doc.image(aicteImageBuffer, imagesX, signOffY+15, {
    height: aicteImageHeight,
  });
  doc.image(msmeImageBuffer, imagesX + imageWidth + spacing, signOffY +5, {
    height: msmeImageHeight,
  });
  doc.image(signatureImageBuffer, signOffX, signOffY - 30, { height: 50 });

  doc.end();

  return new Promise((resolve, reject) => {
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    doc.on("error", reject);
  });
};
