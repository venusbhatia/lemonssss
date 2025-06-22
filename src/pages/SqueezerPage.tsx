import React, { useState } from 'react';

type GameStage = 'initial' | 'slice' | 'peel' | 'align' | 'squeeze' | 'finished';

export const SqueezerPage: React.FC = () => {
  const [stage, setStage] = useState<GameStage>('initial');
  const [peelCount, setPeelCount] = useState(0);
  const [alignCount, setAlignCount] = useState(0);
  const [squeezeCount, setSqueezeCount] = useState(0);
  const [showKnife, setShowKnife] = useState(false);
  const [message, setMessage] = useState('');
  const [juiceDrops, setJuiceDrops] = useState<number[]>([]);

  const handleLemonClick = () => {
    switch (stage) {
      case 'initial':
        setMessage('You must slice the lemon first.');
        setShowKnife(true);
        setTimeout(() => {
          setStage('slice');
          setShowKnife(false);
          setMessage('');
        }, 2000);
        break;

      case 'slice':
        setMessage('You must peel the lemon first');
        setStage('peel');
        break;

      case 'peel':
        const newPeelCount = peelCount + 1;
        setPeelCount(newPeelCount);
        if (newPeelCount >= 3) {
          setStage('align');
          setMessage('');
        }
        break;

      case 'align':
        const newAlignCount = alignCount + 1;
        setAlignCount(newAlignCount);
        if (newAlignCount === 1) {
          setMessage('Still not aligned…');
        } else if (newAlignCount === 2) {
          setMessage('Almost there…');
        } else if (newAlignCount >= 3) {
          setStage('squeeze');
          setMessage('');
        }
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
          setMessage('Out of lemon juice. There wasn\'t enough juice in this lemon.');
          setStage('finished');
        }
        break;
    }
  };

  const handleReset = () => {
    setStage('initial');
    setPeelCount(0);
    setAlignCount(0);
    setSqueezeCount(0);
    setShowKnife(false);
    setMessage('');
    setJuiceDrops([]);
  };

  const getLemonDisplay = () => {
    if (stage === 'initial') return '🍋';
    if (stage === 'slice') return '🍋'; // Could be a sliced lemon
    if (stage === 'peel') {
      if (peelCount === 0) return '🍋';
      if (peelCount === 1) return '🍋'; // partially peeled
      if (peelCount === 2) return '🍋'; // more peeled
      return '🍋'; // fully peeled
    }
    return '🍋';
  };

  const getInstruction = () => {
    if (stage === 'initial' || stage === 'slice' || stage === 'align' || stage === 'squeeze') {
      return 'SQUEEZE ME DADDY 🍋';
    }
    if (stage === 'peel') {
      return 'SQUEEZE ME DADDY 🍋';
    }
    return '';
  };

  return (
    <div className="isqueeze-simulator">
      {/* Header */}
      <div className="header">
        <h1>🍋 iSqueeze: Lemon Simulator Pro</h1>
        <div className="instruction">
          {getInstruction()}
        </div>
        {message && (
          <div className="game-message">
            {message}
          </div>
        )}
      </div>

      {/* Main Game Area */}
      <div className="game-content">
        {/* Interactive Lemon */}
        <div className="lemon-container">
          {/* Knife overlay */}
          {showKnife && (
            <div className="knife-overlay">
              🔪
            </div>
          )}
          
          <div 
            className={`game-lemon stage-${stage}`}
            onClick={handleLemonClick}
          >
            <span className="lemon-emoji">{getLemonDisplay()}</span>
            
            {/* Peel segments overlay */}
            {stage === 'peel' && (
              <div className="peel-segments">
                {[1, 2, 3].map(segment => (
                  <div 
                    key={segment}
                    className={`peel-segment segment-${segment} ${peelCount >= segment ? 'removed' : ''}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Glass/Cup */}
        <div className="cup-container">
          <div className="game-cup">
            <div className="glass-shine" />
            <div className="secondary-shine" />
            {/* Juice level */}
            <div 
              className="juice-level"
              style={{ height: `${(juiceDrops.length / 3) * 100}%` }}
            />
            
            {/* Juice drops animation */}
            {juiceDrops.map((drop, index) => (
              <div 
                key={drop}
                className="juice-drop-animation"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                💧
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Game Controls */}
      <div className="game-controls">
        {stage === 'finished' && (
          <div className="finished-modal">
            <p>Try another lemon?</p>
            <button onClick={handleReset} className="try-again-btn">
              🍋 Yes, Let's Go!
            </button>
          </div>
        )}
        
        {stage !== 'finished' && (
          <button onClick={handleReset} className="reset-game-btn">
            🔄 Reset Game
          </button>
        )}
      </div>

      {/* Stage Progress */}
      <div className="stage-progress">
        <div className="progress-dots">
          <div className={`dot ${stage !== 'initial' ? 'completed' : ''}`}>🔪</div>
          <div className={`dot ${['peel', 'align', 'squeeze', 'finished'].includes(stage) ? 'completed' : ''}`}>🍊</div>
          <div className={`dot ${['align', 'squeeze', 'finished'].includes(stage) ? 'completed' : ''}`}>🎯</div>
          <div className={`dot ${['squeeze', 'finished'].includes(stage) ? 'completed' : ''}`}>💧</div>
        </div>
        <div className="progress-labels">
          <span>Slice</span>
          <span>Peel</span>
          <span>Align</span>
          <span>Squeeze</span>
        </div>
      </div>
    </div>
  );
}; 