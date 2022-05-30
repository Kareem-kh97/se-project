const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "emilsenderweb@gmail.com",
    pass: "amdpulse",
  },
});

async function sendEmail(userEmail, token, url) {
  try {
    const res = await transporter.sendMail({
      from: "emilsenderweb@gmail.com", // sender address
      to: userEmail, // list of receivers
      subject: "Account Recovery",
      text: url + "/passwordreset" + "/" + token,
      //html: "<b>There is a new article. It's about sending emails, check it ", // html body
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendEmail;
