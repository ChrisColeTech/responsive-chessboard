import React, { useState, useCallback } from 'react'
import { CheckCircle, XCircle, Clock, Zap, Brain, TrendingUp, Cpu } from 'lucide-react'
import { useStockfish } from '../hooks/useStockfish'
import { useTheme } from '../stores/appStore'

export const WorkerTestPage: React.FC = () => {
  const { isReady, isThinking, skillLevel, setSkillLevel, requestMove, evaluatePosition, error } = useStockfish()
  const { currentTheme, selectedBaseTheme } = useTheme()
  const [testResults, setTestResults] = useState<string[]>([])
  const [lastMove, setLastMove] = useState<string>('')
  const [responseTime, setResponseTime] = useState<number>(0)
  const [evaluation, setEvaluation] = useState<string>('')
  const [isTestingReady, setIsTestingReady] = useState(false)
  const [isTestingSpeed, setIsTestingSpeed] = useState(false)
  const [isTestingPosition, setIsTestingPosition] = useState(false)

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

  const getSkillDescription = (level: number) => {
    if (level <= 2) return "Beginner (learning the rules)"
    if (level <= 4) return "Casual player (plays for fun)"
    if (level <= 6) return "Club player (plays regularly)"
    if (level <= 8) return "Strong club player (quite good)"
    return "Expert level (very strong)"
  }

  return (
    <div className="space-y-6">
      {/* Status Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-foreground/10 rounded border border-foreground/30">
            {isReady ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
          </div>
          <h3 className="text-lg font-semibold text-foreground">Is the Chess Computer Working?</h3>
        </div>
        <div className="card-gaming p-6">
          <div className="flex items-center gap-3 mb-4">
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
          </div>
          
          {isThinking && (
            <div className="flex items-center gap-2 text-foreground/70 mb-4">
              <Brain className="w-4 h-4 animate-pulse" />
              <span>Computer is thinking...</span>
            </div>
          )}
        </div>
      </section>

      {/* Skill Level Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-foreground/10 rounded border border-foreground/30">
            <TrendingUp className="w-4 h-4 text-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">How Smart Should It Be?</h3>
        </div>
        <div className="card-gaming p-6">
          <div className="mb-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Beginner</span>
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
        </div>
      </section>

      {/* Quick Tests Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-foreground/10 rounded border border-foreground/30">
            <Zap className="w-4 h-4 text-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Quick Tests</h3>
        </div>
        <div className="card-gaming p-6 space-y-4">
          <div className="space-y-3">
            <button
              onClick={testGoodMove}
              disabled={!isReady || isThinking}
              className="w-full bg-foreground/10 hover:bg-foreground/20 text-foreground border border-foreground/20 rounded-lg p-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ask for a Good Opening Move
            </button>
            <button
              onClick={testSpeed}
              disabled={!isReady || isThinking}
              className="w-full bg-foreground/10 hover:bg-foreground/20 text-foreground border border-foreground/20 rounded-lg p-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              How Fast Can It Think?
            </button>
            <button
              onClick={testPosition}
              disabled={!isReady || isThinking}
              className="w-full bg-foreground/10 hover:bg-foreground/20 text-foreground border border-foreground/20 rounded-lg p-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Is This a Good Position?
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
    </div>
  )
}