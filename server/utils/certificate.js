import PDFDocument from "pdfkit";
import axios from "axios";

export const createCertificatePDF = async (intern) => {
  const doc = new PDFDocument({
    size: "A4",
    layout: "landscape",
    margins: { top: 50, bottom: 50, left: 50, right: 50 },
  });

  const firstName = intern.userId?.name.split(" ")[0];

  let buffers = [];
  doc.on("data", buffers.push.bind(buffers));

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

  doc.on("end", () => {
    const pdfData = Buffer.concat(buffers);
    return pdfData;
  });

  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#eef2f5");
  doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60).fill("#ffffff");
  doc.image(newImageBuffer, 30, 30, { height: 100 });

  const titleStyle = {
    align: "center",
    color: "#003366",
    size: 28,
    bold: true,
  };
  const headerStyle = { align: "left", color: "#666666", size: 12 };
  const nameStyle = { align: "left", color: "#003366", size: 14, bold: true };
  const bodyStyle = { size: 12, color: "#333333" };
  const signOffStyle = { size: 12, color: "#003366", bold: true };
  const welcomeStyle = { align: "center", color: "#444444", size: 20 };

  doc
    .fontSize(titleStyle.size)
    .fillColor(titleStyle.color)
    .text(`Shivshakti Agro Industries`, {
      align: titleStyle.align,
      bold: titleStyle.bold,
    });
  doc.moveDown(2);

  doc
    .fontSize(welcomeStyle.size)
    .fillColor(welcomeStyle.color)
    .text(
      `Certificate of ${
        intern.internType === "internship" ? "Internship" : "Apprenticeship"
      } Completion`,
      {
        align: welcomeStyle.align,
      }
    );
  doc.moveDown(2);

  doc
    .fontSize(bodyStyle.size)
    .fillColor(bodyStyle.color)
    .text(`Date: ${new Date().toLocaleDateString()}`);
  doc.moveDown();

  doc
    .fontSize(headerStyle.size)
    .fillColor(headerStyle.color)
    .text(`ID: ${intern.ID}`, { align: headerStyle.align });
  doc.moveDown(1.5);

  doc
    .fontSize(nameStyle.size)
    .fillColor(nameStyle.color)
    .text(`Dear ${intern.userId?.name},`);
  doc.moveDown(1);

  doc
    .fontSize(bodyStyle.size)
    .fillColor(bodyStyle.color)
    .text(
      `This is to certify that ${firstName} has successfully completed an ${intern.internType} at Shivshakti Agro Industries in the field of ${intern.field} from ${intern.from} to ${intern.to}. During this period, ${firstName} has displayed exceptional dedication and skill in their tasks.`
    );
  doc.moveDown();
  doc.text(
    `Over the course of ${intern.duration} months, ${firstName} has demonstrated a strong commitment to learning and professional development, contributing meaningfully to our projects.`
  );
  doc.moveDown();
  doc.text(
    `We are confident that the experience and knowledge gained during this ${intern.internType} will serve ${firstName} well in their future endeavors.`
  );
  doc.moveDown(4);

  const msmeImageHeight = 100;
  const aicteImageHeight = 75;
  const imageHeight = 75;
  const imageWidth = 100;
  const spacing = 10;

  const signOffX = doc.page.margins.left;
  const signOffY = doc.page.height - doc.page.margins.bottom - imageHeight;
  const imagesX = doc.page.width / 2 + 50;

  doc
    .fontSize(signOffStyle.size)
    .fillColor(signOffStyle.color)
    .text(`Best Regards,`, signOffX, signOffY+15, { align: "left" });
  doc.text(`Revansidha Kanchangire`, signOffX, signOffY + 30, {
    align: "left",
  });
  doc.text(`Proprietor, Shivshakti Agro Industries`, signOffX, signOffY + 45, {
    align: "left",
  });
  doc.text(`shivshaktiagroindustries12@gmail.com`, signOffX, signOffY + 60, { align: "left" });

  doc.image(aicteImageBuffer, imagesX, signOffY, { height: aicteImageHeight });
  doc.image(msmeImageBuffer, imagesX + imageWidth + spacing, signOffY - 10, {
    height: msmeImageHeight,
  });

  doc.image(signatureImageBuffer, signOffX, signOffY-45, { height: 50 });

  doc.end();

  return new Promise((resolve, reject) => {
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    doc.on("error", reject);
  });
};
