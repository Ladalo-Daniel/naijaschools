'use client'

import { ReactNode, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue
} from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Section({ name, children }: { name: string, children: ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section>
      <div ref={ref}>
        <img src={`/${3}.jpg`} alt="A London skyscraper" />
      </div>
      <motion.h2 style={{ y }}>{`#00${3}`}</motion.h2>
    </section>
  );
}

export default function ScrollG({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {["section1", "section2", "section3", "section4"].map((image) => (
        <Section name={image} key={image}>
            { children }
        </Section>
      ))}
      <motion.div className="" style={{ scaleX }} />
    </>
  );
}
