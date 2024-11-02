import TopNav from '@/components/TopNav';

import '@/app/globals.css';


export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopNav/>
      {children}  
    </>
  );
}
