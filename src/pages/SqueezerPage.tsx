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
    addLemon,
    squeezeLemon,
    resetSqueezer,
  } = useSqueezerStore();

  const [isPeeling, setIsPeeling] = useState(false);
  const [peeledAreas, setPeeledAreas] = useState<PeelArea[]>([]);
  const [peelProgress, setPeelProgress] = useState(0);
  const [isReadyToSqueeze, setIsReadyToSqueeze] = useState(false);
  const lemonRef = useRef<HTMLDivElement>(null);

  // Get the current lemon or create one if none exists
  const currentLemon = useSqueezerStore(state => state.lemons[0]);
  
  useEffect(() => {
    if (!currentLemon) {
      addLemon('large');
    }
  }, [currentLemon, addLemon]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (currentLemon?.squeezed || isSqueezing) return;
    setIsPeeling(true);
  }, [currentLemon?.squeezed, isSqueezing]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPeeling || currentLemon?.squeezed || isSqueezing) return;
    
    const rect = lemonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check if cursor is within the lemon bounds (circular)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      const lemonRadius = Math.min(rect.width, rect.height) / 2 - 20;
      
      if (distance <= lemonRadius) {
        // Add new peeled area
        const newPeeledArea: PeelArea = {
          x: x,
          y: y,
          radius: 20 + Math.random() * 10
        };
        
        setPeeledAreas(prev => [...prev, newPeeledArea]);
        
        // Calculate peel progress
        const totalPeeledArea = [...peeledAreas, newPeeledArea].reduce(
          (sum, area) => sum + Math.PI * area.radius * area.radius, 0
        );
        const lemonArea = Math.PI * lemonRadius * lemonRadius;
        const progress = Math.min((totalPeeledArea / lemonArea) * 100, 100);
        setPeelProgress(progress);
        
        if (progress > 50) {
          setIsReadyToSqueeze(true);
        }
      }
    }
  }, [isPeeling, currentLemon?.squeezed, isSqueezing, peeledAreas]);

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
    return Math.min((juiceCollection.totalAmount / 200) * 100, 100);
  };

  if (!currentLemon) return null;

  return (
    <div className="beautiful-squeezer">
      {/* Simple Header */}
      <div className="header">
        <h1>🍋 Beautiful Lemon Squeezer</h1>
        <p>
          {currentLemon.squeezed 
            ? 'Fresh juice ready!' 
            : !isReadyToSqueeze 
              ? 'Peel the lemon by dragging over it' 
              : 'Perfect! Now squeeze your lemon'
          }
        </p>
      </div>

      {/* Progress Bar */}
      {!currentLemon.squeezed && (
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${peelProgress}%` }}
            />
          </div>
          <span className="progress-text">{Math.round(peelProgress)}% peeled</span>
        </div>
      )}

      {/* Main Lemon and Glass */}
      <div className="main-content">
        {/* Beautiful Lemon */}
        <div className="lemon-container">
          <div 
            ref={lemonRef}
            className={`beautiful-lemon ${currentLemon.squeezed ? 'squeezed' : ''} ${isSqueezing ? 'squeezing' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Peeled areas showing flesh */}
            {peeledAreas.map((area, index) => (
              <div
                key={index}
                className="peeled-spot"
                style={{
                  left: area.x - area.radius,
                  top: area.y - area.radius,
                  width: area.radius * 2,
                  height: area.radius * 2,
                }}
              />
            ))}
            
            {/* Lemon emoji */}
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
        {!currentLemon.squeezed ? (
          <button
            onClick={handleSqueeze}
            disabled={!isReadyToSqueeze || isSqueezing}
            className={`squeeze-button ${isReadyToSqueeze ? 'ready' : 'disabled'}`}
          >
            {isSqueezing ? 'Squeezing...' : 
             isReadyToSqueeze ? 'Squeeze Lemon' : 
             'Peel more to unlock'}
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="reset-button"
          >
            Get New Lemon
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