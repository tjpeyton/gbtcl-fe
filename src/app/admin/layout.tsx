import { AdminSidebar } from "@/components/AdminSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import styles from './page.module.css'

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
      <main className={styles.main}>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>  
  )
}
