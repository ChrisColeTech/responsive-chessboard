// useAudio.ts - Audio state and profile management hook
import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import type { AudioProfileType, AudioProfileConfig } from '../types/enhancement.types';
import type { ChessMove } from '../types/chess.types';
import { AudioManager, type ChessAudioEvent, type AudioContextState } from '../services/AudioManager';

interface UseAudioOptions {
  enableSpatialAudio?: boolean;
  preloadSounds?: boolean;
  onAudioEvent?: (event: ChessAudioEvent) => void;
  onError?: (error: Error) => void;
  autoInitialize?: boolean;
}

interface UseAudioReturn {
  audioProfile: AudioProfileType;
  currentProfile: AudioProfileType;
  isEnabled: boolean;
  isInitialized: boolean;
  volume: number;
  contextState: AudioContextState;
  availableProfiles: AudioProfileType[];
  setAudioProfile: (profile: AudioProfileType) => void;
  setProfile: (profile: AudioProfileType) => void;
  setEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  playSound: (event: ChessAudioEvent | string, config?: any) => Promise<void>;
  initializeAudio: () => Promise<boolean>;
  playMoveSound: (move: ChessMove, gameState?: any) => Promise<void>;
  playCustomSound: (event: ChessAudioEvent, customConfig?: any) => Promise<void>;
  preloadProfile: (profile: AudioProfileType) => Promise<void>;
  cleanup: () => Promise<void>;
  testAudio: () => Promise<void>;
}

const DEFAULT_PROFILE: AudioProfileType = 'standard';

export const useAudio = (
  profileConfig: AudioProfileConfig,
  initialProfile: AudioProfileType = DEFAULT_PROFILE,
  options: UseAudioOptions = {}
): UseAudioReturn => {
  const {
    enableSpatialAudio = false,
    preloadSounds = true,
    onAudioEvent,
    onError,
    autoInitialize = false
  } = options;

  const [audioProfile, setAudioProfileState] = useState<AudioProfileType>(initialProfile);
  const [isEnabled, setIsEnabledState] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [volume, setVolumeState] = useState(1.0);
  const [contextState, setContextState] = useState<AudioContextState>(AudioManager.getContextState());
  
  const initializationAttempted = useRef(false);
  const preloadedProfiles = useRef(new Set<AudioProfileType>());

  // Available profiles
  const availableProfiles = useMemo((): AudioProfileType[] => 
    ['silent', 'subtle', 'standard', 'rich'], 
    []
  );

  // Update context state periodically
  useEffect(() => {
    const updateContextState = () => {
      setContextState(AudioManager.getContextState());
    };

    const interval = setInterval(updateContextState, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize audio
  const initializeAudio = useCallback(async (): Promise<boolean> => {
    if (initializationAttempted.current) {
      return isInitialized;
    }

    initializationAttempted.current = true;

    try {
      const success = await AudioManager.initialize();
      
      if (success) {
        AudioManager.setProfile(audioProfile);
        AudioManager.setEnabled(isEnabled);
        AudioManager.setMasterVolume(volume);
        
        // Preload current profile if enabled
        if (preloadSounds) {
          await preloadProfile(audioProfile);
        }
        
        setIsInitialized(true);
        console.log('Audio initialized successfully');
      } else {
        console.warn('Failed to initialize audio');
      }
      
      return success;
    } catch (error) {
      console.error('Audio initialization error:', error);
      onError?.(error as Error);
      return false;
    }
  }, [audioProfile, isEnabled, volume, preloadSounds, onError, isInitialized]);

  // Set audio profile
  const setAudioProfile = useCallback(async (profile: AudioProfileType) => {
    if (!availableProfiles.includes(profile)) {
      console.warn(`Invalid audio profile: ${profile}`);
      return;
    }

    setAudioProfileState(profile);
    AudioManager.setProfile(profile);

    // Preload new profile if needed
    if (preloadSounds && isInitialized && !preloadedProfiles.current.has(profile)) {
      await preloadProfile(profile);
    }
  }, [availableProfiles, preloadSounds, isInitialized]);

  // Set enabled state
  const setEnabled = useCallback((enabled: boolean) => {
    setIsEnabledState(enabled);
    AudioManager.setEnabled(enabled);
  }, []);

  // Set volume
  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    AudioManager.setMasterVolume(clampedVolume);
  }, []);

  // Play move sound
  const playMoveSound = useCallback(async (move: ChessMove, gameState?: any): Promise<void> => {
    if (!isEnabled || !isInitialized || audioProfile === 'silent') {
      return;
    }

    try {
      // Determine the chess event from the move
      const event = AudioManager.getEventFromMove(move, gameState);
      const eventConfig = profileConfig[event];
      
      if (!eventConfig || !eventConfig.enabled) {
        return;
      }

      // Get contextual file path
      const contextualFile = AudioManager.getContextualFile(
        eventConfig.file,
        move.piece.type,
        !!move.captured
      );

      const config = {
        ...eventConfig,
        file: contextualFile
      };

      // Play with spatial audio if enabled
      if (enableSpatialAudio) {
        // TODO: Implement spatial audio positioning based on board position
        // Future implementation would calculate spatial positioning from move coordinates
        
        // For now, just use the regular audio - spatial implementation would be more complex
        await AudioManager.playChessEvent(event, config, move);
      } else {
        await AudioManager.playChessEvent(event, config, move);
      }

      onAudioEvent?.(event);
    } catch (error) {
      console.warn('Failed to play move sound:', error);
      onError?.(error as Error);
    }
  }, [isEnabled, isInitialized, audioProfile, profileConfig, enableSpatialAudio, onAudioEvent, onError]);

  // Play custom sound
  const playCustomSound = useCallback(async (event: ChessAudioEvent, customConfig?: any): Promise<void> => {
    if (!isEnabled || !isInitialized || audioProfile === 'silent') {
      return;
    }

    try {
      const eventConfig = customConfig || profileConfig[event];
      
      if (!eventConfig || !eventConfig.enabled) {
        return;
      }

      await AudioManager.playChessEvent(event, eventConfig);
      onAudioEvent?.(event);
    } catch (error) {
      console.warn(`Failed to play custom sound for event '${event}':`, error);
      onError?.(error as Error);
    }
  }, [isEnabled, isInitialized, audioProfile, profileConfig, onAudioEvent, onError]);

  // Generic play sound method (alias for playCustomSound)
  const playSound = useCallback(async (event: ChessAudioEvent | string, config?: any): Promise<void> => {
    await playCustomSound(event as ChessAudioEvent, config);
  }, [playCustomSound]);

  // Preload profile
  const preloadProfile = useCallback(async (profile: AudioProfileType): Promise<void> => {
    if (preloadedProfiles.current.has(profile) || !isInitialized) {
      return;
    }

    try {
      await AudioManager.preloadProfile(profileConfig);
      preloadedProfiles.current.add(profile);
      console.log(`Audio profile '${profile}' preloaded successfully`);
    } catch (error) {
      console.warn(`Failed to preload audio profile '${profile}':`, error);
      onError?.(error as Error);
    }
  }, [profileConfig, isInitialized, onError]);

  // Test audio playback
  const testAudio = useCallback(async (): Promise<void> => {
    if (!isInitialized) {
      await initializeAudio();
    }

    const testMove: ChessMove = {
      from: 'e2' as any,
      to: 'e4' as any,
      piece: { 
        id: 'test-pawn-e2', 
        type: 'pawn', 
        color: 'white',
        position: { file: 'e', rank: 2 }
      },
      isCheck: false,
      isCheckmate: false,
      notation: 'e4',
      san: 'e4',
      uci: 'e2e4'
    };

    await playMoveSound(testMove);
  }, [isInitialized, initializeAudio, playMoveSound]);

  // Cleanup
  const cleanup = useCallback(async (): Promise<void> => {
    try {
      await AudioManager.cleanup();
      setIsInitialized(false);
      initializationAttempted.current = false;
      preloadedProfiles.current.clear();
    } catch (error) {
      console.warn('Failed to cleanup audio:', error);
      onError?.(error as Error);
    }
  }, [onError]);

  // Auto-initialize if enabled
  useEffect(() => {
    if (autoInitialize && !initializationAttempted.current) {
      // Delay initialization to allow for user interaction
      const timer = setTimeout(() => {
        initializeAudio();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [autoInitialize, initializeAudio]);

  // Handle profile changes
  useEffect(() => {
    if (initialProfile !== audioProfile) {
      setAudioProfile(initialProfile);
    }
  }, [initialProfile, audioProfile, setAudioProfile]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  // Handle page visibility changes to pause/resume audio
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, could pause audio context to save resources
        console.log('Page hidden, audio context may be suspended');
      } else {
        // Page is visible again, resume audio context if needed
        console.log('Page visible, resuming audio context if needed');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Listen for user interaction to initialize audio
  useEffect(() => {
    if (isInitialized || initializationAttempted.current) {
      return;
    }

    const handleUserInteraction = () => {
      if (!initializationAttempted.current) {
        initializeAudio();
      }
    };

    // Listen for any user interaction
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [isInitialized, initializeAudio]);

  return {
    audioProfile,
    currentProfile: audioProfile,
    isEnabled,
    isInitialized,
    volume,
    contextState,
    availableProfiles,
    setAudioProfile,
    setProfile: setAudioProfile,
    setEnabled,
    setVolume,
    playSound,
    initializeAudio,
    playMoveSound,
    playCustomSound,
    preloadProfile,
    cleanup,
    testAudio
  };
};