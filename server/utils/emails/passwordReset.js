import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (
  user,
  resetPasswordToken,
  resetPasswordOtp
) => {
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
    subject: "Password Reset Request",
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
                    <h1>Password Reset Request</h1>
                </div>
                <div class="content">
                    <p>Hello, ${user.name}</p>
                    <p>We received a request to reset your password. If you did not request this, please ignore this email.</p>
                    <p>To reset your password, you can either use the OTP provided below or click the button.</p>
                    <p><a class="button" href="http://localhost:${process.env.CLI_PORT}/user/reset-password/${resetPasswordToken}">Reset Password Link</a></p>
                    <p><strong>OTP: ${resetPasswordOtp}</strong></p>
                    <p>This OTP is valid for 10 minutes only , so please use it promptly.</p>
                    <p>If you have any questions or need further assistance, feel free to contact us.</p>
                    <p>Thank you for being a valued member of our community!</p>
                    <p>Best regards,<br>Shivshakti Agro Industries<br>Proprietor: Revansidha Kanchangire<br>Contact:+91 9850037650</p>
                </div>
            </div>
        </body>
        </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};
