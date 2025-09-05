// AudioManager.ts - Audio context and sound management service
import type { AudioProfileType, AudioProfileConfig, AudioEventConfig } from '../types/enhancement.types';
import type { ChessMove, PieceType } from '../types/chess.types';

export type ChessAudioEvent = 'move' | 'capture' | 'check' | 'checkmate' | 'castle' | 'promote' | 'gameStart' | 'gameEnd';

export interface AudioContextState {
  context: AudioContext | null;
  isInitialized: boolean;
  isEnabled: boolean;
  currentProfile: AudioProfileType;
  volume: number;
}

export class AudioManager {
  private static audioContext: AudioContext | null = null;
  private static loadedSounds = new Map<string, AudioBuffer>();
  private static currentProfile: AudioProfileType = 'standard';
  private static isEnabled = true;
  private static masterVolume = 1.0;
  private static isInitialized = false;
  private static loadPromises = new Map<string, Promise<AudioBuffer>>();

  /**
   * Initialize audio context (must be called after user interaction)
   */
  static async initialize(): Promise<boolean> {
    if (this.isInitialized && this.audioContext?.state === 'running') {
      return true;
    }

    try {
      // Check for Web Audio API support
      if (!window.AudioContext && !(window as any).webkitAudioContext) {
        console.warn('Web Audio API not supported');
        return false;
      }

      // Create audio context
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Resume context if suspended (required by some browsers)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      this.isInitialized = true;
      console.log('AudioManager initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize AudioManager:', error);
      return false;
    }
  }

  /**
   * Load audio file and return AudioBuffer
   */
  private static async loadAudioBuffer(url: string): Promise<AudioBuffer> {
    if (!this.audioContext) {
      throw new Error('Audio context not initialized');
    }

    // Check if already loading
    if (this.loadPromises.has(url)) {
      return this.loadPromises.get(url)!;
    }

    // Check if already loaded
    if (this.loadedSounds.has(url)) {
      return this.loadedSounds.get(url)!;
    }

    // Create loading promise
    const loadPromise = (async (): Promise<AudioBuffer> => {
      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch audio file: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);
        
        // Cache the loaded sound
        this.loadedSounds.set(url, audioBuffer);
        this.loadPromises.delete(url);
        
        return audioBuffer;
      } catch (error) {
        this.loadPromises.delete(url);
        throw error;
      }
    })();

    this.loadPromises.set(url, loadPromise);
    return loadPromise;
  }

  /**
   * Play chess audio event
   */
  static async playChessEvent(
    event: ChessAudioEvent, 
    config: AudioEventConfig,
    _move?: ChessMove
  ): Promise<void> {
    if (!this.isEnabled || !config.enabled || !this.audioContext) {
      return;
    }

    try {
      // Ensure audio context is running
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      // Load and play the sound
      const audioBuffer = await this.loadAudioBuffer(config.file);
      await this.playAudioBuffer(audioBuffer, config.volume);
      
    } catch (error) {
      console.warn(`Failed to play chess audio event '${event}':`, error);
    }
  }

  /**
   * Play AudioBuffer with specified volume
   */
  private static async playAudioBuffer(buffer: AudioBuffer, volume: number = 1.0): Promise<void> {
    if (!this.audioContext || !buffer) {
      return;
    }

    try {
      // Create buffer source
      const source = this.audioContext.createBufferSource();
      source.buffer = buffer;

      // Create gain node for volume control
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = volume * this.masterVolume;

      // Connect nodes
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Play sound
      source.start(0);
    } catch (error) {
      console.warn('Failed to play audio buffer:', error);
    }
  }

  /**
   * Set master volume
   */
  static setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Get master volume
   */
  static getMasterVolume(): number {
    return this.masterVolume;
  }

  /**
   * Enable/disable audio
   */
  static setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  /**
   * Check if audio is enabled
   */
  static isAudioEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Set current audio profile
   */
  static setProfile(profile: AudioProfileType): void {
    this.currentProfile = profile;
  }

  /**
   * Get current audio profile
   */
  static getCurrentProfile(): AudioProfileType {
    return this.currentProfile;
  }

  /**
   * Get audio context state
   */
  static getContextState(): AudioContextState {
    return {
      context: this.audioContext,
      isInitialized: this.isInitialized,
      isEnabled: this.isEnabled,
      currentProfile: this.currentProfile,
      volume: this.masterVolume
    };
  }

  /**
   * Preload sounds for a profile
   */
  static async preloadProfile(profileConfig: AudioProfileConfig): Promise<void> {
    if (!this.audioContext) {
      console.warn('Cannot preload sounds: Audio context not initialized');
      return;
    }

    const loadPromises = Object.values(profileConfig)
      .filter(eventConfig => eventConfig.enabled)
      .map(eventConfig => this.loadAudioBuffer(eventConfig.file).catch(error => {
        console.warn(`Failed to preload sound: ${eventConfig.file}`, error);
      }));

    await Promise.allSettled(loadPromises);
  }

  /**
   * Clear audio cache
   */
  static clearCache(): void {
    this.loadedSounds.clear();
    this.loadPromises.clear();
  }

  /**
   * Determine audio event from chess move
   */
  static getEventFromMove(move: ChessMove, gameState: any): ChessAudioEvent {
    // Checkmate
    if (gameState?.isCheckmate) {
      return 'checkmate';
    }

    // Check
    if (gameState?.isCheck) {
      return 'check';
    }

    // Castling
    if (move.piece.type === 'king' && Math.abs(move.from.charCodeAt(0) - move.to.charCodeAt(0)) > 1) {
      return 'castle';
    }

    // Promotion
    if (move.promotion) {
      return 'promote';
    }

    // Capture
    if (move.captured) {
      return 'capture';
    }

    // Regular move
    return 'move';
  }

  /**
   * Generate contextual audio variations
   */
  static getContextualFile(
    baseFile: string, 
    piece?: PieceType,
    _isCapture?: boolean
  ): string {
    // Add piece-specific variations if available
    if (piece) {
      const pieceSuffix = piece === 'knight' ? 'knight' : piece;
      const contextualFile = baseFile.replace('.mp3', `-${pieceSuffix}.mp3`);
      
      // Return contextual file if it exists, otherwise return base file
      return contextualFile;
    }

    return baseFile;
  }

  /**
   * Create spatial audio effect (experimental)
   */
  static async playSpatialSound(
    buffer: AudioBuffer,
    volume: number,
    position: { x: number; y: number }
  ): Promise<void> {
    if (!this.audioContext || !buffer) {
      return;
    }

    try {
      const source = this.audioContext.createBufferSource();
      source.buffer = buffer;

      // Create panner for spatial audio
      const panner = this.audioContext.createStereoPanner();
      
      // Map board position (0-7, 0-7) to stereo position (-1 to 1)
      const stereoPosition = (position.x - 3.5) / 3.5;
      panner.pan.value = Math.max(-1, Math.min(1, stereoPosition));

      // Create gain node
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = volume * this.masterVolume;

      // Connect nodes
      source.connect(panner);
      panner.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      source.start(0);
    } catch (error) {
      console.warn('Failed to play spatial audio:', error);
      // Fallback to regular audio
      await this.playAudioBuffer(buffer, volume);
    }
  }

  /**
   * Stop all currently playing sounds
   */
  static stopAll(): void {
    // In a more advanced implementation, you would track all active source nodes
    // and stop them here. For now, this is a placeholder.
    console.log('Stopping all audio');
  }

  /**
   * Cleanup audio resources
   */
  static async cleanup(): Promise<void> {
    this.stopAll();
    this.clearCache();

    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        await this.audioContext.close();
      } catch (error) {
        console.warn('Failed to close audio context:', error);
      }
    }

    this.audioContext = null;
    this.isInitialized = false;
  }

  /**
   * Check Web Audio API support
   */
  static isSupported(): boolean {
    return !!(window.AudioContext || (window as any).webkitAudioContext);
  }

  /**
   * Get audio context sample rate
   */
  static getSampleRate(): number {
    return this.audioContext?.sampleRate || 44100;
  }
}