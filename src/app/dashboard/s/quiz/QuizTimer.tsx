import React, { useEffect, useState } from 'react';
import { TimerIcon } from 'lucide-react';
import { Progress } from '@nextui-org/progress';

interface QuizTimerProps {
  totalQuestions: number;
  showResults: (duration?: string) => void;
  timer: number,
  setTimer: React.Dispatch<React.SetStateAction<number>>,
  totalTimeInSeconds: number,
  elapsedSeconds: number,
  hasFinished?: boolean
}

const QuizTimer: React.FC<QuizTimerProps> = ({ totalQuestions, showResults, elapsedSeconds, totalTimeInSeconds, setTimer, timer, hasFinished }) => {
    const percentageTimeConsumed = (elapsedSeconds / totalTimeInSeconds) * 100;

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (hasFinished) {
            clearInterval(countdown)
            showResults(elapsedSeconds.toString());
            return 0
        }
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(countdown);
          showResults(elapsedSeconds.toString());
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [showResults, totalQuestions]);

  const minutes: number = Math.floor(timer / 60);
  const seconds: number = timer % 60;

  return (
    <div className='flex flex-col gap-3 md:flex-row md:items-center justify-between p-4 border shadow rounded-md my-3 w-full'>
      <Progress 
        isStriped
        color='primary'
        value={percentageTimeConsumed}
        className="max-w-md"
        aria-label='counting...'
      />
      <p className='flex items-center gap-2 py-2'><TimerIcon size={15} /> {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
    </div>
  );
};

export default QuizTimer;
