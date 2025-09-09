// Express.js backend server for chess puzzle database
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const puzzleRoutes = require('./routes/puzzleRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// Logging middleware
app.use(morgan('combined'));

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173', // Vite dev server
    'http://127.0.0.1:5173',
    'http://172.29.125.14:5173' // Your network address
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'chessboard-backend'
  });
});

// API routes
app.use('/api/puzzles', puzzleRoutes);
app.use('/api/auth', authRoutes);

// Root endpoint with API documentation
app.get('/', (req, res) => {
  res.json({
    message: 'Chessboard Backend API',
    version: '1.0.0',
    documentation: {
      endpoints: {
        'GET /health': 'Health check endpoint',
        'GET /api/puzzles': 'Get puzzles with filters (default: 10 puzzles)',
        'GET /api/puzzles/random': 'Get a random puzzle',
        'GET /api/puzzles/stats': 'Get database statistics',
        'GET /api/puzzles/themes': 'Get available puzzle themes',
        'GET /api/puzzles/search': 'Search puzzles by description',
        'GET /api/puzzles/:id': 'Get specific puzzle by ID',
        'POST /api/auth/register': 'Register new user account',
        'POST /api/auth/login': 'Authenticate user login',
        'POST /api/auth/forgot-password': 'Request password reset',
        'POST /api/auth/reset-password': 'Reset password with token',
        'POST /api/auth/change-password': 'Change password (authenticated)',
        'GET /api/auth/me': 'Get current user info (authenticated)',
        'PUT /api/auth/profile': 'Update user profile (authenticated)',
        'POST /api/auth/verify-token': 'Verify JWT token validity',
        'POST /api/auth/logout': 'Logout user (client-side token removal)'
      },
      parameters: {
        'minRating': 'Minimum puzzle rating (default: 1000)',
        'maxRating': 'Maximum puzzle rating (default: 2000)',
        'themes': 'Comma-separated themes to filter by',
        'limit': 'Number of results to return (default: 10)',
        'offset': 'Number of results to skip for pagination',
        'q': 'Search query for puzzle descriptions'
      },
      examples: {
        'Get 25 puzzles': '/api/puzzles?limit=25',
        'Get puzzles page 2': '/api/puzzles?limit=10&offset=10',
        'Filter by rating': '/api/puzzles?minRating=1500&maxRating=1800',
        'Filter by theme': '/api/puzzles?themes=endgame,fork',
        'Search puzzles': '/api/puzzles/search?q=checkmate',
        'Random hard puzzle': '/api/puzzles/random?minRating=2000'
      },
      database: {
        totalPuzzles: 32615,
        ratingRange: '800-2500'
      }
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('⏹️ Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('⏹️ Shutting down gracefully...');
  process.exit(0);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Chessboard backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🧩 Puzzle API: http://localhost:${PORT}/api/puzzles`);
  console.log(`🌍 Network access: http://172.29.125.14:${PORT}`);
});

module.exports = app;