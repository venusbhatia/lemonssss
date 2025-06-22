import React from 'react';
import { Lemon } from '../types';

interface LemonCardProps {
  lemon: Lemon;
  onSqueeze: (lemonId: string) => void;
  onRemove: (lemonId: string) => void;
  isSqueezing: boolean;
}

export const LemonCard: React.FC<LemonCardProps> = ({ 
  lemon, 
  onSqueeze, 
  onRemove, 
  isSqueezing 
}) => {
  const getSizeEmoji = (size: Lemon['size']) => {
    switch (size) {
      case 'small': return '🍋';
      case 'medium': return '🟨';
      case 'large': return '🟡';
      default: return '🍋';
    }
  };

  const getSizeClass = (size: Lemon['size']) => {
    switch (size) {
      case 'small': return 'lemon-small';
      case 'medium': return 'lemon-medium';
      case 'large': return 'lemon-large';
      default: return 'lemon-medium';
    }
  };

  const juicePercentage = (lemon.juiceAmount / lemon.maxJuice) * 100;

  return (
    <div className="card">
      <div className="flex flex-col items-center space-y-4">
        {/* Lemon Display */}
        <div 
          className={`${getSizeClass(lemon.size)} lemon-circle ${
            lemon.squeezed ? 'lemon-squeezed' : ''
          } ${isSqueezing ? 'animate-squeeze' : ''}`}
        >
          {getSizeEmoji(lemon.size)}
        </div>

        {/* Lemon Info */}
        <div className="text-center">
          <h3 className="font-semibold text-gray-800" style={{ textTransform: 'capitalize' }}>{lemon.size} Lemon</h3>
          <p className="text-sm text-gray-600">Max: {lemon.maxJuice}ml</p>
          
          {lemon.squeezed && (
            <div className="mt-2">
              <p className="text-juice-600 font-medium">
                Extracted: {lemon.juiceAmount.toFixed(1)}ml
              </p>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${juicePercentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {!lemon.squeezed ? (
            <button
              onClick={() => onSqueeze(lemon.id)}
              disabled={isSqueezing}
              className="btn btn-primary"
            >
              {isSqueezing ? 'Squeezing...' : 'Squeeze! 🤏'}
            </button>
          ) : (
            <div className="text-green-600 font-medium flex items-center">
              ✅ Squeezed!
            </div>
          )}
          
          <button
            onClick={() => onRemove(lemon.id)}
            className="btn btn-danger"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}; 