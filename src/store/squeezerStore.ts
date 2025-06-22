import { create } from 'zustand';
import { SqueezerState, SqueezerActions, Lemon } from '../types';

const generateLemonId = () => Math.random().toString(36).substr(2, 9);

const getMaxJuice = (size: Lemon['size']): number => {
  switch (size) {
    case 'small': return 30;
    case 'medium': return 50;
    case 'large': return 80;
    default: return 50;
  }
};

const getJuiceQuality = (efficiency: number): 'poor' | 'good' | 'excellent' => {
  if (efficiency >= 0.8) return 'excellent';
  if (efficiency >= 0.6) return 'good';
  return 'poor';
};

export const useSqueezerStore = create<SqueezerState & SqueezerActions>((set, get) => ({
  lemons: [],
  juiceCollection: {
    totalAmount: 0,
    quality: 'good',
    lemonsUsed: 0,
  },
  isSqueezing: false,
  squeezeCount: 0,

  addLemon: (size) => {
    const newLemon: Lemon = {
      id: generateLemonId(),
      size,
      juiceAmount: 0,
      maxJuice: getMaxJuice(size),
      squeezed: false,
    };

    set((state) => ({
      lemons: [...state.lemons, newLemon],
    }));
  },

  squeezeLemon: (lemonId) => {
    const state = get();
    const lemon = state.lemons.find(l => l.id === lemonId);
    
    if (!lemon || lemon.squeezed) return;

    set({ isSqueezing: true });

    setTimeout(() => {
      set((currentState) => {
        const updatedLemons = currentState.lemons.map(l => {
          if (l.id === lemonId) {
            const juiceExtracted = Math.random() * (l.maxJuice * 0.4) + (l.maxJuice * 0.6);
            return {
              ...l,
              juiceAmount: juiceExtracted,
              squeezed: true,
            };
          }
          return l;
        });

        const squeezedLemon = updatedLemons.find(l => l.id === lemonId);
        const newTotalAmount = currentState.juiceCollection.totalAmount + (squeezedLemon?.juiceAmount || 0);
        const newLemonsUsed = currentState.juiceCollection.lemonsUsed + 1;
        
        const totalPossibleJuice = updatedLemons
          .filter(l => l.squeezed)
          .reduce((sum, l) => sum + l.maxJuice, 0);
        
        const efficiency = totalPossibleJuice > 0 ? newTotalAmount / totalPossibleJuice : 0;

        return {
          lemons: updatedLemons,
          juiceCollection: {
            totalAmount: newTotalAmount,
            quality: getJuiceQuality(efficiency),
            lemonsUsed: newLemonsUsed,
          },
          isSqueezing: false,
          squeezeCount: currentState.squeezeCount + 1,
        };
      });
    }, 500);
  },

  removeLemon: (lemonId) => {
    set((state) => ({
      lemons: state.lemons.filter(l => l.id !== lemonId),
    }));
  },

  resetSqueezer: () => {
    set({
      lemons: [],
      juiceCollection: {
        totalAmount: 0,
        quality: 'good',
        lemonsUsed: 0,
      },
      isSqueezing: false,
      squeezeCount: 0,
    });
  },
})); 