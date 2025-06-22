import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSqueezerStore } from '../store/squeezerStore';

interface PeelArea {
  x: number;
  y: number;
  radius: number;
}

export const SqueezerPage: React.FC = () => {
  const {
    juiceCollection,
    isSqueezing,
    squeezeCount,
    addLemon,
    squeezeLemon,
    resetSqueezer,
  } = useSqueezerStore();

  const [isPeeling, setIsPeeling] = useState(false);
  const [peeledAreas, setPeeledAreas] = useState<PeelArea[]>([]);
  const [peelProgress, setPeelProgress] = useState(0);
  const [isReadyToSqueeze, setIsReadyToSqueeze] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const lemonRef = useRef<HTMLDivElement>(null);

  // Get the current lemon or create one if none exists
  const currentLemon = useSqueezerStore(state => state.lemons[0]);
  
  useEffect(() => {
    if (!currentLemon) {
      addLemon('large');
    }
  }, [currentLemon, addLemon]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (currentLemon?.squeezed) return;
    setIsPeeling(true);
    const rect = lemonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }
  }, [currentLemon?.squeezed]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPeeling || currentLemon?.squeezed) return;
    
    const rect = lemonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Add new peeled area
      const newPeeledArea: PeelArea = {
        x: x,
        y: y,
        radius: 25 + Math.random() * 15 // Random radius for natural peeling
      };
      
      setPeeledAreas(prev => [...prev, newPeeledArea]);
      
      // Update peel progress based on coverage
      const totalArea = Math.PI * 150 * 150; // Approximate lemon area
      const peeledArea = peeledAreas.reduce((sum, area) => sum + Math.PI * area.radius * area.radius, 0);
      const progress = Math.min((peeledArea / totalArea) * 100, 100);
      setPeelProgress(progress);
      
      if (progress > 60) {
        setIsReadyToSqueeze(true);
      }
      
      setMousePos({ x, y });
    }
  }, [isPeeling, currentLemon?.squeezed, peeledAreas]);

  const handleMouseUp = useCallback(() => {
    setIsPeeling(false);
  }, []);

  const handleSqueeze = () => {
    if (currentLemon && !currentLemon.squeezed && isReadyToSqueeze) {
      squeezeLemon(currentLemon.id);
    }
  };

  const handleReset = () => {
    resetSqueezer();
    addLemon('large');
    setPeeledAreas([]);
    setPeelProgress(0);
    setIsReadyToSqueeze(false);
    setIsPeeling(false);
  };

  const getJuiceHeight = () => {
    return Math.min((juiceCollection.totalAmount / 300) * 100, 100);
  };

  const getQualityColor = () => {
    const efficiency = juiceCollection.totalAmount / (currentLemon?.maxJuice || 80);
    if (efficiency >= 0.8) return 'juice-excellent';
    if (efficiency >= 0.6) return 'juice-good';
    return 'juice-poor';
  };

  if (!currentLemon) return null;

  return (
    <div className="immersive-squeezer">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-gray-800 mb-3">
          🍋 Premium Lemon Experience 🍋
        </h1>
        <p className="text-lg text-gray-600">
          {!isReadyToSqueeze ? 'Gently peel your lemon by dragging your cursor across it' : 'Perfect! Now squeeze your peeled lemon'}
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="peel-progress-container">
        <div className="peel-progress-bar">
          <div 
            className="peel-progress-fill"
            style={{ width: `${peelProgress}%` }}
          ></div>
        </div>
        <p className="peel-progress-text">{Math.round(peelProgress)}% peeled</p>
      </div>

      {/* Main Content */}
      <div className="squeezer-content">
        {/* Interactive Lemon */}
        <div className="lemon-section">
          <div 
            ref={lemonRef}
            className={`interactive-lemon ${currentLemon.squeezed ? 'lemon-squeezed' : ''} ${isSqueezing ? 'animate-squeeze' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ 
              cursor: currentLemon.squeezed ? 'default' : isPeeling ? 'grabbing' : 'grab',
              position: 'relative'
            }}
          >
            {/* Lemon Flesh (visible through peeled areas) */}
            <div className="lemon-flesh">
              {peeledAreas.map((area, index) => (
                <div
                  key={index}
                  className="peeled-area"
                  style={{
                    left: area.x - area.radius,
                    top: area.y - area.radius,
                    width: area.radius * 2,
                    height: area.radius * 2,
                    borderRadius: '50%',
                  }}
                />
              ))}
            </div>
            
            {/* Lemon Peel */}
            <div className="lemon-peel">🍋</div>
            
            {/* Cursor Trail */}
            {isPeeling && (
              <div 
                className="cursor-trail"
                style={{
                  left: mousePos.x - 10,
                  top: mousePos.y - 10,
                }}
              >
                ✨
              </div>
            )}
          </div>
          
          {currentLemon.squeezed && (
            <div className="lemon-info">
              <p className="text-juice-600 font-medium text-xl">
                Extracted: {currentLemon.juiceAmount.toFixed(1)}ml of premium juice!
              </p>
              <div className="progress-bar" style={{ width: '300px', margin: '1rem auto' }}>
                <div 
                  className="progress-fill"
                  style={{ width: `${(currentLemon.juiceAmount / currentLemon.maxJuice) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Juice drops animation */}
        {isSqueezing && (
          <div className="enhanced-juice-drops">
            <div className="drop drop-1">💧</div>
            <div className="drop drop-2">💧</div>
            <div className="drop drop-3">💧</div>
            <div className="drop drop-4">💧</div>
            <div className="drop drop-5">💧</div>
          </div>
        )}

        {/* Premium Glass */}
        <div className="glass-section">
          <div className="premium-glass">
            {/* Juice Level with enhanced effects */}
            {juiceCollection.totalAmount > 0 && (
              <div 
                className={`premium-juice-level ${getQualityColor()}`}
                style={{ height: `${getJuiceHeight()}%` }}
              >
                {/* Enhanced bubbles */}
                <div className="bubble bubble-1"></div>
                <div className="bubble bubble-2"></div>
                <div className="bubble bubble-3"></div>
                <div className="bubble bubble-4"></div>
                <div className="bubble bubble-5"></div>
                
                {/* Juice sparkles */}
                <div className="juice-sparkle sparkle-1">✨</div>
                <div className="juice-sparkle sparkle-2">✨</div>
                <div className="juice-sparkle sparkle-3">✨</div>
              </div>
            )}
            
            {/* Enhanced glass reflection */}
            <div className="premium-glass-reflection"></div>
            <div className="glass-rim"></div>
          </div>

          {/* Enhanced Stats */}
          <div className="premium-stats">
            <div className="stat premium-stat">
              <span className="stat-value">{juiceCollection.totalAmount.toFixed(1)}ml</span>
              <span className="stat-label">Fresh Lemon Juice</span>
            </div>
            <div className="stat premium-stat">
              <span className="stat-value">{squeezeCount}</span>
              <span className="stat-label">Perfect Squeezes</span>
            </div>
            <div className="stat premium-stat">
              <span className="stat-value">{Math.round(peelProgress)}%</span>
              <span className="stat-label">Peel Mastery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Action Buttons */}
      <div className="action-buttons">
        {!currentLemon.squeezed ? (
          <button
            onClick={handleSqueeze}
            disabled={!isReadyToSqueeze || isSqueezing}
            className={`premium-squeeze-btn ${isReadyToSqueeze ? 'ready' : 'not-ready'}`}
          >
            {isSqueezing ? 'Squeezing Perfect Juice... 🤏' : 
             isReadyToSqueeze ? 'Squeeze Your Peeled Lemon! 🤏' : 
             'Peel More to Unlock Squeezing 🍋'}
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="premium-reset-btn"
          >
            Start Fresh Lemon Experience 🍋
          </button>
        )}
      </div>

      {/* Enhanced Tips */}
      <div className="premium-tips">
        <div className="tip-card">
          <h3>🎯 Pro Peeling Tips:</h3>
          <ul>
            <li>• Drag slowly in circular motions for best results</li>
            <li>• Peel at least 60% for optimal juice extraction</li>
            <li>• Watch the sparkles appear as you perfect your technique</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 