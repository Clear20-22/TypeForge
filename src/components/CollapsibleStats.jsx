import { useState } from 'react';

export default function CollapsibleStats() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full max-w-4xl">
      {/* Header Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-t-2xl border border-slate-700/50 hover:border-slate-600/50 transition-all p-4 flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">📊</span>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Statistics
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">
            {isOpen ? 'Click to collapse' : 'Click to expand'}
          </span>
          <svg 
            className={`w-6 h-6 text-purple-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Collapsible Content */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-b-2xl border-x border-b border-slate-700/50 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* WPM Card */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-sm font-medium">Words Per Minute</p>
                <span className="text-2xl">⚡</span>
              </div>
              <p className="text-cyan-400 text-4xl font-bold mb-2">0</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-900/50 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <span className="text-slate-500 text-xs">0%</span>
              </div>
              <p className="text-slate-500 text-xs mt-2">Target: 60 WPM</p>
            </div>

            {/* Accuracy Card */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-sm font-medium">Accuracy</p>
                <span className="text-2xl">🎯</span>
              </div>
              <p className="text-purple-400 text-4xl font-bold mb-2">0%</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-900/50 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <span className="text-slate-500 text-xs">0%</span>
              </div>
              <p className="text-slate-500 text-xs mt-2">Target: 95%</p>
            </div>

            {/* Time Card */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-green-500/50 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-sm font-medium">Practice Time</p>
                <span className="text-2xl">⏱️</span>
              </div>
              <p className="text-green-400 text-4xl font-bold mb-2">0s</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-900/50 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <span className="text-slate-500 text-xs">0%</span>
              </div>
              <p className="text-slate-500 text-xs mt-2">Daily goal: 30 min</p>
            </div>
          </div>

          {/* Additional Stats Row */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
              <p className="text-slate-400 text-xs mb-1">Total Words</p>
              <p className="text-slate-200 text-2xl font-bold">0</p>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
              <p className="text-slate-400 text-xs mb-1">Correct Keys</p>
              <p className="text-green-400 text-2xl font-bold">0</p>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
              <p className="text-slate-400 text-xs mb-1">Errors</p>
              <p className="text-red-400 text-2xl font-bold">0</p>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
              <p className="text-slate-400 text-xs mb-1">Streak</p>
              <p className="text-yellow-400 text-2xl font-bold">0🔥</p>
            </div>
          </div>

          {/* Daily Goal Progress */}
          <div className="mt-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl p-5 border border-indigo-500/30">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-300 text-sm font-semibold">🎯 Daily Challenge</p>
              <span className="text-slate-400 text-xs">0 / 100 words</span>
            </div>
            <div className="w-full bg-slate-800/50 rounded-full h-3 mb-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 relative"
                style={{ width: '0%' }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <p className="text-slate-400 text-xs text-center">Keep practicing to unlock achievements! 🏆</p>
          </div>
        </div>
      </div>
    </div>
  );
}
