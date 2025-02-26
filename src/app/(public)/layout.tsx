import TopNav from '@/components/TopNav'
import PublicSidebar from '@/components/PublicSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

import '@/app/globals.css'



export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider> 
        <PublicSidebar/>
        <div className="container">  
          <TopNav/>
          <main className="container mx-auto">      
            {children}
          </main>
        </div>
      </SidebarProvider>
    </>
  )
}
