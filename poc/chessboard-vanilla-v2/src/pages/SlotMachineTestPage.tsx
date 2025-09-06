import React from 'react'
import { Volume2, RotateCcw, Coins, RefreshCw } from 'lucide-react'
import { SlotMachine } from '../components/SlotMachine'
import { useChessAudio } from '../services/audioService'
import { usePageInstructions } from '../hooks/usePageInstructions'
import { useAppStore } from '../stores/appStore'

export const SlotMachineTestPage: React.FC = () => {
  const coinBalance = useAppStore((state) => state.coinBalance)
  const setCoinBalance = useAppStore((state) => state.setCoinBalance)
  const { playMove, playError } = useChessAudio()
  usePageInstructions('slots')

  return (
    <div className="relative min-h-full pb-12">
      {/* Enhanced gaming background effects */}
      <div className="bg-overlay">
        {/* Floating Gaming Elements */}
        <div className="bg-orb bg-orb-lg bg-orb-primary top-20 left-20 animation-delay-500"></div>
        <div className="bg-orb bg-orb-md bg-orb-accent bottom-32 right-16 animation-delay-1000"></div>
        <div className="bg-orb bg-orb-sm bg-orb-primary-light top-1/3 left-1/4 animation-delay-1500"></div>
        
        {/* Sparkle Effects */}
        <div className="bg-sparkle bg-sparkle-lg bg-orb-primary-60 top-1/4 right-1/4 animation-delay-300"></div>
        <div className="bg-sparkle bg-sparkle-sm bg-orb-accent-40 bottom-1/3 left-1/3 animation-delay-700"></div>
        <div className="bg-sparkle bg-sparkle-md bg-orb-foreground-50 top-2/3 right-1/3 animation-delay-1200"></div>
      </div>

      <section className="relative z-10 space-y-8">

        {/* Slot Machine Container */}
        <div className="flex justify-center">
          <SlotMachine coinBalance={coinBalance} setCoinBalance={setCoinBalance} />
        </div>
        
        {/* Chess Gaming Control Panel */}
        <div className="control-panel">
          <div className="control-header">
            <div className="status-indicator"></div>
            <h4 className="text-sm font-semibold text-foreground/90">Gaming Controls</h4>
          </div>
          <div className="grid-control grid-control-1-4">
            <button
              onClick={() => {
                playMove(false);
                console.log('Spin sound test');
              }}
              className="group relative btn-primary"
            >
              <div className="icon-button-content">
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
              <div className="icon-button-content">
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
              <div className="icon-button-content">
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
              <div className="icon-button-content">
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