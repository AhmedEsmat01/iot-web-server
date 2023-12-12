import fs from "fs";

import nodemailer from "nodemailer";
import dotenv from 'dotenv'


dotenv.config()

const emailTemplatePath = `./public/email-template.html`;

const transporterConfig = {
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
};

export const sendEmail = async (mailOptions) => {
  // create transporter
  const transporter = nodemailer.createTransport(transporterConfig);
  console.log(mailOptions);

  console.log(transporterConfig);
  // send email
  await transporter.sendMail(mailOptions);
};

const formTemperatureAlertMail = async (email, temperature) => {
  let html = fs.readFileSync(emailTemplatePath, "utf-8");
  html = html.replace("[TEMPERATURE]", temperature);
  html = html.replace("[DATE_TIME]", new Date().toString());

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    html,
    subject: `Temperature Alert`,
  };

  await sendEmail(mailOptions);
};

export default formTemperatureAlertMail;
