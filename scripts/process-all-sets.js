#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SETS_INPUT_DIR = path.join(__dirname, '../assets/sets/split');
const SETS_OUTPUT_DIR = path.join(__dirname, '../assets/sets/processed');

// Import our existing functions
const { addChessPieceIdentifiers, detectPieceMapping } = require('./add-piece-identifiers');
const { invertSvgColors, updatePieceIdentifiers } = require('./invert-piece-colors');

// Enhanced piece mapping to handle knight variants
function detectChessMapping(pngFiles) {
  const mapping = {};
  
  pngFiles.forEach(filename => {
    const baseName = path.basename(filename, '.png');
    
    // Handle standard chess notation with knight variants
    const chessMatch = baseName.match(/^([wb])([KQRBNP])(-(?:left|right))?$/i);
    if (chessMatch) {
      const [, color, piece, variant] = chessMatch;
      if (piece.toUpperCase() === 'N' && variant) {
        // Keep knight variants as-is: bN-left, bN-right
        mapping[baseName] = `${color}${piece.toUpperCase()}${variant}`;
      } else {
        mapping[baseName] = `${color}${piece.toUpperCase()}`;
      }
      return;
    }
    
    // Handle descriptive names
    const lowerName = baseName.toLowerCase();
    const isWhite = lowerName.includes('white') || lowerName.includes('w');
    const isBlack = lowerName.includes('black') || lowerName.includes('b');
    const color = isWhite ? 'w' : isBlack ? 'b' : null;
    
    if (!color) return;
    
    if (lowerName.includes('king')) mapping[baseName] = `${color}K`;
    else if (lowerName.includes('queen')) mapping[baseName] = `${color}Q`;
    else if (lowerName.includes('rook')) mapping[baseName] = `${color}R`;
    else if (lowerName.includes('bishop')) mapping[baseName] = `${color}B`;
    else if (lowerName.includes('knight')) {
      // Handle knight variants in descriptive names
      if (lowerName.includes('left')) mapping[baseName] = `${color}N-left`;
      else if (lowerName.includes('right')) mapping[baseName] = `${color}N-right`;
      else mapping[baseName] = `${color}N`;
    }
    else if (lowerName.includes('pawn')) mapping[baseName] = `${color}P`;
  });
  
  return mapping;
}

async function ensureDirectoryExists(dirPath) {
  try {
    await fs.promises.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
}

async function analyzeImageColor(imagePath) {
  const sharp = require('sharp');
  
  try {
    const image = sharp(imagePath);
    const { data, info } = await image
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    const pixelCount = info.width * info.height;
    const channels = info.channels;
    
    let totalR = 0, totalG = 0, totalB = 0;
    let opaquePixels = 0;
    
    // Analyze pixels to find dominant color (excluding transparent areas)
    for (let i = 0; i < data.length; i += channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const alpha = channels === 4 ? data[i + 3] : 255;
      
      // Only count opaque/semi-opaque pixels
      if (alpha > 128) {
        totalR += r;
        totalG += g;
        totalB += b;
        opaquePixels++;
      }
    }
    
    if (opaquePixels === 0) {
      return { color: 'black', isLight: false }; // Default fallback
    }
    
    // Calculate average color
    const avgR = Math.round(totalR / opaquePixels);
    const avgG = Math.round(totalG / opaquePixels);
    const avgB = Math.round(totalB / opaquePixels);
    
    // Calculate luminance to determine if it's light or dark
    const luminance = (0.299 * avgR + 0.587 * avgG + 0.114 * avgB);
    const isLight = luminance > 128;
    
    // Convert to hex color
    const hexColor = `#${avgR.toString(16).padStart(2, '0')}${avgG.toString(16).padStart(2, '0')}${avgB.toString(16).padStart(2, '0')}`;
    
    // Map to proper chess piece colors
    let semanticColor;
    if (isLight) {
      // Light colors -> white pieces
      semanticColor = 'white';
    } else {
      // Dark colors -> black pieces  
      semanticColor = 'black';
    }
    
    return {
      color: semanticColor,
      hexColor: hexColor,
      isLight: isLight,
      luminance: luminance,
      avgRGB: [avgR, avgG, avgB]
    };
    
  } catch (error) {
    console.warn(`Could not analyze color for ${imagePath}: ${error.message}`);
    return { color: 'black', isLight: false }; // Fallback
  }
}

async function vectorizePNG(inputPath, outputPath) {
  const sharp = require('sharp');
  const potrace = require('potrace');
  
  try {
    // First, analyze the original image color
    const colorAnalysis = await analyzeImageColor(inputPath);
    console.log(`  Color analysis: ${colorAnalysis.hexColor} (${colorAnalysis.isLight ? 'light' : 'dark'}) -> ${colorAnalysis.color}`);
    
    // Read and process the image
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Scale up for antialiasing - but preserve color information
    const ANTIALIAS_SCALE = 2;
    
    // Create two versions: one for color analysis (original) and one for shape tracing (greyscale)
    const processedBuffer = await image
      .resize(
        Math.round(metadata.width * ANTIALIAS_SCALE),
        Math.round(metadata.height * ANTIALIAS_SCALE),
        { kernel: sharp.kernel.lanczos3, fit: 'fill' }
      )
      .greyscale()  // Still need this for potrace shape detection
      .normalise()
      .sharpen()
      .png({ quality: 100 })
      .toBuffer();
    
    // Convert to SVG using detected color
    return new Promise((resolve, reject) => {
      potrace.trace(processedBuffer, {
        threshold: 128,
        optTolerance: 0.4,
        turdSize: 2,
        alphaMax: 1,
        optCurve: true,
        // color: colorAnalysis.color, // Remove hardcoded color - let CSS control it
        background: 'transparent'
      }, (err, svg) => {
        if (err) {
          reject(err);
          return;
        }
        
        // Clean up SVG
        let optimized = svg;
        optimized = optimized.replace(/xmlns="[^"]*"/g, '');
        
        const baseName = path.basename(inputPath, '.png');
        optimized = optimized.replace(
          /<svg([^>]*)>/,
          `<svg$1 id="${baseName}" xmlns="http://www.w3.org/2000/svg">`
        );
        
        resolve(optimized);
      });
    });
  } catch (error) {
    throw new Error(`Failed to vectorize ${inputPath}: ${error.message}`);
  }
}

async function processSet(setDir) {
  const setName = path.basename(setDir);
  const outputSetDir = path.join(SETS_OUTPUT_DIR, setName);
  
  console.log(`\n📁 Processing set: ${setName}`);
  console.log('='.repeat(50));
  
  await ensureDirectoryExists(outputSetDir);
  
  // Find PNG files
  const files = await fs.promises.readdir(setDir);
  const pngFiles = files.filter(file => file.toLowerCase().endsWith('.png'));
  
  if (pngFiles.length === 0) {
    console.log('⚠️  No PNG files found in this set');
    return;
  }
  
  console.log(`Found ${pngFiles.length} PNG files to process`);
  
  // Detect piece mapping
  const pieceMapping = detectChessMapping(pngFiles);
  
  // Show mapping
  console.log('\n📋 Detected Piece Mapping:');
  Object.entries(pieceMapping).forEach(([filename, piece]) => {
    console.log(`  ${filename} -> ${piece}`);
  });
  
  const unmappedFiles = pngFiles.filter(file => !pieceMapping[path.basename(file, '.png')]);
  if (unmappedFiles.length > 0) {
    console.log('\n⚠️  Unmapped files:');
    unmappedFiles.forEach(file => console.log(`  ${file}`));
  }
  
  // Process each PNG file
  let successCount = 0;
  for (const pngFile of pngFiles) {
    const baseName = path.basename(pngFile, '.png');
    const pieceCode = pieceMapping[baseName];
    
    if (!pieceCode) {
      console.log(`⚠️  Skipping ${pngFile} - no mapping found`);
      continue;
    }
    
    try {
      console.log(`Processing: ${pngFile} -> ${pieceCode}.svg`);
      
      const inputPath = path.join(setDir, pngFile);
      const outputPath = path.join(outputSetDir, `${pieceCode}.svg`);
      
      // Vectorize PNG to SVG
      const svgContent = await vectorizePNG(inputPath, outputPath);
      
      // Add chess piece identifiers
      const pieceName = getPieceName(pieceCode);
      const enhancedSvg = addChessPieceIdentifiers(svgContent, pieceCode, pieceName, baseName);
      
      // Write the enhanced SVG
      await fs.promises.writeFile(outputPath, enhancedSvg);
      console.log(`✓ Created: ${pieceCode}.svg`);
      successCount++;
      
    } catch (error) {
      console.error(`✗ Error processing ${pngFile}:`, error.message);
    }
  }
  
  console.log(`\n🎨 Checking for missing color variants...`);
  
  // Check if we need to generate missing color variants
  const svgFiles = await fs.promises.readdir(outputSetDir);
  const existingPieces = svgFiles
    .filter(file => file.endsWith('.svg'))
    .map(file => path.basename(file, '.svg'));
  
  const pieceTypes = ['K', 'Q', 'R', 'B', 'N', 'N-left', 'N-right', 'P'];
  let invertedCount = 0;
  
  for (const pieceType of pieceTypes) {
    const blackPiece = `b${pieceType}`;
    const whitePiece = `w${pieceType}`;
    
    const hasBlack = existingPieces.includes(blackPiece);
    const hasWhite = existingPieces.includes(whitePiece);
    
    if (hasBlack && !hasWhite) {
      console.log(`Creating missing white piece: ${whitePiece} from ${blackPiece}`);
      await invertPieceColor(outputSetDir, blackPiece, whitePiece);
      invertedCount++;
    } else if (hasWhite && !hasBlack) {
      console.log(`Creating missing black piece: ${blackPiece} from ${whitePiece}`);
      await invertPieceColor(outputSetDir, whitePiece, blackPiece);
      invertedCount++;
    }
  }
  
  if (invertedCount > 0) {
    console.log(`✓ Generated ${invertedCount} missing color variants`);
  } else {
    console.log(`✓ All color variants already exist`);
  }
  console.log(`📁 Set complete: ${successCount} pieces processed`);
}

function getPieceName(pieceCode) {
  const PIECE_NAMES = {
    'wK': 'white-king', 'bK': 'black-king',
    'wQ': 'white-queen', 'bQ': 'black-queen',
    'wR': 'white-rook', 'bR': 'black-rook',
    'wB': 'white-bishop', 'bB': 'black-bishop',
    'wN': 'white-knight', 'bN': 'black-knight',
    'wN-left': 'white-knight-left', 'bN-left': 'black-knight-left',
    'wN-right': 'white-knight-right', 'bN-right': 'black-knight-right',
    'wP': 'white-pawn', 'bP': 'black-pawn'
  };
  return PIECE_NAMES[pieceCode] || 'unknown';
}

async function invertPieceColor(setDir, sourcePieceCode, targetPieceCode) {
  const sourcePath = path.join(setDir, `${sourcePieceCode}.svg`);
  const targetPath = path.join(setDir, `${targetPieceCode}.svg`);
  
  try {
    console.log(`Creating: ${targetPieceCode}.svg from ${sourcePieceCode}.svg`);
    
    const svgContent = await fs.promises.readFile(sourcePath, 'utf8');
    
    // Invert colors using the corrected function
    let invertedSvg = invertSvgColors(svgContent);
    
    // Update identifiers (piece code, data attributes, etc.)
    const fromColor = sourcePieceCode.charAt(0);
    const toColor = targetPieceCode.charAt(0);
    invertedSvg = updatePieceIdentifiers(invertedSvg, fromColor, toColor);
    
    await fs.promises.writeFile(targetPath, invertedSvg);
    console.log(`✓ Created: ${targetPieceCode}.svg`);
    
  } catch (error) {
    console.error(`✗ Error creating ${targetPieceCode}.svg:`, error.message);
  }
}

async function main() {
  try {
    console.log('🏰 Chess Set Batch Processor');
    console.log('============================');
    console.log();
    
    // Ensure output directory exists
    await ensureDirectoryExists(SETS_OUTPUT_DIR);
    
    // Find all set directories
    const items = await fs.promises.readdir(SETS_INPUT_DIR);
    const setDirs = [];
    
    for (const item of items) {
      const itemPath = path.join(SETS_INPUT_DIR, item);
      const stat = await fs.promises.stat(itemPath);
      if (stat.isDirectory()) {
        setDirs.push(itemPath);
      }
    }
    
    if (setDirs.length === 0) {
      console.log(`No directories found in ${SETS_INPUT_DIR}`);
      return;
    }
    
    console.log(`Found ${setDirs.length} chess sets to process:`);
    setDirs.forEach(dir => console.log(`  - ${path.basename(dir)}`));
    
    // Process each set
    for (const setDir of setDirs) {
      await processSet(setDir);
    }
    
    console.log('\n🎉 All sets processed successfully!');
    console.log(`📁 Output directory: ${SETS_OUTPUT_DIR}`);
    
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { processSet, detectChessMapping };