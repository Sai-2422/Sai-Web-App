import nodemailer from "nodemailer";
import { createCertificatePDF } from "../certificate.js";

export const sendCertificateEmail = async (intern) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SAI_SMPT_MAIL,
      pass: process.env.SAI_SMPT_MAIL_PASSWORD,
    },
  });

  const pdfBuffer = await createCertificatePDF(intern);

  const mailOptions = {
    from: process.env.SAI_SMPT_MAIL,
    to: intern.userId?.email,
    subject: `Completion of ${
      intern.internType === "internship" ? "Internship" : "Apprenticeship"
    } from Shivshakti Agro Industries`,
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    background-color: #003366;
                    color: #ffffff;
                    padding: 20px;
                    border-radius: 8px 8px 0 0;
                }
                .logo {
                    max-width: 150px;
                }
                .content {
                    padding: 20px;
                    text-align: left;
                    background-color: #fcfcfc;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #0055A5;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                }
                @media only screen and (max-width: 600px) {
                    .container {
                        padding: 10px;
                    }
                    .logo {
                        max-width: 100px;
                    }
                    .button {
                        display: block;
                        margin-top: 10px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img class="logo" src="https://res.cloudinary.com/dab4pf98m/image/upload/v1721647978/SAI/bcmvz9fmmt2v0wedb8gk.png" alt="Shivshakti Agro Industries Logo">
                    <h1>Congratulations, ${intern.userId?.name}!</h1>
                </div>
                <div class="content">
                    <p>Dear ${intern.userId?.name},</p>
                    <p>We are pleased to inform you that you have successfully completed your ${intern.internType} at Shivshakti Agro Industries as a ${intern.field}. During your ${intern.internType} period from ${intern.from} to ${intern.to}, you have demonstrated excellent skills and dedication in your work.</p>
                    <p>The attached certificate acknowledges the completion of your ${intern.internType} and details the field and duration of your engagement with us.</p>
                    <p>If you have any questions or need further information, please feel free to contact us.</p>
                    <p>We appreciate your contributions and wish you all the best in your future endeavors.</p>
                    <p>Best regards,<br>Shivshakti Agro Industries<br>Proprietor: Revansidha Kanchangire<br>Contact: +91 9850037650</p>
                </div>
            </div>
        </body>
        </html>
    `,
    attachments: [
      {
        filename: `Completion_Certificate_${intern.userId?.name}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};
