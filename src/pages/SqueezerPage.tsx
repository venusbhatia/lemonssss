import React, { useState, useEffect, useRef, useCallback } from 'react';

type GameStage = 'initial' | 'wash' | 'dry' | 'peel' | 'slice' | 'remove-seeds' | 'align' | 'prep-squeeze' | 'squeeze' | 'finished';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  type: 'sparkle' | 'juice' | 'peel' | 'seed' | 'steam' | 'bubble' | 'glow';
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface LemonStats {
  totalClicks: number;
  timeSpent: number;
  efficiency: number;
  perfectPeels: number;
  speedRuns: number;
  comboMultiplier: number;
  skillLevel: number;
  experience: number;
}

export const SqueezerPage: React.FC = () => {
  // Core game state
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

  // Over-engineered particle system
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleId, setParticleId] = useState(0);
  const particleSystemRef = useRef<HTMLDivElement>(null);
  
  // Advanced animation states
  const [isVibrating, setIsVibrating] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [scaleMultiplier, setScaleMultiplier] = useState(1);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [shakeIntensity, setShakeIntensity] = useState(0);
  const [colorShift, setColorShift] = useState(0);
  const [waveOffset, setWaveOffset] = useState(0);
  
  // Complex state tracking
  const [sessionStartTime] = useState(Date.now());
  const [lastClickTime, setLastClickTime] = useState(0);
  const [clickStreak, setClickStreak] = useState(0);
  const [perfectActions, setPerfectActions] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [comboTimer, setComboTimer] = useState(0);
  
  // Performance metrics
  const [fps, setFps] = useState(60);
  const [renderTime, setRenderTime] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  
  // Sound simulation
  const [soundEffects, setSoundEffects] = useState({
    volume: 0.7,
    reverb: 0.3,
    echo: 0.2,
    bass: 0.5,
    treble: 0.6
  });
  
  // Haptic feedback simulation
  const [hapticFeedback, setHapticFeedback] = useState({
    enabled: true,
    intensity: 0.8,
    pattern: 'default' as 'default' | 'sharp' | 'soft' | 'double' | 'triple'
  });
  
  // Weather system for the lemon
  const [weather, setWeather] = useState({
    humidity: 65,
    temperature: 72,
    pressure: 1013,
    windSpeed: 0,
    season: 'spring' as 'spring' | 'summer' | 'fall' | 'winter'
  });
  
  // Lemon genetics and characteristics
  const [lemonDNA, setLemonDNA] = useState({
    variety: 'Eureka',
    acidity: 6.2,
    sugarContent: 2.3,
    pithThickness: 0.8,
    seedCount: Math.floor(Math.random() * 8) + 2,
    ripeness: 0.85,
    organicCertified: Math.random() > 0.3,
    farmLocation: 'California'
  });
  
  // Advanced achievements system
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 'first_peel', name: 'First Peel', description: 'Peel your first lemon', unlocked: false, rarity: 'common' },
    { id: 'speed_demon', name: 'Speed Demon', description: 'Complete in under 30 seconds', unlocked: false, rarity: 'rare' },
    { id: 'perfectionist', name: 'Perfectionist', description: 'Perfect peel with no mistakes', unlocked: false, rarity: 'epic' },
    { id: 'master_squeezer', name: 'Master Squeezer', description: 'Achieve maximum juice extraction', unlocked: false, rarity: 'legendary' },
    { id: 'combo_master', name: 'Combo Master', description: 'Achieve 10x combo multiplier', unlocked: false, rarity: 'epic' },
    { id: 'zen_master', name: 'Zen Master', description: 'Meditative squeezing session', unlocked: false, rarity: 'rare' }
  ]);
  
  // Player statistics
  const [stats, setStats] = useState<LemonStats>({
    totalClicks: 0,
    timeSpent: 0,
    efficiency: 0,
    perfectPeels: 0,
    speedRuns: 0,
    comboMultiplier: 1,
    skillLevel: 1,
    experience: 0
  });
  
  // Environmental effects
  const [ambientEffects, setAmbientEffects] = useState({
    lightingMode: 'natural' as 'natural' | 'studio' | 'dramatic' | 'neon' | 'sunset',
    backgroundMusic: 'citrus_symphony',
    aromatherapy: 'lemon_zest',
    roomTemperature: 72,
    humidity: 45
  });

  // Quantum lemon state (because why not?)
  const [quantumState, setQuantumState] = useState({
    superposition: false,
    entangled: false,
    uncertainty: 0.5,
    waveFunction: 'collapsed',
    observation: 'classical'
  });

  // Realistic physics simulation
  const [physics, setPhysics] = useState({
    gravity: 9.81,
    friction: 0.8,
    elasticity: 0.3,
    viscosity: 0.1,
    airResistance: 0.02,
    magneticField: 0,
    timeDialation: 1
  });

  // Advanced analytics and telemetry
  const [analytics, setAnalytics] = useState({
    sessionId: Math.random().toString(36),
    heatmapData: [] as Array<{x: number, y: number, intensity: number}>,
    clickPatterns: [] as Array<{timestamp: number, position: {x: number, y: number}, pressure: number}>,
    biometrics: {
      estimatedHeartRate: 72,
      stressLevel: 'low',
      focusIndex: 0.8,
      fatigueLevel: 0.1
    }
  });

  // Create particle explosion
  const createParticleExplosion = useCallback((x: number, y: number, type: Particle['type'], count: number = 20) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = Math.random() * 5 + 2;
      const particle: Particle = {
        id: particleId + i,
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: Math.random() * 2 + 1,
        color: type === 'sparkle' ? '#FFD700' : type === 'juice' ? '#FFA500' : type === 'peel' ? '#FF6B00' : '#4CAF50',
        size: Math.random() * 4 + 2,
        type
      };
      newParticles.push(particle);
    }
    setParticles(prev => [...prev, ...newParticles]);
    setParticleId(prev => prev + count);
  }, [particleId]);

  // Simulate haptic feedback
  const triggerHapticFeedback = useCallback((pattern: string, intensity: number) => {
    if (!hapticFeedback.enabled) return;
    
    // Simulate vibration with visual feedback
    setIsVibrating(true);
    setShakeIntensity(intensity);
    
    // Complex haptic patterns
    const vibrationSequence = {
      'click': [100],
      'success': [50, 100, 50, 150],
      'error': [200, 100, 200],
      'achievement': [50, 50, 100, 50, 100, 50, 200]
    }[pattern] || [100];
    
    let delay = 0;
    vibrationSequence.forEach((duration, index) => {
      setTimeout(() => {
        setShakeIntensity(intensity * (1 - index * 0.2));
        if (index === vibrationSequence.length - 1) {
          setTimeout(() => {
            setIsVibrating(false);
            setShakeIntensity(0);
          }, duration);
        }
      }, delay);
      delay += duration + 50;
    });
  }, [hapticFeedback]);

  // Simulate 3D sound effects
  const playSound = useCallback((soundType: string, x: number, y: number) => {
    const sounds = {
      'click': '🔊',
      'splash': '💦',
      'slice': '🔪',
      'peel': '🍊',
      'squeeze': '💧',
      'achievement': '🎉'
    };
    
    // Create visual sound indicator
    const soundElement = document.createElement('div');
    soundElement.textContent = sounds[soundType as keyof typeof sounds] || '🔊';
    soundElement.style.position = 'fixed';
    soundElement.style.left = `${x}px`;
    soundElement.style.top = `${y}px`;
    soundElement.style.fontSize = '24px';
    soundElement.style.pointerEvents = 'none';
    soundElement.style.zIndex = '9999';
    soundElement.style.animation = 'soundWave 1s ease-out forwards';
    
    document.body.appendChild(soundElement);
    setTimeout(() => document.body.removeChild(soundElement), 1000);
  }, []);

  // Advanced combo system
  const updateCombo = useCallback(() => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime;
    
    if (timeSinceLastClick < 2000) {
      setClickStreak(prev => prev + 1);
      setMultiplier(prev => Math.min(prev + 0.1, 10));
    } else {
      setClickStreak(0);
      setMultiplier(1);
    }
    
    setLastClickTime(now);
    setComboTimer(2000);
  }, [lastClickTime]);

  // Achievement system
  const checkAchievements = useCallback(() => {
    const sessionTime = (Date.now() - sessionStartTime) / 1000;
    
    setAchievements(prev => prev.map(achievement => {
      if (achievement.unlocked) return achievement;
      
      switch (achievement.id) {
        case 'first_peel':
          if (peelCount > 0) {
            createParticleExplosion(200, 200, 'sparkle', 30);
            triggerHapticFeedback('achievement', 0.8);
            return { ...achievement, unlocked: true };
          }
          break;
        case 'speed_demon':
          if (stage === 'finished' && sessionTime < 30) {
            return { ...achievement, unlocked: true };
          }
          break;
        case 'combo_master':
          if (multiplier >= 10) {
            return { ...achievement, unlocked: true };
          }
          break;
      }
      return achievement;
    }));
  }, [peelCount, stage, sessionStartTime, multiplier, createParticleExplosion, triggerHapticFeedback]);

  // Complex animation loops
  useEffect(() => {
    const animationFrame = () => {
      // Update particles
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        vy: particle.vy + 0.1, // gravity
        life: particle.life - 0.02,
        vx: particle.vx * 0.99, // air resistance
      })).filter(particle => particle.life > 0));

      // Update animations
      setWaveOffset(prev => (prev + 0.1) % (Math.PI * 2));
      setPulseIntensity(1 + Math.sin(Date.now() * 0.005) * 0.1);
      setGlowIntensity(Math.sin(Date.now() * 0.003) * 0.5 + 0.5);
      
      // Update combo timer
      setComboTimer(prev => Math.max(0, prev - 16));
      
      // Simulate performance metrics
      setFps(60 + Math.sin(Date.now() * 0.001) * 5);
      setRenderTime(Math.random() * 2 + 1);
      
      requestAnimationFrame(animationFrame);
    };
    
    const frameId = requestAnimationFrame(animationFrame);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Weather simulation
  useEffect(() => {
    const weatherInterval = setInterval(() => {
      setWeather(prev => ({
        ...prev,
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 2)),
        temperature: Math.max(60, Math.min(85, prev.temperature + (Math.random() - 0.5) * 0.5)),
        pressure: Math.max(990, Math.min(1030, prev.pressure + (Math.random() - 0.5) * 0.1)),
        windSpeed: Math.max(0, Math.min(15, prev.windSpeed + (Math.random() - 0.5) * 0.2))
      }));
    }, 5000);
    
    return () => clearInterval(weatherInterval);
  }, []);

  // Quantum state simulation
  useEffect(() => {
    const quantumInterval = setInterval(() => {
      setQuantumState(prev => ({
        ...prev,
        uncertainty: Math.random(),
        superposition: Math.random() > 0.8,
        entangled: Math.random() > 0.95
      }));
    }, 1000);
    
    return () => clearInterval(quantumInterval);
  }, []);

  // Advanced click handler with too many features
  const handleLemonClick = useCallback((event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Update analytics
    setAnalytics(prev => ({
      ...prev,
      clickPatterns: [...prev.clickPatterns, {
        timestamp: Date.now(),
        position: { x, y },
        pressure: Math.random() * 0.5 + 0.5
      }],
      heatmapData: [...prev.heatmapData, { x, y, intensity: 1 }]
    }));
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalClicks: prev.totalClicks + 1,
      experience: prev.experience + 10 * multiplier
    }));
    
    updateCombo();
    triggerHapticFeedback('click', 0.5);
    playSound('click', event.clientX, event.clientY);
    createParticleExplosion(x, y, 'sparkle', 5);
    
    // Add screen shake based on intensity
    setShakeIntensity(0.5);
    setTimeout(() => setShakeIntensity(0), 100);
    
    switch (stage) {
      case 'initial':
        setMessage('🌊 Initiating hydrodynamic cleansing protocol...');
        setStage('wash');
        createParticleExplosion(x, y, 'bubble', 15);
        triggerHapticFeedback('success', 0.6);
        break;

      case 'wash':
        setMessage('🧽 Activating molecular drying sequence...');
        setStage('dry');
        createParticleExplosion(x, y, 'steam', 20);
        setRotationAngle(prev => prev + 15);
        break;

      case 'dry':
        setMessage('🔬 Initiating precision peeling algorithm...');
        setStage('peel');
        setColorShift(30);
        createParticleExplosion(x, y, 'sparkle', 25);
        break;

      case 'peel':
        const newPeelCount = peelCount + 1;
        setPeelCount(newPeelCount);
        
        // Complex peel animations
        setRotationAngle(prev => prev + 45);
        setScaleMultiplier(1.1);
        setTimeout(() => setScaleMultiplier(1), 200);
        
        createParticleExplosion(x, y, 'peel', 15);
        triggerHapticFeedback('success', 0.7);
        
        if (newPeelCount === 1) {
          setMessage('🍊 Enzymatic breakdown initiated... 1/3');
          setColorShift(90);
        } else if (newPeelCount === 2) {
          setMessage('🔬 Cellular wall degradation... 2/3');
          setColorShift(150);
          setPerfectActions(prev => prev + 1);
        } else if (newPeelCount >= 3) {
          setMessage('⚔️ Deploying quantum blade technology...');
          setColorShift(210);
          setShowKnife(true);
          createParticleExplosion(x, y, 'sparkle', 40);
          
          setTimeout(() => {
            setStage('slice');
            setShowKnife(false);
            setMessage('');
          }, 2000);
        }
        break;

      case 'slice':
        setMessage('🌱 Initiating seed extraction matrix...');
        setStage('remove-seeds');
        createParticleExplosion(x, y, 'juice', 30);
        setRotationAngle(prev => prev + 90);
        break;

      case 'remove-seeds':
        const newSeedCount = seedCount + 1;
        setSeedCount(newSeedCount);
        
        createParticleExplosion(x, y, 'seed', 8);
        setScaleMultiplier(0.95);
        setTimeout(() => setScaleMultiplier(1), 150);
        
        if (newSeedCount >= 3) {
          setMessage('🎯 Activating dimensional alignment matrix...');
          setStage('align');
          setPerfectActions(prev => prev + 1);
        } else {
          setMessage(`🔬 Molecular seed extraction... ${newSeedCount}/3`);
        }
        break;

      case 'align':
        const newFlipCount = flipCount + 1;
        setFlipCount(newFlipCount);
        setIsFlipped(!isFlipped);
        
        setRotationAngle(prev => prev + 180);
        createParticleExplosion(x, y, 'glow', 20);
        
        if (newFlipCount === 1) {
          setMessage('🌀 Quantum entanglement stabilizing...');
        } else if (newFlipCount === 2) {
          setMessage('⚡ Achieving molecular resonance...');
        } else if (newFlipCount >= 3) {
          setStage('prep-squeeze');
          setMessage('🚀 Preparing hyper-compression chamber...');
          createParticleExplosion(x, y, 'sparkle', 50);
        }
        break;

      case 'prep-squeeze':
        setMessage('💪 Initiating maximum pressure protocol...');
        setStage('squeeze');
        setGlowIntensity(1);
        createParticleExplosion(x, y, 'glow', 35);
        break;

      case 'squeeze':
        const newSqueezeCount = squeezeCount + 1;
        setSqueezeCount(newSqueezeCount);
        setJuiceDrops(prev => [...prev, newSqueezeCount]);
        
        setScaleMultiplier(0.9);
        setTimeout(() => setScaleMultiplier(1), 100);
        
        createParticleExplosion(x, y, 'juice', 25);
        triggerHapticFeedback('success', 0.9);
        
        if (newSqueezeCount === 1) {
          setMessage('💥 Pressure insufficient! Amplifying force matrix...');
        } else if (newSqueezeCount === 2) {
          setMessage('⚡ MAXIMUM POWER! Unleash the citrus storm!');
        } else if (newSqueezeCount >= 3) {
          setMessage('🏆 LEGENDARY EXTRACTION ACHIEVED!');
          setStage('finished');
          setTotalScore(prev => prev + 1000 * multiplier);
          createParticleExplosion(x, y, 'sparkle', 100);
          triggerHapticFeedback('achievement', 1);
          
          // Unlock achievement
          setPerfectActions(prev => prev + 1);
        }
        break;
    }
    
    checkAchievements();
  }, [stage, peelCount, flipCount, squeezeCount, seedCount, isFlipped, multiplier, updateCombo, triggerHapticFeedback, playSound, createParticleExplosion, checkAchievements]);

  // Over-engineered style function with quantum effects
  const getLemonStyle = useCallback(() => {
    const time = Date.now() * 0.001;
    const baseStyle = {
      outline: 'none',
      border: 'none',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      cursor: 'pointer',
      transform: `
        scale(${scaleMultiplier * pulseIntensity})
        rotate(${rotationAngle + Math.sin(waveOffset) * 5}deg)
        translateX(${shakeIntensity * Math.sin(time * 50)}px)
        translateY(${shakeIntensity * Math.cos(time * 50)}px)
        rotateX(${Math.sin(time * 0.5) * 5}deg)
        rotateY(${Math.cos(time * 0.3) * 5}deg)
      `,
      filter: `
        brightness(${1 + glowIntensity * 0.5})
        saturate(${1 + glowIntensity})
        hue-rotate(${colorShift}deg)
        contrast(${1 + glowIntensity * 0.3})
        blur(${quantumState.superposition ? 2 : 0}px)
        sepia(${stage === 'peel' ? peelCount * 0.3 : 0})
      `,
      boxShadow: `
        0 0 ${20 + glowIntensity * 30}px rgba(255, ${255 - colorShift}, 0, ${0.5 + glowIntensity * 0.5}),
        ${shakeIntensity * 5}px ${shakeIntensity * 5}px ${20 + shakeIntensity * 10}px rgba(0,0,0,0.3),
        inset 0 0 ${10 + glowIntensity * 10}px rgba(255,255,255,${0.2 + glowIntensity * 0.3})
      `,
      background: quantumState.superposition ? 
        'linear-gradient(45deg, #FFD700, #FF6B00, #FFD700, #FF6B00)' : 
        'transparent',
      backgroundSize: '200% 200%',
      animation: quantumState.superposition ? 'quantumFlux 2s infinite' : 'none'
    };

    // Stage-specific quantum enhancements
    if (stage === 'peel') {
      const intensity = peelCount / 3;
      return {
        ...baseStyle,
        filter: `${baseStyle.filter} drop-shadow(0 0 ${10 * intensity}px red)`,
        animation: `peelPulse ${2 - intensity}s infinite ease-in-out`
      };
    }

    return baseStyle;
  }, [stage, peelCount, scaleMultiplier, pulseIntensity, rotationAngle, shakeIntensity, glowIntensity, colorShift, quantumState, waveOffset]);

  // Reset function with dramatic effects
  const resetGame = useCallback(() => {
    // Dramatic reset animation
    setRotationAngle(720);
    setScaleMultiplier(0);
    createParticleExplosion(200, 200, 'sparkle', 50);
    
    setTimeout(() => {
      setStage('initial');
      setMessage('SQUEEZE ME DADDY 🍋');
      setPeelCount(0);
      setFlipCount(0);
      setSqueezeCount(0);
      setSeedCount(0);
      setJuiceDrops([]);
      setIsFlipped(false);
      setShowKnife(false);
      setShowFinishedModal(false);
      setRotationAngle(0);
      setScaleMultiplier(1);
      setColorShift(0);
      setGlowIntensity(0);
      setClickStreak(0);
      setMultiplier(1);
      setParticles([]);
    }, 500);
  }, [createParticleExplosion]);

  if (stage === 'finished') {
    return (
      <div className="isqueeze-simulator legendary-completion">
        <div className="header">
          <h1>🏆 iSqueeze: Quantum Lemon Simulator Pro Ultra Deluxe 🏆</h1>
          <p className="instruction">LEGENDARY EXTRACTION MASTER!</p>
        </div>

        <div className="completion-stats">
          <div className="stat-grid">
            <div className="stat-card epic">
              <h3>🎯 Total Score</h3>
              <div className="score-value">{totalScore.toLocaleString()}</div>
            </div>
            <div className="stat-card rare">
              <h3>⚡ Max Combo</h3>
              <div className="score-value">{clickStreak}x</div>
            </div>
            <div className="stat-card common">
              <h3>🕐 Time</h3>
              <div className="score-value">{Math.floor((Date.now() - sessionStartTime) / 1000)}s</div>
            </div>
            <div className="stat-card legendary">
              <h3>💎 Efficiency</h3>
              <div className="score-value">{(perfectActions / stats.totalClicks * 100).toFixed(1)}%</div>
            </div>
          </div>
        </div>

        <div className="achievements-showcase">
          <h2>🏅 Achievements Unlocked</h2>
          <div className="achievement-grid">
            {achievements.filter(a => a.unlocked).map(achievement => (
              <div key={achievement.id} className={`achievement-card ${achievement.rarity}`}>
                <div className="achievement-icon">🏆</div>
                <div className="achievement-name">{achievement.name}</div>
                <div className="achievement-desc">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="quantum-analysis">
          <h3>🔬 Quantum Analysis Report</h3>
          <div className="analysis-grid">
            <div>Lemon Variety: {lemonDNA.variety}</div>
            <div>Acidity Level: {lemonDNA.acidity} pH</div>
            <div>Sugar Content: {lemonDNA.sugarContent}%</div>
            <div>Quantum Uncertainty: {(quantumState.uncertainty * 100).toFixed(1)}%</div>
            <div>Weather Influence: {weather.humidity}% humidity</div>
            <div>Performance: {fps.toFixed(1)} FPS</div>
          </div>
        </div>

        <div className="finished-modal legendary">
          <p>🌟 CONGRATULATIONS! You've achieved LEGENDARY status! 🌟</p>
          <button 
            onClick={() => setShowFinishedModal(true)}
            className="try-again-btn legendary"
          >
            🚀 Ascend to Higher Dimensions?
          </button>
        </div>

        {showFinishedModal && (
          <div className="finished-modal epic">
            <p>Ready to transcend reality with another quantum lemon?</p>
            <button onClick={resetGame} className="reset-game-btn epic">
              🌌 New Dimensional Lemon
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="isqueeze-simulator quantum-enhanced">
      {/* Particle System */}
      <div ref={particleSystemRef} className="particle-system">
        {particles.map(particle => (
          <div
            key={particle.id}
            className={`particle particle-${particle.type}`}
            style={{
              left: particle.x,
              top: particle.y,
              opacity: particle.life,
              transform: `scale(${particle.size / 4})`,
              color: particle.color
            }}
          >
            {particle.type === 'sparkle' ? '✨' : 
             particle.type === 'juice' ? '💧' :
             particle.type === 'peel' ? '🟠' :
             particle.type === 'seed' ? '🌱' :
             particle.type === 'steam' ? '💨' :
             particle.type === 'bubble' ? '🫧' : '✨'}
          </div>
        ))}
      </div>

      {/* Advanced HUD */}
      <div className="advanced-hud">
        <div className="hud-section">
          <div className="combo-meter">
            <div className="combo-label">COMBO</div>
            <div className="combo-value">{clickStreak}x</div>
            <div className="combo-bar">
              <div 
                className="combo-fill" 
                style={{ width: `${Math.min(comboTimer / 2000 * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="hud-section">
          <div className="performance-monitor">
            <div>FPS: {fps.toFixed(0)}</div>
            <div>Render: {renderTime.toFixed(1)}ms</div>
            <div>Particles: {particles.length}</div>
          </div>
        </div>

        <div className="hud-section">
          <div className="weather-display">
            <div>🌡️ {weather.temperature}°F</div>
            <div>💧 {weather.humidity}%</div>
            <div>🌪️ {weather.windSpeed} mph</div>
          </div>
        </div>

        <div className="hud-section">
          <div className="quantum-display">
            <div>Quantum State: {quantumState.superposition ? 'Superposition' : 'Classical'}</div>
            <div>Uncertainty: {(quantumState.uncertainty * 100).toFixed(1)}%</div>
            <div>Entangled: {quantumState.entangled ? 'Yes' : 'No'}</div>
          </div>
        </div>
      </div>

      <div className="header epic">
        <h1>🌌 iSqueeze: Quantum Lemon Simulator Pro Ultra Deluxe Edition 🌌</h1>
        <p className="instruction legendary">SQUEEZE ME DADDY 🍋</p>
        {message && <p className="game-message epic">{message}</p>}
        
        <div className="score-display">
          <div className="score legendary">Score: {totalScore.toLocaleString()}</div>
          <div className="multiplier epic">Multiplier: {multiplier.toFixed(1)}x</div>
          <div className="experience rare">XP: {stats.experience}</div>
        </div>
      </div>

      <div className="game-content quantum-physics">
        <div className="lemon-container hyper-enhanced">
          <div 
            className={`game-lemon quantum-lemon ${stage === 'align' ? 'dimensional-flip' : ''}`}
            onClick={handleLemonClick}
            style={getLemonStyle()}
          >
            <div className="lemon-emoji cosmic">🍋</div>
            
            {/* Quantum field visualization */}
            {quantumState.superposition && (
              <div className="quantum-field">
                <div className="wave-function"></div>
                <div className="probability-cloud"></div>
              </div>
            )}
            
            {/* Water effect with advanced physics */}
            {stage === 'wash' && (
              <div className="water-effect advanced">
                <div className="water-drops molecular">💧💧💧</div>
                <div className="water-splash hydrodynamic">💦</div>
                <div className="surface-tension"></div>
                <div className="molecular-motion"></div>
              </div>
            )}
            
            {/* Towel effect with fabric simulation */}
            {stage === 'dry' && (
              <div className="towel-effect quantum">
                <div className="towel fiber-physics">🧽</div>
                <div className="dry-sparkles crystalline">✨✨✨</div>
                <div className="moisture-evaporation"></div>
                <div className="thermal-dynamics"></div>
              </div>
            )}
            
            {/* Peel segments with cellular breakdown */}
            {stage === 'peel' && (
              <div className="peel-segments cellular">
                {[1, 2, 3].map(i => (
                  <div 
                    key={i} 
                    className={`peel-segment segment-${i} ${peelCount >= i ? 'enzymatic-breakdown' : 'cellular-intact'}`}
                  >
                    🟠
                  </div>
                ))}
                <div className="citrus-oils"></div>
                <div className="cellular-matrix"></div>
              </div>
            )}
            
            {/* Seeds with botanical accuracy */}
            {stage === 'remove-seeds' && (
              <div className="seeds-effect botanical">
                {[1, 2, 3].map(i => (
                  <div 
                    key={i} 
                    className={`seed genetic-seed seed-${i} ${seedCount >= i ? 'extracted' : 'embedded'}`}
                  >
                    🌱
                  </div>
                ))}
                <div className="genetic-material"></div>
                <div className="embryonic-potential"></div>
              </div>
            )}
            
            {/* Alignment guides with quantum mechanics */}
            {stage === 'align' && (
              <div className="flip-indicator quantum-alignment">
                <div className="dimensional-arrows">
                  <div className="arrow-left spacetime">⬅️</div>
                  <div className="arrow-right temporal">➡️</div>
                </div>
                <div className="flip-text dimensional">Click to Flip Reality</div>
                <div className="quantum-progress">
                  <div className="flip-dots probability">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`dot quantum-dot ${flipCount >= i ? 'collapsed' : 'superposition'}`}></div>
                    ))}
                  </div>
                </div>
                <div className="spacetime-curvature"></div>
              </div>
            )}
            
            {/* Prep squeeze with energy field */}
            {stage === 'prep-squeeze' && (
              <div className="prep-glow energy-matrix">
                <div className="energy-rings tesla-coils">
                  <div className="ring electromagnetic ring-1"></div>
                  <div className="ring electromagnetic ring-2"></div>
                  <div className="ring electromagnetic ring-3"></div>
                  <div className="ring electromagnetic ring-4"></div>
                  <div className="ring electromagnetic ring-5"></div>
                </div>
                <div className="ready-indicator fusion-core">⚡</div>
                <div className="power-levels"></div>
                <div className="containment-field"></div>
              </div>
            )}
            
            {/* Squeeze with pressure dynamics */}
            {stage === 'squeeze' && (
              <div className="squeeze-indicators pressure-chamber">
                <div className="pressure-meter hydraulic">
                  <div className="meter-fill plasma" style={{width: `${(squeezeCount / 3) * 100}%`}}></div>
                  <div className="pressure-gauge"></div>
                  <div className="safety-limits"></div>
                </div>
                <div className="squeeze-hands cybernetic">🤏</div>
                <div className="force-vectors"></div>
                <div className="compression-waves"></div>
              </div>
            )}
          </div>

          {/* Knife with molecular precision */}
          {showKnife && (
            <div className="knife-overlay quantum-blade">
              <div className="blade-core">🔪</div>
              <div className="molecular-edge"></div>
              <div className="cutting-field"></div>
            </div>
          )}
        </div>

        {/* Glass with advanced materials science */}
        <div className="cup-container nanotechnology">
          <div className="game-cup crystalline-matrix">
            <div 
              className="juice-level quantum-fluid" 
              style={{
                height: `${Math.min(juiceDrops.length * 25, 80)}%`,
                opacity: juiceDrops.length > 0 ? 1 : 0
              }}
            ></div>
            <div className="glass-shine photonic"></div>
            <div className="secondary-shine holographic"></div>
            <div className="molecular-structure"></div>
            <div className="surface-tension-meniscus"></div>
          </div>
          
          {/* Juice drops with fluid dynamics */}
          {juiceDrops.map((drop, index) => (
            <div
              key={drop}
              className="juice-drop-animation newtonian-fluid"
              style={{
                animationDelay: `${index * 0.5}s`,
                left: `${45 + (index % 3) * 5}%`
              }}
            >
              💧
            </div>
          ))}
          
          <div className="fluid-dynamics-visualization"></div>
        </div>

        {/* Control panel with way too many options */}
        <div className="game-controls mission-control">
          <button onClick={resetGame} className="reset-game-btn legendary">
            🌌 Reset Quantum State
          </button>
          
          <div className="advanced-controls">
            <button className="control-btn" onClick={() => setQuantumState(prev => ({...prev, superposition: !prev.superposition}))}>
              🔬 Toggle Superposition
            </button>
            <button className="control-btn" onClick={() => setPhysics(prev => ({...prev, gravity: prev.gravity * -1}))}>
              🌍 Reverse Gravity
            </button>
            <button className="control-btn" onClick={() => setAmbientEffects(prev => ({...prev, lightingMode: 'neon'}))}>
              💡 Neon Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 