import React from 'react';
import { Lemon } from '../types';

interface ControlPanelProps {
  onAddLemon: (size: Lemon['size']) => void;
  onReset: () => void;
  squeezeCount: number;
  lemonsCount: number;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onAddLemon,
  onReset,
  squeezeCount,
  lemonsCount,
}) => {
  const lemonSizes: { size: Lemon['size']; emoji: string; label: string; description: string }[] = [
    { size: 'small', emoji: '🍋', label: 'Small', description: '~30ml juice' },
    { size: 'medium', emoji: '🟨', label: 'Medium', description: '~50ml juice' },
    { size: 'large', emoji: '🟡', label: 'Large', description: '~80ml juice' },
  ];

  return (
    <div className="control-panel">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Lemon Squeezer Control 🍋</h2>
      
      {/* Add Lemon Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Fresh Lemons</h3>
        <div className="grid grid-cols-1 sm-grid-cols-3">
          {lemonSizes.map((lemon) => (
            <button
              key={lemon.size}
              onClick={() => onAddLemon(lemon.size)}
              className="lemon-size-btn"
            >
              <span className="lemon-emoji">
                {lemon.emoji}
              </span>
              <span className="font-medium text-gray-700">{lemon.label}</span>
              <span className="text-xs text-gray-500">{lemon.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-6 grid grid-cols-2">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-gray-700">{lemonsCount}</p>
          <p className="text-sm text-gray-600">Lemons Ready</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-lemon-600">{squeezeCount}</p>
          <p className="text-sm text-gray-600">Squeezes Made</p>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="btn btn-danger btn-full flex items-center justify-center space-x-2"
        style={{ padding: '0.75rem 1rem' }}
      >
        <span>🔄</span>
        <span>Reset Squeezer</span>
      </button>

      {/* Fun Facts */}
      <div className="mt-6 p-4 bg-lemon-50 rounded-lg border">
        <h4 className="font-medium text-lemon-800 mb-2">💡 Did you know?</h4>
        <p className="text-sm text-lemon-700">
          A medium lemon contains about 3 tablespoons of juice! 
          Roll your lemons before squeezing for maximum juice extraction! 🍋
        </p>
      </div>
    </div>
  );
}; 