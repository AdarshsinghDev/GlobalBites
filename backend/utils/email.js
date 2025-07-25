import { emailVerificationTemplate, emailWelcomeTemplate } from "../template/emailTemplate.js";
import { transporter } from "./sendEmail.js";
import dotenv from "dotenv";

dotenv.config();

// Simple queue for email priority
class SimpleEmailQueue {
    constructor() {
        this.highPriorityQueue = [];
        this.normalPriorityQueue = [];
        this.processing = false;
    }

    addEmail(emailData, priority = 'normal') {
        if (priority === 'high') {
            this.highPriorityQueue.push(emailData);
        } else {
            this.normalPriorityQueue.push(emailData);
        }
        
        if (!this.processing) {
            this.processQueue();
        }
    }

    async processQueue() {
        this.processing = true;
        
        while (this.highPriorityQueue.length > 0 || this.normalPriorityQueue.length > 0) {
            let emailData;
            
            // High priority emails first (OTP)
            if (this.highPriorityQueue.length > 0) {
                emailData = this.highPriorityQueue.shift();
            } else {
                emailData = this.normalPriorityQueue.shift();
            }
            
            try {
                await transporter.sendMail(emailData);
                console.log(`Email sent successfully to ${emailData.to} ✅`);
            } catch (error) {
                console.error(`Failed to send email to ${emailData.to}:`, error);
                
                // Simple retry mechanism
                if (emailData.retryCount < 2) {
                    emailData.retryCount = (emailData.retryCount || 0) + 1;
                    console.log(`Retrying email to ${emailData.to}, attempt ${emailData.retryCount + 1}`);
                    
                    // Add back to queue after 3 seconds
                    setTimeout(() => {
                        if (emailData.priority === 'high') {
                            this.highPriorityQueue.push(emailData);
                        } else {
                            this.normalPriorityQueue.push(emailData);
                        }
                    }, 3000 * emailData.retryCount);
                }
            }
            
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        this.processing = false;
    }
}

// Create global queue instance
const emailQueue = new SimpleEmailQueue();

export const sendOTP = async (email, otp) => {
    try {
        const emailData = {
            from: `"GlobalBites" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "🔐 GlobalBites OTP Code",
            text: `Your OTP for GlobalBites signup is: ${otp}`,
            html: emailVerificationTemplate.replace("{OTP_CODE}", otp),
            priority: 'high',
            retryCount: 0
        };

        // Add to high priority queue for immediate processing
        emailQueue.addEmail(emailData, 'high');
        console.log(`OTP email queued for ${email} (High Priority)`);
        
    } catch (error) {
        console.log("OTP email error", error);
    }
}

export const sendWelcome = async (email, fullname) => {
    try {
        const emailData = {
            from: `"GlobalBites" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `🎉 Welcome to GlobalBites ${fullname}`,
            text: "Your Account for GlobalBites is successfully created",
            html: emailWelcomeTemplate.replace("{USERNAME}", fullname),
            priority: 'normal',
            retryCount: 0
        };

        // Add to normal priority queue
        emailQueue.addEmail(emailData, 'normal');
        console.log(`Welcome email queued for ${email} (Normal Priority)`);
        
    } catch (error) {
        console.log("Welcome email error", error);
    }
}