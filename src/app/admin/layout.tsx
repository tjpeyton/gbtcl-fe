import AdminSidebar from '@/components/AdminSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'


export const metadata = {
  title: 'GBTCL Admin',
  description: 'Manage the Global Bitcoin Lottery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className='w-full h-full p-[1%]'>
        {children}
      </main>
    </SidebarProvider>  
  )
}
