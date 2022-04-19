import {
  ScoreKeys,
  AllScores,
  ScoreBreakdown,
  ScoreBreakdownKeys
} from 'types';
import { scoreKeys, scoreBreakdownKeys } from '../constants';

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

export function useLocalScoreBreakdown(): [
  ScoreBreakdown,
  (scoreToUpdate: ScoreBreakdownKeys) => void
] {
  const output: ScoreBreakdown = new Map<ScoreBreakdownKeys, `${number}`>(
    scoreBreakdownKeys.map(key => [key, '0'])
  );
  function addToScore(scoreToUpdate: ScoreBreakdownKeys) {
    localStorage.setItem(
      `BreakdownScore${scoreToUpdate}`,
      String(Number(localStorage[`BreakdownScore${scoreToUpdate}`]) + 1)
    );
  }
  scoreBreakdownKeys.forEach(key => {
    if (localStorage.getItem(`BreakdownScore${key}`) === null) {
      localStorage.setItem(`BreakdownScore${key}`, '0');
    }
    output.set(key, localStorage[`BreakdownScore${key}`]);
  });
  return [output, addToScore];
}
