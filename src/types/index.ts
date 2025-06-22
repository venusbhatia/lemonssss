export interface Lemon {
  id: string;
  size: 'small' | 'medium' | 'large';
  juiceAmount: number;
  maxJuice: number;
  squeezed: boolean;
}

export interface JuiceCollection {
  totalAmount: number;
  quality: 'poor' | 'good' | 'excellent';
  lemonsUsed: number;
}

export interface SqueezerState {
  lemons: Lemon[];
  juiceCollection: JuiceCollection;
  isSqueezing: boolean;
  squeezeCount: number;
}

export interface SqueezerActions {
  addLemon: (size: Lemon['size']) => void;
  squeezeLemon: (lemonId: string) => void;
  resetSqueezer: () => void;
  removeLemon: (lemonId: string) => void;
} 