// import Keyboard from '../components/keyboard';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start p-8 min-h-full space-y-8">
      {/* Welcome Section */}
      <div className="w-full max-w-4xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(99,102,241,0.2)] border border-indigo-500/30 flex flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Accent glow effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-4">
            TypeForge
          </h1>
          <p className="text-slate-300 text-lg mb-8">Master the art of typing</p>
          
          {/* Typing Area Placeholder */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 min-w-[500px]">
            <p className="text-cyan-300 text-xl font-mono tracking-wide">
              Start typing to begin...
            </p>
          </div>
        </div>
      </div>
      {/* Keyboard Knowledge Section */}
      <div className="w-full max-w-6xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(99,102,241,0.2)] border border-indigo-500/30 p-8 relative overflow-hidden">
        {/* Accent glow effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 mb-6 text-center">
            Essential Keyboard Knowledge
          </h2>
          <p className="text-slate-300 text-center mb-8">Learn the fundamentals before you start typing</p>

          {/* Grid Layout for Topics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Home Row */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 hover:border-cyan-500/50 transition-all group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">⌨️</span>
                </div>
                <h3 className="text-xl font-semibold text-cyan-400 group-hover:text-cyan-300">Home Row</h3>
              </div>
              <p className="text-slate-300 text-sm mb-3">
                The foundation of touch typing. Your fingers should rest on these keys:
              </p>
              <div className="bg-slate-900/50 rounded-lg p-3 mb-3">
                <p className="text-center font-mono text-cyan-300 text-lg tracking-wider">
                  A S D F &nbsp;&nbsp;&nbsp; J K L ;
                </p>
              </div>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>• Left hand: A, S, D, F</li>
                <li>• Right hand: J, K, L, ;</li>
                <li>• Index fingers on F and J</li>
              </ul>
            </div>

            {/* Finger Positioning */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 hover:border-purple-500/50 transition-all group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">✋</span>
                </div>
                <h3 className="text-xl font-semibold text-purple-400 group-hover:text-purple-300">Finger Position</h3>
              </div>
              <p className="text-slate-300 text-sm mb-3">
                Each finger has specific keys to press:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                  <span className="text-slate-400">Pinky:</span>
                  <span className="text-purple-300 font-mono">Q A Z</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                  <span className="text-slate-400">Ring:</span>
                  <span className="text-purple-300 font-mono">W S X</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                  <span className="text-slate-400">Middle:</span>
                  <span className="text-purple-300 font-mono">E D C</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                  <span className="text-slate-400">Index:</span>
                  <span className="text-purple-300 font-mono">R F V T G B</span>
                </div>
              </div>
            </div>

            {/* Keyboard Layout */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 hover:border-green-500/50 transition-all group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">🗂️</span>
                </div>
                <h3 className="text-xl font-semibold text-green-400 group-hover:text-green-300">Keyboard Rows</h3>
              </div>
              <p className="text-slate-300 text-sm mb-3">
                Understanding keyboard layout:
              </p>
              <div className="space-y-2">
                <div className="bg-slate-900/50 rounded-lg p-2">
                  <p className="text-yellow-400 text-xs font-semibold mb-1">Number Row</p>
                  <p className="font-mono text-sm text-slate-300">1 2 3 4 5 6 7 8 9 0</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-2">
                  <p className="text-blue-400 text-xs font-semibold mb-1">Top Row</p>
                  <p className="font-mono text-sm text-slate-300">Q W E R T Y U I O P</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-2">
                  <p className="text-cyan-400 text-xs font-semibold mb-1">Home Row</p>
                  <p className="font-mono text-sm text-slate-300">A S D F G H J K L ;</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-2">
                  <p className="text-green-400 text-xs font-semibold mb-1">Bottom Row</p>
                  <p className="font-mono text-sm text-slate-300">Z X C V B N M , . /</p>
                </div>
              </div>
            </div>

            {/* Posture Tips */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 hover:border-yellow-500/50 transition-all group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">🪑</span>
                </div>
                <h3 className="text-xl font-semibold text-yellow-400 group-hover:text-yellow-300">Proper Posture</h3>
              </div>
              <p className="text-slate-300 text-sm mb-3">
                Maintain good posture for comfort and speed:
              </p>
              <ul className="text-slate-400 text-sm space-y-2">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Sit up straight with feet flat on floor</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Keep wrists straight and floating</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Screen at eye level, arm's length away</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Relax shoulders, don't hunch</span>
                </li>
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 hover:border-red-500/50 transition-all group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">⚠️</span>
                </div>
                <h3 className="text-xl font-semibold text-red-400 group-hover:text-red-300">Avoid These</h3>
              </div>
              <p className="text-slate-300 text-sm mb-3">
                Common mistakes that slow you down:
              </p>
              <ul className="text-slate-400 text-sm space-y-2">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Looking at keyboard while typing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Using only index fingers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Resting wrists on desk</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Rushing for speed over accuracy</span>
                </li>
              </ul>
            </div>

            {/* Special Keys */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 hover:border-indigo-500/50 transition-all group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">⌨️</span>
                </div>
                <h3 className="text-xl font-semibold text-indigo-400 group-hover:text-indigo-300">Special Keys</h3>
              </div>
              <p className="text-slate-300 text-sm mb-3">
                Important keys for typing:
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                  <span className="text-slate-400">Space Bar:</span>
                  <span className="text-indigo-300 text-sm">Use thumbs</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                  <span className="text-slate-400">Shift:</span>
                  <span className="text-indigo-300 text-sm">Opposite hand</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                  <span className="text-slate-400">Enter:</span>
                  <span className="text-indigo-300 text-sm">Right pinky</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                  <span className="text-slate-400">Backspace:</span>
                  <span className="text-indigo-300 text-sm">Right pinky</span>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Start Tips */}
          <div className="mt-8 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-cyan-500/30">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4 text-center">🚀 Quick Start Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-3">
                <span className="text-2xl mb-2 block">🎯</span>
                <p className="text-slate-300 text-sm font-semibold mb-1">Start Slow</p>
                <p className="text-slate-400 text-xs">Focus on accuracy first, speed will follow naturally</p>
              </div>
              <div className="p-3">
                <span className="text-2xl mb-2 block">💪</span>
                <p className="text-slate-300 text-sm font-semibold mb-1">Practice Daily</p>
                <p className="text-slate-400 text-xs">Even 10-15 minutes daily makes a huge difference</p>
              </div>
              <div className="p-3">
                <span className="text-2xl mb-2 block">🧘</span>
                <p className="text-slate-300 text-sm font-semibold mb-1">Stay Relaxed</p>
                <p className="text-slate-400 text-xs">Keep hands and shoulders relaxed to avoid fatigue</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Component */}
      {/* <Keyboard /> */}
    </div>
  );
}
