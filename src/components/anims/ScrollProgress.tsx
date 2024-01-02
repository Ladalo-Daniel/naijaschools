'use client'

import { motion, useScroll } from "framer-motion"
import { ReactNode } from "react";

export default function ScrollProgress({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div style={{ scaleX: scrollYProgress }}>
        { children }
    </motion.div> 
  )
}