const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async function (email, title, body) {
  try {
    console.log('MAIL_USER:', process.env.MAIL_USER);
console.log('MAIL_PASS:', process.env.MAIL_PASS);
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS     //app specific password
      },
      tls:
      {
        rejectUnauthorized:false,
      }
    });

    let info = await transporter.sendMail({
      from: `"Indore Municipal Corporation" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    //TODO: handle error here
    console.error(error.message);
    throw new Error('Failed to send OTP');
  }
};

module.exports = mailSender;