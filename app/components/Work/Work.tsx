"use client"
import React from 'react'
import HeaderFadeUp from '../HeaderFadeUp/HeaderFadeUp'
import img1 from "@/public/images/computer-desk-stickers.jpg"
import img2 from "@/public/images/curved-display-pinky-girl.jpg"
import img3 from "@/public/images/dashboard-interfaces-transparent-displays.jpg"
import img4 from "@/public/images/marketing-strategy-women.jpg"
import img5 from "@/public/images/portfolio-website-girl.jpg"
import img6 from "@/public/images/working-business-women.jpg"
import Image from 'next/image'
import { delay, easeInOut, motion, Variants } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { useTranslations } from 'next-intl';

export default function Work() {
  const t = useTranslations("featuredWork");

  // card array
  // card array
  const cardsData = [
    {
      title: t('ecommerce.title'),
      description: t('ecommerce.desc'),
      tools: t.raw('ecommerce.tech') as string[],
      image: img1,
      addGhostTag: true,
    },
    {
      title: t('brandIdentity.title'),
      description: t('brandIdentity.desc'),
      tools: t.raw('brandIdentity.tech') as string[],
      image: img2,
      addGhostTag: false,
    },
    {
      title: t('mobileApp.title'),
      description: t('mobileApp.desc'),
      tools: t.raw('mobileApp.tech') as string[],
      image: img3,
      addGhostTag: true,
    },
    {
      title: t('dashboard.title'),
      description: t('dashboard.desc'),
      tools: t.raw('dashboard.tech') as string[],
      image: img4,
      addGhostTag: true,
    },
    {
      title: t('marketing.title'),
      description: t('marketing.desc'),
      tools: t.raw('marketing.tech') as string[],
      image: img5,
      addGhostTag: false,
    },
    {
      title: t('portfolio.title'),
      description: t('portfolio.desc'),
      tools: t.raw('portfolio.tech') as string[],
      image: img6,
      addGhostTag: true,
    },
  ];

  // motion variants
  const staggerCards = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    }

  };

  const cardFadeUp: Variants = {
    hidden: { y: 4, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeIn",

      },
    },
  };

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section className="card-section">
      <header>
        <HeaderFadeUp title={t('heading')} />

      </header>

      <motion.div
        ref={ref}
        variants={staggerCards}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="grid 
    min-[0]:grid-cols-1
    min-[820]:grid-cols-2
    min-[1280]:grid-cols-3
    gap-[32]
    py-[44]
    "

      >

        {cardsData.map((card, index) => (
          <motion.div
            key={index}
            variants={cardFadeUp}
            className="card group flex flex-col bg-[var(--bg-card)]
    transition-all duration-400
    hover:-translate-y-3 
     transform-gpu will-change-transform
    "
          >
            <motion.div className="card-img relative h-[180] overflow-hidden rounded-t-3xl ">
              <Image src={card.image} alt={card.title}
                fill
                sizes='100vw'
                className="object-cover"
                placeholder='blur'
                loading='eager'
              />

              {/* overlay */}
              <div className="
    absolute inset-0 
    layer-bg
    opacity-0
    group-hover:opacity-100
    transition-all duration-300
  "></div>
            </motion.div>

            <div className="card-body 
        p-[32]  
     rounded-b-3xl
shadow-xl  
 flex flex-col  
                 

 ">

              <h3 className="card-title 
                 text-[24px]
                 font-semibold
                 mb-[16px]
                 ">{card.title}</h3>
              <div className="description-container  h-[120]        ">
                <p
                  className="
      text-[16px]
      text-[var(--text-secondary)]
      line-clamp-4
      mb-[24]
      
     
    "
                >
                  {card.description}
                </p>


              </div>


              <div className=" tags-cintainer relative    h-[80]    ">
                <div className="tags 
        flex flex-wrap 
        
        gap-2
     
         
       
        
        ">
                  {card.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="px-4 py-1.5
       bg-[var(--bg-secondary)]
       hover:bg-[var(--primary-color)]
       transition-colors duration-100
       text-[var(--text-secondary)] 
        hover:text-white
       rounded-full
        text-sm font-medium
       
        "

                    >
                      {tool}
                    </span>
                  ))}

                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </motion.div>

    </motion.section>
  )
}
