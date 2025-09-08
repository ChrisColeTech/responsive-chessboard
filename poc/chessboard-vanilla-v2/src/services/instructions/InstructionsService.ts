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

    this.instructionsMap.set('uitests.mobile-drag-test', {
      title: 'Mobile Chess Board Guide',
      instructions: [
        'Test mobile-optimized chess board interactions',
        'Experience touch-friendly drag and drop functionality',
        'See how the board adapts to mobile screen constraints',
        'Test mobile-specific chess interaction patterns'
      ]
    })

    // Splash Screen pages
    this.instructionsMap.set('minimalsplash', {
      title: 'Minimal Professional Splash',
      instructions: [
        '🎨 Clean single logo + brand colors with professional typography',
        '👑 Floating chess crown symbol with subtle animation',
        '⏱️ 1.5-2 second duration for quick professional impression',
        '🔄 Restart animation using action sheet controls',
        '🚀 Navigate to other splash screen examples'
      ]
    })

    this.instructionsMap.set('animatedsplash', {
      title: 'Progressive Piece Assembly',
      instructions: [
        '♗ Chess pieces appear in logical hierarchy sequence',
        '🎭 Staggered timing creates engaging assembly animation', 
        '📚 Educational value showing piece placement learning',
        '🔄 Restart animation to see full piece assembly sequence',
        '🎮 Test cross-navigation to other splash variants'
      ]
    })

    this.instructionsMap.set('loadingprogress', {
      title: 'Engine Loading Dashboard',
      instructions: [
        '🔧 Technical precision meets chess sophistication',
        '📊 Real progress feedback for engine initialization sequence',
        '🎯 Professional dashboard styling with readable timing',
        '⚙️ Shows current service being initialized',
        '🔄 Restart to see full loading sequence animation'
      ]
    })

    this.instructionsMap.set('brandedsplash', {
      title: 'Master Chess Training Branding',
      instructions: [
        '🏛️ Full brand identity with institutional excellence feel',
        '🎓 Premium educational institution presentation',
        '👑 Sophisticated typography with authority indicators',
        '✨ No progress bars - pure brand experience focus',
        '🎨 Dignified crown floating with elegant styling'
      ]
    })

    this.instructionsMap.set('functionalsplash', {
      title: 'Functional Asset Preloading',
      instructions: [
        '🎯 **Real Asset Preloading**: Performs actual app initialization, not fake animations',
        '📊 **Live Progress**: Shows real loading stages (store → pieces → audio → background)',
        '🎨 **User-Preference-Driven**: Loads your selected piece set first, others in background',
        '🔊 **Smart Audio Loading**: Only preloads audio if enabled in settings',
        '⚡ **Modern APIs**: Uses 2024 React preload API + custom Promise coordination',
        '🚫 **Error Handling**: Shows retry options and graceful degradation on failures',
        '⏭️ **Skip Option**: Power users can bypass loading for immediate access',
        '📱 **Network Aware**: Adapts to connection speed with timeout handling'
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