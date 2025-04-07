"use client"

import { BarChart3, CheckCircle, MapPin, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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
  useSidebar,
} from "@/components/ui/sidebar"
import { useTheme } from "@/components/themes/ThemeContext"

interface DeliverySidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  pendingDeliveriesCount: number
}

export function DeliverySidebar({ activeTab, setActiveTab, pendingDeliveriesCount }: DeliverySidebarProps) {
  const { state } = useSidebar()
  const { isHighContrast } = useTheme()

  return (
    <Sidebar
      collapsible="offcanvas"
      variant="sidebar"
      className={`h-screen ${isHighContrast ? "bg-white border-r-2 border-black" : ""}`}
    >
      <SidebarHeader
        className={`h-12 flex items-center justify-between px-4 ${isHighContrast ? "border-b-2 border-black" : ""}`}
      >
        <div className="flex items-center">
          <span
            className={`font-semibold ${isHighContrast ? "text-black" : "text-sidebar-foreground"} group-data-[collapsible=offcanvas]:hidden`}
          >
            Delivery System
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="mt-4">
        <SidebarGroup>
          <SidebarGroupLabel className={isHighContrast ? "text-black" : ""}>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "dashboard"}
                  onClick={() => setActiveTab("dashboard")}
                  tooltip="Dashboard"
                  className={
                    isHighContrast
                      ? `data-[active=true]:bg-black data-[active=true]:text-white text-black hover:bg-gray-200`
                      : ""
                  }
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "deliveries"}
                  onClick={() => setActiveTab("deliveries")}
                  tooltip="Deliveries"
                  className={
                    isHighContrast
                      ? `data-[active=true]:bg-black data-[active=true]:text-white text-black hover:bg-gray-200`
                      : ""
                  }
                >
                  <Package className="h-5 w-5" />
                  <span>Deliveries</span>
                  {pendingDeliveriesCount > 0 && (
                    <Badge className={`ml-auto ${isHighContrast ? "bg-black text-white" : "bg-red-500 text-white"}`}>
                      {pendingDeliveriesCount}
                    </Badge>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "map"}
                  onClick={() => setActiveTab("map")}
                  tooltip="Office Map"
                  className={
                    isHighContrast
                      ? `data-[active=true]:bg-black data-[active=true]:text-white text-black hover:bg-gray-200`
                      : ""
                  }
                >
                  <MapPin className="h-5 w-5" />
                  <span>Office Map</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="mx-3 mb-6">
          <div
            className={`rounded-lg ${
              isHighContrast
                ? "bg-white border-2 border-black"
                : "bg-gradient-to-r from-green-50 to-green-100 border border-green-200"
            } p-3`}
          >
            <div className="flex items-center">
              <div
                className={`h-8 w-8 rounded-full ${
                  isHighContrast ? "bg-black" : "bg-green-500/20"
                } flex items-center justify-center`}
              >
                <CheckCircle className={`h-4 w-4 ${isHighContrast ? "text-white" : "text-green-600"}`} />
              </div>
              <div className="ml-3 group-data-[collapsible=offcanvas]:hidden">
                <p className={`text-sm font-medium ${isHighContrast ? "text-black" : "text-green-800"}`}>
                  Active Status
                </p>
                <p className={`text-xs ${isHighContrast ? "text-black" : "text-green-700"}`}>
                  You're online and ready for deliveries
                </p>
              </div>
            </div>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail className={isHighContrast ? "after:bg-black hover:after:bg-black" : ""} />
    </Sidebar>
  )
}

