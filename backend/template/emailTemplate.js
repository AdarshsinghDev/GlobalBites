export const emailVerificationTemplate = `<!DOCTYPE html>
<html lang="en" style="margin: 0; padding: 0;">
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Email - GlobalBites</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      /* Fallback font styles */
      body, table, td {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }

      /* Button styling */
      .otp-button {
        background-color: #4caf50;
        color: #ffffff !important;
        text-decoration: none;
        padding: 12px 25px;
        display: inline-block;
        border-radius: 6px;
        font-size: 18px;
        font-weight: bold;
      }

      .otp-code {
        font-size: 32px;
        font-weight: bold;
        letter-spacing: 6px;
        color: #4caf50;
        margin: 15px 0;
      }

      @media screen and (max-width: 600px) {
        .otp-code {
          font-size: 24px;
          letter-spacing: 3px;
        }
        .otp-button {
          font-size: 16px;
          padding: 10px 20px;
        }
      }
    </style>
  </head>

  <body style="margin: 0; padding: 0; background-color: #f2f2f2;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <table
            width="100%"
            style="max-width: 600px; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); overflow: hidden;"
            cellpadding="0"
            cellspacing="0"
          >
            <!-- Header -->
            <tr>
              <td align="center" style="background-color: #4caf50; padding: 30px;">
                <h1 style="color: #ffffff; font-size: 28px; margin: 0;">GlobalBites🍽️</h1>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td style="padding: 30px 40px; text-align: center;">
                <h2 style="color: #333333; margin-bottom: 10px;">Email Verification</h2>
                <p style="color: #555; font-size: 16px;">Use the OTP below to verify your email address</p>
                
                <div class="otp-code">{OTP_CODE}</div>

                <p style="color: #999; font-size: 14px;">
                  This OTP will expire in 10 minutes. Please do not share it with anyone.
                </p>

                <a href="#" class="otp-button" style="margin-top: 20px;">Verify Now</a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background-color: #f9f9f9; padding: 20px;">
                <p style="color: #999; font-size: 12px;">
                  If you didn’t request this, you can safely ignore this email.<br/>
                  &copy; ${new Date().getFullYear()} GlobalBites, All rights reserved.
                </p>
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
  <title>Welcome to GlobalBites</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }

    .email-container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
      animation: fadeIn 1s ease-in-out;
    }

    .email-header {
      background: linear-gradient(135deg, #4caf50, #66bb6a);
      color: white;
      padding: 40px 20px;
      text-align: center;
      animation: slideDown 0.8s ease-in-out;
    }

    .email-header h1 {
      margin: 0;
      font-size: 28px;
    }

    .logo {
      font-size: 48px;
      margin-bottom: 10px;
      animation: popIn 0.7s ease-out;
    }

    .email-body {
      padding: 30px 40px;
      text-align: center;
    }

    .email-body h2 {
      margin-top: 0;
      color: #333;
    }

    .email-body p {
      font-size: 16px;
      color: #555;
      line-height: 1.5;
    }

    .btn {
      display: inline-block;
      background-color: #4caf50;
      color: white;
      text-decoration: none;
      padding: 14px 28px;
      font-weight: bold;
      border-radius: 8px;
      margin-top: 20px;
      transition: background 0.3s;
    }

    .btn:hover {
      background-color: #43a047;
    }

    .email-footer {
      background-color: #f9f9f9;
      text-align: center;
      padding: 20px;
      font-size: 13px;
      color: #aaa;
    }

    @media screen and (max-width: 600px) {
      .email-body {
        padding: 20px;
      }

      .btn {
        width: 100%;
        box-sizing: border-box;
      }
    }
  </style>
</head>

<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Welcome to GlobalBites🍽️</h1>
    </div>

    <div class="email-body">
      <h2>Hello {USERNAME},</h2>
      <p>
        We're thrilled to have you on board at <strong>GlobalBites</strong> — your personalized recipe guide that turns your kitchen ingredients into magic meals! 🎉
      </p>

      <p>
        Let’s get cooking! Click below to explore dishes tailored just for you:
      </p>

      <a href="https://yourwebsite.com" class="btn">Start Exploring</a>

      <p style="margin-top: 30px; font-size: 14px; color: #888;">
        If you didn’t sign up, you can safely ignore this email.
      </p>
    </div>

    <div class="email-footer">
      &copy; ${new Date().getFullYear()} GlobalBites. All rights reserved.<br />
      <a href="https://yourwebsite.com" style="color: #4caf50;">globalbites.com</a>
    </div>
  </div>
</body>
</html>
`