export const emailVerificationTemplate = `<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en" style="margin: 0; padding: 0;">
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Email - GlobalBites</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      /* Import Google Fonts */
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      
      /* Reset and base styles */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body, table, td {
        font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
      }

      /* Gradient backgrounds */
      .header-gradient {
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%);
      }

      .content-bg {
        background: linear-gradient(180deg, #ffffff 0%, #f8fffe 100%);
      }

      /* Modern button styling */
      .otp-button {
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        color: #ffffff !important;
        text-decoration: none;
        padding: 16px 32px;
        display: inline-block;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
        border: none;
      }

      .otp-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
      }

      /* OTP Code styling */
      .otp-container {
        background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        border: 2px solid #bbf7d0;
        border-radius: 16px;
        padding: 24px;
        margin: 24px 0;
        position: relative;
        overflow: hidden;
      }

      .otp-container::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%);
        pointer-events: none;
      }

      .otp-code {
        font-size: 36px;
        font-weight: 700;
        letter-spacing: 8px;
        color: #15803d;
        margin: 0;
        position: relative;
        z-index: 1;
      }

      .otp-label {
        font-size: 14px;
        font-weight: 500;
        color: #16a34a;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 8px;
      }

      /* Food themed decorations */
      .food-icon {
        font-size: 24px;
        margin: 0 8px;
        display: inline-block;
        animation: float 3s ease-in-out infinite;
      }

      .food-icon:nth-child(2) { animation-delay: -1s; }
      .food-icon:nth-child(3) { animation-delay: -2s; }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }

      /* Modern card styling */
      .email-card {
        max-width: 600px;
        background: #ffffff;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        border: 1px solid rgba(34, 197, 94, 0.1);
      }

      /* Header styling */
      .header-section {
        padding: 40px 30px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      .header-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><defs><radialGradient id="a" cx="50%" cy="0%" r="100%"><stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:0.1" /><stop offset="100%" style="stop-color:rgb(255,255,255);stop-opacity:0" /></radialGradient></defs><rect width="100" height="20" fill="url(%23a)" /></svg>') repeat-x;
        opacity: 0.3;
      }

      .brand-name {
        color: #ffffff;
        font-size: 32px;
        font-weight: 700;
        margin: 0;
        position: relative;
        z-index: 1;
      }

      /* Content styling */
      .content-section {
        padding: 40px;
        text-align: center;
      }

      .welcome-text {
        color: #1f2937;
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 12px;
      }

      .description-text {
        color: #6b7280;
        font-size: 16px;
        margin-bottom: 32px;
        line-height: 1.6;
      }

      .security-notice {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        border: 1px solid #f59e0b;
        border-radius: 12px;
        padding: 16px;
        margin: 24px 0;
        color: #92400e;
        font-size: 14px;
        font-weight: 500;
      }
      .global {
        background: #15803d;
        border-top-left-radius: 20px;
        padding: 10px;
        padding-bottom: 5px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
      }
      .bites {
        background: #fff;
        border-bottom-right-radius: 20px;
        padding: 10px;
        padding-bottom: 5px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color: #15803d;
      }

      /* Footer styling */
      .footer-section {
        background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
        padding: 32px 40px;
        text-align: center;
        border-top: 1px solid #e5e7eb;
      }

      .footer-text {
        color: #9ca3af;
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 16px;
      }

      .footer-links {
        color: #16a34a;
        text-decoration: none;
        font-weight: 500;
        margin: 0 12px;
      }

      .footer-links:hover {
        text-decoration: underline;
      }

      /* Responsive design */
      @media screen and (max-width: 600px) {
        .email-card {
          margin: 10px;
          border-radius: 16px;
        }
        
        .content-section {
          padding: 30px 24px;
        }
        
        .otp-code {
          font-size: 28px;
          letter-spacing: 4px;
        }
        
        .otp-button {
          font-size: 15px;
          padding: 14px 28px;
        }
        
        .brand-name {
          font-size: 28px;
        }
        
        .welcome-text {
          font-size: 20px;
        }
        
        .food-icon {
          font-size: 20px;
        }
      }

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        .content-bg {
          background: linear-gradient(180deg, #ffffff 0%, #f8fffe 100%);
        }
      }
    </style>
  </head>

  <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); min-height: 100vh;">
    <table width="100%" cellpadding="0" cellspacing="0" style="min-height: 100vh;">
      <tr>
        <td align="center" style="padding: 40px 20px;">
          <table class="email-card" cellpadding="0" cellspacing="0">
            
            <!-- Header Section -->
            <tr>
              <td class="header-section header-gradient">
                <div>
                  <span class="food-icon">🥗</span>
                  <span class="food-icon">🍕</span>
                  <span class="food-icon">🍜</span>
                </div>
                <h1 class="brand-name"> <span class="global">Global</span><span class="bites">Bites</span></h1>
                <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 8px 0 0 0; font-weight: 400;">
                  Taste the World, One Bite at a Time
                </p>
              </td>
            </tr>

            <!-- Main Content Section -->
            <tr>
              <td class="content-section content-bg">
                <h2 class="welcome-text">🔐 Verify Your Email Address</h2>
                <p class="description-text">
                  Welcome to the GlobalBites family! Please use the verification code below to complete your account setup and start exploring delicious cuisines from around the world.
                </p>
                
                <div class="otp-container">
                  <div class="otp-label">Your Verification Code</div>
                  <div class="otp-code">{OTP_CODE}</div>
                </div>

                <div class="security-notice">
                  <strong>🛡️ Security Notice:</strong> This code expires in 10 minutes. Never share your OTP with anyone. Our team will never ask for your verification code.
                </div>

                <a href="https://globalbites.vercel.app/verify-otp" class="otp-button">
                  ✨ Verify My Account
                </a>

                <p style="color: #9ca3af; font-size: 14px; margin-top: 24px;">
                  Having trouble? Contact our support team and we'll help you get started.
                </p>
              </td>
            </tr>

            <!-- Footer Section -->
            <tr>
              <td class="footer-section">
                <p class="footer-text">
                  If you didn't create a GlobalBites account, you can safely ignore this email.
                </p>
                <div style="margin: 16px 0;">
                  <a href="#" class="footer-links">Help Center</a>
                  <a href="#" class="footer-links">Contact Support</a>
                  <a href="#" class="footer-links">Privacy Policy</a>
                </div>
                <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
                  <strong>GlobalBites</strong> - Premium Food Delivery Experience<br>
                  &copy; ${new Date().getFullYear()} GlobalBites Inc. All rights reserved.
                </p>
                
                <!-- Social Media Icons -->
                <div style="margin-top: 20px;">
                  <span style="font-size: 20px; margin: 0 8px; color: #16a34a;">📱</span>
                  <span style="font-size: 20px; margin: 0 8px; color: #16a34a;">🌐</span>
                  <span style="font-size: 20px; margin: 0 8px; color: #16a34a;">📧</span>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`

export const emailWelcomeTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to GlobalBites - Your Culinary Journey Begins!</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      /* Import Google Fonts */
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap");

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
        background: linear-gradient(
          135deg,
          #f0fdf4 0%,
          #dcfce7 50%,
          #bbf7d0 100%
        );
        font-family: "Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        min-height: 100vh;
      }

      .email-container {
        max-width: 650px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 24px;
        overflow: hidden;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        position: relative;
        border: 1px solid rgba(34, 197, 94, 0.1);
      }

      .email-container::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #22c55e, #16a34a, #15803d, #166534);
        z-index: 10;
      }

      /* Header Section */
      .email-header {
        background: linear-gradient(
          135deg,
          #22c55e 0%,
          #16a34a 50%,
          #15803d 100%
        );
        color: white;
        padding: 50px 30px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      .global {
        background: #15803d;
        border-top-left-radius: 20px;
        padding: 10px;
        padding-bottom: 5px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
      }
      .bites {
        background: #fff;
        border-bottom-right-radius: 20px;
        padding: 10px;
        padding-bottom: 5px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color: #15803d;
      }

      .email-header::before {
        content: "";
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          rgba(255, 255, 255, 0.03) 10px,
          rgba(255, 255, 255, 0.03) 20px
        );
        animation: shimmer 20s linear infinite;
        pointer-events: none;
      }

      @keyframes shimmer {
        0% {
          transform: translateX(-100%) translateY(-100%) rotate(45deg);
        }
        100% {
          transform: translateX(100%) translateY(100%) rotate(45deg);
        }
      }

      .brand-section {
        position: relative;
        z-index: 2;
      }

      .logo-container {
        margin-bottom: 20px;
      }

      .logo-text {
        font-family: "Playfair Display", serif;
        font-size: 42px;
        font-weight: 700;
        margin: 0;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        letter-spacing: -1px;
      }

      .logo-emojis {
        font-size: 32px;
        margin: 0 12px;
        display: inline-block;
        animation: bounce 2s ease-in-out infinite;
      }

      .logo-emojis:nth-child(2) {
        animation-delay: -0.5s;
      }
      .logo-emojis:nth-child(3) {
        animation-delay: -1s;
      }
      .logo-emojis:nth-child(4) {
        animation-delay: -1.5s;
      }

      @keyframes bounce {
        0%,
        20%,
        50%,
        80%,
        100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-12px);
        }
        60% {
          transform: translateY(-6px);
        }
      }

      .tagline {
        font-size: 18px;
        font-weight: 400;
        margin: 16px 0 0 0;
        opacity: 0.95;
        font-style: italic;
      }

      /* Content Section */
      .email-body {
        padding: 50px 40px;
        text-align: center;
        background: linear-gradient(180deg, #ffffff 0%, #fefffe 100%);
      }

      .welcome-title {
        font-family: "Playfair Display", serif;
        font-size: 32px;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 16px;
        line-height: 1.3;
      }

      .username-highlight {
        color: #16a34a;
        position: relative;
      }

      .username-highlight::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, #22c55e, #16a34a);
        border-radius: 2px;
      }

      .welcome-text {
        font-size: 18px;
        color: #4b5563;
        margin-bottom: 32px;
        line-height: 1.7;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
      }

      .highlight-text {
        color: #16a34a;
        font-weight: 600;
      }

      /* Feature Cards */
      .features-section {
        margin: 40px 0;
      }

      .features-grid {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 20px;
        margin: 30px 0;
      }

      .feature-card {
        background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        border: 2px solid #bbf7d0;
        border-radius: 16px;
        padding: 24px 16px;
        flex: 1;
        min-width: 140px;
        max-width: 160px;
        text-align: center;
        transition: all 0.3s ease;
      }

      .feature-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(34, 197, 94, 0.15);
      }

      .feature-icon {
        font-size: 32px;
        margin-bottom: 12px;
        display: block;
      }

      .feature-title {
        font-size: 14px;
        font-weight: 600;
        color: #15803d;
        margin-bottom: 8px;
      }

      .feature-desc {
        font-size: 12px;
        color: #16a34a;
        line-height: 1.4;
      }

      /* CTA Button */
      .cta-section {
        margin: 40px 0 30px 0;
      }

      .cta-button {
        display: inline-block;
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        color: white !important;
        text-decoration: none;
        padding: 18px 40px;
        font-weight: 600;
        font-size: 16px;
        border-radius: 50px;
        box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      .cta-button::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.2),
          transparent
        );
        transition: left 0.5s ease;
      }

      .cta-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 35px rgba(34, 197, 94, 0.4);
      }

      .cta-button:hover::before {
        left: 100%;
      }

      .cta-text {
        position: relative;
        z-index: 1;
      }

      /* Secondary Info */
      .secondary-info {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        border: 1px solid #f59e0b;
        border-radius: 16px;
        padding: 20px;
        margin: 30px 0;
        color: #92400e;
      }

      .secondary-info h4 {
        margin: 0 0 8px 0;
        font-size: 16px;
        font-weight: 600;
      }

      .secondary-info p {
        margin: 0;
        font-size: 14px;
        line-height: 1.5;
      }

      /* Footer */
      .email-footer {
        background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
        text-align: center;
        padding: 40px 30px;
        border-top: 1px solid #e5e7eb;
      }

      .footer-content {
        max-width: 400px;
        margin: 0 auto;
      }

      .footer-text {
        font-size: 14px;
        color: #6b7280;
        margin-bottom: 16px;
      }

      .footer-links {
        margin: 20px 0;
      }

      .footer-link {
        color: #16a34a;
        text-decoration: none;
        font-weight: 500;
        margin: 0 16px;
        font-size: 14px;
      }

      .footer-link:hover {
        text-decoration: underline;
      }

      .copyright {
        font-size: 12px;
        color: #9ca3af;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #e5e7eb;
      }

      .social-icons {
        margin: 20px 0;
      }

      .social-icon {
        font-size: 24px;
        margin: 0 8px;
        color: #16a34a;
        text-decoration: none;
        transition: transform 0.3s ease;
      }

      .social-icon:hover {
        transform: scale(1.2);
      }

      /* Mobile Responsiveness */
      @media screen and (max-width: 600px) {
        .email-container {
          margin: 20px 10px;
          border-radius: 20px;
        }

        .email-header {
          padding: 40px 20px;
        }

        .logo-text {
          font-size: 32px;
        }

        .logo-emojis {
          font-size: 24px;
          margin: 0 6px;
        }

        .email-body {
          padding: 40px 24px;
        }

        .welcome-title {
          font-size: 24px;
        }

        .welcome-text {
          font-size: 16px;
        }

        .features-grid {
          flex-direction: column;
          align-items: center;
        }

        .feature-card {
          max-width: 280px;
          width: 100%;
        }

        .cta-button {
          width: 100%;
          max-width: 300px;
          padding: 16px 32px;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
      }

      /* Subtle animations */
      .email-container {
        animation: slideUp 0.8s ease-out;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    </style>
  </head>

  <body>
    <div class="email-container">
      <!-- Header Section -->
      <div class="email-header">
        <div class="brand-section">
          <div class="logo-container">
            <span class="logo-emojis">🍕</span>
            <span class="logo-emojis">🥗</span>
            <span class="logo-emojis">🍜</span>
            <span class="logo-emojis">🍰</span>
          </div>
          <h1 class="logo-text">
            <span class="global">Global</span><span class="bites">Bites</span>
          </h1>
          <p class="tagline">Where Every Ingredient Tells a Story</p>
        </div>
      </div>

      <!-- Main Content -->
      <div class="email-body">
        <h2 class="welcome-title">
          Welcome, <span class="username-highlight">{USERNAME}</span>! 🎉
        </h2>

        <p class="welcome-text">
          We're absolutely <span class="highlight-text">thrilled</span> to
          welcome you to the GlobalBites family! Your culinary adventure starts
          now, where we transform your simple ingredients into
          <span class="highlight-text">extraordinary meals</span> that'll make
          your kitchen the heart of your home.
        </p>

        <!-- Feature Cards -->
        <div class="features-section">
          <div class="features-grid">
            <div class="feature-card">
              <span class="feature-icon">🔍</span>
              <div class="feature-title">Smart Search</div>
              <p class="feature-desc">Find recipes with what you have</p>
            </div>
            <div class="feature-card">
              <span class="feature-icon">👨‍🍳</span>
              <div class="feature-title">Expert Tips</div>
              <p class="feature-desc">Learn from world-class chefs</p>
            </div>
            <div class="feature-card">
              <span class="feature-icon">🌟</span>
              <div class="feature-title">Personalized</div>
              <p class="feature-desc">Recipes tailored just for you</p>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="cta-section">
          <a href="https://globalbites.vercel.app" class="cta-button">
            <span class="cta-text">🚀 Start Your Culinary Journey</span>
          </a>
        </div>

        <!-- Additional Info -->
        <div class="secondary-info">
          <h4>🎁 Special Welcome Bonus!</h4>
          <p>
            As a new member, enjoy access to our premium recipe collection and
            exclusive chef masterclasses for the first 30 days - completely
            free!
          </p>
        </div>

        <p style="margin-top: 30px; font-size: 14px; color: #6b7280">
          Didn't create this account? No worries! You can safely ignore this
          email or
          <a href="#" style="color: #16a34a; font-weight: 500"
            >let us know here</a
          >.
        </p>
      </div>

      <!-- Footer -->
      <div class="email-footer">
        <div class="footer-content">
          <p class="footer-text">
            Thank you for choosing GlobalBites. We're excited to be part of your
            cooking journey!
          </p>

          <div class="footer-links">
            <a href="https://globalbites.vercel.app" class="footer-link"
              >Visit Website</a
            >
            <a href="#" class="footer-link">Recipe Blog</a>
            <a href="#" class="footer-link">Help Center</a>
            <a href="#" class="footer-link">Contact Us</a>
          </div>

          <div class="social-icons">
            <a href="#" class="social-icon">📱</a>
            <a href="#" class="social-icon">🌐</a>
            <a href="#" class="social-icon">📧</a>
            <a href="#" class="social-icon">📺</a>
          </div>

          <div class="copyright">
            <strong>GlobalBites</strong> - Premium Culinary Experience<br />
            &copy; ${new Date().getFullYear()} GlobalBites Inc. All rights
            reserved.<br />
            <a
              href="https://globalbites.vercel.app"
              style="color: #16a34a; text-decoration: none"
              >globalbites.com</a
            >
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`