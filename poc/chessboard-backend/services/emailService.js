// Email service for sending password reset emails
const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    // Configure email transporter
    // In development, you can use ethereal email for testing
    // In production, use your actual SMTP provider (Gmail, SendGrid, AWS SES, etc.)
    
    if (process.env.NODE_ENV === 'development') {
      // For development, create test account using ethereal
      this.createTestAccount();
    } else {
      // Production email configuration
      this.transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
    }
  }

  async createTestAccount() {
    try {
      // Generate test SMTP service account from ethereal.email
      const testAccount = await nodemailer.createTestAccount();
      
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      
      console.log('📧 Test email account created:', testAccount.user);
    } catch (error) {
      console.error('❌ Failed to create test email account:', error);
      // Fallback to mock transporter
      this.transporter = {
        sendMail: async (mailOptions) => {
          console.log('📧 Mock email sent:', mailOptions);
          return { messageId: 'mock-message-id' };
        }
      };
    }
  }

  async sendPasswordResetEmail(user, resetToken) {
    try {
      const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
      
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@chessapp.com',
        to: user.email,
        subject: 'Chess Training - Password Reset Request',
        html: this.generatePasswordResetEmailTemplate(user, resetUrl)
      };

      const info = await this.transporter.sendMail(mailOptions);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Password reset email sent to:', user.email);
        console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info));
      }
      
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Failed to send password reset email:', error);
      throw error;
    }
  }

  async sendWelcomeEmail(user) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@chessapp.com',
        to: user.email,
        subject: 'Welcome to Chess Training!',
        html: this.generateWelcomeEmailTemplate(user)
      };

      const info = await this.transporter.sendMail(mailOptions);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Welcome email sent to:', user.email);
        console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info));
      }
      
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Failed to send welcome email:', error);
      // Don't throw error for welcome email - it's not critical
      return { success: false, error: error.message };
    }
  }

  generatePasswordResetEmailTemplate(user, resetUrl) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset - Chess Training</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; background: linear-gradient(135deg, #0ea5e9, #eab308); padding: 30px; border-radius: 8px; }
          .header h1 { color: white; margin: 0; font-size: 28px; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 8px; margin: 20px 0; }
          .button { display: inline-block; background: #0ea5e9; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }
          .button:hover { background: #0284c7; }
          .footer { text-align: center; font-size: 14px; color: #666; margin-top: 30px; }
          .chess-icon { font-size: 48px; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="chess-icon">♔</div>
            <h1>Chess Training</h1>
          </div>
          
          <div class="content">
            <h2>Password Reset Request</h2>
            <p>Hi ${user.username || user.email},</p>
            <p>We received a request to reset your password for your Chess Training account. Click the button below to create a new password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" class="button">Reset Your Password</a>
            </div>
            
            <p><strong>This link will expire in 1 hour for security reasons.</strong></p>
            
            <p>If you didn't request a password reset, you can safely ignore this email. Your password won't be changed.</p>
            
            <hr style="margin: 30px 0; border: 1px solid #ddd;">
            <p><small>If the button above doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetUrl}">${resetUrl}</a></small></p>
          </div>
          
          <div class="footer">
            <p>This email was sent from Chess Training.<br>
            If you have questions, contact our support team.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generateWelcomeEmailTemplate(user) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Chess Training!</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; background: linear-gradient(135deg, #eab308, #0ea5e9); padding: 30px; border-radius: 8px; }
          .header h1 { color: white; margin: 0; font-size: 28px; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 8px; margin: 20px 0; }
          .feature { display: flex; align-items: center; margin: 20px 0; }
          .feature-icon { font-size: 24px; margin-right: 15px; min-width: 40px; }
          .button { display: inline-block; background: #eab308; color: #1f2937; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }
          .footer { text-align: center; font-size: 14px; color: #666; margin-top: 30px; }
          .chess-icon { font-size: 48px; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="chess-icon">🏆</div>
            <h1>Welcome to Chess Training!</h1>
          </div>
          
          <div class="content">
            <h2>Welcome aboard, ${user.username || user.email}!</h2>
            <p>Your chess training journey begins now. We're excited to help you improve your chess skills with our comprehensive training platform.</p>
            
            <h3>What you get access to:</h3>
            
            <div class="feature">
              <div class="feature-icon">🧩</div>
              <div>
                <strong>32,000+ Chess Puzzles</strong><br>
                <small>From beginner to grandmaster level</small>
              </div>
            </div>
            
            <div class="feature">
              <div class="feature-icon">📈</div>
              <div>
                <strong>Progress Tracking</strong><br>
                <small>Monitor your improvement over time</small>
              </div>
            </div>
            
            <div class="feature">
              <div class="feature-icon">🏆</div>
              <div>
                <strong>Achievement System</strong><br>
                <small>Unlock badges and reach milestones</small>
              </div>
            </div>
            
            <div class="feature">
              <div class="feature-icon">📚</div>
              <div>
                <strong>Opening Database</strong><br>
                <small>Study classic and modern openings</small>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" class="button">Start Training Now</a>
            </div>
          </div>
          
          <div class="footer">
            <p>Happy training!<br>
            The Chess Training Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

// Singleton instance
const emailService = new EmailService();

module.exports = emailService;