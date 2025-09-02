#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../assets/chess-pieces');
const OUTPUT_DIR = path.join(__dirname, '../assets/chess-pieces');

// Color mapping for inversion
const COLOR_INVERSIONS = {
  // Fill colors - BLACK to WHITE
  'fill="black"': 'fill="white"',
  'fill="#000000"': 'fill="#FFFFFF"',
  'fill="#000"': 'fill="#FFF"',
  'fill="#1a1a1a"': 'fill="#FFFFFF"',
  'fill="#333333"': 'fill="#FFFFFF"',
  'fill="currentColor"': 'fill="white"',
  
  // Fill colors - WHITE to BLACK
  'fill="white"': 'fill="black"',
  'fill="#FFFFFF"': 'fill="#000000"',
  'fill="#FFF"': 'fill="#000"',
  
  // Stroke colors - preserve strokes, don't add them where they don't exist
  'stroke="black"': 'stroke="#333333"',
  'stroke="#000000"': 'stroke="#333333"',
  'stroke="#000"': 'stroke="#333"',
  'stroke="white"': 'stroke="black"',
  'stroke="#FFFFFF"': 'stroke="#000000"',
  'stroke="#FFF"': 'stroke="#000"',
  'stroke="#CCCCCC"': 'stroke="#333333"',
  'stroke="#333333"': 'stroke="#CCCCCC"',
  // DO NOT convert stroke="none" - leave as is to avoid adding unwanted strokes
};

function invertSvgColors(svgContent) {
  let invertedSvg = svgContent;
  
  // Use a more careful approach to avoid conflicts with bidirectional replacement
  // First convert black to temporary placeholder, then white to black, then placeholder to white
  
  // Step 1: Convert black colors to temporary placeholders
  invertedSvg = invertedSvg.replace(/fill="black"/gi, 'fill="TEMP_WHITE"');
  invertedSvg = invertedSvg.replace(/fill="#000000"/gi, 'fill="TEMP_FFFFFF"');
  invertedSvg = invertedSvg.replace(/fill="#000"/gi, 'fill="TEMP_FFF"');
  invertedSvg = invertedSvg.replace(/fill="#1a1a1a"/gi, 'fill="TEMP_FFFFFF2"');
  invertedSvg = invertedSvg.replace(/fill="#333333"/gi, 'fill="TEMP_FFFFFF3"');
  invertedSvg = invertedSvg.replace(/fill="currentColor"/gi, 'fill="TEMP_WHITE2"');
  
  // Step 2: Convert white colors to black
  invertedSvg = invertedSvg.replace(/fill="white"/gi, 'fill="black"');
  invertedSvg = invertedSvg.replace(/fill="#FFFFFF"/gi, 'fill="#000000"');
  invertedSvg = invertedSvg.replace(/fill="#FFF"/gi, 'fill="#000"');
  
  // Step 3: Convert temporary placeholders to white
  invertedSvg = invertedSvg.replace(/fill="TEMP_WHITE"/gi, 'fill="white"');
  invertedSvg = invertedSvg.replace(/fill="TEMP_FFFFFF"/gi, 'fill="#FFFFFF"');
  invertedSvg = invertedSvg.replace(/fill="TEMP_FFF"/gi, 'fill="#FFF"');
  invertedSvg = invertedSvg.replace(/fill="TEMP_FFFFFF2"/gi, 'fill="#FFFFFF"');
  invertedSvg = invertedSvg.replace(/fill="TEMP_FFFFFF3"/gi, 'fill="#FFFFFF"');
  invertedSvg = invertedSvg.replace(/fill="TEMP_WHITE2"/gi, 'fill="white"');
  
  // Handle stroke colors - preserve existing strokes, don't add where none exist
  invertedSvg = invertedSvg.replace(/stroke="black"/gi, 'stroke="#333333"');
  invertedSvg = invertedSvg.replace(/stroke="#000000"/gi, 'stroke="#333333"');
  invertedSvg = invertedSvg.replace(/stroke="#000"/gi, 'stroke="#333"');
  invertedSvg = invertedSvg.replace(/stroke="white"/gi, 'stroke="black"');
  invertedSvg = invertedSvg.replace(/stroke="#FFFFFF"/gi, 'stroke="#000000"');
  invertedSvg = invertedSvg.replace(/stroke="#FFF"/gi, 'stroke="#000"');
  invertedSvg = invertedSvg.replace(/stroke="#CCCCCC"/gi, 'stroke="#333333"');
  invertedSvg = invertedSvg.replace(/stroke="#333333"/gi, 'stroke="#CCCCCC"');
  
  return invertedSvg;
}

function updatePieceIdentifiers(svgContent, fromColor, toColor) {
  const colorMap = {
    'b': { color: 'black', fullColor: 'black', newColor: 'w', newFullColor: 'white' },
    'w': { color: 'white', fullColor: 'white', newColor: 'b', newFullColor: 'black' }
  };
  
  const colorInfo = colorMap[fromColor];
  if (!colorInfo) return svgContent;
  
  let updated = svgContent;
  
  // Update piece code (bK -> wK)
  updated = updated.replace(
    new RegExp(`data-piece="${fromColor}([KQRBNP])"`, 'g'),
    `data-piece="${colorInfo.newColor}$1"`
  );
  
  // Update id
  updated = updated.replace(
    new RegExp(`id="${fromColor}([KQRBNP])"`, 'g'),
    `id="${colorInfo.newColor}$1"`
  );
  
  // Update data-color
  updated = updated.replace(
    new RegExp(`data-color="${colorInfo.fullColor}"`, 'g'),
    `data-color="${colorInfo.newFullColor}"`
  );
  
  // Update data-piece-name
  updated = updated.replace(
    new RegExp(`data-piece-name="${colorInfo.fullColor}-`, 'g'),
    `data-piece-name="${colorInfo.newFullColor}-`
  );
  
  // Update CSS class
  updated = updated.replace(
    new RegExp(`chess-piece--${fromColor.toLowerCase()}([kqrbnp])`, 'g'),
    `chess-piece--${colorInfo.newColor.toLowerCase()}$1`
  );
  
  return updated;
}

async function invertPiece(pieceCode, sourcePieceCode) {
  const inputFile = `${sourcePieceCode}.svg`;
  const outputFile = `${pieceCode}.svg`;
  
  const inputPath = path.join(INPUT_DIR, inputFile);
  const outputPath = path.join(OUTPUT_DIR, outputFile);
  
  try {
    console.log(`Creating: ${outputFile} from ${inputFile}`);
    
    const svgContent = await fs.promises.readFile(inputPath, 'utf8');
    
    // Invert colors
    let invertedSvg = invertSvgColors(svgContent);
    
    // Update identifiers
    const fromColor = sourcePieceCode.charAt(0);
    const toColor = pieceCode.charAt(0);
    invertedSvg = updatePieceIdentifiers(invertedSvg, fromColor, toColor);
    
    await fs.promises.writeFile(outputPath, invertedSvg);
    console.log(`✓ Created: ${outputFile}`);
    
    return true;
  } catch (error) {
    console.error(`✗ Error creating ${outputFile}:`, error.message);
    return false;
  }
}

async function main() {
  try {
    console.log('🎨 Chess Piece Color Inverter');
    console.log('============================');
    console.log();
    
    // Check what pieces exist
    const files = await fs.promises.readdir(INPUT_DIR);
    const existingPieces = files
      .filter(file => file.endsWith('.svg'))
      .map(file => path.basename(file, '.svg'))
      .filter(piece => piece.match(/^[wb][KQRBNP]$/));
    
    console.log('📋 Existing pieces:', existingPieces.join(', '));
    console.log();
    
    // Define standard chess pieces
    const pieceTypes = ['K', 'Q', 'R', 'B', 'N', 'P'];
    const colors = ['w', 'b'];
    
    let createdCount = 0;
    let skippedCount = 0;
    
    // For each piece type, ensure both colors exist
    for (const pieceType of pieceTypes) {
      const whitePiece = `w${pieceType}`;
      const blackPiece = `b${pieceType}`;
      
      const hasWhite = existingPieces.includes(whitePiece);
      const hasBlack = existingPieces.includes(blackPiece);
      
      if (hasWhite && !hasBlack) {
        // Create black from white
        const success = await invertPiece(blackPiece, whitePiece);
        if (success) createdCount++;
      } else if (hasBlack && !hasWhite) {
        // Create white from black
        const success = await invertPiece(whitePiece, blackPiece);
        if (success) createdCount++;
      } else if (hasWhite && hasBlack) {
        console.log(`⚠️  Both ${whitePiece} and ${blackPiece} exist, skipping`);
        skippedCount++;
      } else {
        console.log(`⚠️  Neither ${whitePiece} nor ${blackPiece} found`);
        skippedCount++;
      }
    }
    
    console.log();
    console.log('🎨 Color Inversion Complete!');
    console.log(`✓ Created: ${createdCount} pieces`);
    if (skippedCount > 0) {
      console.log(`⚠️  Skipped: ${skippedCount} pieces`);
    }
    
    // Show final piece count
    const finalFiles = await fs.promises.readdir(INPUT_DIR);
    const finalPieces = finalFiles
      .filter(file => file.endsWith('.svg'))
      .map(file => path.basename(file, '.svg'))
      .filter(piece => piece.match(/^[wb][KQRBNP]$/));
    
    console.log(`📁 Total pieces now: ${finalPieces.length}`);
    console.log(`   White pieces: ${finalPieces.filter(p => p.startsWith('w')).join(', ')}`);
    console.log(`   Black pieces: ${finalPieces.filter(p => p.startsWith('b')).join(', ')}`);
    
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { invertSvgColors, updatePieceIdentifiers };