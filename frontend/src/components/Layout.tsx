import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}
// container mx-auto px-4 py-8
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-full bg-[#FFFFFF] dark:bg-gray-900">
      <Navbar />
      <main className="mx-auto">
        {children}
      </main>
    </div>
  );
}