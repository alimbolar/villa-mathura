const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

const mailConfig = {
  host: "smtp.mailgun.org",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(mailConfig);

exports.handler = function (event, context, callback) {
  try {
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Server ready to send emails");
      }
    });

    const messageData = JSON.parse(event.body);

    const { name, email, message, mobile, subject, recipient } = messageData;

    console.log(messageData);
    console.log(recipient);

    const country = event.headers["x-country"];
    const ip = event.headers["x-forwarded-for"].split(",").pop();

    const htmlMessage = () => {
      return `
    <div><strong> You have a new message from your website </strong></div>
    <ul>
<li><strong>Name : </strong> ${name}</li>
<li><strong>Email : </strong> ${email}</li>
<li><strong>Mobile : </strong> ${mobile}</li>
<li><strong>Message : </strong> ${message}</li>

    </ul>

    <div><em>The message was send from ${country}:${ip}</em></div>

    `;
    };

    const mailOptions = {
      from: email,
      to: recipient,
      subject: subject,
      text: message,
      html: htmlMessage(),
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        callback(error);
      } else {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            status: 200,
            data: "Thanks for contacting us. \r\n We will get back to you soon. \r\n \r\nWe look forward to hosting you at our home.",
          }),
        });
      }
    });
  } catch (error) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        status: 400,
        data: `Sorry. Could not submit message due to error : ${error}. \r\n Please try again later. \r\n Or contact us on our WhatsApp number`,
      }),
    });
  }
};
