import SibApiV3Sdk from '@sendinblue/client';
import { emailVerificationTemplate, emailWelcomeTemplate } from '../template/emailTemplate.js';

const createBrevoClient = () => {
  const apiKey = String(process.env.BREVO_API_KEY || '').trim();
  if (!apiKey) {
    throw new Error('BREVO_API_KEY is missing in environment');
  }

  const client = new SibApiV3Sdk.TransactionalEmailsApi();
  client.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, apiKey);
  return client;
};

const getSender = (name) => {
  const email = String(process.env.SENDER_EMAIL || '').trim();
  if (!email) {
    throw new Error('SENDER_EMAIL is missing in environment');
  }
  return { name, email };
};

export const sendOTP = async (email, otp) => {
  try {
    const api = createBrevoClient();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = 'GlobalBites OTP Code';
    sendSmtpEmail.htmlContent = emailVerificationTemplate.replace('{OTP_CODE}', otp);
    sendSmtpEmail.sender = getSender('GlobalBites');
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.textContent = `Your OTP for GlobalBites signup is: ${otp}`;

    const response = await api.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully:', response.messageId || 'ok');
    return response;
  } catch (error) {
    console.error('Error sending OTP email:', error.response?.body || error.message);
    throw new Error(`Email send failed: ${error.message || 'unknown error'}`);
  }
};

export const sendWelcome = async (email, userName) => {
  try {
    const api = createBrevoClient();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = 'Welcome to GlobalBites!';
    sendSmtpEmail.htmlContent = emailWelcomeTemplate
      .replace('{USER_NAME}', userName)
      .replace('{USER_EMAIL}', email);
    sendSmtpEmail.sender = getSender('GlobalBites Team');
    sendSmtpEmail.to = [{ email }];

    const response = await api.sendTransacEmail(sendSmtpEmail);
    console.log('Welcome email sent:', response.messageId || 'ok');
    return response;
  } catch (error) {
    console.error('Error sending welcome email:', error.response?.body || error.message);
    throw new Error(`Welcome email send failed: ${error.message || 'unknown error'}`);
  }
};
