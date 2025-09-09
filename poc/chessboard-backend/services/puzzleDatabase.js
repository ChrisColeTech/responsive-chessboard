// SQLite database service for chess puzzles (Node.js backend)
const Database = require('better-sqlite3');
const path = require('path');

class PuzzleDatabaseService {
  constructor() {
    // Path to the database file
    this.dbPath = path.resolve(__dirname, '../database/chess_training.db');
    this.db = null;
    this.initializeDatabase();
  }

  initializeDatabase() {
    try {
      this.db = new Database(this.dbPath, { readonly: true });
      console.log('✅ Connected to puzzle database at:', this.dbPath);
      
      // Test connection
      const result = this.db.prepare('SELECT COUNT(*) as count FROM puzzles').get();
      console.log(`📊 Database contains ${result.count} puzzles`);
    } catch (error) {
      console.error('❌ Failed to connect to database:', error);
      throw error;
    }
  }

  parseJsonField(jsonString, fallback) {
    try {
      return JSON.parse(jsonString);
    } catch {
      return fallback;
    }
  }

  transformPuzzle(raw) {
    return {
      id: raw.id,
      fen: raw.fen,
      solution_moves: this.parseJsonField(raw.solution_moves, []),
      themes: this.parseJsonField(raw.themes, []),
      rating: raw.rating,
      description: raw.description,
      created_at: raw.created_at
    };
  }

  /**
   * Get a random puzzle based on filters
   */
  getRandomPuzzle(filters = {}) {
    try {
      const { minRating = 1000, maxRating = 2000, themes = [] } = filters;
      
      let query = `
        SELECT * FROM puzzles 
        WHERE rating >= ? AND rating <= ?
      `;
      const params = [minRating, maxRating];

      // Add theme filtering if specified
      if (themes.length > 0) {
        const themeConditions = themes.map(() => 'themes LIKE ?').join(' OR ');
        query += ` AND (${themeConditions})`;
        themes.forEach(theme => params.push(`%"${theme}"%`));
      }

      query += ' ORDER BY RANDOM() LIMIT 1';

      const stmt = this.db.prepare(query);
      const result = stmt.get(...params);

      return result ? this.transformPuzzle(result) : null;
    } catch (error) {
      console.error('Failed to get random puzzle:', error);
      throw error;
    }
  }

  /**
   * Get puzzle by ID
   */
  getPuzzleById(id) {
    try {
      const stmt = this.db.prepare('SELECT * FROM puzzles WHERE id = ?');
      const result = stmt.get(id);

      return result ? this.transformPuzzle(result) : null;
    } catch (error) {
      console.error('Failed to get puzzle by ID:', error);
      throw error;
    }
  }

  /**
   * Get multiple puzzles with pagination
   */
  getPuzzles(filters = {}) {
    try {
      const { 
        minRating = 1000, 
        maxRating = 2000, 
        themes = [], 
        limit = 10, 
        offset = 0 
      } = filters;

      let query = `
        SELECT * FROM puzzles 
        WHERE rating >= ? AND rating <= ?
      `;
      const params = [minRating, maxRating];

      // Add theme filtering
      if (themes.length > 0) {
        const themeConditions = themes.map(() => 'themes LIKE ?').join(' OR ');
        query += ` AND (${themeConditions})`;
        themes.forEach(theme => params.push(`%"${theme}"%`));
      }

      query += ' ORDER BY rating ASC LIMIT ? OFFSET ?';
      params.push(limit, offset);

      const stmt = this.db.prepare(query);
      const results = stmt.all(...params);

      return results.map(result => this.transformPuzzle(result));
    } catch (error) {
      console.error('Failed to get puzzles:', error);
      throw error;
    }
  }

  /**
   * Get available themes
   */
  getAvailableThemes() {
    try {
      const stmt = this.db.prepare('SELECT DISTINCT themes FROM puzzles LIMIT 1000');
      const results = stmt.all();
      
      const themesSet = new Set();
      results.forEach(row => {
        const themes = this.parseJsonField(row.themes, []);
        themes.forEach(theme => themesSet.add(theme));
      });

      return Array.from(themesSet).sort();
    } catch (error) {
      console.error('Failed to get themes:', error);
      throw error;
    }
  }

  /**
   * Get puzzle statistics
   */
  getPuzzleStats() {
    try {
      const countStmt = this.db.prepare('SELECT COUNT(*) as total FROM puzzles');
      const avgRatingStmt = this.db.prepare('SELECT AVG(rating) as avg_rating FROM puzzles');
      const minRatingStmt = this.db.prepare('SELECT MIN(rating) as min_rating FROM puzzles');
      const maxRatingStmt = this.db.prepare('SELECT MAX(rating) as max_rating FROM puzzles');

      const total = countStmt.get().total;
      const avgRating = Math.round(avgRatingStmt.get().avg_rating);
      const minRating = minRatingStmt.get().min_rating;
      const maxRating = maxRatingStmt.get().max_rating;

      return {
        totalPuzzles: total,
        averageRating: avgRating,
        minRating,
        maxRating
      };
    } catch (error) {
      console.error('Failed to get puzzle stats:', error);
      throw error;
    }
  }

  /**
   * Search puzzles by description
   */
  searchPuzzles(searchTerm, limit = 10) {
    try {
      const stmt = this.db.prepare(`
        SELECT * FROM puzzles 
        WHERE description LIKE ? 
        ORDER BY rating ASC 
        LIMIT ?
      `);
      const results = stmt.all(`%${searchTerm}%`, limit);

      return results.map(result => this.transformPuzzle(result));
    } catch (error) {
      console.error('Failed to search puzzles:', error);
      throw error;
    }
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
const puzzleDatabase = new PuzzleDatabaseService();

module.exports = puzzleDatabase;