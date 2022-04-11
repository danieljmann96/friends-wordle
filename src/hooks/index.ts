import { ScoreKeys } from 'types';

export function useLocalScore(scoreKey: ScoreKeys) {
  function updateScore(newScore: string) {
    localStorage.setItem(scoreKey, newScore);
  }
  if (localStorage.getItem(scoreKey) === null) {
    localStorage.setItem(scoreKey, '0');
  }
  return [localStorage.getItem(scoreKey), updateScore];
}
