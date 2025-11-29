"use client";
import { useTranslations } from "next-intl";
import { motion, Transition, Variants, useTransform, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    } as Transition,
  },
};

const commonFloatVariants = {
  float: {
    y: [0, 15, 0],
    rotate: [0, 5, -5, 0],
  }
};

const floatingTransition: Transition = {
  duration: 6,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "loop",
};

const floatingTransitionDelayed: Transition = {
  duration: 5,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "loop",
  delay: 1.5,
};

const slowFloatTransition: Transition = {
  duration: 8,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "loop",
};

export default function Hero() {
  // ---useScroll-----
  const { scrollY } = useScroll();
  const t = useTranslations("hero");

  // --variables-----
  const isLarge = useMediaQuery("(min-width: 1024px)");
  const dynamicMargin = useTransform(
    scrollY,
    isLarge ? [0, 700] : [0, 500],
    isLarge ? [30, 250] : [10, 140]
  );

  // functions---
  function useMediaQuery(query: string) {
    const [Ismatches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      setMatches(media.matches);

      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);

      return () => media.removeEventListener("change", listener);
    }, [query]);

    return Ismatches;
  }

  return (
    <motion.div
      className="relative
             overflow-hidden
            bg-gradient-elegant 
            flex items-center justify-center
            h-screen
            "
      style={{ marginBottom: dynamicMargin }}
    >
      {/* Circle 1 */}
      <motion.svg
        height="100"
        width="200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-10 left-40 opacity-10"
        variants={commonFloatVariants}
        animate="float"
        transition={floatingTransition}
      >
        <circle r="45" cx="50" cy="50" fill="white" />
      </motion.svg>

      {/* Circle 2 */}
      <motion.svg
        height="100"
        width="200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 right-130 opacity-10"
        variants={commonFloatVariants}
        animate="float"
        transition={floatingTransitionDelayed}
      >
        <circle r="25" cx="50" cy="50" fill="white" />
      </motion.svg>

      {/* Circle 3 */}
      <motion.svg
        height="100"
        width="200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-30 right-80 opacity-10"
        animate={{ y: [0, 12, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: 0.5 } as Transition}
      >
        <circle r="30" cx="50" cy="50" fill="white" />
      </motion.svg>

      {/* Circle 4 */}
      <motion.svg
        height="100"
        width="200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-70 right-40 opacity-5"
        variants={commonFloatVariants}
        animate="float"
        transition={slowFloatTransition}
      >
        <circle r="50" cx="50" cy="50" fill="white" />
      </motion.svg>

      {/* Square 1 */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[50%] left-[20%] opacity-10"
        variants={commonFloatVariants}
        animate="float"
        transition={floatingTransitionDelayed}
      >
        <rect width="100" height="100" x="10" y="10" rx="20" ry="20" fill="white" />
      </motion.svg>

      {/* Rectangle 2 */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[50%] right-0 opacity-5"
        animate={{ y: [0, 18, 0], rotate: [0, 50, -50, 0] }}
        transition={slowFloatTransition}
      >
        <rect width="150" height="150" x="10" y="10" rx="30" ry="30" fill="white" />
      </motion.svg>
      {/* Fixed Grid */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
        stroke="rgba(255,255,255)" strokeWidth="0.1"
      >
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path
              d="M10 0 L0 0 0 10"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.7"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Hero Content */}
      <motion.div className="
          header-content
          flex flex-col items-center justify-center
          gap-[16]
          text-white
          py-13
          max-[430px]:py-10
          max-[1030px]:py-32
          "
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.header variants={itemVariants} className="mini-header">
          <h3 className="text-white/80 text-[17.6px] tracking-widest uppercase font-medium">
            {t('title')}
          </h3>
        </motion.header>
        <motion.header variants={itemVariants}>
          <h1 className="
                  relative z-10
                    text-6xl
               max-[676px]:text-4xl
               min-[1300]:text-[80px]
                     font-bold text-center 
                     min-[1245]:w-[50%]
                     min-[1245]:p-0
                    leading-[1.1]
                    pb-[8]
                    mx-auto
                   ">
            {t('subtitle')}
          </h1>
        </motion.header>
        <motion.header variants={itemVariants} className="
            header-subtitle
            text-center leading-7
            w-[85%]
            px-[48px] 
            text-[21px]
            min-[1030px]:w-[50%]
            ">
          <p>
            {t('description')}
          </p>
        </motion.header>

        <motion.header variants={itemVariants} className="btn py-4">
          <button className="
                bg-white/20
                rounded-full
                border-2 border-white/30
                px-[48px] py-[19.2px]
                font-medium
                transition transform duration-300 
                hover:shadow-[0px_30px_50px_-12px_rgba(0,0,0,0.3)]   
                hover:bg-white/25
                overflow-visible
                ">
            <a href="#work">
              {t('cta')}
            </a>
          </button>
        </motion.header>
        <motion.header variants={itemVariants} className="scroll-indicator-container">
          <motion.header variants={itemVariants} className="
              w-7 h-12 
              rounded-full border-2 border-white/40
               flex justify-center
                pt-2
                ">
            {/* moving dot */}
            <motion.div
              className=" moving-dot
                  w-1.5 h-1.5
                   bg-white
                    rounded-full"
              animate={{ y: [0, 18], opacity: [0.1, 1, 0.6, 0.3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.header>
        </motion.header>

      </motion.div>
    </motion.div>
  );
}