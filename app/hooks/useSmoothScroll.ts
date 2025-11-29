// hooks/useSmoothScroll.ts
'use client';
import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToSection = useCallback((href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 70 ; // غير الرقم حسب ارتفاع ال header
    const elementPosition = element.offsetTop - offset;

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }, []);

  return scrollToSection;
};