import React from 'react';
import { useSqueezerStore } from '../store/squeezerStore';
import { LemonCard } from '../components/LemonCard';
import { JuiceDisplay } from '../components/JuiceDisplay';
import { ControlPanel } from '../components/ControlPanel';

export const SqueezerPage: React.FC = () => {
  const {
    lemons,
    juiceCollection,
    isSqueezing,
    squeezeCount,
    addLemon,
    squeezeLemon,
    removeLemon,
    resetSqueezer,
  } = useSqueezerStore();

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🍋 Lemon Squeezer Pro 🍋
        </h1>
        <p className="text-lg text-gray-600">
          The ultimate digital lemon squeezing experience! Add lemons, squeeze them for fresh juice, and track your progress.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg-grid-cols-3">
        {/* Control Panel */}
        <div>
          <ControlPanel
            onAddLemon={addLemon}
            onReset={resetSqueezer}
            squeezeCount={squeezeCount}
            lemonsCount={lemons.length}
          />
        </div>

        {/* Juice Display */}
        <div>
          <JuiceDisplay juiceCollection={juiceCollection} />
        </div>

        {/* Instructions/Tips */}
        <div>
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">How to Use 📝</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-3">
                <span className="text-lemon-600 font-bold">1.</span>
                <span>Choose your lemon size and click to add it to your collection</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-lemon-600 font-bold">2.</span>
                <span>Click "Squeeze!" on any lemon to extract its juice</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-lemon-600 font-bold">3.</span>
                <span>Watch your juice collection grow and quality improve</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-lemon-600 font-bold">4.</span>
                <span>Use the reset button to start fresh anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lemons Grid */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Your Lemon Collection ({lemons.length})
        </h2>
        
        {lemons.length === 0 ? (
          <div className="text-center py-12">
            <div style={{ fontSize: '4rem' }} className="mb-4">🍋</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No lemons yet!</h3>
            <p className="text-gray-500">Add some fresh lemons to get started with your squeezing adventure.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm-grid-cols-2 md-grid-cols-3 lg-grid-cols-4 xl-grid-cols-5">
            {lemons.map((lemon) => (
              <LemonCard
                key={lemon.id}
                lemon={lemon}
                onSqueeze={squeezeLemon}
                onRemove={removeLemon}
                isSqueezing={isSqueezing}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500">
        <p>Made with 💛 for all lemon lovers!</p>
      </footer>
    </div>
  );
}; 