import React, { useEffect } from 'react'
import { Volume2, RotateCcw, Coins, RefreshCw } from 'lucide-react'
import { SlotMachine } from '../components/SlotMachine'
import { useChessAudio } from '../services/audioService'
import { useInstructions } from '../contexts/InstructionsContext'
import { useAppStore } from '../stores/appStore'

export const SlotMachineTestPage: React.FC = () => {
  const coinBalance = useAppStore((state) => state.coinBalance)
  const setCoinBalance = useAppStore((state) => state.setCoinBalance)
  const { playMove, playError } = useChessAudio()
  const { setInstructions } = useInstructions()

  const instructions = [
    "Experience the thrill of a casino slot machine with visual and audio feedback",
    "Use the +/- buttons to adjust your coin wager amount", 
    "Click the SPIN button to start the slot machine animation",
    "Watch for winning combinations and enjoy the casino atmosphere"
  ]

  // Register instructions when component mounts
  useEffect(() => {
    setInstructions("Slot Machine Casino Experience", instructions)
  }, [setInstructions])

  return (
    <div className="relative min-h-full pb-12">
      {/* Enhanced gaming background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Gaming Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full opacity-20 blur-xl animate-pulse gpu-accelerated animation-delay-500"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-accent/20 rounded-full opacity-15 blur-lg animate-pulse gpu-accelerated animation-delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-primary/10 rounded-full opacity-10 blur-md animate-pulse gpu-accelerated animation-delay-1500"></div>
        
        {/* Sparkle Effects */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary/60 rounded-full animate-ping animation-delay-300"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-accent/40 rounded-full animate-ping animation-delay-700"></div>
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-primary/50 rounded-full animate-pulse animation-delay-1200"></div>
      </div>

      <section className="relative z-10 space-y-8">

        {/* Slot Machine Container */}
        <div className="flex justify-center">
          <SlotMachine coinBalance={coinBalance} setCoinBalance={setCoinBalance} />
        </div>
        
        {/* Chess Gaming Control Panel */}
        <div className="mt-6 card-gaming p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <h4 className="text-sm font-semibold text-foreground/90">Gaming Controls</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              onClick={() => {
                playMove(false);
                console.log('Spin sound test');
              }}
              className="group relative btn-primary"
            >
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                <span>Test Spin</span>
              </div>
            </button>
            
            <button
              onClick={() => {
                playMove(true);
                console.log('Win sound test');
              }}
              className="group relative btn-secondary"
            >
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4" />
                <span>Test Win</span>
              </div>
            </button>
            
            <button
              onClick={() => {
                playError();
                console.log('Lose sound test');
              }}
              className="group relative btn-destructive"
            >
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                <span>Test Lose</span>
              </div>
            </button>
            
            <button
              onClick={() => {
                setCoinBalance(100);
                console.log('Coins reset to 100');
              }}
              className="group relative btn-muted"
            >
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                <span>Reset Coins</span>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}