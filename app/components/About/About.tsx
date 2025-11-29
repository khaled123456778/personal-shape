"use client"
import Image from 'next/image'
import aboutImg from "@/public/images/about-img.png"
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import HeaderFadeUp from '../HeaderFadeUp/HeaderFadeUp';
import { useTranslations } from 'next-intl';



export default function About() {
  const t = useTranslations("about");

  // refs
  const titleRef = useRef(null);
  const imgRef = useRef(null);
  const aboutRef = useRef(null);


  // motion-hooks

  const imgIsInView = useInView(imgRef, { once: true, margin: "-100px" });
  const aboutInView = useInView(aboutRef, { once: true, margin: "-50px" });




  // array of about texts
  const aboutTexts = t.raw('description') as string[];

  const services = t.raw('skills') as string[];




  return (
    <div className="about-sction
     flex flex-col 
     items-center justify-center
    bg-[var(--bg-secondary)]
    py-[64px]
    "


    >
      <HeaderFadeUp title={t('heading')} />



      <div className="about-content
      flex flex-col
        min-[1280px]:flex-row
      gap-10
      min-[1280px]:gap-25
       min-[1280px]:mt-[40px] 
      "
      >
        <div className="about-img pt-[40px] pb-[20] flex-1">

          <motion.div
            ref={imgRef}
            initial={{ opacity: 0, x: -100 }}
            animate={imgIsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="
          relative group
          h-[500px]
          in-[1024px]:h-[650px]
          min-[1280px]:w-[450px]
          rounded-4xl overflow-hidden
          shadow-2xl
        "
            id='about'

          >

            <Image
              src={aboutImg}
              alt="about"
              fill
              className="object-cover"
              sizes="100vw"
            />

            <div
              className="
            absolute inset-0
            group-hover:opacity-70 
            transform transition-all duration-400
            layer-bg
          "

            />

          </motion.div>

        </div>




        <motion.div className="about-text flex-3 flex flex-col justify-center"

          ref={aboutRef}
          initial={{ opacity: 0, x: 100 }}
          animate={aboutInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}

        >

          <div className="
    about-title
    min-[0]:text-[32px]
    min-[820px]:text-[40px]
    font-medium
    mb-[32px]
  " >

            <h4>
              {t('lead')}
            </h4>
          </div>

          <div className="
    about-ps
    text-[16.6px]
    text-[var(--text-secondary)]
    leading-[1.9]
    grid grid-cols-1 
    gap-[32px]
    w-full
  ">
            {aboutTexts.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>

          <div
            className="services
      grid 
      grid-cols-[repeat(auto-fill,160px)]      
      gap-3
      mt-[32px]
      text-[16.5px]
      text-[var(--text-secondary)]
    "
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="
          px-[24] py-[12]
          rounded-full
          bg-[var(--bg-card)]
          border border-[rgba(99,102,241,0.2)]
          backdrop-blur-xl
          text-[var(--primary-color)]
          font-semibold
          text-center
          text-[14.4px]
          transition-all duration-300
          hover:bg-[var(--primary-color)]
          hover:text-white
          hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]
          flex
          items-center
          justify-center
          flex-wrap
          gap-4
        "
              >
                {service}
              </div>
            ))}
          </div>

        </motion.div>

      </div>

    </div>
  )
}
