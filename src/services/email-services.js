const createTransport = require("../helpers/gmail-smtp");
const { EMAIL_USER } = require("../config/index");

const sendVerificationEmail = async (
  to,
  subject,
  verificationToken,
  firstName
) => {
  const transport = await createTransport();
  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject: subject,
    html: `<h1>Hello, ${firstName}</h1>
        <p>Thank you for registering. Please use the token below to verify your email address:</p>
        <h1>${verificationToken}</h1>
        <p>This token will expire in 1 hour.</p>
        <p>Thank you!</p>
        `,
  };

  await transport.sendMail(mailOptions);
  // console.log("Email sent successfully");
};

module.exports = { sendVerificationEmail };
