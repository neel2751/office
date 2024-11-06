"use server";
import nodemailer from "nodemailer";

export const sendMail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587, // or 465
    secure: false, // or 'STARTTLS' or 'SSL' or 'TLS' or 'auto' (default)
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // add TLS
    // tls: { rejectUnauthorized: false },
  });
  try {
    const mailOptions = {
      from: `"Neel✌️" ${process.env.EMAIL_USERNAME}`,
      to: data?.email ?? "patelneel1732@gmail.com",
      subject: "New Login Attempt",
      // text: "Hello from Node.js",
      html: templateForSession(data),
    };
    await transporter.sendMail(mailOptions);
    transporter.close();
  } catch (error) {
    console.log(error);
  }
};

export const checkip = async () => {
  try {
    const data = await fetch("https://cdcgrouplimited.com/nodejs/cdc");
    const json = await data.json(); // parses JSON response into native JavaScript objects
    console.log(json); // prints the JSON data
  } catch (error) {
    console.log(error);
  }
};

// we have to make email template for after login send email like
// new login  from your account this ip  address and this  device and this country
// we have to make email template for after login send email like
// new login  from your account this ip  address and this  device and this country
function templateForSession(data) {
  const html = `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            margin: 30px auto;
            max-width: 600px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header img {
            max-width: 150px;
            margin-bottom: 10px;
        }
        .header h2 {
            margin: 0;
            color: #333333;
        }
        h1 {
            color: #333333;
            font-size: 18px;
        }
        p {
            color: #555555;
            font-size: 14px;
            line-height: 1.6;
        }
        a {
        color: #FFFFFF;
        }
        .button {
            display: inline-block;
            padding: 10px 15px;
            margin-top: 20px;
            background-color: #007BFF;
            color: #FFFFFF !important;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .button:hover {
            background-color: #0056b3;
            color:  #FFFFFF;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #888888;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://res.cloudinary.com/drcjzx0sw/image/upload/v1729507237/cdc_a4jt7u.png" alt="Company Logo">
            <h2>Creative Design & Construction</h2>
        </div>
        <h1>New Login from Your Account</h1>
        <p>We detected a new login to your account:</p>
        <p><strong>IP Address:</strong> ${data?.ipAddress ?? ""}</p>
        <p><strong>Device:</strong>  ${data?.device ?? ""}</p>
        <p><strong>Country:</strong>   ${data?.country ?? ""}</p>
        <p><strong>Browser:</strong>  ${data?.browser ?? ""}</p>
        <p><strong>Login Time:</strong> ${new Date()}</p>
        <p>If this was you, you can safely ignore this email. If you did not perform this login, please take immediate action to secure your account.</p>
        <a href="http://localhost:3000/" class="button">Click here to secure your account</a>
        <div class="footer">
            <p>If you have any questions or need further assistance, please contact our support team at <a href="mailto:support@test.com">support@cdc.construction</a>.</p>
            <p>&copy; ${new Date().getFullYear()} Creative Design  & Construction. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

  `;
  return html;
}
