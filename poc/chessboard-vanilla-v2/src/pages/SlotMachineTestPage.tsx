import React, { useState } from 'react'
import { Coins, Volume2, RotateCcw, TrendingUp } from 'lucide-react'
import { SlotMachine } from '../components/SlotMachine'
import { InstructionsModal } from '../components/InstructionsModal'
import { useChessAudio } from '../services/audioService'
import { useAppStore } from '../stores/appStore'

export const SlotMachineTestPage: React.FC = () => {
  const [showInstructions, setShowInstructions] = useState(false)
  const coinBalance = useAppStore((state) => state.coinBalance)
  const setCoinBalance = useAppStore((state) => state.setCoinBalance)
  const { playMove, playError } = useChessAudio()

  const instructions = [
    "Experience the thrill of a casino slot machine with visual and audio feedback",
    "Use the +/- buttons to adjust your coin wager amount", 
    "Click the SPIN button to start the slot machine animation",
    "Watch for winning combinations and enjoy the casino atmosphere"
  ]

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
        {/* Chess Casino Header */}
        <div className="card-gaming p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 backdrop-blur-sm">
                <Coins className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Chess Slot Machine</h3>
                <span className="text-sm text-muted-foreground">Royal Gaming Experience</span>
              </div>
            </div>
            
            <button 
              onClick={() => setShowInstructions(true)}
              className="flex items-center gap-2 text-sm text-primary font-medium hover:text-primary/80 transition-colors"
            >
              <TrendingUp className="w-4 h-4" />
              <span>How to Play</span>
            </button>
          </div>
        </div>

        {/* Slot Machine Container */}
        <div className="flex justify-center items-center min-h-[60vh]">
          <SlotMachine coinBalance={coinBalance} setCoinBalance={setCoinBalance} />
        </div>
        
        {/* Chess Gaming Control Panel */}
        <div className="mt-6 card-gaming p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <h4 className="text-sm font-semibold text-foreground/90">Gaming Controls</h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
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
          </div>
        </div>
      </section>

      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        title="Chess Slot Machine Guide"
        instructions={instructions}
      />
    </div>
  )
}