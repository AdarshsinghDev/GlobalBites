export const emailVerificationTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Email - GlobalBites</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      /* Import modern fonts */
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
        background: #fafafa;
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, sans-serif;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* Container */
      .email-container {
        max-width: 580px;
        margin: 60px auto;
        background: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 60px rgba(0, 0, 0, 0.04);
        border: 1px solid rgba(0, 0, 0, 0.02);
      }

      /* Header - Ultra minimal */
      .email-header {
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        padding: 48px 40px;
        text-align: center;
        position: relative;
      }

      .brand {
        color: #ffffff;
        font-size: 24px;
        font-weight: 600;
        letter-spacing: -0.5px;
        margin: 0;
      }

      .brand-icon {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        margin: 0 6px;
        animation: pulse 2s infinite;
      }

      .brand-icon:nth-child(2) {
        animation-delay: 0.3s;
      }
      .brand-icon:nth-child(3) {
        animation-delay: 0.6s;
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 0.3;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.2);
        }
      }

      .header-subtitle {
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
        font-weight: 400;
        margin-top: 8px;
        letter-spacing: 0.5px;
      }

      /* Content - Clean spacing */
      .email-body {
        padding: 56px 40px;
        text-align: center;
      }

      .verification-title {
        font-size: 28px;
        font-weight: 300;
        color: #111827;
        margin-bottom: 8px;
        letter-spacing: -0.5px;
      }

      .verification-subtitle {
        font-size: 16px;
        color: #6b7280;
        margin-bottom: 40px;
        line-height: 1.6;
      }

      .highlight {
        color: #374151;
        font-weight: 500;
      }

      /* OTP Container - Modern design */
      .otp-container {
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        border: 2px solid #e2e8f0;
        border-radius: 16px;
        padding: 32px;
        margin: 40px 0;
        position: relative;
        transition: all 0.3s ease;
      }

      .otp-container:hover {
        border-color: #22c55e;
        box-shadow: 0 8px 25px rgba(34, 197, 94, 0.08);
      }

      .otp-label {
        font-size: 12px;
        font-weight: 600;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 16px;
      }

      .otp-code {
        font-size: 36px;
        font-weight: 600;
        letter-spacing: 12px;
        color: #16a34a;
        margin: 0;
        font-family: "SF Mono", "Monaco", "Menlo", "Roboto Mono", monospace;
        position: relative;
      }

      .otp-code::after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 2px;
        background: linear-gradient(90deg, #22c55e, #16a34a);
        border-radius: 1px;
      }

      /* CTA - Modern button */
      .cta-container {
        margin: 48px 0 32px 0;
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
      .cta-button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #111827;
        color: #ffffff;
        text-decoration: none;
        padding: 16px 32px;
        font-size: 15px;
        font-weight: 500;
        border-radius: 8px;
        transition: all 0.2s ease;
        letter-spacing: -0.25px;
      }

      .cta-button:hover {
        background: #1f2937;
        transform: translateY(-1px);
        box-shadow: 0 8px 25px rgba(17, 24, 39, 0.15);
      }

      .arrow {
        font-size: 16px;
        transition: transform 0.2s ease;
      }

      .cta-button:hover .arrow {
        transform: translateX(2px);
      }

      /* Security notice - Minimal alert */
      .security-notice {
        background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
        border: 1px solid #fbbf24;
        border-radius: 12px;
        padding: 20px;
        margin: 32px 0;
        text-align: left;
      }

      .security-title {
        font-size: 14px;
        font-weight: 600;
        color: #92400e;
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .security-desc {
        font-size: 13px;
        color: #a16207;
        line-height: 1.5;
      }

      /* Timer - Subtle indicator */
      .timer-section {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin: 24px 0;
        font-size: 13px;
        color: #6b7280;
      }

      .timer-dot {
        width: 6px;
        height: 6px;
        background: #22c55e;
        border-radius: 50%;
        animation: timerPulse 1s infinite;
      }

      @keyframes timerPulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.3;
        }
      }

      /* Footer - Ultra clean */
      .email-footer {
        background: #fafafa;
        padding: 32px 40px;
        text-align: center;
      }

      .footer-text {
        font-size: 13px;
        color: #9ca3af;
        margin-bottom: 16px;
      }

      .footer-links {
        display: flex;
        justify-content: center;
        gap: 24px;
        margin-bottom: 20px;
      }

      .footer-link {
        font-size: 13px;
        color: #6b7280;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s ease;
      }

      .footer-link:hover {
        color: #16a34a;
      }

      .copyright {
        font-size: 12px;
        color: #9ca3af;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid #f3f4f6;
      }

      /* Mobile optimization */
      @media screen and (max-width: 600px) {
        .email-container {
          margin: 20px;
          border-radius: 12px;
        }

        .email-header {
          padding: 40px 24px;
        }

        .email-body {
          padding: 40px 24px;
        }

        .verification-title {
          font-size: 24px;
        }

        .otp-container {
          padding: 24px;
        }

        .otp-code {
          font-size: 28px;
          letter-spacing: 8px;
        }

        .cta-button {
          width: 100%;
          justify-content: center;
        }

        .footer-links {
          flex-direction: column;
          gap: 12px;
        }

        .email-footer {
          padding: 32px 24px;
        }

        .timer-section {
          flex-direction: column;
          gap: 4px;
        }
      }

      /* Micro-interactions */
      .email-container {
        animation: fadeIn 0.6s ease-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Copy functionality indicator */
      .copy-hint {
        font-size: 12px;
        color: #9ca3af;
        margin-top: 12px;
        opacity: 0.8;
      }

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        body {
          background: #111827;
        }

        .email-container {
          background: #1f2937;
          box-shadow: 0 4px 60px rgba(0, 0, 0, 0.3);
        }
      }
    </style>
  </head>

  <body>
    <div class="email-container">
      <!-- Minimal Header -->
      <div class="email-header">
        <h1 class="brand">
          <span class="brand-icon"></span>
          <span class="global">Global</span><span class="bites">Bites</span>
          <span class="brand-icon"></span>
        </h1>
        <p class="header-subtitle">SECURE VERIFICATION</p>
      </div>

      <!-- Clean Content -->
      <div class="email-body">
        <h2 class="verification-title">Email Verification</h2>

        <p class="verification-subtitle">
          Enter this <span class="highlight">verification code</span> to
          complete your account setup and start your culinary journey.
        </p>

        <!-- Modern OTP Container -->
        <div class="otp-container">
          <div class="otp-label">Your Verification Code</div>
          <div class="otp-code">{OTP_CODE}</div>
          <div class="copy-hint">Tap to select and copy</div>
        </div>

        <!-- Timer Section -->
        <div class="timer-section">
          <div class="timer-dot"></div>
          <span>Code expires in 10 minutes</span>
          <div class="timer-dot"></div>
        </div>

        <!-- Security Notice -->
        <div class="security-notice">
          <div class="security-title">
            <span>🔒</span>
            Security Notice
          </div>
          <div class="security-desc">
            This verification code is unique to your account. Never share it
            with anyone. Our support team will never ask for your verification
            code.
          </div>
        </div>

        <!-- Modern CTA -->
        <div class="cta-container">
          <a href="https://globalbites.vercel.app/verify-otp" class="cta-button">
            Verify Account
            <span class="arrow">→</span>
          </a>
        </div>

        <p
          style="
            font-size: 13px;
            color: #9ca3af;
            text-align: center;
            margin-top: 32px;
          "
        >
          Didn't request this code?
          <a href="#" style="color: #6b7280; text-decoration: underline"
            >Report this email</a
          >
        </p>
      </div>

      <!-- Clean Footer -->
      <div class="email-footer">
        <p class="footer-text">
          Need help? Our security team is available 24/7 to assist you.
        </p>

        <div class="footer-links">
          <a href="https://globalbites.vercel.app" class="footer-link">Security Center</a>
          <a href="https://globalbites.vercel.app" class="footer-link">Help</a>
          <a href="https://globalbites.vercel.app" class="footer-link">Contact</a>
        </div>

        <div class="copyright">
          <strong>GlobalBites Security</strong><br />
          &copy; ${new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </div>
  </body>
</html>
`

export const emailWelcomeTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to GlobalBites</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      /* Import modern fonts */
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
        background: #fafafa;
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, sans-serif;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* Container */
      .email-container {
        max-width: 580px;
        margin: 60px auto;
        background: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 60px rgba(0, 0, 0, 0.04);
        border: 1px solid rgba(0, 0, 0, 0.02);
      }

      /* Header - Ultra minimal */
      .email-header {
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        padding: 48px 40px;
        text-align: center;
        position: relative;
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

      .brand {
        color: #ffffff;
        font-size: 24px;
        font-weight: 600;
        letter-spacing: -0.5px;
        margin: 0;
      }

      .brand-icon {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        margin: 0 6px;
        animation: pulse 2s infinite;
      }

      .brand-icon:nth-child(2) {
        animation-delay: 0.3s;
      }
      .brand-icon:nth-child(3) {
        animation-delay: 0.6s;
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 0.3;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.2);
        }
      }

      /* Content - Clean spacing */
      .email-body {
        padding: 56px 40px;
      }

      .greeting {
        font-size: 28px;
        font-weight: 300;
        color: #111827;
        margin-bottom: 8px;
        letter-spacing: -0.5px;
      }

      .username {
        font-weight: 600;
        color: #16a34a;
      }

      .message {
        font-size: 16px;
        color: #6b7280;
        margin: 24px 0 40px 0;
        line-height: 1.6;
      }

      .highlight {
        color: #374151;
        font-weight: 500;
      }

      /* CTA - Modern button */
      .cta-container {
        text-align: center;
        margin: 48px 0;
      }

      .cta-button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #111827;
        color: #ffffff;
        text-decoration: none;
        padding: 16px 32px;
        font-size: 15px;
        font-weight: 500;
        border-radius: 8px;
        transition: all 0.2s ease;
        letter-spacing: -0.25px;
      }

      .cta-button:hover {
        background: #1f2937;
        transform: translateY(-1px);
        box-shadow: 0 8px 25px rgba(17, 24, 39, 0.15);
      }

      .arrow {
        font-size: 16px;
        transition: transform 0.2s ease;
      }

      .cta-button:hover .arrow {
        transform: translateX(2px);
      }

      /* Features - Minimal grid */
      .features {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 32px;
        margin: 48px 0;
        padding: 32px 0;
        border-top: 1px solid #f3f4f6;
        border-bottom: 1px solid #f3f4f6;
      }

      .feature {
        text-align: center;
      }

      .feature-icon {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px auto;
        font-size: 20px;
        border: 1px solid #bbf7d0;
      }

      .feature-title {
        font-size: 14px;
        font-weight: 600;
        color: #111827;
        margin-bottom: 4px;
      }

      .feature-desc {
        font-size: 13px;
        color: #6b7280;
        line-height: 1.4;
      }

      /* Footer - Ultra clean */
      .email-footer {
        background: #fafafa;
        padding: 32px 40px;
        text-align: center;
      }

      .footer-text {
        font-size: 13px;
        color: #9ca3af;
        margin-bottom: 16px;
      }

      .footer-links {
        display: flex;
        justify-content: center;
        gap: 24px;
        margin-bottom: 20px;
      }

      .footer-link {
        font-size: 13px;
        color: #6b7280;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s ease;
      }

      .footer-link:hover {
        color: #16a34a;
      }

      .copyright {
        font-size: 12px;
        color: #9ca3af;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid #f3f4f6;
      }

      /* Bonus section - Subtle highlight */
      .bonus-section {
        background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
        border: 1px solid #fbbf24;
        border-radius: 12px;
        padding: 24px;
        margin: 32px 0;
        text-align: center;
      }

      .bonus-title {
        font-size: 15px;
        font-weight: 600;
        color: #92400e;
        margin-bottom: 4px;
      }

      .bonus-desc {
        font-size: 13px;
        color: #a16207;
        line-height: 1.4;
      }

      /* Mobile optimization */
      @media screen and (max-width: 600px) {
        .email-container {
          margin: 20px;
          border-radius: 12px;
        }

        .email-header {
          padding: 40px 24px;
        }

        .email-body {
          padding: 40px 24px;
        }

        .greeting {
          font-size: 24px;
        }

        .features {
          grid-template-columns: 1fr;
          gap: 24px;
          text-align: left;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 16px;
          text-align: left;
        }

        .feature-icon {
          margin: 0;
          flex-shrink: 0;
        }

        .feature-content {
          flex: 1;
        }

        .cta-button {
          width: 100%;
          justify-content: center;
        }

        .footer-links {
          flex-direction: column;
          gap: 12px;
        }

        .email-footer {
          padding: 32px 24px;
        }
      }

      /* Micro-interactions */
      .email-container {
        animation: fadeIn 0.6s ease-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        body {
          background: #111827;
        }

        .email-container {
          background: #1f2937;
          box-shadow: 0 4px 60px rgba(0, 0, 0, 0.3);
        }
      }
    </style>
  </head>

  <body>
    <div class="email-container">
      <!-- Minimal Header -->
      <div class="email-header">
        <h1 class="brand">
          <span class="brand-icon"></span>
          <span class="global">Global</span><span class="bites">Bites</span>
          <span class="brand-icon"></span>
        </h1>
      </div>

      <!-- Clean Content -->
      <div class="email-body">
        <h2 class="greeting">
          Welcome, <span class="username">{USERNAME}</span>
        </h2>

        <p class="message">
          Your culinary journey begins now. We've created a
          <span class="highlight">personalized experience</span>
          that transforms simple ingredients into extraordinary meals, tailored
          specifically for your taste.
        </p>

        <!-- Minimal Features -->
        <div class="features">
          <div class="feature">
            <div class="feature-icon">🔍</div>
            <div class="feature-content">
              <div class="feature-title">Smart Discovery</div>
              <div class="feature-desc">Instant recipe matching</div>
            </div>
          </div>
          <div class="feature">
            <div class="feature-icon">⚡</div>
            <div class="feature-content">
              <div class="feature-title">Quick Cooking</div>
              <div class="feature-desc">15-minute meal solutions</div>
            </div>
          </div>
          <div class="feature">
            <div class="feature-icon">🎯</div>
            <div class="feature-content">
              <div class="feature-title">Personal Touch</div>
              <div class="feature-desc">Curated for your preferences</div>
            </div>
          </div>
        </div>

        <!-- Subtle Bonus -->
        <div class="bonus-section">
          <div class="bonus-title">Premium Access Unlocked</div>
          <div class="bonus-desc">
            Exclusive recipes and chef masterclasses included for 30 days
          </div>
        </div>

        <!-- Modern CTA -->
        <div class="cta-container">
          <a href="https://globalbites.vercel.app/home" class="cta-button">
            Start Cooking
            <span class="arrow">→</span>
          </a>
        </div>

        <p
          style="
            font-size: 13px;
            color: #9ca3af;
            text-align: center;
            margin-top: 32px;
          "
        >
          Didn't sign up?
          <a href="#" style="color: #6b7280; text-decoration: underline"
            >Unsubscribe here</a
          >
        </p>
      </div>

      <!-- Clean Footer -->
      <div class="email-footer">
        <p class="footer-text">
          Questions? We're here to help make your cooking experience
          exceptional.
        </p>

        <div class="footer-links">
          <a href="https://globalbites.vercel.app" class="footer-link"
            >Help Center</a
          >
          <a href="https://globalbites.vercel.app" class="footer-link"
            >Recipes</a
          >
          <a href="https://globalbites.vercel.app" class="footer-link"
            >Community</a
          >
        </div>

        <div class="copyright">
          <strong>GlobalBites</strong><br />
          &copy; ${new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </div>
  </body>
</html>
`