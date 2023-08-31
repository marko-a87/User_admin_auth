import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();
const from_mail = process.env.FROM;
const username = process.env.OAUTH2_USER;
const password = process.env.OAUTH2_PASS;
const clientId = process.env.OAUTH2_CLIENT_ID;
const clientSecret = process.env.OAUTH2_CLIENT_SECRET;
const refreshToken = process.env.OAUTH2_REFRESH_TOKEN;
const redirectURI = process.env.OAUTH_REDIRECT_URI;
const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectURI
);
oAuth2Client.setCredentials({ refresh_token: refreshToken });
const sendEmail = async (email) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        type: "OAuth2",
        user: username,
        pass: password,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOptions = {
      from: `${from_mail}`,
      to: email,
      subject: "User auth -project 3",
      text: "If you have received this, it works!",
    };
    const sentEmail = transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent successfully");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export { sendEmail };
