// a11y.utils.ts - Accessibility utility functions
import type { ChessPosition, ChessPiece, ChessMove } from '../types/chess.types';

/**
 * Generate accessible description for a chess piece
 */
export function describePiece(piece: ChessPiece, position?: ChessPosition): string {
  const colorName = piece.color === 'white' ? 'White' : 'Black';
  const pieceName = piece.type.charAt(0).toUpperCase() + piece.type.slice(1);
  
  if (position) {
    return `${colorName} ${pieceName} on ${position.toUpperCase()}`;
  }
  
  return `${colorName} ${pieceName}`;
}

/**
 * Generate accessible description for a chess square
 */
export function describeSquare(
  position: ChessPosition, 
  piece?: ChessPiece, 
  state?: {
    isSelected?: boolean;
    isValidMove?: boolean;
    isInCheck?: boolean;
    isCaptureTarget?: boolean;
  }
): string {
  const file = position.charAt(0).toUpperCase();
  const rank = position.charAt(1);
  let description = `${file}${rank}`;
  
  if (piece) {
    description += `, ${describePiece(piece)}`;
  } else {
    description += ', empty square';
  }
  
  if (state) {
    const states: string[] = [];
    
    if (state.isSelected) states.push('selected');
    if (state.isValidMove) states.push('valid move');
    if (state.isCaptureTarget) states.push('capture target');
    if (state.isInCheck) states.push('in check');
    
    if (states.length > 0) {
      description += `, ${states.join(', ')}`;
    }
  }
  
  return description;
}

/**
 * Generate accessible description for a chess move
 */
export function describeMove(move: ChessMove): string {
  const piece = describePiece(move.piece);
  let description = `${piece} moves from ${move.from.toUpperCase()} to ${move.to.toUpperCase()}`;
  
  // Add capture information
  if (move.capturedPiece) {
    description += `, capturing ${describePiece(move.capturedPiece)}`;
  }
  
  // Add promotion information
  if (move.promotion) {
    const promotionPiece = move.promotion.charAt(0).toUpperCase() + move.promotion.slice(1);
    description += `, promoted to ${promotionPiece}`;
  }
  
  // Add special moves
  if (move.piece.type === 'king' && Math.abs(move.from.charCodeAt(0) - move.to.charCodeAt(0)) > 1) {
    description += ', castling';
  }
  
  if (move.piece.type === 'pawn' && !move.capturedPiece && move.from.charAt(0) !== move.to.charAt(0)) {
    description += ', en passant capture';
  }
  
  return description;
}

/**
 * Generate accessible game status description
 */
export function describeGameStatus(gameState: {
  activeColor: 'white' | 'black';
  isCheck?: boolean;
  isCheckmate?: boolean;
  isStalemate?: boolean;
  isDraw?: boolean;
  moveCount?: number;
}): string {
  const currentPlayer = gameState.activeColor === 'white' ? 'White' : 'Black';
  
  if (gameState.isCheckmate) {
    const winner = gameState.activeColor === 'white' ? 'Black' : 'White';
    return `Checkmate! ${winner} wins the game.`;
  }
  
  if (gameState.isStalemate) {
    return 'Stalemate. The game is a draw.';
  }
  
  if (gameState.isDraw) {
    return 'The game is a draw.';
  }
  
  let status = `${currentPlayer} to move`;
  
  if (gameState.isCheck) {
    status += '. Check!';
  }
  
  if (gameState.moveCount) {
    const fullMoves = Math.ceil(gameState.moveCount / 2);
    status += `. Move ${fullMoves}`;
  }
  
  return status;
}

/**
 * Convert chess position to phonetic description for better screen reader pronunciation
 */
export function positionToPhonetic(position: ChessPosition): string {
  const filePhonetics: Record<string, string> = {
    'a': 'Alpha',
    'b': 'Bravo',
    'c': 'Charlie',
    'd': 'Delta',
    'e': 'Echo',
    'f': 'Foxtrot',
    'g': 'Golf',
    'h': 'Hotel'
  };
  
  const file = position.charAt(0);
  const rank = position.charAt(1);
  
  return `${filePhonetics[file] || file.toUpperCase()} ${rank}`;
}

/**
 * Convert chess position to friendly names for beginners
 */
export function positionToFriendly(position: ChessPosition): string {
  const friendlyFiles: Record<string, string> = {
    'a': 'Anna',
    'b': 'Bob',
    'c': 'Charlie',
    'd': 'David',
    'e': 'Emma',
    'f': 'Frank',
    'g': 'George',
    'h': 'Helen'
  };
  
  const file = position.charAt(0);
  const rank = position.charAt(1);
  
  return `${friendlyFiles[file] || file.toUpperCase()} ${rank}`;
}

/**
 * Check if an element is focusable
 */
export function isFocusable(element: Element): boolean {
  if (element instanceof HTMLElement) {
    // Check if element has tabindex
    const tabindex = element.tabIndex;
    if (tabindex >= 0) return true;
    if (tabindex === -1) return false;
    
    // Check for naturally focusable elements
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[contenteditable="true"]',
      '[tabindex]:not([tabindex="-1"])'
    ];
    
    return focusableSelectors.some(selector => element.matches(selector));
  }
  
  return false;
}

/**
 * Find all focusable elements within a container
 */
export function getFocusableElements(container: Element): HTMLElement[] {
  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[contenteditable="true"]',
    '[tabindex]:not([tabindex="-1"])',
    '[data-position]' // Chess squares
  ].join(', ');
  
  const elements = container.querySelectorAll(focusableSelector);
  return Array.from(elements).filter((el): el is HTMLElement => 
    el instanceof HTMLElement && isFocusable(el)
  );
}

/**
 * Create roving tabindex pattern for chess board navigation
 */
export function setupRovingTabindex(container: Element, initialFocus?: string): void {
  const focusableElements = getFocusableElements(container);
  
  focusableElements.forEach((el, index) => {
    if (initialFocus && el.dataset.position === initialFocus) {
      el.tabIndex = 0;
    } else if (!initialFocus && index === 0) {
      el.tabIndex = 0;
    } else {
      el.tabIndex = -1;
    }
  });
}

/**
 * Update roving tabindex focus
 */
export function updateRovingTabindex(container: Element, newFocusElement: HTMLElement): void {
  const focusableElements = getFocusableElements(container);
  
  focusableElements.forEach(el => {
    el.tabIndex = el === newFocusElement ? 0 : -1;
  });
  
  newFocusElement.focus();
}

/**
 * Announce message to screen reader
 */
export function announceToScreenReader(
  message: string, 
  priority: 'polite' | 'assertive' = 'polite'
): void {
  // Create or find live region
  let liveRegion = document.getElementById(`sr-live-region-${priority}`);
  
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = `sr-live-region-${priority}`;
    liveRegion.className = 'sr-only';
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    document.body.appendChild(liveRegion);
  }
  
  // Clear and set new message
  liveRegion.textContent = '';
  setTimeout(() => {
    liveRegion!.textContent = message;
  }, 100);
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user prefers high contrast
 */
export function prefersHighContrast(): boolean {
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Check if forced colors mode is active (Windows High Contrast)
 */
export function hasForcedColors(): boolean {
  return window.matchMedia('(forced-colors: active)').matches;
}

/**
 * Detect screen reader usage (basic detection)
 */
export function detectScreenReader(): boolean {
  // Check for common screen reader user agents
  const screenReaderPatterns = /NVDA|JAWS|VoiceOver|TalkBack|Orca/i;
  
  // Check user agent
  if (screenReaderPatterns.test(navigator.userAgent)) {
    return true;
  }
  
  // Check for speech synthesis (often indicates screen reader)
  if ('speechSynthesis' in window) {
    return true;
  }
  
  // Check for high contrast preference (often indicates accessibility needs)
  if (prefersHighContrast()) {
    return true;
  }
  
  return false;
}

/**
 * Generate keyboard shortcut description
 */
export function describeKeyboardShortcut(key: string, modifiers?: string[]): string {
  const modifierNames: Record<string, string> = {
    'ctrl': 'Control',
    'alt': 'Alt',
    'shift': 'Shift',
    'meta': 'Command'
  };
  
  let description = '';
  
  if (modifiers) {
    const modifierDescriptions = modifiers.map(mod => modifierNames[mod] || mod);
    description = modifierDescriptions.join(' + ') + ' + ';
  }
  
  description += key.toUpperCase();
  
  return description;
}

/**
 * Create accessible tooltip content
 */
export function createTooltip(
  content: string, 
  targetElement: HTMLElement,
  id?: string
): HTMLElement {
  const tooltipId = id || `tooltip-${Math.random().toString(36).substr(2, 9)}`;
  
  let tooltip = document.getElementById(tooltipId);
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = tooltipId;
    tooltip.className = 'tooltip sr-only';
    tooltip.setAttribute('role', 'tooltip');
    document.body.appendChild(tooltip);
  }
  
  tooltip.textContent = content;
  targetElement.setAttribute('aria-describedby', tooltipId);
  
  return tooltip;
}

/**
 * Calculate color contrast ratio
 */
export function getContrastRatio(foreground: string, background: string): number {
  // Simple contrast ratio calculation
  // This is a basic implementation - for production use a proper color contrast library
  
  const getLuminance = (color: string): number => {
    // Convert hex to RGB and calculate luminance
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color combination meets WCAG contrast requirements
 */
export function meetsContrastRequirements(
  foreground: string, 
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  isLargeText = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  
  if (level === 'AAA') {
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  }
  
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}