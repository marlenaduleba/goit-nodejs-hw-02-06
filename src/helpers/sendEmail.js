const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  await sgMail.send(data);
  console.log("Verification email sent".success);
  return true;
};

module.exports = sendEmail;
