// Authentication API routes
const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const emailService = require('../services/emailService');
const { 
  authenticateToken, 
  validateFields, 
  validateEmail, 
  validatePassword, 
  validateUsername,
  asyncHandler 
} = require('../middleware/auth');

// POST /api/auth/register - Register new user
router.post('/register', 
  validateFields(['username', 'email', 'password']),
  validateEmail,
  validateUsername,
  validatePassword,
  asyncHandler(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      
      // Create user
      const user = await userService.createUser({ username, email, password });
      
      // Generate token
      const token = userService.generateToken(user);
      
      // Send welcome email (don't wait for it)
      emailService.sendWelcomeEmail(user).catch(error => {
        console.error('Failed to send welcome email:', error);
      });
      
      res.status(201).json({
        success: true,
        data: {
          user,
          token
        },
        message: 'User registered successfully'
      });
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.message.includes('already exists')) {
        return res.status(409).json({
          success: false,
          error: 'User already exists with this email or username'
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Registration failed'
      });
    }
  })
);

// POST /api/auth/login - Authenticate user
router.post('/login',
  validateFields(['email', 'password']),
  validateEmail,
  asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const result = await userService.authenticateUser(email, password);
      
      res.json({
        success: true,
        data: result,
        message: 'Login successful'
      });
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.message.includes('Invalid email or password')) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password'
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Login failed'
      });
    }
  })
);

// POST /api/auth/forgot-password - Request password reset
router.post('/forgot-password',
  validateFields(['email']),
  validateEmail,
  asyncHandler(async (req, res) => {
    try {
      const { email } = req.body;
      
      const result = await userService.createPasswordResetToken(email);
      
      if (result.success && result.resetToken) {
        // Send reset email
        await emailService.sendPasswordResetEmail(result.user, result.resetToken);
      }
      
      // Always return success to prevent email enumeration
      res.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent'
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      
      // Still return success to prevent email enumeration
      res.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent'
      });
    }
  })
);

// POST /api/auth/reset-password - Reset password with token
router.post('/reset-password',
  validateFields(['resetToken', 'password']),
  validatePassword,
  asyncHandler(async (req, res) => {
    try {
      const { resetToken, password } = req.body;
      
      const result = await userService.resetPassword(resetToken, password);
      
      if (result.success) {
        res.json({
          success: true,
          message: 'Password reset successfully'
        });
      } else {
        res.status(400).json({
          success: false,
          error: 'Invalid or expired reset token'
        });
      }
    } catch (error) {
      console.error('Reset password error:', error);
      
      if (error.message.includes('Invalid or expired')) {
        return res.status(400).json({
          success: false,
          error: 'Invalid or expired reset token'
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Password reset failed'
      });
    }
  })
);

// POST /api/auth/change-password - Change password (authenticated)
router.post('/change-password',
  authenticateToken,
  validateFields(['currentPassword', 'newPassword']),
  validatePassword,
  asyncHandler(async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user.id;
      
      const result = await userService.changePassword(userId, currentPassword, newPassword);
      
      if (result.success) {
        res.json({
          success: true,
          message: 'Password changed successfully'
        });
      } else {
        res.status(400).json({
          success: false,
          error: 'Failed to change password'
        });
      }
    } catch (error) {
      console.error('Change password error:', error);
      
      if (error.message.includes('Current password is incorrect')) {
        return res.status(400).json({
          success: false,
          error: 'Current password is incorrect'
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Password change failed'
      });
    }
  })
);

// GET /api/auth/me - Get current user info (authenticated)
router.get('/me',
  authenticateToken,
  asyncHandler(async (req, res) => {
    try {
      const userId = req.user.id;
      const user = userService.getUserById(userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      
      // Get user progress
      const progress = userService.getUserProgress(userId);
      
      res.json({
        success: true,
        data: {
          user: userService.sanitizeUser(user),
          progress
        }
      });
    } catch (error) {
      console.error('Get current user error:', error);
      
      res.status(500).json({
        success: false,
        error: 'Failed to get user information'
      });
    }
  })
);

// PUT /api/auth/profile - Update user profile (authenticated)
router.put('/profile',
  authenticateToken,
  asyncHandler(async (req, res) => {
    try {
      const userId = req.user.id;
      const updates = req.body;
      
      // Remove sensitive fields that shouldn't be updated this way
      delete updates.password;
      delete updates.password_hash;
      delete updates.id;
      delete updates.created_at;
      delete updates.updated_at;
      
      const updatedUser = await userService.updateUser(userId, updates);
      
      res.json({
        success: true,
        data: { user: updatedUser },
        message: 'Profile updated successfully'
      });
    } catch (error) {
      console.error('Update profile error:', error);
      
      if (error.message.includes('already exists')) {
        return res.status(409).json({
          success: false,
          error: 'Email or username already exists'
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Profile update failed'
      });
    }
  })
);

// POST /api/auth/verify-token - Verify if token is valid
router.post('/verify-token',
  asyncHandler(async (req, res) => {
    try {
      const { token } = req.body;
      
      if (!token) {
        return res.status(400).json({
          success: false,
          error: 'Token required'
        });
      }
      
      const decoded = userService.verifyToken(token);
      const user = userService.getUserById(decoded.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      
      res.json({
        success: true,
        data: {
          user: userService.sanitizeUser(user),
          tokenValid: true
        }
      });
    } catch (error) {
      console.error('Token verification error:', error);
      
      res.status(401).json({
        success: false,
        error: 'Invalid token',
        tokenValid: false
      });
    }
  })
);

// POST /api/auth/logout - Logout (for completeness, JWT is stateless)
router.post('/logout',
  asyncHandler(async (req, res) => {
    // With JWT, logout is handled client-side by removing the token
    // In a more complex setup, you might blacklist tokens server-side
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  })
);

module.exports = router;