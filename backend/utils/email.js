// import { emailVerificationTemplate, emailWelcomeTemplate } from "../template/emailTemplate.js";
// import { transporter } from "./sendEmail.js";
// import dotenv from "dotenv";

// dotenv.config();

// export const sendOTP = async (email, otp) => {
//     try {
//         const response = await transporter.sendMail({
//             from: `"GlobalBites" <${process.env.EMAIL_USER}>`,
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


import { emailVerificationTemplate, emailWelcomeTemplate } from "../template/emailTemplate.js";
import brevoClient from "./sendEmail.js";

export const sendOTP = async (email, otp) => {
    try {
        const sendSmtpEmail = {
            sender: { email: "adarshwebofficial@gmail.com", name: "GlobalBites" }, // Brevo sender verified email
            to: [{ email }],
            subject: "GlobalBites OTP Code",
            htmlContent: emailVerificationTemplate.replace("{OTP_CODE}", otp),
            textContent: `Your OTP for GlobalBites signup is: ${otp}`,
        };

        const response = await brevoClient.sendTransacEmail(sendSmtpEmail);
        console.log("✅ Email sent:", response.messageId || response);
    } catch (error) {
        console.error("❌ Error:", error);
    }
};



export const sendWelcome = async (email, fullname) => {
    try {
        const sendSmtpEmail = {
            sender: { email: "adarshwebofficial@gmail.com", name: "GlobalBites" },
            to: email,
            subject: `Welcome to GlobalBites ${fullname}`,
            htmlContent: emailWelcomeTemplate.replace("{USERNAME}", fullname),
            textContent: `Welcome ${fullname}! Your GlobalBites account has been created.`,
        };

        const response = await brevoClient.sendTransacEmail(sendSmtpEmail);
        console.log("✅ Welcome Email sent:", response);
    } catch (error) {
        console.error("❌ Error sending Welcome Email:", error);
    }
};