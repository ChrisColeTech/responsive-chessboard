import React from 'react'

const MinimalSplashPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center card-gaming p-12">
        <h1 className="text-6xl font-bold mb-6">Chess Master</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Minimal Splash Screen Design
        </p>
        <div className="text-sm text-muted-foreground">
          Clean, simple design with just the essentials
        </div>
      </div>
    </div>
  )
}

export default MinimalSplashPage