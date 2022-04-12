import { ScoreKeys } from 'types';

export function useLocalScore(
  scoreKey: ScoreKeys
): [string, (newScore: string) => void] {
  function updateScore(newScore: string) {
    localStorage.setItem(scoreKey, newScore);
  }
  if (localStorage.getItem(scoreKey) === null) {
    localStorage.setItem(scoreKey, '0');
  }
  return [localStorage[scoreKey], updateScore];
}
