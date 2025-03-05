"use client"

import React from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '../ui/sidebar'

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';


import { LayoutDashboard, Bot, Video, FileText, Activity, GraduationCap, Settings } from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Symptom Checker (AI Chat)",
    url: "/symptom-checker",
    icon: Bot,
  },
  {
    title: "Video Consultations",
    url: "/video-consultations",
    icon: Video,
  },
  {
    title: "Patient Records",
    url: "/patient-records",
    icon: FileText,
  },
  {
    title: "IoT Devices",
    url: "/iot-devices",
    icon: Activity,
  },
  {
    title: "Training Modules (for Youth)",
    url: "/training-modules",
    icon: GraduationCap,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];



const AppSideBar = () => {
  const pathname = usePathname()
const {open } = useSidebar()





  return (
    
   
    <Sidebar collapsible='icon' variant='floating'>
      <SidebarHeader className="px-4 h-16 flex items-center border-b">

       {open ?
        <h1 className="text-xl font-semibold">Diago<span className='text-primary'>Ai</span></h1>
      :
      <h1 className="text-xl font-semibold">D<span className='text-primary'>Ai</span></h1>
      }
       
      </SidebarHeader>
      
      <SidebarContent className="mt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Application
          </SidebarGroupLabel>
          
          {/* Add list-none and p-0 to remove bullets and padding */}
          <SidebarGroupContent className="list-none p-0 mt-2 px-2 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.url
              const Icon = item.icon
              
              return (
                // Add list-none to SidebarMenuItem as well
                <SidebarMenuItem key={item.title} className="list-none">
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-md',
                        'text-sm font-medium transition-colors',
                        isActive 
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-accent hover:text-accent-foreground text-muted-foreground'
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}





          </SidebarGroupContent>
        </SidebarGroup>
      
      
      </SidebarContent>
    </Sidebar>
   
  )
}

export default AppSideBar