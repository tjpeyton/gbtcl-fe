'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Dices, Info, File } from 'lucide-react'
import Image from 'next/image'

import { CHAIN_ID_TO_NETWORK, cn, formatAddress } from '@/lib/utils'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Button } from '../ui/button'

import { useWalletContext, WalletContext } from '@/app/contexts/WalleContext'


const items = [
  {
    title: 'Lottery',
    url: '/lotteries',
    icon: Dices,
  },
  {
    title: 'About',
    url: '/about',
    icon: Info,
  },
  {
    title: 'Whitepaper',
    url: '/whitepaper',
    icon: File,
  }
]

const AdminSidebar = () => {
  const pathname = usePathname()
  const {
    state: { address, currentChain },
  } = useWalletContext() as WalletContext

  return (
    <Sidebar>
      <SidebarHeader>
        <Image src="/images/gbtcl_logo.png" alt="logo" width={500} height={500} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Home</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link 
                        href={item.url}
                        className={cn(
                          'block px-4 py-2 rounded-lg transition-colors duration-200',
                          isActive
                            ? 'bg-gray-300'
                            : ' hover:bg-gray-200 hover:text-black'
                        )}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AdminSidebar
