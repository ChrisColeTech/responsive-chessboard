// String and number formatting utilities

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatTimeMs = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  return formatTime(seconds);
};

export const formatPercentage = (value: number, total: number): string => {
  if (total === 0) return '0%';
  return `${Math.round((value / total) * 100)}%`;
};

export const formatNumber = (value: number, decimals: number = 0): string => {
  return value.toFixed(decimals);
};

export const formatRating = (rating: number): string => {
  return rating.toString();
};

export const formatGameResult = (result: string): string => {
  switch (result) {
    case 'checkmate':
      return 'Checkmate';
    case 'stalemate':
      return 'Stalemate';
    case 'draw':
      return 'Draw';
    case 'timeout':
      return 'Time Out';
    case 'resigned':
      return 'Resigned';
    default:
      return 'Unknown';
  }
};

export const formatMoveNotation = (move: string): string => {
  // Clean up move notation
  return move.trim().replace(/[+#]$/, ''); // Remove check/mate symbols for display
};

export const capitalizeFirst = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatPieceSetName = (pieceSet: string): string => {
  return capitalizeFirst(pieceSet);
};

export const formatBoardThemeName = (theme: string): string => {
  return capitalizeFirst(theme);
};