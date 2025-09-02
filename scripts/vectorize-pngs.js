#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const potrace = require('potrace');
const { promisify } = require('util');

const trace = promisify(potrace.trace);
const mkdirp = promisify(fs.mkdir);

// Configuration
const INPUT_DIR = path.join(__dirname, '../assets/PNG');
const OUTPUT_DIR = path.join(__dirname, '../assets/SVG_converted');
const ANTIALIAS_SCALE = 2; // Scale up by 2x before processing for better antialiasing
const POTRACE_OPTIONS = {
  turdSize: 2,        // Suppress speckles of this size
  alphaMax: 1,        // Corner threshold parameter
  optCurve: true,     // Curve optimization
  optTolerance: 0.2   // Curve optimization tolerance
};

async function ensureDirectoryExists(dirPath) {
  try {
    await mkdirp(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function preprocessImage(inputPath) {
  console.log(`Preprocessing: ${path.basename(inputPath)}`);
  
  // Load the image and get its metadata
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  // Scale up for better antialiasing, convert to high-quality grayscale
  const processedBuffer = await image
    .resize(
      Math.round(metadata.width * ANTIALIAS_SCALE),
      Math.round(metadata.height * ANTIALIAS_SCALE),
      { 
        kernel: sharp.kernel.lanczos3, // High-quality resampling
        fit: 'fill'
      }
    )
    .greyscale()
    .normalise() // Enhance contrast
    .sharpen()   // Sharpen edges
    .png({ quality: 100 })
    .toBuffer();
  
  return processedBuffer;
}

async function convertPngToSvg(inputPath, outputPath) {
  try {
    console.log(`Converting: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    
    // Preprocess the image for better vectorization
    const processedImageBuffer = await preprocessImage(inputPath);
    
    // Convert to SVG using potrace
    const svgString = await trace(processedImageBuffer, POTRACE_OPTIONS);
    
    // Clean up and optimize the SVG
    const cleanedSvg = optimizeSvg(svgString, path.basename(inputPath, '.png'));
    
    // Write the SVG file
    await fs.promises.writeFile(outputPath, cleanedSvg);
    
    console.log(`✓ Successfully converted: ${path.basename(outputPath)}`);
    return true;
    
  } catch (error) {
    console.error(`✗ Error converting ${path.basename(inputPath)}:`, error.message);
    return false;
  }
}

function optimizeSvg(svgString, baseName) {
  // Add proper SVG header and optimize
  let optimized = svgString
    .replace(/width="\d+"/, 'width="100"')
    .replace(/height="\d+"/, 'height="100"')
    .replace(/fill="#000000"/g, 'fill="currentColor"') // Make color customizable
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  // Handle xmlns attribute properly - remove any existing ones and add our own
  optimized = optimized.replace(/xmlns="[^"]*"/g, ''); // Remove existing xmlns
  optimized = optimized.replace(/<svg([^>]*)>/, `<svg$1 id="${baseName}" xmlns="http://www.w3.org/2000/svg">`);
  
  return optimized;
}

async function main() {
  try {
    console.log('🎨 PNG to SVG Vectorization Tool');
    console.log('================================');
    
    // Ensure output directory exists
    await ensureDirectoryExists(OUTPUT_DIR);
    
    // Read all PNG files from input directory
    const files = await fs.promises.readdir(INPUT_DIR);
    const pngFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');
    
    if (pngFiles.length === 0) {
      console.log(`No PNG files found in ${INPUT_DIR}`);
      return;
    }
    
    console.log(`Found ${pngFiles.length} PNG files to convert\n`);
    
    let successCount = 0;
    let failCount = 0;
    
    // Process each PNG file
    for (const pngFile of pngFiles) {
      const inputPath = path.join(INPUT_DIR, pngFile);
      const svgFile = path.basename(pngFile, '.png') + '.svg';
      const outputPath = path.join(OUTPUT_DIR, svgFile);
      
      const success = await convertPngToSvg(inputPath, outputPath);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    }
    
    console.log('\n🎉 Conversion Complete!');
    console.log(`✓ Successfully converted: ${successCount} files`);
    if (failCount > 0) {
      console.log(`✗ Failed to convert: ${failCount} files`);
    }
    console.log(`📁 Output directory: ${OUTPUT_DIR}`);
    
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { convertPngToSvg, preprocessImage };