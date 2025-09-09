// Authentication middleware
const userService = require('../services/userService');

/**
 * Middleware to authenticate JWT token
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required'
    });
  }

  try {
    const decoded = userService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
};

/**
 * Middleware to optionally authenticate token (user may or may not be logged in)
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = userService.verifyToken(token);
      req.user = decoded;
    } catch (error) {
      // Token is invalid but that's ok for optional auth
      req.user = null;
    }
  } else {
    req.user = null;
  }
  
  next();
};

/**
 * Middleware to validate request body fields
 */
const validateFields = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = [];
    
    for (const field of requiredFields) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }
    
    next();
  };
};

/**
 * Middleware to validate email format
 */
const validateEmail = (req, res, next) => {
  const { email } = req.body;
  
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }
  }
  
  next();
};

/**
 * Middleware to validate password strength
 */
const validatePassword = (req, res, next) => {
  const { password } = req.body;
  
  if (password) {
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long'
      });
    }
    
    // Add more password strength requirements if needed
    // const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    // if (!strongPasswordRegex.test(password)) {
    //   return res.status(400).json({
    //     success: false,
    //     error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    //   });
    // }
  }
  
  next();
};

/**
 * Middleware to validate username
 */
const validateUsername = (req, res, next) => {
  const { username } = req.body;
  
  if (username) {
    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({
        success: false,
        error: 'Username must be between 3 and 20 characters'
      });
    }
    
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        success: false,
        error: 'Username can only contain letters, numbers, underscores, and hyphens'
      });
    }
  }
  
  next();
};

/**
 * Error handling middleware for async routes
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  authenticateToken,
  optionalAuth,
  validateFields,
  validateEmail,
  validatePassword,
  validateUsername,
  asyncHandler
};