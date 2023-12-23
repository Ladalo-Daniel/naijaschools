"use client"

import { Button } from '@nextui-org/button';
import React, { useEffect, useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { buttonVariants } from '../ui/button';

export default function ButtonGroup() {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState({
    students: 0,
    schools: 0,
    resources: 0,
  });

  const stats = [
    {
      data: count.students,
      title: 'Students',
    },
    {
      data: count.schools,
      title: 'Schools',
    },
    {
      data: count.resources,
      title: 'Resources',
    },
  ];

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCount((prevCount) => ({
          students: Math.min(95, prevCount.students + 5),
          schools: Math.min(13, prevCount.schools + 1),
          resources: Math.min(11, prevCount.resources + 1),
        }));
      }, 200);

      // Clear the interval when the component unmounts or when the counting is done
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <div className='flex flex-col gap-9'>
      <div className='flex items-center gap-3 md:gap-9'>
        <Button variant='faded' className={buttonVariants({ variant: 'link' })} color='primary'>
          Contact us
        </Button>
        <Button variant='faded' className='' color='danger'>
          Start Learning
        </Button>
      </div>
      <div className=''>
        <ul className='flex flex-row gap-2 items-center justify-start md:flex-row flex-wrap md:flex-nowrap'>
          {stats.map((item, idx) => (
            <VisibilitySensor key={idx} partialVisibility onChange={(isVisible: boolean ) => setIsVisible(isVisible)}>
              <li className="w-[45%] md:w-1/2 text-center bg-slate-700 px-7 md:px-12 py-1  md:py-2 rounded-lg sm:w-auto">
                <h4 className="text-lg md:text-2xl text-white font-semibold">{item.data}k+</h4>
                <p className="mt-1 md:mt-2 text-gray-400 font-medium">{item.title}</p>
              </li>
            </VisibilitySensor>
          ))}
        </ul>
      </div>
    </div>
  );
}
