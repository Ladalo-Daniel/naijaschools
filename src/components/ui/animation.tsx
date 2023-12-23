"use client"
import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion';

interface Prop {
    children: JSX.Element;
    width?: "fit-content" | "100%";
    hiddenY: number,
    visibleY: number
}
interface Props {
    children: JSX.Element;
    width?: "fit-content" | "100%";
}

export function Slide({ children, width = "fit-content",visibleY: vy, hiddenY: hy }: Prop) {
    const ref = useRef(null);
    const isInview = useInView(ref,  { once: true});

    const mainControls = useAnimation();

    useEffect(()=>{
        if(isInview){
            //Fire the animation
            mainControls.start("visible");
        }
    }, [isInview]);
  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden"}}>
        <motion.div
           variants={{
            hidden: { opacity: 0, y: hy},
            visible: { opacity: 1, y: vy},
           }}
           initial="hidden"
           animate={mainControls}
           transition={{ duration: 0.9, delay: 0}}
        >
            { children }
        </motion.div>
    </div>
  )
}

export function SlideUp({ children, width = "fit-content" }: Props) {
    const ref = useRef(null);
    const isInview = useInView(ref,  { once: true});

    const mainControls = useAnimation();

    useEffect(()=>{
        if(isInview){
            //Fire the animation
            mainControls.start("visible");
        }
    }, [isInview]);
  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden"}}>
        <motion.div
           variants={{
            hidden: { opacity: 0, y: 75},
            visible: { opacity: 1, y: 0},
           }}
           initial="hidden"
           animate={mainControls}
           transition={{ duration: 0.9, delay:0}}
        >
            { children }
        </motion.div>
    </div>
  )
}




export function SlideDown({ children, width = "fit-content" }: Props) {
    const ref = useRef(null);
    const isInview = useInView(ref, { once: true });

    const mainControls = useAnimation();

    useEffect(()=>{
        if(isInview){
            //Fire the animation
            mainControls.start("visible");
        }
    }, [isInview]);
  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden"}}>
        <motion.div
           variants={{
            hidden: { opacity: 0, y: -75},
            visible: { opacity: 1, y: -0},
           }}
           initial="hidden"
           animate={mainControls}
           transition={{ duration: 0.9, delay:0.2}}
        >
            { children }
        </motion.div>
    </div>
  )
}




export function SlideLeft({ children, width = "fit-content" }: Props) {
    const ref = useRef(null);
    const isInview = useInView(ref, { once: true });

    const mainControls = useAnimation();

    useEffect(()=>{
        if(isInview){
            //Fire the animation
            mainControls.start("visible");
        }
    }, [isInview]);
  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden"}}>
        <motion.div
           variants={{
            hidden: { opacity: 0, x: -75},
            visible: { opacity: 1, x: -0},
           }}
           initial="hidden"
           animate={mainControls}
           transition={{ duration: 0.9, delay:0.2}}
        >
            { children }
        </motion.div>
    </div>
  )
}




export function SlideRight({ children, width = "fit-content" }: Props) {
    const ref = useRef(null);
    const isInview = useInView(ref, { once: true });

    const mainControls = useAnimation();

    useEffect(()=>{
        if(isInview){
            //Fire the animation
            mainControls.start("visible");
        }
    }, [isInview]);
  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden"}}>
        <motion.div
           variants={{
            hidden: { opacity: 0, x: 75},
            visible: { opacity: 1, x: 0},
           }}
           initial="hidden"
           animate={mainControls}
           transition={{ duration: 0.9, delay:0.2}}
        >
            { children }
        </motion.div>
    </div>
  )
}
