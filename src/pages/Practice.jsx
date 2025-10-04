import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Keyboard from '../components/keyboard';
import { getLessonById } from '../data/lessonData';

export default function Practice() {
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get('lesson');
  const lesson = lessonId ? getLessonById(lessonId) : null;

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [stats, setStats] = useState({
    correctChars: 0,
    totalChars: 0,
    startTime: null,
  });

  const currentText = lesson 
    ? lesson.exercises[currentExerciseIndex] 
    : "The quick brown fox jumps over the lazy dog";

  const totalExercises = lesson ? lesson.exercises.length : 1;
  
  // Get the next key to press
  const nextKey = userInput.length < currentText.length 
    ? currentText[userInput.length].toLowerCase() 
    : null;

  // Reset when exercise changes
  useEffect(() => {
    setUserInput('');
    setIsComplete(false);
    setStats({
      correctChars: 0,
      totalChars: 0,
      startTime: null,
    });
  }, [currentExerciseIndex, lessonId]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Start timer on first keystroke
    if (!stats.startTime) {
      setStats(prev => ({ ...prev, startTime: Date.now() }));
    }

    setUserInput(value);
    
    // Calculate accuracy
    const correct = value.split('').filter((char, index) => char === currentText[index]).length;
    setStats(prev => ({
      ...prev,
      correctChars: correct,
      totalChars: value.length,
    }));

    // Check if exercise is complete
    if (value === currentText) {
      setIsComplete(true);
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setUserInput('');
    setIsComplete(false);
    setStats({
      correctChars: 0,
      totalChars: 0,
      startTime: null,
    });
  };

  const accuracy = stats.totalChars > 0 
    ? Math.round((stats.correctChars / stats.totalChars) * 100) 
    : 0;

  const getCharColor = (index) => {
    if (index >= userInput.length) return 'text-slate-400';
    return userInput[index] === currentText[index] 
      ? 'text-green-400' 
      : 'text-red-400';
  };

  return (
    <div className="h-screen flex flex-col p-3 overflow-hidden">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-2 px-3 flex-shrink-0">
        <div className="flex items-center gap-4">
          {lesson && (
            <>
              <h2 className="text-lg font-bold text-cyan-400">{lesson.title}</h2>
              <span className="text-xs text-slate-400">
                Exercise {currentExerciseIndex + 1}/{totalExercises}
              </span>
            </>
          )}
          {!lesson && <h2 className="text-lg font-bold text-cyan-400">Practice Mode</h2>}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-xs text-slate-400">
            Accuracy: <span className={`font-bold ${accuracy >= 90 ? 'text-green-400' : accuracy >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracy}%</span>
          </div>
          {lesson && (
            <Link 
              to="/lessons"
              className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-slate-300 hover:text-white transition-colors"
            >
              ← Back
            </Link>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {lesson && (
        <div className="mb-2 px-3 flex-shrink-0">
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
              style={{ width: `${((currentExerciseIndex + 1) / totalExercises) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Content - Takes remaining space */}
      <div className="flex-1 flex flex-col gap-2 min-h-0">
        {/* Text Display & Input - Scrollable if needed */}
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-xl border border-indigo-500/30 p-4 flex flex-col flex-shrink-0">
          {/* Instructions */}
          {lesson && (
            <div className="mb-2 text-center">
              <p className="text-slate-400 text-xs">{lesson.instructions}</p>
            </div>
          )}

          {/* Next Key Hint */}
          {nextKey && !isComplete && (
            <div className="mb-3 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                <span className="text-yellow-400 text-xs font-medium">Next Key:</span>
                <kbd className="px-2.5 py-1 bg-yellow-500 text-white rounded font-bold text-base animate-pulse">
                  {nextKey === ' ' ? 'SPACE' : nextKey.toUpperCase()}
                </kbd>
              </div>
            </div>
          )}
          
          {/* Text to type */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-3 border border-slate-600/50 mb-3">
            <p className="text-lg font-mono tracking-wide leading-relaxed text-center">
              {currentText.split('').map((char, index) => (
                <span key={index} className={getCharColor(index)}>
                  {char === ' ' ? '␣' : char}
                </span>
              ))}
            </p>
          </div>

          {/* Input area */}
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Start typing here..."
            className="w-full h-10 bg-slate-900/50 rounded-lg border border-cyan-500/30 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none px-3 text-slate-200 font-mono text-sm transition-all"
            autoFocus
            disabled={isComplete}
          />

          {/* Completion message */}
          {isComplete && (
            <div className="mt-3 p-2.5 bg-green-500/20 border border-green-500/50 rounded-lg">
              <p className="text-green-400 font-semibold mb-2 text-center text-sm">✓ Complete! Accuracy: {accuracy}%</p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleRestart}
                  className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs text-slate-300 hover:text-white transition-colors"
                >
                  Try Again
                </button>
                {lesson && currentExerciseIndex < totalExercises - 1 && (
                  <button
                    onClick={handleNextExercise}
                    className="px-2.5 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded text-xs text-white font-medium transition-all"
                  >
                    Next →
                  </button>
                )}
                {lesson && currentExerciseIndex === totalExercises - 1 && (
                  <Link
                    to="/lessons"
                    className="px-2.5 py-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 rounded text-xs text-white font-medium transition-all"
                  >
                    Complete ✓
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          {lesson && !isComplete && (
            <div className="mt-2 flex gap-2 justify-center">
              <button
                onClick={handlePreviousExercise}
                disabled={currentExerciseIndex === 0}
                className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed rounded text-xs text-slate-300 hover:text-white transition-colors"
              >
                ← Prev
              </button>
              <button
                onClick={handleRestart}
                className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs text-slate-300 hover:text-white transition-colors"
              >
                Restart
              </button>
              <button
                onClick={handleNextExercise}
                disabled={currentExerciseIndex === totalExercises - 1}
                className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed rounded text-xs text-slate-300 hover:text-white transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </div>

        {/* Keyboard - Fixed at bottom */}
        <div className="flex-shrink-0">
          <Keyboard nextKey={nextKey} />
        </div>
      </div>
    </div>
  );
}
