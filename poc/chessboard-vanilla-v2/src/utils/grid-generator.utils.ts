// grid-generator.utils.ts - Dynamic grid cell generation utilities

export interface GridCell {
  id: string;
  position: number;
  backgroundColor: string;
  displayText: string;
}

/**
 * Generates grid cells with alternating background colors
 * @param numCells - Total number of cells to generate
 * @param lightColor - Color for light squares (default: lightblue)
 * @param darkColor - Color for dark squares (default: lightcoral)
 * @returns Array of GridCell objects
 */
export function generateGridCells(
  numCells: number,
  lightColor: string = "lightblue",
  darkColor: string = "lightcoral"
): GridCell[] {
  const cells: GridCell[] = [];
  
  for (let i = 1; i <= numCells; i++) {
    // Alternating colors - odd positions get light color, even get dark color
    const isLight = i % 2 === 1;
    
    cells.push({
      id: `cell-${i}`,
      position: i,
      backgroundColor: isLight ? lightColor : darkColor,
      displayText: i.toString()
    });
  }
  
  return cells;
}

/**
 * Chess-style alternating colors for square grids with proper chess notation
 * @param numCells - Total number of cells (should be perfect square: 4, 9, 16, etc.)
 * @param lightColor - Color for light squares
 * @param darkColor - Color for dark squares  
 * @returns Array of GridCell objects with chess-pattern coloring and chess notation IDs
 */
export function generateChessGridCells(
  numCells: number,
  lightColor: string = "#F0D9B5",
  darkColor: string = "#B58863"
): GridCell[] {
  const cells: GridCell[] = [];
  const gridSize = Math.sqrt(numCells);
  
  if (gridSize !== Math.floor(gridSize)) {
    throw new Error(`numCells must be a perfect square (4, 9, 16, etc.), got ${numCells}`);
  }
  
  // Chess files (columns): a, b, c, d, e, f, g, h
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  
  for (let i = 1; i <= numCells; i++) {
    // Convert to row/column (0-indexed)
    const row = Math.floor((i - 1) / gridSize);
    const col = (i - 1) % gridSize;
    
    // Chess notation: file (a-h) + rank (1-8)
    // Note: Chess ranks go from 1-8, bottom to top, so we need to invert row
    const file = files[col];
    const rank = gridSize - row; // Invert: top row = highest rank
    const chessSquare = `${file}${rank}`;
    
    // Chess pattern: alternating based on row + column sum
    const isLight = (row + col) % 2 === 0;
    
    cells.push({
      id: chessSquare,
      position: i,
      backgroundColor: isLight ? lightColor : darkColor,
      displayText: chessSquare
    });
  }
  
  return cells;
}