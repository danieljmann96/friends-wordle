export interface ContextProviderProps {
  children: React.ReactNode;
}

export interface Letter {
  display: string;
  status: LetterStatus;
}

export type LetterStatus = 'unused' | 'wrongPlace' | 'rightPlace';

export type ScoreKeys =
  | 'currentStreak'
  | 'highestStreak'
  | 'winPercentage'
  | 'totalPlayed';
