// Helper functions for the Lemon Squeezer app

export const formatJuiceAmount = (amount: number): string => {
  return `${amount.toFixed(1)}ml`;
};

export const generateLemonEmoji = (size: 'small' | 'medium' | 'large'): string => {
  switch (size) {
    case 'small': return '🍋';
    case 'medium': return '🟨';  
    case 'large': return '🟡';
    default: return '🍋';
  }
};

export const calculateEfficiency = (extracted: number, maximum: number): number => {
  return maximum > 0 ? (extracted / maximum) * 100 : 0;
};

export const getRandomJuiceMotivation = (): string => {
  const motivations = [
    "Keep squeezing! 🍋",
    "Fresh juice coming up! 🥤",
    "You're doing great! 💪",
    "Almost there! 🎯",
    "Lemon power! ⚡",
    "Squeeze away! 🤏",
    "Juice master! 👑",
    "Vitamin C boost! 🌟"
  ];
  
  return motivations[Math.floor(Math.random() * motivations.length)];
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}; 