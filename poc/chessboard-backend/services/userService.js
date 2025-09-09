// User service for database operations
const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

class UserService {
  constructor() {
    this.dbPath = path.resolve(__dirname, '../database/chess_training.db');
    this.db = null;
    this.initializeDatabase();
    this.jwtSecret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
    this.saltRounds = 12;
  }

  initializeDatabase() {
    try {
      this.db = new Database(this.dbPath, { readonly: false });
      console.log('✅ Connected to user database at:', this.dbPath);
      
      // Test connection and count users
      const result = this.db.prepare('SELECT COUNT(*) as count FROM users').get();
      console.log(`📊 Database contains ${result.count} users`);
    } catch (error) {
      console.error('❌ Failed to connect to user database:', error);
      throw error;
    }
  }

  /**
   * Create a new user account
   */
  async createUser(userData) {
    const { username, email, password } = userData;
    
    try {
      // Check if user already exists
      const existingUser = this.db.prepare(
        'SELECT id FROM users WHERE email = ? OR username = ?'
      ).get(email, username);
      
      if (existingUser) {
        throw new Error('User already exists with this email or username');
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, this.saltRounds);
      
      // Generate user ID
      const userId = uuidv4();
      
      // Insert user
      const insertUser = this.db.prepare(`
        INSERT INTO users (id, username, email, password_hash, created_at, updated_at)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `);
      
      const result = insertUser.run(userId, username, email, passwordHash);
      
      if (result.changes === 1) {
        // Create user progress record
        this.initializeUserProgress(userId);
        
        // Return user without password
        const newUser = this.getUserById(userId);
        return this.sanitizeUser(newUser);
      } else {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Authenticate user login
   */
  async authenticateUser(email, password) {
    try {
      // Get user by email
      const user = this.db.prepare('SELECT * FROM users WHERE email = ?').get(email);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }

      // Update last login
      this.updateLastLogin(user.id);
      
      // Generate JWT token
      const token = this.generateToken(user);
      
      return {
        user: this.sanitizeUser(user),
        token
      };
    } catch (error) {
      console.error('Error authenticating user:', error);
      throw error;
    }
  }

  /**
   * Get user by ID
   */
  getUserById(userId) {
    try {
      const user = this.db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
      return user;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      throw error;
    }
  }

  /**
   * Get user by email
   */
  getUserByEmail(email) {
    try {
      const user = this.db.prepare('SELECT * FROM users WHERE email = ?').get(email);
      return user;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateUser(userId, updates) {
    try {
      const allowedFields = ['username', 'email', 'chess_elo', 'puzzle_rating', 'preferences'];
      const fields = [];
      const values = [];
      
      for (const [key, value] of Object.entries(updates)) {
        if (allowedFields.includes(key)) {
          fields.push(`${key} = ?`);
          values.push(value);
        }
      }
      
      if (fields.length === 0) {
        throw new Error('No valid fields to update');
      }
      
      // Add updated_at and userId
      fields.push('updated_at = CURRENT_TIMESTAMP');
      values.push(userId);
      
      const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
      const result = this.db.prepare(query).run(...values);
      
      if (result.changes === 1) {
        return this.sanitizeUser(this.getUserById(userId));
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  /**
   * Change user password
   */
  async changePassword(userId, currentPassword, newPassword) {
    try {
      const user = this.getUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Verify current password
      const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);
      if (!isValidPassword) {
        throw new Error('Current password is incorrect');
      }

      // Hash new password
      const newPasswordHash = await bcrypt.hash(newPassword, this.saltRounds);
      
      // Update password
      const result = this.db.prepare(`
        UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
      `).run(newPasswordHash, userId);
      
      if (result.changes === 1) {
        return { success: true };
      } else {
        throw new Error('Failed to update password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }

  /**
   * Create password reset token
   */
  async createPasswordResetToken(email) {
    try {
      const user = this.getUserByEmail(email);
      if (!user) {
        // Don't reveal if email exists
        return { success: true };
      }

      const resetToken = uuidv4();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry

      // Store reset token (you might want a separate table for this)
      const result = this.db.prepare(`
        UPDATE users SET 
          password_reset_token = ?, 
          password_reset_expires = ?,
          updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `).run(resetToken, expiresAt.toISOString(), user.id);
      
      if (result.changes === 1) {
        return { 
          success: true, 
          resetToken, 
          user: this.sanitizeUser(user) 
        };
      } else {
        throw new Error('Failed to create reset token');
      }
    } catch (error) {
      console.error('Error creating password reset token:', error);
      throw error;
    }
  }

  /**
   * Reset password using token
   */
  async resetPassword(resetToken, newPassword) {
    try {
      const user = this.db.prepare(`
        SELECT * FROM users 
        WHERE password_reset_token = ? 
        AND password_reset_expires > CURRENT_TIMESTAMP
      `).get(resetToken);
      
      if (!user) {
        throw new Error('Invalid or expired reset token');
      }

      // Hash new password
      const passwordHash = await bcrypt.hash(newPassword, this.saltRounds);
      
      // Update password and clear reset token
      const result = this.db.prepare(`
        UPDATE users SET 
          password_hash = ?, 
          password_reset_token = NULL,
          password_reset_expires = NULL,
          updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `).run(passwordHash, user.id);
      
      if (result.changes === 1) {
        return { success: true };
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }

  /**
   * Get user progress data
   */
  getUserProgress(userId) {
    try {
      const progress = this.db.prepare(
        'SELECT * FROM user_progress WHERE user_id = ?'
      ).get(userId);
      
      return progress;
    } catch (error) {
      console.error('Error getting user progress:', error);
      throw error;
    }
  }

  /**
   * Initialize user progress record
   */
  initializeUserProgress(userId) {
    try {
      const progressId = uuidv4();
      const result = this.db.prepare(`
        INSERT INTO user_progress (id, user_id)
        VALUES (?, ?)
      `).run(progressId, userId);
      
      return result.changes === 1;
    } catch (error) {
      console.error('Error initializing user progress:', error);
      throw error;
    }
  }

  /**
   * Update last login timestamp
   */
  updateLastLogin(userId) {
    try {
      this.db.prepare(`
        UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = ?
      `).run(userId);
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }

  /**
   * Generate JWT token
   */
  generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username
    };
    
    return jwt.sign(payload, this.jwtSecret, { 
      expiresIn: '7d' // Token expires in 7 days
    });
  }

  /**
   * Verify JWT token
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  /**
   * Remove sensitive data from user object
   */
  sanitizeUser(user) {
    if (!user) return null;
    
    const { password_hash, password_reset_token, password_reset_expires, ...sanitizedUser } = user;
    return sanitizedUser;
  }

  /**
   * Close database connection
   */
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

// Singleton instance
const userService = new UserService();

module.exports = userService;