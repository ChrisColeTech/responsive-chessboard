// Game history service - manages game move history and replay functionality
import type { ChessMove, ChessGameState } from '@/types';

export interface GameHistoryEntry {
  readonly moveNumber: number;
  readonly move: ChessMove;
  readonly fen: string;
  readonly timestamp: number;
}

export class GameHistoryService {
  private history: GameHistoryEntry[] = [];
  private currentIndex: number = -1;

  public addMove(move: ChessMove, resultingFen: string): void {
    // If we're not at the end of history, truncate future moves
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    const entry: GameHistoryEntry = {
      moveNumber: this.history.length + 1,
      move,
      fen: resultingFen,
      timestamp: Date.now(),
    };

    this.history.push(entry);
    this.currentIndex = this.history.length - 1;
  }

  public getCurrentMove(): GameHistoryEntry | null {
    return this.history[this.currentIndex] || null;
  }

  public getPreviousMove(): GameHistoryEntry | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  public getNextMove(): GameHistoryEntry | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }

  public goToMove(moveNumber: number): GameHistoryEntry | null {
    const index = moveNumber - 1;
    if (index >= 0 && index < this.history.length) {
      this.currentIndex = index;
      return this.history[index];
    }
    return null;
  }

  public goToStart(): GameHistoryEntry | null {
    if (this.history.length > 0) {
      this.currentIndex = 0;
      return this.history[0];
    }
    return null;
  }

  public goToEnd(): GameHistoryEntry | null {
    if (this.history.length > 0) {
      this.currentIndex = this.history.length - 1;
      return this.history[this.currentIndex];
    }
    return null;
  }

  public getFullHistory(): GameHistoryEntry[] {
    return [...this.history];
  }

  public getMoveCount(): number {
    return this.history.length;
  }

  public getCurrentMoveNumber(): number {
    return this.currentIndex + 1;
  }

  public canGoBack(): boolean {
    return this.currentIndex > 0;
  }

  public canGoForward(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  public reset(): void {
    this.history = [];
    this.currentIndex = -1;
  }

  public exportPGN(): string {
    // Basic PGN export - simplified version
    let pgn = '';
    for (let i = 0; i < this.history.length; i++) {
      const entry = this.history[i];
      if (i % 2 === 0) {
        pgn += `${Math.floor(i / 2) + 1}. `;
      }
      pgn += `${entry.move.san || `${entry.move.from}${entry.move.to}`} `;
    }
    return pgn.trim();
  }

  public getGameDuration(): number {
    if (this.history.length === 0) return 0;
    const start = this.history[0].timestamp;
    const end = this.history[this.history.length - 1].timestamp;
    return end - start;
  }
}