# 🍋 Lemon Squeezer Pro

A delightful and interactive web application for digital lemon squeezing! Built with modern React technologies for an engaging user experience.

## ✨ Features

- **Interactive Lemon Squeezing**: Add lemons of different sizes and squeeze them for juice
- **Real-time Juice Collection**: Watch your juice collection grow with beautiful animations
- **Quality Tracking**: Monitor juice quality based on extraction efficiency
- **Responsive Design**: Fully responsive layout that works on all devices
- **Beautiful UI**: Modern design with custom animations and gradients
- **State Management**: Powered by Zustand for efficient state handling

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Zustand
- **Styling**: TailwindCSS with custom themes
- **Build Tool**: Create React App
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── LemonCard.tsx   # Individual lemon display and interaction
│   ├── JuiceDisplay.tsx # Juice collection visualization
│   └── ControlPanel.tsx # Main control interface
├── pages/              # Application pages
│   └── SqueezerPage.tsx # Main squeezer interface
├── store/              # State management
│   └── squeezerStore.ts # Zustand store for app state
├── types/              # TypeScript type definitions
│   └── index.ts        # Common interfaces and types
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts # Local storage persistence hook
├── utils/              # Helper functions
│   └── helpers.ts      # Utility functions
└── App.tsx             # Main application component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 🎮 How to Use

1. **Add Lemons**: Choose from small, medium, or large lemons using the control panel
2. **Squeeze Away**: Click the "Squeeze!" button on any lemon to extract juice
3. **Track Progress**: Monitor your juice collection and quality in real-time
4. **Reset Anytime**: Use the reset button to start fresh

## 🎨 Design Features

- **Custom Color Palette**: Lemon yellows and juice blues
- **Smooth Animations**: CSS animations for squeezing and dripping effects
- **Gradient Backgrounds**: Beautiful gradient overlays
- **Interactive Elements**: Hover effects and button states
- **Responsive Grid**: Adaptive layout for different screen sizes

## 🧩 Component Architecture

### LemonCard
- Displays individual lemons with size-based styling
- Handles squeeze interactions with animations
- Shows juice extraction progress bars

### JuiceDisplay
- Animated juice container with level indicators
- Quality badges with color coding
- Real-time stats display

### ControlPanel
- Lemon size selection interface
- Statistics overview
- Reset functionality
- Educational tips and facts

## 📱 Responsive Design

The app is fully responsive and optimized for:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (up to 767px)

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🎯 Future Enhancements

- [ ] Local storage persistence for juice collection
- [ ] Sound effects for squeezing actions
- [ ] Achievement system and badges
- [ ] Leaderboard functionality
- [ ] Recipe suggestions based on juice amount
- [ ] Seasonal lemon varieties
- [ ] Social sharing features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Emoji graphics from Unicode Standard
- Color palette inspired by real lemons and fresh juice
- Built with love for citrus enthusiasts everywhere! 🍋💛

---

Made with 💛 by the Lemon Squad
