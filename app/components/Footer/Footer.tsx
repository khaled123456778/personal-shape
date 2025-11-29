"use client"

import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import { useTranslations } from 'next-intl';


export default function Footer() {
  const t = useTranslations("footer");

  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [flashLink, setFlashLink] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);


  const footerLinks = [
    { id: "privacy", name: t('privacy'), href: "#" },
    { id: "terms", name: t('terms'), href: "#" },
    { id: "sitemap", name: t('sitemap'), href: "#" },
    { id: "template", name: t('providedBy'), href: "#" },

  ];

  // functions
  const handleLinkClick = (id: string) => {
    setActiveLink(id);       // يحدد اللينك النشط
    setFlashLink(id);        // يشغّل الفلاش على نفس اللينك

    setTimeout(() => {
      setFlashLink(null);    // يطفّي الفلاش بعد 150ms
    }, 150);
  };

  return (
    <div className="
  
    ">
      <footer className="footer-bg 
    px-[60] py-[50]
    min-[2560px]:px-130
    text-white/70
    flex flex-col
     items-center
    justify-center
    gap-6
    min-[820px]:flex-row
    min-[820px]:justify-between
    w-full
    
    ">

        {/* Copyright */}
        <div className="all-rights  
        flex flex-col items-center
        min-[820px]:flex-row
        text-nowrap text-[14.4px]

        ">
          <p>{t('copyright')}</p>
        </div>

        {/* Links */}
        <div className="footer-links  
  flex flex-col items-center
  min-[540px]:flex-row
  gap-4
  text-[13.6px]
">
          {footerLinks.map((link) => (
            <div key={link.id} className="relative inline-block pb-0.5">

              {/* Anchor */}
              <a
                onClick={() => handleLinkClick(link.id)}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`
       inline-block font-normal pb-[2.5] relative cursor-pointer
        transition-transform
        ${flashLink === link.id ? "bg-blue-400/40" : ""}
        ${hoveredLink === link.id ? "transition-transform duration-150 -translate-y-[1.5px]" : "transform-none -translate-y-[1px]"}
        hover:text-white
      `}
              >
                {link.name}
              </a>


              {/* Underline Animation */}
              <AnimatePresence>
                {(activeLink === link.id || hoveredLink === link.id) && (
                  <motion.div
                    className="absolute left-0 bottom-0 h-[0.5px] w-full bg-[var(--primary-color)] "
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0, originX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>


            </div>
          ))}
          <LanguageToggle />

        </div>

      </footer>
    </div>
  );
}
