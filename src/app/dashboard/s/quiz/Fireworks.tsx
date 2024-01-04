import React, { Ref, useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}

function getAnimationSettings(originXA: number, originXB: number) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2
    }
  };
}

export default function Fireworks() {
  const refAnimationInstance = useRef<Ref<HTMLDivElement>>(null);
  const [intervalId, setIntervalId] = useState<number | null>();

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
        // @ts-ignore
        refAnimationInstance?.current(getAnimationSettings(0.1, 0.3));
        // @ts-ignore
      refAnimationInstance?.current(getAnimationSettings(0.7, 0.9));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
        // @ts-ignore
      setIntervalId(setInterval(nextTickAnimation, 400));
    }
  }, [intervalId, nextTickAnimation]);

  const pauseAnimation = useCallback(() => {
    // @ts-ignore
    clearInterval(intervalId);
    setIntervalId(null);
  }, [intervalId]);

  const stopAnimation = useCallback(() => {
    // @ts-ignore
    clearInterval(intervalId);
    setIntervalId(null);
    // @ts-ignore
    refAnimationInstance.current && refAnimationInstance.current.reset();
  }, [intervalId]);

  useEffect(() => {
    return () => {
        // @ts-ignore
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <>
      <div>
        <button onClick={startAnimation}>Start</button>
        <button onClick={pauseAnimation}>Pause</button>
        <button onClick={stopAnimation}>Stop</button>
      </div>
      <ReactCanvasConfetti refConfetti={getInstance} 
      // @ts-ignore
      style={canvasStyles}
       />
    </>
  );
}
