// audio-profiles.constants.ts - Audio profile configurations
import type { AudioProfileType, AudioProfileConfig, AudioEventConfig } from '../types/enhancement.types';

// Default audio event configuration
const createAudioEvent = (
  enabled: boolean, 
  file: string, 
  volume: number = 0.7
): AudioEventConfig => ({
  enabled,
  file,
  volume
});

export const AUDIO_PROFILES: Record<AudioProfileType, AudioProfileConfig> = {
  silent: {
    move: createAudioEvent(false, '', 0),
    capture: createAudioEvent(false, '', 0),
    check: createAudioEvent(false, '', 0),
    checkmate: createAudioEvent(false, '', 0),
    castle: createAudioEvent(false, '', 0),
    promote: createAudioEvent(false, '', 0),
    gameStart: createAudioEvent(false, '', 0),
    gameEnd: createAudioEvent(false, '', 0)
  },

  subtle: {
    move: createAudioEvent(true, '/audio/subtle/soft-click.mp3', 0.3),
    capture: createAudioEvent(true, '/audio/subtle/soft-capture.mp3', 0.4),
    check: createAudioEvent(true, '/audio/subtle/soft-alert.mp3', 0.5),
    checkmate: createAudioEvent(true, '/audio/subtle/soft-victory.mp3', 0.6),
    castle: createAudioEvent(true, '/audio/subtle/soft-castle.mp3', 0.4),
    promote: createAudioEvent(true, '/audio/subtle/soft-promote.mp3', 0.5),
    gameStart: createAudioEvent(true, '/audio/subtle/soft-start.mp3', 0.4),
    gameEnd: createAudioEvent(true, '/audio/subtle/soft-end.mp3', 0.5)
  },

  standard: {
    move: createAudioEvent(true, '/audio/standard/wood-click.mp3', 0.6),
    capture: createAudioEvent(true, '/audio/standard/piece-capture.mp3', 0.7),
    check: createAudioEvent(true, '/audio/standard/check-alert.mp3', 0.8),
    checkmate: createAudioEvent(true, '/audio/standard/checkmate-sound.mp3', 0.9),
    castle: createAudioEvent(true, '/audio/standard/castle-move.mp3', 0.7),
    promote: createAudioEvent(true, '/audio/standard/promotion.mp3', 0.8),
    gameStart: createAudioEvent(true, '/audio/standard/game-start.mp3', 0.7),
    gameEnd: createAudioEvent(true, '/audio/standard/game-end.mp3', 0.8)
  },

  rich: {
    move: createAudioEvent(true, '/audio/rich/premium-move.mp3', 0.8),
    capture: createAudioEvent(true, '/audio/rich/dramatic-capture.mp3', 0.9),
    check: createAudioEvent(true, '/audio/rich/tension-check.mp3', 1.0),
    checkmate: createAudioEvent(true, '/audio/rich/epic-checkmate.mp3', 1.0),
    castle: createAudioEvent(true, '/audio/rich/royal-castle.mp3', 0.9),
    promote: createAudioEvent(true, '/audio/rich/triumphant-promote.mp3', 1.0),
    gameStart: createAudioEvent(true, '/audio/rich/grand-start.mp3', 0.9),
    gameEnd: createAudioEvent(true, '/audio/rich/dramatic-end.mp3', 1.0)
  }
};

export const DEFAULT_AUDIO_PROFILE: AudioProfileType = 'standard';

export const AUDIO_PROFILE_DISPLAY_NAMES: Record<AudioProfileType, string> = {
  silent: 'Silent',
  subtle: 'Subtle',
  standard: 'Standard',
  rich: 'Rich'
};

export const AUDIO_PROFILE_DESCRIPTIONS: Record<AudioProfileType, string> = {
  silent: 'No sound effects',
  subtle: 'Gentle, minimal sound effects',
  standard: 'Classic chess sound effects',
  rich: 'Immersive, dramatic sound effects'
};

// Contextual audio variations for different pieces
export const PIECE_AUDIO_VARIATIONS: Record<string, Record<string, string>> = {
  standard: {
    'pawn-move': '/audio/standard/pawn-move.mp3',
    'knight-move': '/audio/standard/knight-move.mp3',
    'bishop-move': '/audio/standard/bishop-move.mp3',
    'rook-move': '/audio/standard/rook-move.mp3',
    'queen-move': '/audio/standard/queen-move.mp3',
    'king-move': '/audio/standard/king-move.mp3',
    'pawn-capture': '/audio/standard/pawn-capture.mp3',
    'knight-capture': '/audio/standard/knight-capture.mp3',
    'bishop-capture': '/audio/standard/bishop-capture.mp3',
    'rook-capture': '/audio/standard/rook-capture.mp3',
    'queen-capture': '/audio/standard/queen-capture.mp3'
  },
  
  rich: {
    'pawn-move': '/audio/rich/pawn-step.mp3',
    'knight-move': '/audio/rich/knight-gallop.mp3',
    'bishop-move': '/audio/rich/bishop-glide.mp3',
    'rook-move': '/audio/rich/rook-slide.mp3',
    'queen-move': '/audio/rich/queen-sweep.mp3',
    'king-move': '/audio/rich/king-step.mp3',
    'pawn-capture': '/audio/rich/pawn-strike.mp3',
    'knight-capture': '/audio/rich/knight-clash.mp3',
    'bishop-capture': '/audio/rich/bishop-strike.mp3',
    'rook-capture': '/audio/rich/rook-crush.mp3',
    'queen-capture': '/audio/rich/queen-conquest.mp3'
  }
};

// Audio event priorities for mixing
export const AUDIO_EVENT_PRIORITIES: Record<string, number> = {
  checkmate: 100,
  check: 90,
  promote: 80,
  capture: 70,
  castle: 60,
  move: 50
};

// Context-based volume adjustments
export const CONTEXT_VOLUME_MODIFIERS: Record<string, Record<string, number>> = {
  tournament: {
    move: 0.3,
    capture: 0.4,
    check: 0.5,
    checkmate: 0.6,
    castle: 0.4,
    promote: 0.5
  },
  
  casual: {
    move: 1.0,
    capture: 1.0,
    check: 1.0,
    checkmate: 1.0,
    castle: 1.0,
    promote: 1.0
  },
  
  analysis: {
    move: 0.7,
    capture: 0.8,
    check: 0.9,
    checkmate: 1.0,
    castle: 0.8,
    promote: 0.9
  },
  
  learning: {
    move: 0.8,
    capture: 0.9,
    check: 1.0,
    checkmate: 1.0,
    castle: 0.9,
    promote: 1.0
  }
};

// Environmental audio settings
export interface EnvironmentalAudioConfig {
  reverbLevel: number;
  spatialEnabled: boolean;
  frequencyFiltering: boolean;
  dynamicRange: number;
}

export const ENVIRONMENTAL_AUDIO_CONFIGS: Record<string, EnvironmentalAudioConfig> = {
  indoor: {
    reverbLevel: 0.2,
    spatialEnabled: true,
    frequencyFiltering: false,
    dynamicRange: 0.8
  },
  
  outdoor: {
    reverbLevel: 0.0,
    spatialEnabled: true,
    frequencyFiltering: true,
    dynamicRange: 1.0
  },
  
  hall: {
    reverbLevel: 0.6,
    spatialEnabled: true,
    frequencyFiltering: false,
    dynamicRange: 0.9
  },
  
  library: {
    reverbLevel: 0.1,
    spatialEnabled: false,
    frequencyFiltering: true,
    dynamicRange: 0.4
  }
};

// Audio file fallbacks for missing sounds
export const AUDIO_FALLBACKS: Record<string, string> = {
  '/audio/subtle/soft-click.mp3': '/audio/standard/wood-click.mp3',
  '/audio/rich/premium-move.mp3': '/audio/standard/wood-click.mp3',
  '/audio/subtle/soft-capture.mp3': '/audio/standard/piece-capture.mp3',
  '/audio/rich/dramatic-capture.mp3': '/audio/standard/piece-capture.mp3'
};

// Preload priorities (higher numbers load first)
export const PRELOAD_PRIORITIES: Record<string, number> = {
  move: 100,
  capture: 90,
  check: 80,
  castle: 70,
  promote: 60,
  checkmate: 50,
  gameStart: 40,
  gameEnd: 30
};

// Audio format preferences (in order of preference)
export const SUPPORTED_AUDIO_FORMATS = ['.mp3', '.ogg', '.wav', '.m4a'];

// Maximum number of simultaneous sounds
export const MAX_CONCURRENT_SOUNDS = 8;

// Audio context settings
export const AUDIO_CONTEXT_CONFIG = {
  sampleRate: 44100,
  latencyHint: 'interactive' as AudioContextLatencyCategory,
  bufferSize: 256
};

// Volume curves for different events
export const VOLUME_CURVES: Record<string, number[]> = {
  move: [0.0, 0.8, 1.0, 0.2, 0.0], // Quick attack, sustain, fast decay
  capture: [0.0, 1.0, 0.8, 0.6, 0.0], // Sharp attack, longer sustain
  check: [0.0, 0.6, 1.0, 1.0, 0.4, 0.0], // Gradual build-up, sustained alert
  checkmate: [0.0, 0.4, 0.8, 1.0, 1.0, 0.6, 0.0] // Dramatic build-up
};