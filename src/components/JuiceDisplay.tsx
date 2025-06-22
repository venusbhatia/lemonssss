import React from 'react';
import { JuiceCollection } from '../types';

interface JuiceDisplayProps {
  juiceCollection: JuiceCollection;
}

export const JuiceDisplay: React.FC<JuiceDisplayProps> = ({ juiceCollection }) => {
  const getQualityColor = (quality: JuiceCollection['quality']) => {
    switch (quality) {
      case 'excellent': return 'juice-excellent quality-excellent';
      case 'good': return 'juice-good quality-good';
      case 'poor': return 'juice-poor quality-poor';
      default: return 'juice-good quality-good';
    }
  };

  const getQualityEmoji = (quality: JuiceCollection['quality']) => {
    switch (quality) {
      case 'excellent': return '🌟';
      case 'good': return '👍';
      case 'poor': return '😞';
      default: return '👍';
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Fresh Lemon Juice 🥤</h2>
      
      {/* Juice Container */}
      <div className="juice-container">
        {/* Juice Level */}
        {juiceCollection.totalAmount > 0 && (
          <div 
            className={`juice-level ${getQualityColor(juiceCollection.quality)}`}
            style={{ 
              height: `${Math.min((juiceCollection.totalAmount / 500) * 100, 100)}%` 
            }}
          >
            {/* Animated juice drops */}
            <div className="juice-drop animate-drip"></div>
          </div>
        )}
        
        {/* Glass reflection */}
        <div className="juice-reflection"></div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2">
        <div className="text-center">
          <p className="text-2xl font-bold text-juice-600">
            {juiceCollection.totalAmount.toFixed(1)}ml
          </p>
          <p className="text-sm text-gray-600">Total Juice</p>
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-700">
            {juiceCollection.lemonsUsed}
          </p>
          <p className="text-sm text-gray-600">Lemons Used</p>
        </div>
      </div>

      {/* Quality Indicator */}
      {juiceCollection.totalAmount > 0 && (
        <div className="mt-4 text-center">
          <div className={`quality-badge ${getQualityColor(juiceCollection.quality)}`}>
            <span style={{ marginRight: '0.5rem' }}>{getQualityEmoji(juiceCollection.quality)}</span>
            <span style={{ textTransform: 'capitalize' }}>{juiceCollection.quality} Quality</span>
          </div>
        </div>
      )}
    </div>
  );
}; 