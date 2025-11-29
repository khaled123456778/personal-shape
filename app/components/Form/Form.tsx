"use client"
import { motion, Variants, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import HeaderFadeUp from '../HeaderFadeUp/HeaderFadeUp';
import { useTranslations } from 'next-intl';

export default function Form() {
  const t = useTranslations("contact");

  // variants
  const floatVariant: Variants = {
    float: {
      y: [0, 12, 0], // حركة صاعدة وهابطة
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const formVariants: Variants = {
    hidden: { opacity: 0, y: 50 }, // مخفي ومرفوع شوية
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 }
    }
  };
  const [isHovered, setIsHovered] = useState(false);

  const controlsForm = useAnimation();
  const controlsDesc = useAnimation();
  const controlsBtn = useAnimation();
  const [refForm, inViewForm] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [refDesc, inViewDesc] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [refBtn, inViewBtn] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inViewDesc) controlsDesc.start("visible");
  }, [inViewDesc, controlsDesc]);
  useEffect(() => {
    if (inViewForm) controlsForm.start("visible");
  }, [inViewForm, controlsForm]);
  useEffect(() => {
    if (inViewBtn) controlsForm.start("visible");
  }, [inViewBtn, controlsBtn]);



  const inputs = [
    { id: "name", label: t('form.name'), type: "text", placeholder: t('form.namePlaceholder') },
    { id: "email", label: t('form.email'), type: "text", placeholder: t('form.emailPlaceholder') },
    { id: "subject", label: t('form.subject'), type: "text", placeholder: t('form.subjectPlaceholder') },
  ];
  const messageField = {
    id: "message",
    label: t('form.message'),
    placeholder: t('form.messagePlaceholder'),
  };


  return (
    <motion.div
      className="relative 
  overflow-hidden h-fit py-20
  flex items-center justify-center 
  form-bg 
  
          
"

      animate={{ backgroundPosition: ["0% 0%", "50% 50%", "0% 0%"] }}
      transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    ><div className="contents">
        {/* شبكة ثابتة */}
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 190 90"
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

      </div>

      {/* الدائرة 1 */}
      <motion.svg
        height="100"
        width="200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-10 left-40 opacity-10"
        variants={floatVariant}
        animate="float"
      >
        <circle r="45" cx="50" cy="50" fill="white" />
      </motion.svg>

      {/* الدائرة 2 */}
      <motion.svg
        height="100"
        width="200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 right-130 opacity-10"
        variants={floatVariant}
        animate="float"
      >
        <circle r="25" cx="50" cy="50" fill="white" />
      </motion.svg>

      {/* الدائرة 3 - تخصيص الحركة مباشرة */}
      <motion.svg
        height="100"
        width="200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-30 right-80 opacity-10"
        animate={{ y: [0, 12, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: 0.5 }}
      >
        <circle r="30" cx="50" cy="50" fill="white" />
      </motion.svg>

      {/* الدائرة 4 */}
      <motion.svg
        height="100"
        width="200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-70 right-40 opacity-5"
        variants={floatVariant}
        animate="float"
      >
        <circle r="50" cx="50" cy="50" fill="white" />
      </motion.svg>

      {/* المربع 1 */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[50%] left-[20%] opacity-10"
        variants={floatVariant}
        animate="float"
      >
        <rect width="100" height="100" x="10" y="10" rx="20" ry="20" fill="white" />
      </motion.svg>

      {/* المستطيل 2 */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[50%] right-0 opacity-5"
        animate={{ y: [0, 18, 0], rotate: [0, 50, -50, 0] }}
      >
        <rect width="150" height="150" x="10" y="10" rx="30" ry="30" fill="white" />
      </motion.svg>
      {/* form */}
      <motion.div className="form-content
  flex flex-col items-center
  max-w-[700] 
  justify-center
  gap-8
text-white 
"
        ref={refForm} // ↖ لازم تربطه بالـ ref

        variants={staggerVariants}
        initial="hidden"
        animate={controlsForm} // ↖ استخدم controls بدل animate="visible"
      >

        {/* header */}
        <HeaderFadeUp
          title={t('heading')}
          titleClassName=" font-extrabold !text-white mt-1 b-mb-1 "
          lineClassName=''

        />


        {/* description */}
        <motion.div className="w-full px-3 text-center
  
  "
          ref={refDesc}
          variants={formVariants}
          initial="hidden"
          animate={controlsDesc}

        >
          <motion.p>
            {t('lead')}
          </motion.p>
        </motion.div>

        {/* inputs section */}
        <motion.div className="w-full flex flex-col gap-8 p-4"

          ref={refForm}
          variants={staggerVariants}
          initial="hidden"
          animate={controlsForm}
        >

          {/* row 1 */}
          <div className="flex
  min-[0]:flex-col
  min-[820]:flex-row
  gap-6 w-full">
            {inputs.slice(0, 2).map((field) => (
              <motion.div key={field.id} className="flex flex-col gap-3 flex-1"
                variants={formVariants} // ← هنا

              >
                <label htmlFor={field.id}
                  className='font-medium text-[14.4px]'
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="
            w-full rounded-2xl backdrop-blur-md bg-white/8
                      focus:bg-white/14

            text-white border border-white/20
            focus:outline-none focus:border-[var(--primary-color)]
            focus:ring-2 focus:ring-[var(--primary-color)]/20
            placeholder-white/50
            p-[19.2px]
          "
                />
              </motion.div>
            ))}
          </div>

          {/* row 2 */}
          <motion.div className="flex flex-col gap-6 w-full">
            {inputs.slice(2).map((field) => (
              <motion.div key={field.id} className="
      flex flex-col gap-3 flex-1
      "
                variants={formVariants} // ← هنا

              >
                <label htmlFor={field.id}
                  className='font-medium text-[14.4px]'
                >{field.label}</label>
                <input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="
            w-full rounded-2xl backdrop-blur-md bg-white/8
                      focus:bg-white/14

            text-white border border-white/20
            focus:outline-none focus:border-[var(--primary-color)]
            focus:ring-2 focus:ring-[var(--primary-color)]/20
            placeholder-white/50
            p-[19.2px]
            
          "
                />
              </motion.div>
            ))}

            {/* message textarea */}
            <motion.div className="flex flex-col gap-3 flex-1"
              variants={formVariants} // ← هنا

            >
              <label htmlFor={messageField.id}
                className='font-medium text-[14.4px]'
              >{messageField.label}</label>
              <textarea
                id={messageField.id}
                rows={6}
                placeholder={messageField.placeholder}
                className="
          w-full rounded-2xl backdrop-blur-md bg-white/8
          focus:bg-white/14
          text-white border border-white/20
          focus:outline-none focus:border-[var(--primary-color)]
          focus:ring-2 focus:ring-[var(--primary-color)]/20
          placeholder-white/50
          p-[19.2px]
        "
              />
            </motion.div>
          </motion.div>
          {/* button */}
          <motion.button className={`
    px-6 py-3 rounded-4xl submitBtn-bg text-white font-bold 
     px-[48] py-[16]
     duration-400
    ${isHovered
              ? '-translate-y-1 shadow-[var(--primary-shadow)]'
              : ''
            }
  `}
            ref={refBtn}

            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}

            variants={formVariants}  // نفس الأنيميشن
          >
            {t('form.send')}
          </motion.button>
        </motion.div>


      </motion.div>

    </motion.div>

  )
}
