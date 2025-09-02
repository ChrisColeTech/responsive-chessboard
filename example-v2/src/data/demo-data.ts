// Demo page data - separated from components for better architecture
import { Crown, GamepadIcon, Target, LucideIcon } from 'lucide-react';

export interface DemoItem {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  requiresAuth: boolean;
}

export const demoItems: DemoItem[] = [
  {
    id: 'free-play',
    title: 'Free Play Demo',
    description: 'Explore the responsive chessboard with local chess functionality. No authentication required.',
    path: '/free-play',
    icon: Crown,
    requiresAuth: false,
  },
  {
    id: 'connected',
    title: 'Connected Games',
    description: 'Play against AI opponents with backend integration and game persistence.',
    path: '/connected',
    icon: GamepadIcon,
    requiresAuth: true,
  },
  {
    id: 'puzzles',
    title: 'Chess Puzzles',
    description: 'Solve tactical puzzles with solution validation and progress tracking.',
    path: '/puzzles',
    icon: Target,
    requiresAuth: true,
  },
];