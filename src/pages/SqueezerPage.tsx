import React, { useState } from 'react';

type GameStage = 'initial' | 'wash' | 'dry' | 'peel' | 'slice' | 'remove-seeds' | 'align' | 'prep-squeeze' | 'squeeze' | 'finished';

export const SqueezerPage: React.FC = () => {
  const [stage, setStage] = useState<GameStage>('initial');
  const [message, setMessage] = useState('SQUEEZE ME DADDY 🍋');
  const [peelCount, setPeelCount] = useState(0);
  const [flipCount, setFlipCount] = useState(0);
  const [squeezeCount, setSqueezeCount] = useState(0);
  const [juiceDrops, setJuiceDrops] = useState<number[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showKnife, setShowKnife] = useState(false);
  const [showFinishedModal, setShowFinishedModal] = useState(false);
  const [seedCount, setSeedCount] = useState(0);
  const [segmentCount, setSegmentCount] = useState(0);
  const [tenderizeCount, setTenderizeCount] = useState(0);

  const handleLemonClick = () => {
    switch (stage) {
      case 'initial':
        setMessage('First, wash the lemon thoroughly.');
        setStage('wash');
        break;

      case 'wash':
        setMessage('Now dry the lemon with a clean towel.');
        setStage('dry');
        break;

      case 'dry':
        setMessage('Start peeling the lemon skin.');
        setStage('peel');
        break;

      case 'peel':
        const newPeelCount = peelCount + 1;
        setPeelCount(newPeelCount);
        if (newPeelCount === 1) {
          setMessage('Keep peeling... 1/3');
        } else if (newPeelCount === 2) {
          setMessage('Almost done peeling... 2/3');
        } else if (newPeelCount >= 3) {
          setMessage('Now slice the lemon.');
          setShowKnife(true);
          setTimeout(() => {
            setStage('slice');
            setShowKnife(false);
            setMessage('');
          }, 2000);
        }
        break;

      case 'slice':
        setMessage('Remove any visible seeds.');
        setStage('remove-seeds');
        break;

      case 'remove-seeds':
        const newSeedCount = seedCount + 1;
        setSeedCount(newSeedCount);
        if (newSeedCount >= 3) {
          setMessage('Align the lemon for optimal juicing.');
          setStage('align');
        } else {
          setMessage(`Removing seeds... ${newSeedCount}/3`);
        }
        break;

      case 'align':
        const newFlipCount = flipCount + 1;
        setFlipCount(newFlipCount);
        setIsFlipped(!isFlipped);
        
        if (newFlipCount === 1) {
          setMessage('Keep flipping to align it properly...');
        } else if (newFlipCount === 2) {
          setMessage('Almost aligned... one more flip!');
        } else if (newFlipCount >= 3) {
          setStage('prep-squeeze');
          setMessage('Prepare for squeezing.');
        }
        break;

      case 'prep-squeeze':
        setMessage('Begin the squeezing process.');
        setStage('squeeze');
        break;

      case 'squeeze':
        const newSqueezeCount = squeezeCount + 1;
        setSqueezeCount(newSqueezeCount);
        setJuiceDrops(prev => [...prev, newSqueezeCount]);
        
        if (newSqueezeCount === 1) {
          setMessage('You need to squeeze harder.');
        } else if (newSqueezeCount === 2) {
          setMessage('Harder… like you mean it.');
        } else if (newSqueezeCount >= 3) {
          setMessage('Masterful! You completed the perfect juicing process.');
          setStage('finished');
        }
        break;
    }
  };

  const getLemonStyle = () => {
    const baseStyle = {
      outline: 'none',
      border: 'none',
      boxShadow: 'none',
      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      cursor: 'pointer'
    };

    if (stage === 'initial') {
      return { ...baseStyle, filter: 'brightness(1) saturate(1)' };
    }
    
    if (stage === 'wash') {
      return { ...baseStyle, filter: 'brightness(1.1) saturate(1.1) blur(0.5px)', boxShadow: '0 0 15px rgba(0, 150, 255, 0.4)' };
    }
    
    if (stage === 'dry') {
      return { ...baseStyle, filter: 'brightness(1.2) saturate(1.2) contrast(1.1)', boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)' };
    }
    
    if (stage === 'peel') {
      if (peelCount === 0) {
        return { ...baseStyle, filter: 'brightness(1) saturate(1)' };
      } else if (peelCount === 1) {
        return { ...baseStyle, filter: 'brightness(1.4) saturate(3) hue-rotate(-90deg) contrast(1.3) sepia(0.8)', boxShadow: '0 0 25px rgba(255, 0, 0, 0.8)' };
      } else if (peelCount === 2) {
        return { ...baseStyle, filter: 'brightness(1.6) saturate(4) hue-rotate(-120deg) contrast(1.5) sepia(1)', boxShadow: '0 0 30px rgba(255, 0, 0, 1)' };
      } else {
        return { ...baseStyle, filter: 'brightness(1.8) saturate(5) hue-rotate(-150deg) contrast(1.7) sepia(1.2)', boxShadow: '0 0 40px rgba(255, 0, 0, 1)' };
      }
    }
    
    if (stage === 'slice') {
      return { ...baseStyle, filter: 'brightness(2.2) saturate(3.5) hue-rotate(-75deg) contrast(1.8)', boxShadow: '0 0 35px rgba(255, 0, 0, 1)' };
    }
    
    if (stage === 'remove-seeds') {
      return { ...baseStyle, filter: 'brightness(2.1) saturate(3) hue-rotate(-70deg) contrast(1.7)', boxShadow: '0 0 30px rgba(255, 50, 0, 0.8)' };
    }
    
    if (stage === 'align') {
      return { 
        ...baseStyle, 
        transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)',
        filter: 'brightness(1.8) saturate(2.5) hue-rotate(-50deg) contrast(1.4)',
        boxShadow: `0 0 ${20 + flipCount * 10}px rgba(255, 100, 0, ${0.5 + flipCount * 0.2})`
      };
    }
    
    if (stage === 'prep-squeeze') {
      return { ...baseStyle, filter: 'brightness(1.7) saturate(2) hue-rotate(-40deg) contrast(1.3)', boxShadow: '0 0 35px rgba(255, 50, 0, 0.7)' };
    }
    
    if (stage === 'squeeze') {
      return { ...baseStyle, filter: 'brightness(1.5) saturate(1.8) hue-rotate(-30deg) contrast(1.1) opacity(0.95)', transform: 'scale(0.98)' };
    }
    
    return baseStyle;
  };

  const resetGame = () => {
    setStage('initial');
    setMessage('SQUEEZE ME DADDY 🍋');
    setPeelCount(0);
    setFlipCount(0);
    setSqueezeCount(0);
    setSeedCount(0);
    setSegmentCount(0);
    setTenderizeCount(0);
    setJuiceDrops([]);
    setIsFlipped(false);
    setShowKnife(false);
    setShowFinishedModal(false);
  };

  if (stage === 'finished') {
    return (
      <div className="isqueeze-simulator">
        <div className="header">
          <h1>iSqueeze: Lemon Simulator Pro</h1>
          <p className="instruction">SQUEEZE ME DADDY 🍋</p>
        </div>

        <div className="finished-modal">
          <p>Out of lemon juice. There wasn't enough juice in this lemon.</p>
          <button 
            onClick={() => setShowFinishedModal(true)}
            className="try-again-btn"
          >
            Try another lemon?
          </button>
        </div>

        {showFinishedModal && (
          <div className="finished-modal">
            <p>Ready for another squeeze session?</p>
            <button onClick={resetGame} className="reset-game-btn">
              🍋 New Lemon
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="isqueeze-simulator">
      <div className="header">
        <h1>iSqueeze: Lemon Simulator Pro</h1>
        <p className="instruction">SQUEEZE ME DADDY 🍋</p>
        {message && <p className="game-message">{message}</p>}
      </div>



      <div className="game-content">
        <div className="lemon-container">
          <div 
            className={`game-lemon ${stage === 'align' ? 'flipped' : ''}`}
            onClick={handleLemonClick}
            style={getLemonStyle()}
          >
            <div className="lemon-emoji">🍋</div>
            
            {/* Water effect for washing */}
            {stage === 'wash' && (
              <div className="water-effect">
                <div className="water-drops">💧💧💧</div>
                <div className="water-splash">💦</div>
              </div>
            )}
            
            {/* Towel effect for drying */}
            {stage === 'dry' && (
              <div className="towel-effect">
                <div className="towel">🧽</div>
                <div className="dry-sparkles">✨✨✨</div>
              </div>
            )}
            
            {/* Peel segments */}
            {stage === 'peel' && (
              <div className="peel-segments">
                {[1, 2, 3].map(i => (
                  <div 
                    key={i} 
                    className={`peel-segment peel-${i} ${peelCount >= i ? 'removed' : ''}`}
                  >
                    🟠
                  </div>
                ))}
              </div>
            )}
            
            {/* Seeds being removed */}
            {stage === 'remove-seeds' && (
              <div className="seeds-effect">
                {[1, 2, 3].map(i => (
                  <div 
                    key={i} 
                    className={`seed seed-${i} ${seedCount >= i ? 'removed' : ''}`}
                  >
                    🌱
                  </div>
                ))}
              </div>
            )}
            
            {/* Alignment guides */}
            {stage === 'align' && (
              <div className="flip-indicator">
                <div className="flip-arrows">
                  <div className="arrow-left">⬅️</div>
                  <div className="arrow-right">➡️</div>
                </div>
                <div className="flip-text">Click to Flip</div>
                <div className="flip-progress">
                  <div className="flip-dots">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`dot ${flipCount >= i ? 'filled' : ''}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Prep squeeze glow */}
            {stage === 'prep-squeeze' && (
              <div className="prep-glow">
                <div className="energy-rings">
                  <div className="ring ring-1"></div>
                  <div className="ring ring-2"></div>
                  <div className="ring ring-3"></div>
                </div>
                <div className="ready-indicator">⚡</div>
              </div>
            )}
            
            {/* Squeeze pressure indicators */}
            {stage === 'squeeze' && (
              <div className="squeeze-indicators">
                <div className="pressure-meter">
                  <div className="meter-fill" style={{width: `${(squeezeCount / 3) * 100}%`}}></div>
                </div>
                <div className="squeeze-hands">🤏</div>
              </div>
            )}
            

          </div>

          {showKnife && (
            <div className="knife-overlay">
              🔪
            </div>
          )}
        </div>

        <div className="cup-container">
          <div className="game-cup">
            <div 
              className="juice-level" 
              style={{
                height: `${Math.min(juiceDrops.length * 25, 80)}%`,
                opacity: juiceDrops.length > 0 ? 1 : 0
              }}
            ></div>
            <div className="glass-shine"></div>
            <div className="secondary-shine"></div>
          </div>
          
          {juiceDrops.map((drop, index) => (
            <div
              key={drop}
              className="juice-drop-animation"
              style={{
                animationDelay: `${index * 0.5}s`,
                left: `${45 + (index % 3) * 5}%`
              }}
            >
              💧
            </div>
          ))}
        </div>

        <div className="game-controls">
          <button onClick={resetGame} className="reset-game-btn">
            🍋 Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}; 