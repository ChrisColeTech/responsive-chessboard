# Stockfish Engine Files

This directory contains the Stockfish chess engine files required for VS Computer functionality.

## Required Files

To enable VS Computer play, you need to add the following files to this directory:

1. **stockfish.js** - The main Stockfish engine compiled for web workers
2. **stockfish.wasm** - WebAssembly version of Stockfish (if using WASM build)

## Getting Stockfish Files

### Option 1: Official Stockfish.js (Recommended)
Download from: https://github.com/nmrugg/stockfish.js/

Files needed:
- `stockfish.js` (from the `src` directory)

### Option 2: Lila Stockfish 
Download from: https://github.com/lichess-org/lila/

Files needed:
- `stockfish.js`
- `stockfish.wasm` (if available)

### Option 3: CDN (Development Only)
For development/testing, you can use:
```html
<script src="https://unpkg.com/stockfish@15.0.0/src/stockfish.js"></script>
```

## File Structure

```
public/stockfish/
├── README.md (this file)
├── stockfish.js (main engine file)
└── stockfish.wasm (optional WASM file)
```

## Integration

The `StockfishClient` service expects to find `stockfish.js` at `/stockfish/stockfish.js` relative to the public root.

## License

Stockfish is released under the GPL v3 license. Make sure to comply with licensing requirements when distributing.

## Notes

- Stockfish files are large (typically 1-3MB)
- WASM version provides better performance but requires additional setup
- Engine initialization may take a few seconds on first load
- Consider using a loading screen while engine initializes