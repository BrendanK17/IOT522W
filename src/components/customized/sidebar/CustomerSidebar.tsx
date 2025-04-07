"use client"

import { BarChart3, CheckCircle, MapPin, Package, Truck } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

interface CustomerSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function CustomerSidebar({ activeTab, setActiveTab }: CustomerSidebarProps) {
  const navigate = useNavigate()

  const handleNavigation = (tab: string) => {
    setActiveTab(tab)
    switch (tab) {
      case "dashboard":
        navigate({ to: "/customer/order" })
        break
      case "schedule":
        navigate({ to: "/customer/delivery-calendar" })
        break
      case "notifications":
        navigate({ to: "/customer/notifications" })
        break
      case "tracking":
        navigate({ to: "/customer/track-order" })
        break
      default:
        navigate({ to: "/customer/order" })
    }
  }

  return (
    <Sidebar collapsible="offcanvas" variant="sidebar" className="h-screen">
      <SidebarHeader className="h-12 flex items-center justify-between px-4">
        <span className="font-semibold">Customer Dashboard</span>
      </SidebarHeader>

      <SidebarContent className="mt-4">
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "dashboard"}
                  onClick={() => handleNavigation("dashboard")}
                  tooltip="Dashboard"
                >
                  <BarChart3 className="h-5 w-5" />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "schedule"}
                  onClick={() => handleNavigation("schedule")}
                  tooltip="Schedule"
                >
                  <Package className="h-5 w-5" />
                  Schedule
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "notifications"}
                  onClick={() => handleNavigation("notifications")}
                  tooltip="Notifications"
                >
                  <MapPin className="h-5 w-5" />
                  Notifications
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "tracking"}
                  onClick={() => handleNavigation("tracking")}
                  tooltip="Track Order"
                >
                  <Truck className="h-5 w-5" />
                  Track Order
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="mx-3 mb-6 rounded-lg bg-gradient-to-r from-green-50 to-green-100 p-3 border border-green-200">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">Active Status</p>
              <p className="text-xs text-green-700">You're online and ready to order</p>
            </div>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
