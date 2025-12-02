import PageTransition from '@/app/components/PageTransition';
import { ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
