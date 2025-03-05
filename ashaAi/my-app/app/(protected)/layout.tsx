import AppSideBar from '@/components/appSidebar/appSidebar'
import { Card } from '@/components/ui/card'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const SideBarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <AppSideBar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col transition-all duration-300 lg:ml-1">
          {/* Sticky Header Section */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex flex-col p-4 gap-4">
              {/* Top Bar with Navigation and User Controls */}
              <Card className="w-full flex items-center justify-between p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between w-full gap-4">
                  <SidebarTrigger className="lg:hidden" />
                  <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
                  <UserButton />
                </div>
              </Card>
            </div>
          </div>

          {/* Content Area with Proper Spacing */}
          <div className="flex-1 px-4 pb-8">
            <div className="bg-background rounded-xl border shadow-sm p-6 space-y-6">
              {children}
            </div>
          </div>
        </main>
      </div>
      
    </SidebarProvider>
  )
}

export default SideBarLayout
