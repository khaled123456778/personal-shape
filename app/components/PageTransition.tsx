'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const dir = searchParams.get('dir');

  // تحديد اتجاه الحركة بناءً على الباراميتر
  // إذا كان next: ندخل من اليمين (x: 100)
  // إذا كان prev: ندخل من اليسار (x: -100)
  // الافتراضي: من الأسفل (y: 20)
let xInitial, yInitial;

if (dir === 'next') {
  xInitial = 100;
} else if (dir === 'prev') {
  xInitial = -100;
} else {
  xInitial = 0;
}

const xExit = -xInitial;  

const variants = {
  hidden: { opacity: 0, x: xInitial, y: yInitial },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: xExit },
};
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
