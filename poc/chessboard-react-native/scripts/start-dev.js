#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting React Native development with ngrok tunneling...');

// Start Expo dev server
  console.log('📱 Starting Expo development server...');
  const expo = spawn('npx', ['expo', 'start', '--web'], {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  // Wait for Expo to initialize, then start ngrok
  setTimeout(() => {
    console.log('🌐 Starting ngrok tunnel...');
    const ngrok = spawn('ngrok', ['http', '8081', '--domain=eager-terrier-especially.ngrok-free.app'], {
      stdio: 'inherit',
      cwd: process.cwd()
    });

    ngrok.on('close', (code) => {
      if (code !== 0) {
        console.log(`❌ ngrok exited with code ${code}`);
      }
    });

    console.log('✅ Development environment ready!');
    console.log('📱 Local: http://localhost:8081');
    console.log('🌐 Remote: https://eager-terrier-especially.ngrok-free.app');
  }, 10000); // Wait 10 seconds - shorter but usually sufficient

  expo.on('close', (code) => {
    if (code !== 0) {
      console.log(`❌ Expo exited with code ${code}`);
      process.exit(code);
    }
  });

  // Handle cleanup on exit
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down development server...');
    expo.kill();
    process.exit(0);
  });