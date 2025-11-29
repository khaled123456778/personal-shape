// HeaderFadeUp.jsx
"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

/*
  🔧 Component Props:
  - title: النص الأساسي
  - titleClassName: تعديل شكل النص (لون - حجم - وزن - ... )
  - lineClassName: تعديل شكل الخط اللي تحت النص
  - containerClassName: تعديل الكونتينر اللي شايل المكوّن
  - lineWidth / lineHeight: تغيير حجم الخط من غير كلاس إضافي
*/

export default function HeaderFadeUp({
  title = "",
  titleClassName = "",
  lineClassName = "",
  containerClassName = "",
  lineWidth = "60px",
  lineHeight = "4px",
}) {
  const titleRef = useRef(null);

  // 👇 يتحقق إذا العنصر ظهر في الشاشة مرة واحدة فقط
  const isInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <header className={`flex flex-col items-center gap-4 ${containerClassName}`}>
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 40 }}              // 📦 بداية الحركة
        animate={isInView ? { opacity: 1, y: 0 } : {}} // 🎬 شغّل الأنميشن وقت الظهور
        transition={{ duration: 0.6, ease: "easeOut" }} // ⏱️ وقت الحركة
        className="flex flex-col items-center gap-4"
      >
        {/* 📝 العنوان اللي بيتغير شكله بمزاجك */}
        <h3 className={`section-title header ${titleClassName}`}>
          {title}
        </h3>

        {/* 🎨 الخط اللي تحت العنوان — قابل للتعديل بسهولة */}
        <span
          className={`header-line bg-gradient-primary rounded ${lineClassName}`}
          style={{ width: lineWidth, height: lineHeight }}
        />
      </motion.div>
    </header>
  );
}
