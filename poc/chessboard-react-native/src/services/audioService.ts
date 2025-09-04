import Sound from 'react-native-sound';

export type SoundEffect = 'move' | 'capture' | 'check' | 'gameStart' | 'gameEnd' | 'error';

interface AudioSettings {
  enabled: boolean;
  volume: number; // 0-1
  moveSound: boolean;
  captureSound: boolean;
  checkSound: boolean;
  uiSounds: boolean;
}

// Enable playback in silent mode (iOS)
Sound.setCategory('Ambient');

class ChessAudioService {
  private sounds: Map<SoundEffect, Sound> = new Map();
  private settings: AudioSettings = {
    enabled: true,
    volume: 0.7,
    moveSound: true,
    captureSound: true,
    checkSound: true,
    uiSounds: true,
  };
  private initialized = false;

  constructor() {
    this.initializeSounds();
  }

  private async initializeSounds() {
    const soundFiles: Record<SoundEffect, string> = {
      move: 'move.wav',
      capture: 'capture.wav',
      check: 'check.wav',
      gameStart: 'game-start.wav',
      gameEnd: 'game-end.wav',
      error: 'error.wav',
    };

    // Load each sound file
    Object.entries(soundFiles).forEach(([key, filename]) => {
      const sound = new Sound(filename, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.warn(`Failed to load sound ${key}:`, error);
          // Create a silent sound as fallback
          this.sounds.set(key as SoundEffect, new Sound('', '', () => {}));
        } else {
          console.log(`✅ Sound loaded: ${key}`);
          sound.setVolume(this.settings.volume);
          this.sounds.set(key as SoundEffect, sound);
        }
      });
    });

    this.initialized = true;
    console.log('🔊 Audio service initialized for React Native');
  }

  public play(effect: SoundEffect): void {
    if (!this.initialized || !this.settings.enabled) {
      return;
    }

    // Check specific sound type settings
    switch (effect) {
      case 'move':
        if (!this.settings.moveSound) return;
        break;
      case 'capture':
        if (!this.settings.captureSound) return;
        break;
      case 'check':
        if (!this.settings.checkSound) return;
        break;
      case 'error':
      case 'gameStart':
      case 'gameEnd':
        if (!this.settings.uiSounds) return;
        break;
    }

    const sound = this.sounds.get(effect);
    if (sound) {
      try {
        sound.play((success) => {
          if (success) {
            console.log(`🔊 Played sound: ${effect}`);
          } else {
            console.warn(`🔊 Failed to play sound: ${effect}`);
          }
        });
      } catch (error) {
        console.error(`🔊 Error playing sound ${effect}:`, error);
      }
    } else {
      console.warn(`🔊 Sound not found: ${effect}`);
    }
  }

  public playMove(wasCapture: boolean = false): void {
    this.play(wasCapture ? 'capture' : 'move');
  }

  public playCheck(): void {
    this.play('check');
  }

  public playError(): void {
    this.play('error');
  }

  public playGameStart(): void {
    this.play('gameStart');
  }

  public playGameEnd(): void {
    this.play('gameEnd');
  }

  public setVolume(volume: number): void {
    this.settings.volume = Math.max(0, Math.min(1, volume));
    
    // Update all sound volumes
    this.sounds.forEach((sound) => {
      sound.setVolume(this.settings.volume);
    });
    
    console.log(`🔊 Volume set to: ${this.settings.volume}`);
  }

  public toggleEnabled(): void {
    this.settings.enabled = !this.settings.enabled;
    console.log(`🔊 Audio ${this.settings.enabled ? 'enabled' : 'disabled'}`);
  }

  public setEnabled(enabled: boolean): void {
    this.settings.enabled = enabled;
    console.log(`🔊 Audio ${enabled ? 'enabled' : 'disabled'}`);
  }

  public setSoundType(type: keyof Omit<AudioSettings, 'enabled' | 'volume'>, enabled: boolean): void {
    this.settings[type] = enabled;
    console.log(`🔊 ${type} ${enabled ? 'enabled' : 'disabled'}`);
  }

  public getSettings(): AudioSettings {
    return { ...this.settings };
  }

  public updateSettings(newSettings: Partial<AudioSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
    
    if (newSettings.volume !== undefined) {
      this.setVolume(newSettings.volume);
    }
  }

  // Preload sounds (no-op in React Native - sounds are loaded on creation)
  public preloadSounds(): void {
    console.log('🔊 Sounds already loaded in React Native');
  }

  // Cleanup method
  public destroy(): void {
    this.sounds.forEach((sound) => {
      sound.release();
    });
    this.sounds.clear();
    console.log('🔊 Audio service destroyed');
  }
}

// Create singleton instance
export const audioService = new ChessAudioService();

// Hook for React components
export function useChessAudio() {
  return {
    playMove: (wasCapture: boolean = false) => audioService.playMove(wasCapture),
    playCheck: () => audioService.playCheck(),
    playError: () => audioService.playError(),
    playGameStart: () => audioService.playGameStart(),
    playGameEnd: () => audioService.playGameEnd(),
    setVolume: (volume: number) => audioService.setVolume(volume),
    toggleEnabled: () => audioService.toggleEnabled(),
    setEnabled: (enabled: boolean) => audioService.setEnabled(enabled),
    getSettings: () => audioService.getSettings(),
    updateSettings: (settings: Partial<AudioSettings>) => audioService.updateSettings(settings),
    preloadSounds: () => audioService.preloadSounds(),
  };
}

export default audioService;