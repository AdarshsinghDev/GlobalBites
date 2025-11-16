
// import nodemailer from "nodemailer";
// import { emailVerificationTemplate, emailWelcomeTemplate } from "../template/emailTemplate.js";
// import dotenv from "dotenv";
// dotenv.config();

// const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     secure: true,
//     auth: {
//         user: process.env.SENDER_EMAIL,
//         pass: process.env.SENDER_EMAIL_PASS
//     }
// });

// export const sendOTP = async (email, otp) => {
//     try {
//         const response = await transporter.sendMail({
//             from: `"GlobalBites" <${process.env.SENDER_EMAIL}>`,
//             to: email,
//             subject: "GlobalBites OTP Code",
//             text: `Your OTP for GlobalBites signup is: ${otp}`,
//             html: emailVerificationTemplate.replace("{OTP_CODE}", otp),
//         });
//         console.log("✅ Email sent:", response.messageId);
//     } catch (error) {
//         console.error("❌ Error:", error);
//     }
// }



// BREVO


import SibApiV3Sdk from '@sendinblue/client';
import { emailVerificationTemplate, emailWelcomeTemplate } from "../template/emailTemplate.js";
import dotenv from "dotenv";
dotenv.config();

// Brevo API client setup
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.BREVO_API_KEY;

// OTP email send karne ka function
export const sendOTP = async (email, otp) => {
    try {
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        sendSmtpEmail.subject = "GlobalBites OTP Code";
        sendSmtpEmail.htmlContent = emailVerificationTemplate.replace("{OTP_CODE}", otp);
        sendSmtpEmail.sender = {
            name: "GlobalBites",
            email: process.env.SENDER_EMAIL
        };
        sendSmtpEmail.to = [{ email: email }];
        sendSmtpEmail.textContent = `Your OTP for GlobalBites signup is: ${otp}`;

        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("✅ Email sent successfully:", response.messageId);
        return response;
    } catch (error) {
        console.error("❌ Error sending email:", error.response?.body || error.message);
        throw new Error(`Email send failed: ${error.message}`);
    }
};

// Welcome email send karne ka function
export const sendWelcome = async (email, userName) => {
    try {
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        sendSmtpEmail.subject = "Welcome to GlobalBites! 🎉";
        sendSmtpEmail.htmlContent = emailWelcomeTemplate
            .replace("{USER_NAME}", userName)
            .replace("{USER_EMAIL}", email);
        sendSmtpEmail.sender = {
            name: "GlobalBites Team",
            email: process.env.SENDER_EMAIL
        };
        sendSmtpEmail.to = [{ email: email }];

        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("✅ Welcome email sent:", response.messageId);
        return response;
    } catch (error) {
        console.error("❌ Error sending welcome email:", error.response?.body || error.message);
        throw new Error(`Welcome email send failed: ${error.message}`);
    }
};