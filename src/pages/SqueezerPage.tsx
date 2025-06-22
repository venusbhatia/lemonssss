import React from 'react';
import { useSqueezerStore } from '../store/squeezerStore';

export const SqueezerPage: React.FC = () => {
  const {
    juiceCollection,
    isSqueezing,
    squeezeCount,
    addLemon,
    squeezeLemon,
    resetSqueezer,
  } = useSqueezerStore();

  // Get the current lemon or create one if none exists
  const currentLemon = useSqueezerStore(state => state.lemons[0]);
  
  // Add a lemon if none exists
  React.useEffect(() => {
    if (!currentLemon) {
      addLemon('medium');
    }
  }, [currentLemon, addLemon]);

  const handleSqueeze = () => {
    if (currentLemon && !currentLemon.squeezed && !isSqueezing) {
      squeezeLemon(currentLemon.id);
    }
  };

  const handleReset = () => {
    resetSqueezer();
    addLemon('medium');
  };

  const getJuiceHeight = () => {
    return Math.min((juiceCollection.totalAmount / 200) * 100, 100);
  };

  const getQualityColor = () => {
    const efficiency = juiceCollection.totalAmount / (currentLemon?.maxJuice || 50);
    if (efficiency >= 0.8) return 'juice-excellent';
    if (efficiency >= 0.6) return 'juice-good';
    return 'juice-poor';
  };

  if (!currentLemon) return null;

  return (
    <div className="simple-squeezer">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🍋 Lemon Squeezer 🍋
        </h1>
        <p className="text-gray-600">Click the lemon to squeeze fresh juice!</p>
      </div>

      {/* Main Content */}
      <div className="squeezer-content">
        {/* Lemon */}
        <div className="lemon-section">
          <div 
            className={`big-lemon ${currentLemon.squeezed ? 'lemon-squeezed' : ''} ${isSqueezing ? 'animate-squeeze' : ''}`}
            onClick={handleSqueeze}
            style={{ cursor: currentLemon.squeezed ? 'default' : 'pointer' }}
          >
            🍋
          </div>
          
          {currentLemon.squeezed && (
            <div className="lemon-info">
              <p className="text-juice-600 font-medium">
                Extracted: {currentLemon.juiceAmount.toFixed(1)}ml
              </p>
              <div className="progress-bar" style={{ width: '200px', margin: '0 auto' }}>
                <div 
                  className="progress-fill"
                  style={{ width: `${(currentLemon.juiceAmount / currentLemon.maxJuice) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Juice drops animation */}
        {isSqueezing && (
          <div className="juice-drops">
            <div className="drop drop-1">💧</div>
            <div className="drop drop-2">💧</div>
            <div className="drop drop-3">💧</div>
          </div>
        )}

        {/* Glass */}
        <div className="glass-section">
          <div className="big-glass">
            {/* Juice Level */}
            {juiceCollection.totalAmount > 0 && (
              <div 
                className={`big-juice-level ${getQualityColor()}`}
                style={{ height: `${getJuiceHeight()}%` }}
              >
                {/* Animated bubbles */}
                <div className="bubble bubble-1"></div>
                <div className="bubble bubble-2"></div>
                <div className="bubble bubble-3"></div>
              </div>
            )}
            
            {/* Glass reflection */}
            <div className="big-glass-reflection"></div>
          </div>

          {/* Juice Stats */}
          <div className="juice-stats">
            <div className="stat">
              <span className="stat-value">{juiceCollection.totalAmount.toFixed(1)}ml</span>
              <span className="stat-label">Fresh Juice</span>
            </div>
            <div className="stat">
              <span className="stat-value">{squeezeCount}</span>
              <span className="stat-label">Squeezes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        {!currentLemon.squeezed ? (
          <button
            onClick={handleSqueeze}
            disabled={isSqueezing}
            className="squeeze-btn"
          >
            {isSqueezing ? 'Squeezing... 🤏' : 'Squeeze the Lemon! 🤏'}
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="reset-btn"
          >
            Get New Lemon 🍋
          </button>
        )}
      </div>

      {/* Fun fact */}
      <div className="fun-fact">
        <p>💡 Did you know? Lemons are 89% water and contain vitamin C!</p>
      </div>
    </div>
  );
}; 