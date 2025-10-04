import { useState, useEffect } from 'react';

// Comprehensive key-to-finger mapping
const keyFingerMap = {
  // Left hand - Pinky
  '`': 'left-pinky', '~': 'left-pinky',
  '1': 'left-pinky', '!': 'left-pinky',
  'q': 'left-pinky', 'Q': 'left-pinky',
  'a': 'left-pinky', 'A': 'left-pinky',
  'z': 'left-pinky', 'Z': 'left-pinky',
  'Tab': 'left-pinky', 'CapsLock': 'left-pinky',
  'Shift': 'left-pinky', // Left shift
  
  // Left hand - Ring
  '2': 'left-ring', '@': 'left-ring',
  'w': 'left-ring', 'W': 'left-ring',
  's': 'left-ring', 'S': 'left-ring',
  'x': 'left-ring', 'X': 'left-ring',
  
  // Left hand - Middle
  '3': 'left-middle', '#': 'left-middle',
  'e': 'left-middle', 'E': 'left-middle',
  'd': 'left-middle', 'D': 'left-middle',
  'c': 'left-middle', 'C': 'left-middle',
  
  // Left hand - Index
  '4': 'left-index', '$': 'left-index',
  '5': 'left-index', '%': 'left-index',
  'r': 'left-index', 'R': 'left-index',
  't': 'left-index', 'T': 'left-index',
  'f': 'left-index', 'F': 'left-index',
  'g': 'left-index', 'G': 'left-index',
  'v': 'left-index', 'V': 'left-index',
  'b': 'left-index', 'B': 'left-index',
  
  // Thumbs (Space bar)
  ' ': 'thumb',
  
  // Right hand - Index
  '6': 'right-index', '^': 'right-index',
  '7': 'right-index', '&': 'right-index',
  'y': 'right-index', 'Y': 'right-index',
  'u': 'right-index', 'U': 'right-index',
  'h': 'right-index', 'H': 'right-index',
  'j': 'right-index', 'J': 'right-index',
  'n': 'right-index', 'N': 'right-index',
  'm': 'right-index', 'M': 'right-index',
  
  // Right hand - Middle
  '8': 'right-middle', '*': 'right-middle',
  'i': 'right-middle', 'I': 'right-middle',
  'k': 'right-middle', 'K': 'right-middle',
  ',': 'right-middle', '<': 'right-middle',
  
  // Right hand - Ring
  '9': 'right-ring', '(': 'right-ring',
  'o': 'right-ring', 'O': 'right-ring',
  'l': 'right-ring', 'L': 'right-ring',
  '.': 'right-ring', '>': 'right-ring',
  
  // Right hand - Pinky
  '0': 'right-pinky', ')': 'right-pinky',
  '-': 'right-pinky', '_': 'right-pinky',
  '=': 'right-pinky', '+': 'right-pinky',
  'p': 'right-pinky', 'P': 'right-pinky',
  '[': 'right-pinky', '{': 'right-pinky',
  ']': 'right-pinky', '}': 'right-pinky',
  '\\': 'right-pinky', '|': 'right-pinky',
  ';': 'right-pinky', ':': 'right-pinky',
  "'": 'right-pinky', '"': 'right-pinky',
  '/': 'right-pinky', '?': 'right-pinky',
  'Enter': 'right-pinky',
  'Backspace': 'right-pinky',
};

// Finger component with animation
const Finger = ({ finger, activeFinger, label, color, height = 'h-20' }) => {
  const isActive = activeFinger === finger;
  
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Finger */}
      <div
        className={`
          w-8 ${height} rounded-t-lg border-2 transition-all duration-150
          ${isActive 
            ? 'bg-gradient-to-b from-cyan-400 to-blue-500 border-cyan-300 shadow-lg shadow-cyan-500/50 translate-y-1 scale-105' 
            : `bg-gradient-to-b ${color} border-slate-600`
          }
        `}
      >
        {/* Knuckle lines */}
        <div className={`w-full h-0.5 ${isActive ? 'bg-cyan-200/30' : 'bg-slate-800/50'} mt-6`}></div>
        <div className={`w-full h-0.5 ${isActive ? 'bg-cyan-200/30' : 'bg-slate-800/50'} mt-6`}></div>
      </div>
      
      {/* Label */}
      <div className={`text-xs font-bold ${isActive ? color.includes('pink') ? 'text-pink-400' : 'text-cyan-400' : 'text-slate-500'}`}>
        {label}
      </div>
    </div>
  );
};

// Hand component
const Hand = ({ side, activeFinger }) => {
  const isLeft = side === 'left';
  
  const fingers = isLeft ? [
    { name: 'left-pinky', label: 'Pinky', color: 'from-pink-600 to-pink-700', height: 'h-16' },
    { name: 'left-ring', label: 'Ring', color: 'from-purple-600 to-purple-700', height: 'h-20' },
    { name: 'left-middle', label: 'Middle', color: 'from-blue-600 to-blue-700', height: 'h-24' },
    { name: 'left-index', label: 'Index', color: 'from-green-600 to-green-700', height: 'h-20' },
  ] : [
    { name: 'right-index', label: 'Index', color: 'from-green-600 to-green-700', height: 'h-20' },
    { name: 'right-middle', label: 'Middle', color: 'from-blue-600 to-blue-700', height: 'h-24' },
    { name: 'right-ring', label: 'Ring', color: 'from-purple-600 to-purple-700', height: 'h-20' },
    { name: 'right-pinky', label: 'Pinky', color: 'from-pink-600 to-pink-700', height: 'h-16' },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Hand Label */}
      <div className="text-sm font-semibold text-slate-400">
        {isLeft ? 'Left Hand' : 'Right Hand'}
      </div>
      
      {/* Fingers and Palm */}
      <div className={`flex ${isLeft ? 'flex-row' : 'flex-row'} items-end gap-2`}>
        {/* Fingers */}
        <div className="flex gap-2 items-end">
          {fingers.map((finger) => (
            <Finger
              key={finger.name}
              finger={finger.name}
              activeFinger={activeFinger}
              label={finger.label}
              color={finger.color}
              height={finger.height}
            />
          ))}
        </div>
        
        {/* Palm */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-16 h-20 bg-gradient-to-b from-slate-600 to-slate-700 rounded-lg border-2 border-slate-600"></div>
          <div className="text-xs font-bold text-slate-500">Palm</div>
        </div>
      </div>
    </div>
  );
};

// Thumb component (for spacebar)
const Thumb = ({ activeFinger }) => {
  const isActive = activeFinger === 'thumb';
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-sm font-semibold text-slate-400">Thumbs</div>
      <div
        className={`
          w-24 h-8 rounded-full border-2 transition-all duration-150
          ${isActive 
            ? 'bg-gradient-to-r from-cyan-400 to-blue-500 border-cyan-300 shadow-lg shadow-cyan-500/50 translate-y-1 scale-105' 
            : 'bg-gradient-to-r from-yellow-600 to-yellow-700 border-slate-600'
          }
        `}
      >
        <div className={`w-full h-0.5 ${isActive ? 'bg-cyan-200/30' : 'bg-slate-800/50'} mt-3`}></div>
      </div>
      <div className={`text-xs font-bold ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
        Space
      </div>
    </div>
  );
};

// Main TypingHand component
const TypingHand = () => {
  const [activeFinger, setActiveFinger] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const finger = keyFingerMap[e.key];
      if (finger) {
        setActiveFinger(finger);
      }
    };

    const handleKeyUp = () => {
      setActiveFinger(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-8 p-8 bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-slate-700/50">
      {/* Title */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
          Hand Position Guide
        </h3>
        <p className="text-slate-400 text-sm">Watch which finger lights up as you type</p>
      </div>
      
      {/* Hands Container */}
      <div className="flex items-end justify-center gap-12">
        <Hand side="left" activeFinger={activeFinger} />
        <Thumb activeFinger={activeFinger} />
        <Hand side="right" activeFinger={activeFinger} />
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-b from-slate-600 to-slate-700 border border-slate-600 rounded"></div>
          <span className="text-slate-400">Ready</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 border border-cyan-300 rounded shadow-lg shadow-cyan-500/50"></div>
          <span className="text-slate-400">Active (Pressing)</span>
        </div>
      </div>
    </div>
  );
};

export default TypingHand;

