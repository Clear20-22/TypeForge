import { useState, useEffect } from 'react';

export default function Keyboard({ activeKey = '', nextKey = null }) {
  const [pressedKeys, setPressedKeys] = useState(new Set());

  useEffect(() => {
    const handleKeyDown = (e) => {
      setPressedKeys(prev => new Set(prev).add(e.key.toLowerCase()));
    };

    const handleKeyUp = (e) => {
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(e.key.toLowerCase());
        return newSet;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const keyboardLayout = [
    // Row 1 - Numbers and symbols
    [
      { key: '`', label: '`', width: 'w-12' },
      { key: '1', label: '1', width: 'w-12' },
      { key: '2', label: '2', width: 'w-12' },
      { key: '3', label: '3', width: 'w-12' },
      { key: '4', label: '4', width: 'w-12' },
      { key: '5', label: '5', width: 'w-12' },
      { key: '6', label: '6', width: 'w-12' },
      { key: '7', label: '7', width: 'w-12' },
      { key: '8', label: '8', width: 'w-12' },
      { key: '9', label: '9', width: 'w-12' },
      { key: '0', label: '0', width: 'w-12' },
      { key: '-', label: '-', width: 'w-12' },
      { key: '=', label: '=', width: 'w-12' },
      { key: 'backspace', label: '⌫', width: 'w-20' },
    ],
    // Row 2 - Tab and QWERTY
    [
      { key: 'tab', label: 'Tab', width: 'w-16' },
      { key: 'q', label: 'Q', width: 'w-12' },
      { key: 'w', label: 'W', width: 'w-12' },
      { key: 'e', label: 'E', width: 'w-12' },
      { key: 'r', label: 'R', width: 'w-12' },
      { key: 't', label: 'T', width: 'w-12' },
      { key: 'y', label: 'Y', width: 'w-12' },
      { key: 'u', label: 'U', width: 'w-12' },
      { key: 'i', label: 'I', width: 'w-12' },
      { key: 'o', label: 'O', width: 'w-12' },
      { key: 'p', label: 'P', width: 'w-12' },
      { key: '[', label: '[', width: 'w-12' },
      { key: ']', label: ']', width: 'w-12' },
      { key: '\\', label: '\\', width: 'w-16' },
    ],
    // Row 3 - Caps Lock and ASDF
    [
      { key: 'capslock', label: 'Caps', width: 'w-20' },
      { key: 'a', label: 'A', width: 'w-12', homeRow: true },
      { key: 's', label: 'S', width: 'w-12', homeRow: true },
      { key: 'd', label: 'D', width: 'w-12', homeRow: true },
      { key: 'f', label: 'F', width: 'w-12', homeRow: true },
      { key: 'g', label: 'G', width: 'w-12' },
      { key: 'h', label: 'H', width: 'w-12' },
      { key: 'j', label: 'J', width: 'w-12', homeRow: true },
      { key: 'k', label: 'K', width: 'w-12', homeRow: true },
      { key: 'l', label: 'L', width: 'w-12', homeRow: true },
      { key: ';', label: ';', width: 'w-12', homeRow: true },
      { key: "'", label: "'", width: 'w-12' },
      { key: 'enter', label: 'Enter', width: 'w-24' },
    ],
    // Row 4 - Shift and ZXCV
    [
      { key: 'shift', label: 'Shift', width: 'w-28' },
      { key: 'z', label: 'Z', width: 'w-12' },
      { key: 'x', label: 'X', width: 'w-12' },
      { key: 'c', label: 'C', width: 'w-12' },
      { key: 'v', label: 'V', width: 'w-12' },
      { key: 'b', label: 'B', width: 'w-12' },
      { key: 'n', label: 'N', width: 'w-12' },
      { key: 'm', label: 'M', width: 'w-12' },
      { key: ',', label: ',', width: 'w-12' },
      { key: '.', label: '.', width: 'w-12' },
      { key: '/', label: '/', width: 'w-12' },
      { key: 'shift', label: 'Shift', width: 'w-28' },
    ],
    // Row 5 - Space bar and modifiers
    [
      { key: 'control', label: 'Ctrl', width: 'w-16' },
      { key: 'alt', label: 'Alt', width: 'w-16' },
      { key: 'meta', label: 'Cmd', width: 'w-16' },
      { key: ' ', label: 'Space', width: 'flex-1' },
      { key: 'meta', label: 'Cmd', width: 'w-16' },
      { key: 'alt', label: 'Alt', width: 'w-16' },
      { key: 'control', label: 'Ctrl', width: 'w-16' },
    ],
  ];

  const isKeyPressed = (key) => {
    const normalizedKey = key.toLowerCase();
    return pressedKeys.has(normalizedKey) || activeKey.toLowerCase() === normalizedKey;
  };

  const isNextKey = (key) => {
    if (!nextKey) return false;
    const normalizedKey = key.toLowerCase();
    const normalizedNextKey = nextKey.toLowerCase();
    return normalizedKey === normalizedNextKey;
  };

  const getKeyClasses = (keyData) => {
    const isPressed = isKeyPressed(keyData.key);
    const isNext = isNextKey(keyData.key);
    const isHomeRow = keyData.homeRow;
    
    const baseClasses = `
      ${keyData.width} 
      h-10
      rounded 
      flex 
      items-center 
      justify-center 
      font-semibold 
      text-xs
      transition-all 
      duration-100 
      select-none
      relative
      overflow-hidden
    `;

    if (isPressed) {
      return `${baseClasses} 
        bg-gradient-to-br from-cyan-500 to-blue-600 
        text-white 
        shadow-[0_0_20px_rgba(6,182,212,0.6)] 
        scale-95 
        border-2 
        border-cyan-400
        ring-4 
        ring-cyan-500/30
      `;
    }

    if (isNext) {
      return `${baseClasses} 
        bg-gradient-to-br from-yellow-500 to-orange-500 
        text-white 
        border-2 
        border-yellow-400
        shadow-[0_0_30px_rgba(234,179,8,0.8)] 
        animate-pulse
        ring-4 
        ring-yellow-500/50
        scale-105
      `;
    }

    if (isHomeRow) {
      return `${baseClasses} 
        bg-gradient-to-br from-slate-700 to-slate-800 
        text-cyan-300 
        border-2 
        border-cyan-500/30 
        hover:border-cyan-500/50 
        shadow-lg
      `;
    }

    return `${baseClasses} 
      bg-gradient-to-br from-slate-700 to-slate-800 
      text-slate-300 
      border-2 
      border-slate-600/50 
      hover:border-slate-500 
      hover:text-white 
      shadow-md
    `;
  };

  return (
    <div className="w-full mx-auto p-3 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-xl">
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1">
          Virtual Keyboard
        </h3>
        <p className="text-slate-400 text-xs">
          Yellow = Next Key • Cyan = Pressed • Home row has indicators
        </p>
      </div>

      {/* Keyboard Layout */}
      <div className="space-y-1.5">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1.5">
            {row.map((keyData, keyIndex) => {
              const classes = getKeyClasses(keyData);
              return (
                <div 
                  key={keyIndex}
                  className={classes}
                >
                  {keyData.label}
                  {keyData.homeRow && (
                    <span className="absolute bottom-1 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
