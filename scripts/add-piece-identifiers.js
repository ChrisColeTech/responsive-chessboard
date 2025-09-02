#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Auto-detect piece mapping from properly named files (e.g., wK.png, bQ.png, etc.)
function detectPieceMapping(svgFiles) {
  const mapping = {};
  
  svgFiles.forEach(filename => {
    const baseName = path.basename(filename, '.svg');
    
    // Check if filename matches chess notation pattern (e.g., wK, bQ, etc.)
    const chessNotationMatch = baseName.match(/^([wb][KQRBNP])$/i);
    if (chessNotationMatch) {
      mapping[baseName] = chessNotationMatch[1];
      return;
    }
    
    // Check if filename contains chess piece names
    const lowerName = baseName.toLowerCase();
    if (lowerName.includes('white') && lowerName.includes('king')) mapping[baseName] = 'wK';
    else if (lowerName.includes('black') && lowerName.includes('king')) mapping[baseName] = 'bK';
    else if (lowerName.includes('white') && lowerName.includes('queen')) mapping[baseName] = 'wQ';
    else if (lowerName.includes('black') && lowerName.includes('queen')) mapping[baseName] = 'bQ';
    else if (lowerName.includes('white') && lowerName.includes('rook')) mapping[baseName] = 'wR';
    else if (lowerName.includes('black') && lowerName.includes('rook')) mapping[baseName] = 'bR';
    else if (lowerName.includes('white') && lowerName.includes('bishop')) mapping[baseName] = 'wB';
    else if (lowerName.includes('black') && lowerName.includes('bishop')) mapping[baseName] = 'bB';
    else if (lowerName.includes('white') && lowerName.includes('knight')) mapping[baseName] = 'wN';
    else if (lowerName.includes('black') && lowerName.includes('knight')) mapping[baseName] = 'bN';
    else if (lowerName.includes('white') && lowerName.includes('pawn')) mapping[baseName] = 'wP';
    else if (lowerName.includes('black') && lowerName.includes('pawn')) mapping[baseName] = 'bP';
  });
  
  return mapping;
}

const PIECE_NAMES = {
  'wK': 'white-king',
  'bK': 'black-king',
  'wQ': 'white-queen',
  'bQ': 'black-queen',
  'wR': 'white-rook',
  'bR': 'black-rook',
  'wB': 'white-bishop',
  'bB': 'black-bishop',
  'wN': 'white-knight',
  'bN': 'black-knight',
  'wP': 'white-pawn',
  'bP': 'black-pawn',
  'wK2': 'white-king-alt',
  'bK2': 'black-king-alt'
};

const INPUT_DIR = path.join(__dirname, '../assets/SVG_converted');
const OUTPUT_DIR = path.join(__dirname, '../assets/chess-pieces');

async function ensureDirectoryExists(dirPath) {
  try {
    await fs.promises.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

function addChessPieceIdentifiers(svgContent, pieceCode, pieceName, originalFileName) {
  // Parse and enhance the SVG with chess piece identifiers
  let enhanced = svgContent;
  
  // Replace the generic id with chess piece identifiers
  enhanced = enhanced.replace(/id="[^"]*"/, `id="${pieceCode}"`);
  
  // Add chess-specific attributes to the SVG element
  enhanced = enhanced.replace(
    /<svg([^>]*)>/,
    `<svg$1 data-piece="${pieceCode}" data-piece-name="${pieceName}" data-color="${pieceCode.charAt(0) === 'w' ? 'white' : 'black'}" data-type="${getChessPieceType(pieceCode)}" data-original="${originalFileName}">`
  );
  
  // Add class for styling
  enhanced = enhanced.replace(
    /<svg([^>]*)>/,
    `<svg class="chess-piece chess-piece--${pieceCode.toLowerCase()}" $1>`
  );
  
  return enhanced;
}

function getChessPieceType(pieceCode) {
  const typeMap = {
    'K': 'king',
    'Q': 'queen',
    'R': 'rook',
    'B': 'bishop',
    'N': 'knight',
    'P': 'pawn'
  };
  
  const type = pieceCode.slice(1).replace(/\d+$/, ''); // Remove color and numbers
  return typeMap[type] || 'unknown';
}

async function processFile(filename, pieceMapping) {
  const baseName = path.basename(filename, '.svg');
  const pieceCode = pieceMapping[baseName];
  
  if (!pieceCode) {
    console.log(`⚠️  No piece mapping found for: ${filename}`);
    return false;
  }
  
  const pieceName = PIECE_NAMES[pieceCode];
  const inputPath = path.join(INPUT_DIR, filename);
  const outputPath = path.join(OUTPUT_DIR, `${pieceCode}.svg`);
  
  try {
    console.log(`Processing: ${filename} -> ${pieceCode}.svg (${pieceName})`);
    
    const svgContent = await fs.promises.readFile(inputPath, 'utf8');
    const enhancedSvg = addChessPieceIdentifiers(svgContent, pieceCode, pieceName, baseName);
    
    await fs.promises.writeFile(outputPath, enhancedSvg);
    console.log(`✓ Created: ${pieceCode}.svg`);
    
    return true;
  } catch (error) {
    console.error(`✗ Error processing ${filename}:`, error.message);
    return false;
  }
}

async function main() {
  try {
    console.log('♟️  Chess Piece Identifier Tool');
    console.log('===============================');
    console.log();
    
    // Ensure output directory exists
    await ensureDirectoryExists(OUTPUT_DIR);
    
    // Read SVG files from input directory
    const files = await fs.promises.readdir(INPUT_DIR);
    const svgFiles = files.filter(file => path.extname(file).toLowerCase() === '.svg');
    
    if (svgFiles.length === 0) {
      console.log(`No SVG files found in ${INPUT_DIR}`);
      return;
    }
    
    console.log(`Found ${svgFiles.length} SVG files to process\n`);
    
    // Auto-detect piece mapping from filenames
    const pieceMapping = detectPieceMapping(svgFiles);
    
    // Show detected mapping
    console.log('📋 Auto-Detected Piece Mapping:');
    console.log('-------------------------------');
    Object.entries(pieceMapping).forEach(([filename, piece]) => {
      const pieceName = PIECE_NAMES[piece] || 'unknown';
      console.log(`  ${filename} -> ${piece} (${pieceName})`);
    });
    
    const unmappedFiles = svgFiles.filter(file => !pieceMapping[path.basename(file, '.svg')]);
    if (unmappedFiles.length > 0) {
      console.log('\n⚠️  Files with no detected mapping:');
      unmappedFiles.forEach(file => console.log(`  ${file}`));
    }
    console.log();
    
    let successCount = 0;
    let skippedCount = 0;
    
    // Process each SVG file
    for (const svgFile of svgFiles) {
      const success = await processFile(svgFile, pieceMapping);
      if (success) {
        successCount++;
      } else {
        skippedCount++;
      }
    }
    
    console.log('\n♟️  Processing Complete!');
    console.log(`✓ Successfully processed: ${successCount} files`);
    if (skippedCount > 0) {
      console.log(`⚠️  Skipped (no mapping): ${skippedCount} files`);
    }
    console.log(`📁 Output directory: ${OUTPUT_DIR}`);
    
    console.log('\n📝 To modify piece mappings, edit the PIECE_MAPPING object in this script.');
    
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { addChessPieceIdentifiers, detectPieceMapping };