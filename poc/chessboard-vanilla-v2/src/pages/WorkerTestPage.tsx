import React, { useState, useCallback } from 'react'
import { CheckCircle, XCircle, Clock, Brain, Cpu, Target } from 'lucide-react'
import { useStockfish } from '../hooks/useStockfish'
// import { useTheme } from '../stores/appStore'
import { InstructionsModal } from '../components/InstructionsModal'

export const WorkerTestPage: React.FC = () => {
  const { isReady, isThinking, skillLevel, setSkillLevel, requestMove, evaluatePosition, error } = useStockfish()
  // Theme store available if needed
  // const { currentTheme, selectedBaseTheme } = useTheme()
  const [testResults, setTestResults] = useState<string[]>([])
  const [lastMove, setLastMove] = useState<string>('')
  const [responseTime, setResponseTime] = useState<number>(0)
  const [evaluation, setEvaluation] = useState<string>('')
  const [isTestingReady, setIsTestingReady] = useState(false)
  // Individual test states for UI feedback
  const [, setIsTestingSpeed] = useState(false)
  const [, setIsTestingPosition] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [isRunningAllTests, setIsRunningAllTests] = useState(false)

  const addTestResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testWorkerReady = useCallback(async () => {
    setIsTestingReady(true)
    addTestResult("🔍 Testing if worker is ready...")
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500)) // Visual delay for feedback
      if (isReady) {
        addTestResult("✅ Worker is ready and responsive!")
      } else {
        addTestResult("❌ Worker not ready yet")
      }
    } catch (err) {
      addTestResult("❌ Worker readiness test failed")
    } finally {
      setIsTestingReady(false)
    }
  }, [isReady])

  const testGoodMove = useCallback(async () => {
    setIsTestingPosition(true)
    addTestResult("🎯 Asking chess computer for a good opening move...")
    const startTime = Date.now()
    
    try {
      // Starting position FEN
      const move = await requestMove("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
      const time = Date.now() - startTime
      
      if (move) {
        setLastMove(move)
        setResponseTime(time)
        addTestResult(`✅ Computer suggests: ${move} (${time}ms)`)
      } else {
        addTestResult("❌ Computer couldn't suggest a move")
      }
    } catch (err) {
      addTestResult("❌ Error asking for move")
    } finally {
      setIsTestingPosition(false)
    }
  }, [requestMove])

  const testSpeed = useCallback(async () => {
    setIsTestingSpeed(true)
    addTestResult("⚡ Testing response speed with 500ms limit...")
    const startTime = Date.now()
    
    try {
      await requestMove("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1", 500)
      const time = Date.now() - startTime
      setResponseTime(time)
      const speedRating = time < 700 ? "Fast ⚡" : time < 1500 ? "Good ⭐" : "Slow 🐌"
      addTestResult(`✅ Response: ${time}ms (${speedRating})`)
    } catch (err) {
      addTestResult("❌ Speed test failed")
    } finally {
      setIsTestingSpeed(false)
    }
  }, [requestMove])

  const testPosition = useCallback(async () => {
    setIsTestingPosition(true)
    addTestResult("📊 Evaluating starting chess position...")
    
    try {
      // Starting position
      const score = await evaluatePosition("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
      const evaluation = score > 0 ? `White advantage (+${score.toFixed(1)})` : 
                        score < 0 ? `Black advantage (${score.toFixed(1)})` : 
                        "Equal position (0.0)"
      
      setEvaluation(evaluation)
      addTestResult(`✅ ${evaluation}`)
    } catch (err) {
      addTestResult("❌ Position evaluation failed")
    } finally {
      setIsTestingPosition(false)
    }
  }, [evaluatePosition])

  const clearResults = useCallback(() => {
    setTestResults([])
    setLastMove('')
    setResponseTime(0)
    setEvaluation('')
    addTestResult("🧹 Results cleared")
  }, [])

  const runAllTests = useCallback(async () => {
    setIsRunningAllTests(true)
    addTestResult("🚀 Running all tests...")
    try {
      await testWorkerReady()
      await new Promise(resolve => setTimeout(resolve, 1000)) // Delay between tests
      await testGoodMove()
      await new Promise(resolve => setTimeout(resolve, 1000))
      await testSpeed()
      await new Promise(resolve => setTimeout(resolve, 1000))
      await testPosition()
      addTestResult("🎉 All tests completed!")
    } finally {
      setIsRunningAllTests(false)
    }
  }, [testWorkerReady, testGoodMove, testSpeed, testPosition])

  const getSkillDescription = (level: number) => {
    if (level <= 2) return "Beginner (learning the rules)"
    if (level <= 4) return "Casual player (plays for fun)"
    if (level <= 6) return "Club player (plays regularly)"
    if (level <= 8) return "Strong club player (quite good)"
    return "Expert level (very strong)"
  }

  const instructions = [
    "Test if the chess computer is working and ready to play games",
    "Check how fast the computer can think and respond to moves", 
    "Adjust the computer's skill level from beginner to expert",
    "Run quick tests to verify the chess engine is functioning properly"
  ]

  return (
    <div className="relative min-h-full pb-12">
      <section className="relative z-10 space-y-8">
        {/* Ultra-Compact Header with Instructions */}
        <div className="card-gaming p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 backdrop-blur-sm">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Chess Computer Status & Tests</h3>
                <span className="text-sm text-muted-foreground">Worker Readiness Testing Interface</span>
              </div>
            </div>
            <button 
              onClick={() => setShowInstructions(true)}
              className="flex items-center gap-2 text-sm text-primary font-medium hover:text-primary/80 transition-colors"
            >
              <Target className="w-4 h-4" />
              <span>Instructions</span>
            </button>
          </div>
        </div>

        {/* Main Content - Consolidated */}
        <div className="card-gaming p-6 space-y-6">
          {/* Worker Status */}
          <div className="flex items-center gap-3">
            {isReady ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-lg text-foreground">✅ Ready to play chess!</span>
              </>
            ) : error ? (
              <>
                <XCircle className="w-6 h-6 text-red-500" />
                <span className="text-lg text-red-500">❌ Something went wrong: {error}</span>
              </>
            ) : (
              <>
                <Clock className="w-6 h-6 text-yellow-500 animate-spin" />
                <span className="text-lg text-foreground">⏳ Starting up the chess computer...</span>
              </>
            )}
            {isThinking && (
              <div className="flex items-center gap-2 text-foreground/70 ml-4">
                <Brain className="w-4 h-4 animate-pulse" />
                <span>Thinking...</span>
              </div>
            )}
          </div>

          {/* Skill Level Control */}
          <div>
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Skill Level: Beginner</span>
              <span>Expert</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={skillLevel}
              onChange={(e) => setSkillLevel(parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              disabled={!isReady}
            />
            <div className="mt-2 text-center">
              <span className="text-foreground font-medium">Level {skillLevel}: </span>
              <span className="text-muted-foreground">{getSkillDescription(skillLevel)}</span>
            </div>
          </div>

          {/* Test Controls */}
          <div className="space-y-3">
            <button
              onClick={testWorkerReady}
              disabled={isTestingReady || isRunningAllTests}
              className="w-full btn-secondary"
            >
              {isTestingReady ? "Testing Worker..." : "Test Worker Ready"}
            </button>
            <button
              onClick={testGoodMove}
              disabled={!isReady || isThinking || isRunningAllTests}
              className="w-full btn-secondary"
            >
              Ask for a Good Opening Move
            </button>
            <button
              onClick={testSpeed}
              disabled={!isReady || isThinking || isRunningAllTests}
              className="w-full btn-secondary"
            >
              How Fast Can It Think?
            </button>
            <button
              onClick={testPosition}
              disabled={!isReady || isThinking || isRunningAllTests}
              className="w-full btn-secondary"
            >
              Is This a Good Position?
            </button>
          </div>
          
          {/* Control buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={runAllTests}
              disabled={!isReady || isThinking || isRunningAllTests}
              className="flex-1 btn-primary"
            >
              Run All Tests
            </button>
            <button
              onClick={clearResults}
              className="flex-1 btn-muted"
            >
              Clear Results
            </button>
          </div>

          {/* Results Display */}
          <div className="bg-background/50 rounded-lg p-4 border border-border/50">
            <h4 className="font-medium text-foreground mb-3">Test Results:</h4>
            {lastMove && (
              <div className="mb-2 text-foreground">
                → Computer suggests: Move <span className="font-mono bg-muted px-1 rounded">{lastMove}</span>
              </div>
            )}
            {responseTime > 0 && (
              <div className="mb-2 text-foreground">
                → Answered in <span className="font-mono bg-muted px-1 rounded">{responseTime}ms</span>
              </div>
            )}
            {evaluation && (
              <div className="mb-2 text-foreground">
                → <span className="font-mono bg-muted px-1 rounded">{evaluation}</span>
              </div>
            )}
            
            {testResults.length > 0 && (
              <div className="mt-4">
                <div className="text-xs text-muted-foreground mb-2">Recent Activity:</div>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {testResults.slice(-5).map((result, i) => (
                    <div key={i} className="text-xs text-muted-foreground font-mono">
                      {result}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        title="Chess Computer Testing Guide"
        instructions={instructions}
      />
    </div>
  )
}