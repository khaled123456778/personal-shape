
"use client"
import React, { useEffect, useState } from 'react'
import { AnimatePresence, color, motion } from "framer-motion";
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { useTranslations } from 'next-intl';



export default function Navbar() {
  // -----states------
  const [isOpen, setIsOpen] = useState(false);
  const [flash, setFlash] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // variables
  const scrollToSection = useSmoothScroll();
  const t = useTranslations("nav");




  // ----functions-----
  const handleClick = () => {
    setIsOpen(!isOpen);
    setFlash(true);
    setTimeout(() => setFlash(false), 150);
  };


  // array of links
  // array of links
  const navLinks = [
    { id: "home", label: t('home'), href: "#home" },
    { id: "about", label: t('about'), href: "#about" }, // ← صحح من 'about' إلى t('about')
    { id: "work", label: t('work'), href: "#work" }, // ← صحح
    { id: "contact", label: t('contact'), href: "#contact" } // ← صحح
  ];

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    setActiveLink(id);
    setFlash(true);
    setTimeout(() => setFlash(false), 150);

    e.preventDefault();
    scrollToSection(`#${id}`);
  };
  // ---useEffect-----
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // نقطة التغيير
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // -----motion-variants------
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },

  };





  return (
    <motion.nav
      className='md:px-[30] py-[20]
    min-[0]:px-[16]
    md:px-[32]
    
    flex items-center justify-between
    min-[2560px]:justify-center
    min-[2560px]:gap-[820]
    sticky
    top-0
    w-full 
    z-50
    bg-white
    shadow-lg
   
    '
      initial={{ height: 80 }}
      animate={{ height: scrolled ? 74 : 80 }}
      transition={{ duration: 0.3 }}
    >
      {/* sidebar */}
      <div className={`
      fixed left-0 top-[74px] 
        size-full 
         bg-[rgba(15,23,42,0.98)]
       
        ${isOpen ? "translate-x-0 transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]" :
          "translate-x-full transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"}
"}
 `}>
        {/* sidebar-links */}
        <motion.ul className="flex flex-col items-center 
gap-[32]  py-[62]  
text-[2.5rem] font-medium
 transition-all duration-300 ease
   "
          variants={containerVariants}
          initial="hidden"

          animate={isOpen ? "show" : "hidden"}
        >

          {navLinks.map(link => (
            <motion.li key={link.id}
              variants={itemVariants}

            >
              <a href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}

                className='bg-gradient-elegant bg-clip-text text-transparent'

              >
                {link.label}
              </a>
            </motion.li>
          ))}
        </motion.ul>

      </div>

      <div className="logo">
        <h2
          className='bg-gradient-elegant bg-clip-text text-transparent 
               text-[1.75rem] font-bold
               '
        >
          {t('personalShape')}
        </h2>
      </div>

      {/*mobile-toggle  */}

      <div className={`
    hamburger-toggle
    p-2
    min-[820px]:hidden
    ${flash && "bg-blue-400/40"}
    
    `}

      >

        <motion.button
          onClick={handleClick}
          className="flex flex-col justify-center items-center 
        relative 
        p-3
        
      
      "
        >






          {/* line-1 */}
          <motion.span
            className={`absolute
           w-full ${isOpen ? "h-[3px]" : "h-[2px]"} 
           bg-black 
           rounded-[1px]
           z-10
           `}
            animate={isOpen ? { rotate: 45, y: 1 } : { rotate: 0, y: -9 }}
            transition={{ duration: 0.3 }}
          />

          {/* line-2 */}
          <motion.span
            className="absolute
           w-full h-[3px]
            bg-black
             rounded-[1px]"

            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* line-3 */}
          <motion.span
            className="absolute
           w-full h-[3px]
           bg-black
            rounded-[1px]"

            animate={isOpen ? { rotate: -45, y: -1 } : { rotate: 0, y: 9 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>




      </div>
      {/* nav-links */}
      <ul className='
      nav-links
 gap-10
  text-black
  max-[820px]:hidden
  min-[820px]:flex
  lg:items-center
  text-[0.95rem]

  '>
        {navLinks.map(link => (
          <motion.li key={link.id} variants={itemVariants} className="relative">
            <a
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.id)}
              onMouseEnter={() => setHoveredLink(link.id)}
              onMouseLeave={() => setHoveredLink(null)}
              className={`
    font-semibold 
    py-2 
    relative transition-colors duration-75
    ${flash && activeLink === link.id ? "bg-blue-400/40 transform-opacity transition-all duration-75" : ""}
    ${activeLink === link.id ? "text-[var(--primary-color)]" : ""}
    hover:text-[var(--primary-color)]
  `}
            >
              {link.label}

              {/* underline animation */}
              <motion.span
                className="absolute left-0 bottom-0
     h-[2.5px] w-full
      rounded-full 
      bg-gradient-primary "
                initial={{ scaleX: 0, originX: 0.5, opacity: 0 }}
                animate={{
                  scaleX: activeLink === link.id || hoveredLink === link.id ? 1 : 0,
                  opacity: activeLink === link.id || hoveredLink === link.id ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </a>

          </motion.li>
        ))}
      </ul>



    </motion.nav>
  )
}
