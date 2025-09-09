// API routes for chess puzzles
const express = require('express');
const router = express.Router();
const puzzleDatabase = require('../services/puzzleDatabase');

// GET /api/puzzles - Get multiple puzzles with filters
router.get('/', async (req, res) => {
  try {
    const filters = {
      minRating: parseInt(req.query.minRating) || 1000,
      maxRating: parseInt(req.query.maxRating) || 2000,
      themes: req.query.themes ? req.query.themes.split(',') : [],
      limit: parseInt(req.query.limit) || 10,
      offset: parseInt(req.query.offset) || 0
    };

    const puzzles = puzzleDatabase.getPuzzles(filters);
    
    res.json({
      success: true,
      data: puzzles,
      filters: filters,
      count: puzzles.length
    });
  } catch (error) {
    console.error('Error getting puzzles:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch puzzles'
    });
  }
});

// GET /api/puzzles/random - Get a random puzzle
router.get('/random', async (req, res) => {
  try {
    const filters = {
      minRating: parseInt(req.query.minRating) || 1000,
      maxRating: parseInt(req.query.maxRating) || 2000,
      themes: req.query.themes ? req.query.themes.split(',') : []
    };

    const puzzle = puzzleDatabase.getRandomPuzzle(filters);
    
    if (!puzzle) {
      return res.status(404).json({
        success: false,
        error: 'No puzzles found matching criteria'
      });
    }

    res.json({
      success: true,
      data: puzzle
    });
  } catch (error) {
    console.error('Error getting random puzzle:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch random puzzle'
    });
  }
});

// GET /api/puzzles/stats - Get puzzle database statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = puzzleDatabase.getPuzzleStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error getting puzzle stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch puzzle statistics'
    });
  }
});

// GET /api/puzzles/themes - Get available themes
router.get('/themes', async (req, res) => {
  try {
    const themes = puzzleDatabase.getAvailableThemes();
    
    res.json({
      success: true,
      data: themes,
      count: themes.length
    });
  } catch (error) {
    console.error('Error getting themes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch themes'
    });
  }
});

// GET /api/puzzles/search - Search puzzles by description
router.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const limit = parseInt(req.query.limit) || 10;

    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        error: 'Search term (q) is required'
      });
    }

    const puzzles = puzzleDatabase.searchPuzzles(searchTerm, limit);
    
    res.json({
      success: true,
      data: puzzles,
      searchTerm: searchTerm,
      count: puzzles.length
    });
  } catch (error) {
    console.error('Error searching puzzles:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search puzzles'
    });
  }
});

// GET /api/puzzles/:id - Get puzzle by ID
router.get('/:id', async (req, res) => {
  try {
    const puzzleId = req.params.id;
    const puzzle = puzzleDatabase.getPuzzleById(puzzleId);
    
    if (!puzzle) {
      return res.status(404).json({
        success: false,
        error: 'Puzzle not found'
      });
    }

    res.json({
      success: true,
      data: puzzle
    });
  } catch (error) {
    console.error('Error getting puzzle by ID:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch puzzle'
    });
  }
});

module.exports = router;