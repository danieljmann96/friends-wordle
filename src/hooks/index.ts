import { ScoreKeys, AllScores } from 'types';
import { scoreKeys } from '../constants';

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

export function useAllLocalScoreValues(): AllScores {
  const output: AllScores = new Map<ScoreKeys, string>(
    scoreKeys.map(key => [key, '0'])
  );
  scoreKeys.forEach(key => {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, '0');
    }
    output.set(key, localStorage[key]);
  });
  return output;
}
