import { scoreKeys, scoreBreakdownKeys } from '../constants';

export interface ContextProviderProps {
  children: React.ReactNode;
}

export interface Letter {
  display: string;
  status: LetterStatus;
}

export type LetterStatus = 'unused' | 'wrongPlace' | 'rightPlace';

export type ScoreKeys = typeof scoreKeys[number];

export type AllScores = Map<ScoreKeys, string>;

export type ScoreBreakdownKeys = typeof scoreBreakdownKeys[number];

export type ScoreBreakdown = Map<ScoreBreakdownKeys, `${number}`>;
