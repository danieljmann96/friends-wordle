import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useLocalScoreBreakdown } from '../hooks';
import { scoreBreakdownKeys } from '../constants';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

export default function ScoreBreakdownGraph(): JSX.Element {
  const [scoreBreakdown] = useLocalScoreBreakdown();

  return (
    <Bar
      data={{
        labels: [...Array(scoreBreakdownKeys.length).keys()].map(
          i => `${i + 1} guesses`
        ),
        datasets: [
          {
            data: [...scoreBreakdown].map(x => x[1]),
            backgroundColor: 'yellow'
          }
        ]
      }}
      options={{
        indexAxis: 'y' as const,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Guess breakdown',
            color: 'yellow',
            font: { size: 15 }
          }
        },
        scales: {
          x: {
            ticks: { precision: 0, color: 'yellow' },
            title: { color: 'yellow' }
          },
          y: { ticks: { color: 'yellow' } }
        }
      }}
    />
  );
}
