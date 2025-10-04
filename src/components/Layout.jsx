import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [statsExpanded, setStatsExpanded] = useState(true);
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/lessons', label: 'Lessons', icon: '📚' },
    { path: '/practice', label: 'Practice', icon: '⌨️' },
  ];

  return (
    <div className="relative h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700/50 px-4 py-3 flex items-center justify-between">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          TypeForge
        </h1>
        <button 
          onClick={() => setStatsOpen(!statsOpen)}
          className="text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Navigation Sidebar */}
      <div className={`lg:hidden fixed top-14 left-0 bottom-0 w-72 bg-slate-900/95 backdrop-blur-md border-r border-slate-700/50 z-50 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8">
            Navigation
          </h2>
          
          <nav className="space-y-3 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`block w-full px-4 py-3 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                    : 'bg-slate-800/30 border border-slate-700/50 text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <p className="text-slate-400 text-sm text-center">
                Master your typing skills
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Stats Sidebar */}
      <div className={`lg:hidden fixed top-14 right-0 bottom-0 w-72 bg-slate-900/95 backdrop-blur-md border-l border-slate-700/50 z-50 transform transition-transform duration-300 ${
        statsOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full p-6 overflow-y-auto">
          {/* Collapsible Header */}
          <button
            onClick={() => setStatsExpanded(!statsExpanded)}
            className="w-full flex items-center justify-between mb-6 p-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-lg transition-all flex-shrink-0"
          >
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Stats
            </h2>
            <svg 
              className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${statsExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div 
            className={`space-y-4 transition-all duration-300 ${
              statsExpanded ? 'opacity-100' : 'opacity-0 hidden'
            }`}
          >
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-sm mb-1">WPM</p>
                <span className="text-lg">⚡</span>
              </div>
              <p className="text-cyan-400 text-3xl font-bold">0</p>
              <div className="mt-2 w-full bg-slate-900/50 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <p className="text-slate-500 text-xs mt-1">Words per minute</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-sm mb-1">Accuracy</p>
                <span className="text-lg">🎯</span>
              </div>
              <p className="text-purple-400 text-3xl font-bold">0%</p>
              <div className="mt-2 w-full bg-slate-900/50 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <p className="text-slate-500 text-xs mt-1">Correct keystrokes</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-sm mb-1">Time</p>
                <span className="text-lg">⏱️</span>
              </div>
              <p className="text-green-400 text-3xl font-bold">0s</p>
              <div className="mt-2 w-full bg-slate-900/50 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <p className="text-slate-500 text-xs mt-1">Practice duration</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg p-4 border border-indigo-500/30">
              <p className="text-slate-300 text-sm font-semibold mb-2">🎯 Daily Goal</p>
              <div className="w-full bg-slate-800/50 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <p className="text-slate-400 text-xs">0 / 100 words typed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overlay for mobile */}
      {statsOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setStatsOpen(false)}
        />
      )}

      {/* Mobile Main Content */}
      <div className="lg:hidden pt-14 h-screen overflow-y-auto">
        <Outlet />
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Left Panel - Navigation */}
        <div 
          className={`flex flex-col bg-slate-900/30 backdrop-blur-sm border-r border-slate-700/50 overflow-y-auto transition-all duration-300 relative ${
            leftSidebarCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          {/* Collapse/Expand Button */}
          <button
            onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
            className="absolute -right-3 top-6 z-50 w-6 h-12 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-r-lg flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all shadow-lg"
            title={leftSidebarCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          >
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${leftSidebarCollapsed ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className={`p-6 ${leftSidebarCollapsed ? 'px-2' : ''}`}>
            {!leftSidebarCollapsed && (
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 flex-shrink-0">
                Navigation
              </h2>
            )}
            
            <nav className={`space-y-3 flex-shrink-0 ${leftSidebarCollapsed ? 'w-full' : ''}`}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block w-full rounded-lg transition-all ${
                    leftSidebarCollapsed ? 'px-2 py-3' : 'px-4 py-3'
                  } ${
                    location.pathname === item.path
                      ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                      : 'bg-slate-800/30 border border-slate-700/50 text-slate-300 hover:bg-slate-800/50 hover:border-slate-600/50'
                  }`}
                  title={leftSidebarCollapsed ? item.label : ''}
                >
                  <span className={`${leftSidebarCollapsed ? 'text-2xl' : 'mr-2'}`}>{item.icon}</span>
                  {!leftSidebarCollapsed && item.label}
                </Link>
              ))}
            </nav>

            {!leftSidebarCollapsed && (
              <div className="mt-auto w-full flex-shrink-0 pt-6">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <p className="text-slate-400 text-sm text-center">
                    Master your typing skills
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Middle Panel - Main Content */}
        <div className="flex-1 h-screen overflow-y-auto bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
          <Outlet />
        </div>

        {/* Right Panel - Stats */}
        <div className={`relative flex flex-col items-start p-6 bg-slate-900/30 backdrop-blur-sm border-l border-slate-700/50 overflow-y-auto transition-all duration-300 ${rightSidebarCollapsed ? 'w-16' : 'w-64'}`}>
          {/* Collapse/Expand Button */}
          <button
            onClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
            className="absolute -left-3 top-6 z-50 w-6 h-12 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-l-lg flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all shadow-lg"
            title={rightSidebarCollapsed ? 'Expand stats' : 'Collapse stats'}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${rightSidebarCollapsed ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {!rightSidebarCollapsed && (
            <>
              {/* Collapsible Header */}
              <button
                onClick={() => setStatsExpanded(!statsExpanded)}
                className="w-full flex items-center justify-between mb-6 p-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-lg transition-all group flex-shrink-0"
              >
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Stats
            </h2>
            <svg 
              className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${statsExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Stats Content */}
          <div 
            className={`w-full space-y-4 transition-all duration-300 ${
              statsExpanded ? 'opacity-100' : 'opacity-0 hidden'
            }`}
          >
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-sm mb-1">WPM</p>
                <span className="text-lg">⚡</span>
              </div>
              <p className="text-cyan-400 text-3xl font-bold">0</p>
              <div className="mt-2 w-full bg-slate-900/50 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <p className="text-slate-500 text-xs mt-1">Words per minute</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 hover:border-purple-500/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-sm mb-1">Accuracy</p>
                <span className="text-lg">🎯</span>
              </div>
              <p className="text-purple-400 text-3xl font-bold">0%</p>
              <div className="mt-2 w-full bg-slate-900/50 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <p className="text-slate-500 text-xs mt-1">Correct keystrokes</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 hover:border-green-500/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-sm mb-1">Time</p>
                <span className="text-lg">⏱️</span>
              </div>
              <p className="text-green-400 text-3xl font-bold">0s</p>
              <div className="mt-2 w-full bg-slate-900/50 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <p className="text-slate-500 text-xs mt-1">Practice duration</p>
            </div>

            {/* Additional Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
                <p className="text-slate-400 text-xs mb-1">Words</p>
                <p className="text-slate-200 text-xl font-bold">0</p>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
                <p className="text-slate-400 text-xs mb-1">Errors</p>
                <p className="text-red-400 text-xl font-bold">0</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg p-4 border border-indigo-500/30 mt-6">
              <p className="text-slate-300 text-sm font-semibold mb-2">🎯 Daily Goal</p>
              <div className="w-full bg-slate-800/50 rounded-full h-2 mb-2 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all" style={{ width: '0%' }}>
                  <div className="h-full bg-white/20 animate-pulse"></div>
                </div>
              </div>
              <p className="text-slate-400 text-xs">0 / 100 words typed</p>
            </div>

            {/* Streak */}
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30 text-center">
              <p className="text-slate-400 text-xs mb-1">Current Streak</p>
              <p className="text-yellow-400 text-2xl font-bold">0 🔥</p>
            </div>
          </div>
            </>
          )}

          {/* Collapsed View - Icon Only */}
          {rightSidebarCollapsed && (
            <div className="flex flex-col items-center gap-4 mt-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
