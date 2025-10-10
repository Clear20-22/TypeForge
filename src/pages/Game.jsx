import { useState, useEffect, useCallback } from 'react';
import Keyboard from '../components/keyboard';

// Character sets
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'.split('');
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const NUMBERS = '0123456789'.split('');

export default function Game() {
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [missedBalloons, setMissedBalloons] = useState(0);
  const [activeKey, setActiveKey] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Game settings
  const [characterType, setCharacterType] = useState('lowercase'); // lowercase, uppercase, numbers, mixed, all
  const [wordLimit, setWordLimit] = useState(20); // 10, 20, 30, 40, 50
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [balloonSpeed, setBalloonSpeed] = useState('medium'); // slow, medium, fast

  // Get characters based on selected type
  const getCharacters = useCallback(() => {
    switch (characterType) {
      case 'lowercase':
        return LOWERCASE;
      case 'uppercase':
        return UPPERCASE;
      case 'numbers':
        return NUMBERS;
      case 'mixed':
        return [...LOWERCASE, ...UPPERCASE];
      case 'all':
        return [...LOWERCASE, ...UPPERCASE, ...NUMBERS];
      default:
        return LOWERCASE;
    }
  }, [characterType]);

  // Generate simple balloon
  const generateBalloon = useCallback(() => {
    const characters = getCharacters();
    const char = characters[Math.floor(Math.random() * characters.length)];
    const position = Math.random() * 80 + 10; // 10% to 90% from left
    
    // Speed based on setting
    let baseSpeed, speedVariation;
    switch (balloonSpeed) {
      case 'slow':
        baseSpeed = 8;
        speedVariation = 4; // 8-12 seconds
        break;
      case 'fast':
        baseSpeed = 3;
        speedVariation = 2; // 3-5 seconds
        break;
      case 'medium':
      default:
        baseSpeed = 5;
        speedVariation = 4; // 5-9 seconds
        break;
    }
    const speed = Math.random() * speedVariation + baseSpeed;
    
    // Simple colors
    const colors = [
      'rgba(239, 68, 68, 0.3)',   // red
      'rgba(59, 130, 246, 0.3)',  // blue
      'rgba(34, 197, 94, 0.3)',   // green
      'rgba(234, 179, 8, 0.3)',   // yellow
      'rgba(168, 85, 247, 0.3)',  // purple
      'rgba(236, 72, 153, 0.3)',  // pink
    ];

    return {
      id: Date.now() + Math.random(),
      letter: char,
      left: position,
      speed,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  }, [getCharacters, balloonSpeed]);

  // Start game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setShowSettings(false);
    setScore(0);
    setMissedBalloons(0);
    setWordsCompleted(0);
    setBalloons([]);
  };

  // Restart game
  const restartGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setMissedBalloons(0);
    setWordsCompleted(0);
    setBalloons([]);
  };

  // Apply settings and start/restart game
  const applySettings = () => {
    setShowSettings(false);
    if (gameStarted) {
      restartGame();
    }
  };

  // Generate balloons periodically
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      setBalloons(prev => [...prev, generateBalloon()]);
    }, 1500); // New balloon every 1.5 seconds

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, generateBalloon]);

  // Remove balloons that reach the top
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      setBalloons(prev => {
        const remaining = prev.filter(balloon => {
          const element = document.getElementById(`balloon-${balloon.id}`);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.bottom < 0) {
              setMissedBalloons(m => {
                const newMissed = m + 1;
                if (newMissed >= 10) {
                  setGameOver(true);
                }
                return newMissed;
              });
              return false;
            }
          }
          return true;
        });
        return remaining;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  // Handle key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted || gameOver) return;

      const key = e.key;
      setActiveKey(key);

      // Find matching balloon
      const matchingBalloonIndex = balloons.findIndex(b => b.letter === key);

      if (matchingBalloonIndex !== -1) {
        setBalloons(prev => prev.filter((_, index) => index !== matchingBalloonIndex));
        setScore(s => s + 10);
        setWordsCompleted(w => {
          const newCount = w + 1;
          // Check if word limit reached
          if (newCount >= wordLimit) {
            setGameOver(true);
          }
          return newCount;
        });
        setTimeout(() => setActiveKey(''), 100);
      }
    };

    const handleKeyUp = () => {
      setActiveKey('');
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStarted, gameOver, balloons, wordLimit]);

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col overflow-hidden">
      {/* Header Stats */}
      <div className="p-2 sm:p-3 bg-slate-900/50 backdrop-blur-sm border-b border-slate-700 flex-shrink-0">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <div className="w-full sm:w-auto text-center sm:text-left">
            <h1 className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Balloon Pop Game
            </h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-center">
              <p className="text-xs text-slate-400">Score</p>
              <p className="text-base sm:text-xl font-bold text-green-400">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400">Progress</p>
              <p className="text-base sm:text-xl font-bold text-cyan-400">{wordsCompleted}/{wordLimit}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400">Missed</p>
              <p className="text-base sm:text-xl font-bold text-red-400">{missedBalloons}/10</p>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all flex items-center gap-1 sm:gap-2 text-slate-300 hover:text-white"
              title="Settings"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs sm:text-sm font-semibold hidden xs:inline">Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Balloon Area */}
        <div className="flex-1 relative overflow-hidden bg-gradient-to-b from-sky-900/20 to-transparent min-h-0">
          
          {/* Settings Modal - Right Sidebar */}
          {showSettings && (
            <>
              {/* Transparent Backdrop */}
              <div 
                className="absolute inset-0 z-30 bg-black/20"
                onClick={() => setShowSettings(false)}
              ></div>
              
              {/* Settings Panel - Right Side */}
              <div className="absolute top-0 right-0 bottom-0 z-40 w-full sm:w-96 bg-slate-800/95 backdrop-blur-xl border-l border-slate-700 shadow-2xl overflow-y-auto">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6 sticky top-0 bg-slate-800/95 backdrop-blur-xl pb-4 border-b border-slate-700">
                    <h2 className="text-2xl font-bold text-white">⚙️ Settings</h2>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Character Type Selection */}
                  <div className="mb-6">
                    <h3 className="text-base font-semibold text-cyan-400 mb-3">Character Type:</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        onClick={() => setCharacterType('lowercase')}
                        className={`p-3 rounded-xl font-bold transition-all text-sm ${
                          characterType === 'lowercase'
                            ? 'bg-cyan-500 text-white shadow-lg'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        lowercase (a-z)
                      </button>
                      <button
                        onClick={() => setCharacterType('uppercase')}
                        className={`p-3 rounded-xl font-bold transition-all text-sm ${
                          characterType === 'uppercase'
                            ? 'bg-cyan-500 text-white shadow-lg'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        UPPERCASE (A-Z)
                      </button>
                      <button
                        onClick={() => setCharacterType('numbers')}
                        className={`p-3 rounded-xl font-bold transition-all text-sm ${
                          characterType === 'numbers'
                            ? 'bg-cyan-500 text-white shadow-lg'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        Numbers (0-9)
                      </button>
                      <button
                        onClick={() => setCharacterType('mixed')}
                        className={`p-3 rounded-xl font-bold transition-all text-sm ${
                          characterType === 'mixed'
                            ? 'bg-cyan-500 text-white shadow-lg'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        Mixed (a-z, A-Z)
                      </button>
                      <button
                        onClick={() => setCharacterType('all')}
                        className={`p-3 rounded-xl font-bold transition-all text-sm ${
                          characterType === 'all'
                            ? 'bg-cyan-500 text-white shadow-lg'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        All (a-z, A-Z, 0-9)
                      </button>
                    </div>
                  </div>

                  {/* Word Limit Selection */}
                  <div className="mb-6">
                    <h3 className="text-base font-semibold text-purple-400 mb-3">Word Limit:</h3>
                    <div className="grid grid-cols-5 gap-2">
                      {[10, 20, 30, 40, 50].map((limit) => (
                        <button
                          key={limit}
                          onClick={() => setWordLimit(limit)}
                          className={`p-3 rounded-xl font-bold transition-all text-sm ${
                            wordLimit === limit
                              ? 'bg-purple-500 text-white shadow-lg'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          }`}
                        >
                          {limit}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Speed Control Selection */}
                  <div className="mb-6">
                    <h3 className="text-base font-semibold text-amber-400 mb-3">Balloon Speed:</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {['slow', 'medium', 'fast'].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => setBalloonSpeed(speed)}
                          className={`p-3 rounded-xl font-bold capitalize transition-all text-sm ${
                            balloonSpeed === speed
                              ? 'bg-amber-500 text-white shadow-lg'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          }`}
                        >
                          {speed === 'slow' && '🐢 '}
                          {speed === 'medium' && '🚶 '}
                          {speed === 'fast' && '🚀 '}
                          {speed}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={applySettings}
                      className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base rounded-xl hover:scale-105 transition-transform shadow-lg"
                    >
                      ✓ Apply Settings
                    </button>
                    {gameStarted && (
                      <button
                        onClick={() => setShowSettings(false)}
                        className="w-full px-6 py-3 bg-slate-700 text-white font-bold text-base rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Start Screen */}
          {!gameStarted && !gameOver && !showSettings && (
            <div className="absolute inset-0 flex items-center justify-center z-20 p-4">
              <div className="text-center bg-slate-800/90 backdrop-blur-md p-4 sm:p-8 rounded-2xl border-2 border-cyan-500/50 shadow-2xl max-w-md w-full">
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-3">🎈 Ready to Play?</h2>
                <p className="text-sm sm:text-base text-slate-300 mb-2">Type the characters on balloons before they fly away!</p>
                <p className="text-xs sm:text-sm text-cyan-400 mb-4">
                  Mode: <span className="font-bold">{characterType}</span> | Limit: <span className="font-bold">{wordLimit} words</span> | Speed: <span className="font-bold capitalize">{balloonSpeed}</span>
                </p>
                <button
                  onClick={startGame}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base sm:text-lg rounded-xl hover:scale-105 transition-transform shadow-lg"
                >
                  Start Game
                </button>
              </div>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50 backdrop-blur-sm p-4">
              <div className="text-center bg-slate-800 p-4 sm:p-8 rounded-2xl border-2 border-green-500 shadow-2xl max-w-md w-full">
                <h2 className="text-2xl sm:text-4xl font-bold text-green-400 mb-2 sm:mb-3">
                  {wordsCompleted >= wordLimit ? '🎉 Congratulations! 🎉' : '💥 Game Over! 💥'}
                </h2>
                <p className="text-lg sm:text-2xl text-white mb-2">Final Score: <span className="text-green-400">{score}</span></p>
                <p className="text-base sm:text-lg text-cyan-400 mb-2">Completed: {wordsCompleted}/{wordLimit}</p>
                <p className="text-base sm:text-lg text-red-400 mb-4 sm:mb-6">Missed: {missedBalloons}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={restartGame}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base sm:text-lg rounded-xl hover:scale-105 transition-transform shadow-lg"
                  >
                    🔄 Play Again
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-slate-700 text-white font-bold text-base sm:text-lg rounded-xl hover:bg-slate-600 transition-colors"
                  >
                    ⚙️ Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Simple Balloons */}
          {balloons.map((balloon) => (
            <div
              key={balloon.id}
              id={`balloon-${balloon.id}`}
              className="absolute balloon-float"
              style={{
                left: `${balloon.left}%`,
                bottom: '-100px',
                animationDuration: `${balloon.speed}s`,
              }}
            >
              {/* Simple Transparent Balloon - Responsive size */}
              <div 
                className="w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 rounded-full flex items-center justify-center border-2 sm:border-4 border-white/40"
                style={{ backgroundColor: balloon.color }}
              >
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'monospace' }}>
                  {balloon.letter}
                </span>
              </div>
            </div>
          ))}

        </div>

        {/* Keyboard Area */}
        <div className="p-2 sm:p-4 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700 flex-shrink-0 overflow-x-auto">
          <div className="max-w-4xl mx-auto min-w-[640px] sm:min-w-0">
            <Keyboard activeKey={activeKey} nextKey={null} />
          </div>
        </div>
      </div>

      {/* Simple CSS for balloon floating */}
      <style>
        {`
        @keyframes float-up {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-100vh);
          }
        }
        
        .balloon-float {
          animation: float-up linear forwards;
        }
        `}
      </style>
    </div>
  );
}
