"use server";
import nodemailer from "nodemailer";

export const sendMail = async () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    host: "smtp.office365.com",
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
      from: process.env.EMAIL_USERNAME,
      to: "patelneel1732@gmail.com",
      subject: "Test Email",
      text: "Hello from Node.js",
      html: "<h1>Hello from Node.js</h1>",
    };
    const result = await transporter.sendMail(mailOptions);
    console.log(result);
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
