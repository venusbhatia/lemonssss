import React, { useEffect } from 'react';
import { useSqueezerStore } from '../store/squeezerStore';

export const SqueezerPage: React.FC = () => {
  const {
    juiceCollection,
    isSqueezing,
    addLemon,
    squeezeLemon,
    resetSqueezer,
  } = useSqueezerStore();

  // Get the current lemon or create one if none exists
  const currentLemon = useSqueezerStore(state => state.lemons[0]);
  
  useEffect(() => {
    if (!currentLemon) {
      addLemon('large');
    }
  }, [currentLemon, addLemon]);

  const handleSqueeze = () => {
    if (currentLemon && !currentLemon.squeezed) {
      squeezeLemon(currentLemon.id);
    }
  };

  const handleReset = () => {
    resetSqueezer();
    addLemon('large');
  };

  const getJuiceHeight = () => {
    return Math.min((juiceCollection.totalAmount / 200) * 100, 100);
  };

  if (!currentLemon) return null;

  return (
    <div className="simple-squeezer">
      {/* Simple Header */}
      <div className="header">
        <h1>🍋 Lemon Squeezer</h1>
        <p>
          {currentLemon.squeezed 
            ? 'Fresh juice ready!' 
            : 'Click the lemon to squeeze it!'
          }
        </p>
      </div>

      {/* Main Lemon and Glass */}
      <div className="main-content">
        {/* Big Lemon */}
        <div className="lemon-container">
          <div 
            className={`big-lemon ${currentLemon.squeezed ? 'squeezed' : ''} ${isSqueezing ? 'squeezing' : ''}`}
            onClick={handleSqueeze}
          >
            <span className="lemon-emoji">🍋</span>
          </div>
        </div>

        {/* Beautiful Glass */}
        <div className="glass-container">
          <div className="beautiful-glass">
            {juiceCollection.totalAmount > 0 && (
              <div 
                className="juice-level"
                style={{ height: `${getJuiceHeight()}%` }}
              >
                <div className="juice-bubble bubble-1"></div>
                <div className="juice-bubble bubble-2"></div>
                <div className="juice-bubble bubble-3"></div>
              </div>
            )}
            <div className="glass-shine" />
            <div className="secondary-shine" />
          </div>
          
          {juiceCollection.totalAmount > 0 && (
            <div className="juice-amount">
              {juiceCollection.totalAmount.toFixed(0)}ml
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="action-section">
        {currentLemon.squeezed ? (
          <button
            onClick={handleReset}
            className="reset-button"
          >
            Get New Lemon
          </button>
        ) : (
          <button
            onClick={handleSqueeze}
            disabled={isSqueezing}
            className="squeeze-button ready"
          >
            {isSqueezing ? 'Squeezing...' : 'Squeeze Lemon'}
          </button>
        )}
      </div>

      {/* Falling drops animation */}
      {isSqueezing && (
        <div className="falling-drops">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`drop drop-${i + 1}`}>💧</div>
          ))}
        </div>
      )}
    </div>
  );
}; 