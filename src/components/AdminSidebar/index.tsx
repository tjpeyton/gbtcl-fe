'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ReceiptText, LayoutDashboard, Dices, House } from "lucide-react"

import { CHAIN_ID_TO_NETWORK, cn, formatAddress } from "@/lib/utils"

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
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"

import { useWalletContext, WalletContext } from "@/context/WalleContext"


const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Lotteries",
    url: "/admin/lotteries",
    icon: Dices,
  },
  {
    title: "Contracts",
    url: "/admin/contracts",
    icon: ReceiptText,
  }, 
  {
    title: "App",
    url: "/",
    icon: House,
  }
]

export function AdminSidebar() {
  const pathname = usePathname()
  const {
    state: { address, currentChain },
  } = useWalletContext() as WalletContext;

  return (
    <Sidebar>
      <SidebarHeader>
        {currentChain && (
          <span className="text-center block">
            {CHAIN_ID_TO_NETWORK[currentChain]}
          </span>
        )}
        <Button 
          type="button">
          {formatAddress(address ?? '')}
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>GBTCL Admin</SidebarGroupLabel>
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
                          "block px-4 py-2 rounded-lg transition-colors duration-200",
                        isActive
                          ? "bg-gray-300"
                          : " hover:bg-gray-200 hover:text-black"
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
