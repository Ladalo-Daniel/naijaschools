'use client'

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ data, labels }: { data: number[], labels: string[]}) {
  return (
    <div className='h-[500px] max-w-[1400px] flex-1'>
        <Doughnut 
            data={{
                labels: labels,
                datasets: [
                  {
                    label: 'Metrics',
                    data: data,
                    backgroundColor: [
                      'rgba(246, 73, 20, 0.97)',
                      'rgb(54, 145, 235)',
                      'rgb(12, 240, 35)'
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1,
                  },
                ],
              }} 
        />
    </div>
  )
}
