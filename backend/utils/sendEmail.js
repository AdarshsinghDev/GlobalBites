import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Performance optimization 
  pool: true,                    // Connection reuse
  maxConnections: 5,             // Max 5 connections
  maxMessages: 100,              // Per connection 100 emails
  rateDelta: 20000,              // 20 seconds window
  rateLimit: 5                   // Max 5 emails per 20 seconds
});

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP configuration error:', error);
  } else {
    console.log('Email server is ready ✅');
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Closing email transporter...');
  transporter.close();
});