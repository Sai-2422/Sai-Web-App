import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (user) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SMPT_SERVICE,
      auth: {
        user: process.env.SAI_SMPT_MAIL,
        pass: process.env.SAI_SMPT_MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SAI_SMPT_MAIL,
      to: user.email,
      subject: "Welcome to Shivshakti Agro Industries",
      text: `Hello, ${user.name}\n\nThank you for registering with Shivshakti Agro Industries. We're excited to have you as a new member of our community.\n\nGet Started: https://shivshaktiagroindustries.onrender.com\n\nBest regards,\nShivshakti Agro Industries`,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
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
            background-color: #3d405b;
            color: #ffffff;
            padding: 20px;
        }
        .logo {
            max-width: 150px;
        }
        .content {
            padding: 20px;
            text-align: center; 
            background-color: #fcf5f5;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #20d49a;
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
              <h1>Welcome to Shivshakti Agro Industries</h1>
          </div>
          <div class="content">
              <p>Hello, ${user.name}</p>
              <p>Thank you for registering with Shivshakti Agro Industries. We're excited to have you as a new member of our community.</p>
              <p>As a part of our commitment to fostering talent, we offer internships and apprenticeships for students. For customers, we provide a wide range of agricultural products. Click the button below to get started with us!</p>
              <p>If you have any questions or require technical support, feel free to reach out us.</p>
              <p>For student inquiries, contact Harshad Kanchangire at +91 8767578894.</p>
              <div class="button-container">
                  <a class="button" href="https://shivshaktiagroindustries.onrender.com">Get Started</a>
              </div>
              <p>Thank you for joining our community!</p>
              <p>Best regards,<br>Shivshakti Agro Industries<br>Proprietor: Revansidha Kanchangire<br>Contact:+91 9850037650</p>
          </div>
      </div>
      </body>
      </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.log("Error occurred while sending welcome email: " + error);
  }
};
