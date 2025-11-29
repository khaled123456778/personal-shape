"use client"
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function LanguageToggle() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  // كشف اللغة الحالية من الـ URL
  const currentLocale = pathname.split('/')[1] || 'ar';

  // تبديل اللغة
  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'ar' : 'en';
    const newPath = pathname.replace(/^\/(en|ar)/, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="
        flex items-center gap-3
        px-5 py-2.5
        rounded-full
        bg-[var(--bg-card)]
        border border-[rgba(99,102,241,0.2)]
        backdrop-blur-xl
        transition-all duration-300
        hover:bg-[var(--primary-color)]
        hover:border-[var(--primary-color)]
        hover:shadow-[0_8px_25px_rgba(99,102,241,0.3)]
        hover:scale-105
        group
      "
    >
      <span
        className={`
          text-sm font-semibold transition-all duration-300
          ${currentLocale === 'ar'
            ? 'text-[var(--primary-color)] group-hover:text-white'
            : 'text-[var(--text-secondary)] group-hover:text-white/70'
          }
        `}
      >
        ع
      </span>

      {/* Toggle Switch */}
      <div className="relative w-11 h-6 bg-[var(--bg-secondary)] rounded-full border border-[rgba(99,102,241,0.15)]">
        <motion.div
          className="
            absolute top-0.5 w-5 h-5 
            bg-gradient-to-br from-[var(--primary-color)] to-purple-600
            rounded-full shadow-lg
            group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]
          "
          animate={{ x: currentLocale === 'ar' ? 3 : 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </div>

      <span
        className={`
          text-sm font-semibold transition-all duration-300
          ${currentLocale === 'en'
            ? 'text-[var(--primary-color)] group-hover:text-white'
            : 'text-[var(--text-secondary)] group-hover:text-white/70'
          }
        `}
      >
        EN
      </span>
    </button>
  );
}