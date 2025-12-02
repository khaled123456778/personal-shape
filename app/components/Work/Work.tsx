"use client"
import React from 'react'
import HeaderFadeUp from '../HeaderFadeUp/HeaderFadeUp'
import { delay, easeInOut, motion, Variants } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { projects } from '../../data/projects';
import { Link } from '../../../i18n/navigation';

export default function Work() {
  const t = useTranslations("featuredWork");



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

        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={cardFadeUp}
            className="card group flex flex-col bg-[var(--bg-card)]
    transition-all duration-400
    hover:-translate-y-3 
     transform-gpu will-change-transform
    "
          >
            <Link href={`/projects/${project.id}`} className="flex flex-col h-full">
              <motion.div className="card-img relative h-[180] overflow-hidden rounded-t-3xl ">
                <Image src={project.image} alt={t(`${project.id}.title`)}
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
   flex-grow            
  
   ">

                <h3 className="card-title 
                   text-[24px]
                   font-semibold
                   mb-[16px]
                   ">{t(`${project.id}.title`)}</h3>
                <div className="description-container  h-[120]        ">
                  <p
                    className="
        text-[16px]
        text-[var(--text-secondary)]
        line-clamp-4
        mb-[24]
        
       
      "
                  >
                    {t(`${project.id}.desc`)}
                  </p>


                </div>


                <div className=" tags-cintainer relative    h-[80]    ">
                  <div className="tags 
          flex flex-wrap 
          
          gap-2
       
           
         
          
          ">
                    {(t.raw(`${project.id}.tech`) as string[]).map((tool, index) => (
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
            </Link>
          </motion.div>
        ))}
      </motion.div>

    </motion.section>
  )
}
