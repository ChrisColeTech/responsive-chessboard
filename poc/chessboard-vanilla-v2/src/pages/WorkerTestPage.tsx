import React from 'react'
import { Cpu, Play, TestTube } from 'lucide-react'

export const WorkerTestPage: React.FC = () => {
  return (
    <>
      <section className="space-y-4 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-foreground/10 rounded border border-foreground/30">
            <Play className="w-4 h-4 text-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Engine Status</h3>
        </div>
        <div className="card-gaming p-4">
          <p className="text-muted-foreground">
            Stockfish integration testing will be implemented here.
          </p>
          <div className="mt-4 flex gap-4">
            <button className="btn-gaming-primary gpu-accelerated flex items-center gap-2">
              <Play className="w-4 h-4" />
              Initialize Engine
            </button>
            <button className="btn-gaming-secondary gpu-accelerated flex items-center gap-2">
              <TestTube className="w-4 h-4" />
              Run Tests
            </button>
          </div>
        </div>
      </section>
      
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-foreground/10 rounded border border-foreground/30">
            <Cpu className="w-4 h-4 text-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Engine Controls</h3>
        </div>
        <div className="card-gaming p-4">
          <p className="text-muted-foreground">
            Engine control interface will be implemented here following the presentation layer plan.
          </p>
        </div>
      </section>
    </>
  )
}