// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();
// export const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });


import SibApiV3Sdk from "@sendinblue/client";
import dotenv from "dotenv";

dotenv.config();

const brevoClient = new SibApiV3Sdk.TransactionalEmailsApi();
brevoClient.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export default brevoClient;

