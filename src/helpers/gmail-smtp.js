const {
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  OAUTH_REDIRECT_URI,
  EMAIL_CLIENT_REFRESH_TOKEN,
  EMAIL_CLIENT_ACCESS_TOKEN,
  EMAIL_USER,
  EMAIL_HOST,
} = require("../config/index");

async function createTransport() {
  // const accessToken = await myOauth2Client.getAccessToken();
  const nodemailer = require("nodemailer");
  const { google } = require("googleapis");

  const myOauth2Client = new google.auth.OAuth2(
    EMAIL_CLIENT_ID,
    EMAIL_CLIENT_SECRET,
    OAUTH_REDIRECT_URI
  );

  myOauth2Client.setCredentials({ refresh_token: EMAIL_CLIENT_REFRESH_TOKEN });

  const transport = nodemailer.createTransport({
    service: EMAIL_HOST,
    auth: {
      type: "OAuth2",
      user: EMAIL_USER,
      clientId: EMAIL_CLIENT_ID,
      clientSecret: EMAIL_CLIENT_SECRET,
      refreshToken: EMAIL_CLIENT_REFRESH_TOKEN,
      accessToken: EMAIL_CLIENT_ACCESS_TOKEN, // Automatically generated
    },
  });

  return transport;
}

module.exports = createTransport;
