import TopNav from '@/components/TopNav';

import '@/app/globals.css';
import { Toaster } from '@/components/ui/toaster';


export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopNav/>
      <main className="container mx-auto">  
        {children}
      </main>
    </>
  );
}
