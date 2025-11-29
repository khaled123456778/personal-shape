// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // اللغات المدعومة
  locales: ['en', 'ar'],
  
  // اللغة الافتراضية
  defaultLocale: 'en'
});