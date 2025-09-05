export interface PageInstructions {
  readonly title: string
  readonly instructions: readonly string[]
}

/**
 * Centralized instructions service for all pages and sub-pages
 * Provides consistent instructions management across the application
 * Supports hierarchical page IDs like 'uitests.audio-demo'
 */
export class InstructionsService {
  private static instance: InstructionsService | null = null
  private instructionsMap: Map<string, PageInstructions> = new Map()

  private constructor() {
    this.initializeInstructions()
  }

  public static getInstance(): InstructionsService {
    if (!InstructionsService.instance) {
      InstructionsService.instance = new InstructionsService()
    }
    return InstructionsService.instance
  }

  private initializeInstructions(): void {
    // Main tab pages
    this.instructionsMap.set('layout', {
      title: 'Background & Theme Testing',
      instructions: [
        'View the animated background effects and floating chess pieces',
        'Test different themes using the settings panel',
        'Observe glassmorphism design and responsive layout',
        'This page demonstrates the visual foundation of the app'
      ]
    })

    this.instructionsMap.set('worker', {
      title: 'Chess Computer Testing Guide',
      instructions: [
        'Test if the chess computer is working and ready to play games',
        'Check how fast the computer can think and respond to moves',
        'Adjust the computer\'s skill level from beginner to expert',
        'Run quick tests to verify the chess engine is functioning properly'
      ]
    })

    this.instructionsMap.set('uitests', {
      title: 'UI Testing Hub Guide',
      instructions: [
        'Navigate to different UI testing environments',
        'Try interactive audio demos and drag testing',
        'Test Global UI Audio Service patterns',
        'Explore educational implementation examples'
      ]
    })

    this.instructionsMap.set('slots', {
      title: 'Slot Machine Casino Experience',
      instructions: [
        'Experience the thrill of a casino slot machine with visual and audio feedback',
        'Use the +/- buttons to adjust your coin wager amount',
        'Click the SPIN button to start the slot machine animation',
        'Watch for winning combinations and enjoy the casino atmosphere'
      ]
    })

    this.instructionsMap.set('play', {
      title: 'Play Chess vs Computer - Coming Soon',
      instructions: [
        'This page will feature human vs computer chess gameplay',
        'Computer opponent with 10 difficulty levels (1-10)',
        'Full drag & drop chessboard interface',
        'Audio feedback and professional game controls',
        'Currently under development...'
      ]
    })

    // UI Tests sub-pages
    this.instructionsMap.set('uitests.audio-demo', {
      title: 'UI Audio System Demo',
      instructions: [
        'Explore interactive examples of Global UI Audio Service patterns',
        'Test different UI elements with automatic sound detection',
        'Learn about proper audio exclusion patterns',
        'See educational implementation examples in action'
      ]
    })

    this.instructionsMap.set('uitests.drag-test', {
      title: 'Interactive Chess Board Guide',
      instructions: [
        'Test drag and drop functionality with visual feedback and capture mechanics',
        'Drag the bottom-right corner of the dashed container to test responsive scaling',
        'Click on squares to select them and see valid drop targets highlighted',
        'Experience professional chess drag interactions'
      ]
    })

    // Future sub-pages can be added easily
    // this.instructionsMap.set('uitests.audio-demo.advanced', { ... })
    // this.instructionsMap.set('play.vs-computer.difficulty', { ... })
  }

  /**
   * Get instructions for a specific page or sub-page
   */
  public getInstructions(pageId: string): PageInstructions | null {
    return this.instructionsMap.get(pageId) || null
  }

  /**
   * Get all available page instructions
   */
  public getAllInstructions(): ReadonlyMap<string, PageInstructions> {
    return new Map(this.instructionsMap)
  }

  /**
   * Update instructions for a specific page (for dynamic content)
   */
  public updateInstructions(pageId: string, instructions: PageInstructions): void {
    this.instructionsMap.set(pageId, instructions)
  }

  /**
   * Check if instructions exist for a page
   */
  public hasInstructions(pageId: string): boolean {
    return this.instructionsMap.has(pageId)
  }

  /**
   * Get all sub-page IDs for a parent page
   * e.g. getSubPages('uitests') returns ['uitests.audio-demo', 'uitests.drag-test']
   */
  public getSubPages(parentPageId: string): string[] {
    const prefix = `${parentPageId}.`
    return Array.from(this.instructionsMap.keys())
      .filter(key => key.startsWith(prefix))
      .sort()
  }
}

// Export singleton instance
export const instructionsService = InstructionsService.getInstance()