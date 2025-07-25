import { emailVerificationTemplate, emailWelcomeTemplate } from "../template/emailTemplate.js";
import { transporter } from "./sendEmail.js";
import dotenv from "dotenv";

dotenv.config();

export const sendOTP = async (email, otp) => {
    try {
        const response = await transporter.sendMail({
            from: `"GlobalBites" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "GlobalBites OTP Code",
            text: `Your OTP for GlobalBites signup is: ${otp}`,
            html: emailVerificationTemplate.replace("{OTP_CODE}", otp),
        });
    } catch (error) {
        console.log("email error", error);
    }
}


// export const sendWelcome = async (email, fullname) => {
//     try {
//         const response = await transporter.sendMail({
//             from: `"GlobalBites" <${process.env.EMAIL_USER}>`,
//             to: email,
//             subject: `Welcome to GlobalBites ${fullname}`,
//             text: "Your Account for GlobalBites is successfully created",
//             html: emailWelcomeTemplate.replace("{USERNAME}", fullname),
//         });
//     } catch (error) {
//         console.log("email error", error);
//     }
// }
