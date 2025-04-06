import { BarChart3, CheckCircle, MapPin, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"
"use client"
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
  useSidebar,
} from "@/components/ui/sidebar"

interface CustomerSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  pendingDeliveriesCount: number
}

export function CustomerSidebar({
  activeTab,
  setActiveTab,
  pendingDeliveriesCount,
}: CustomerSidebarProps) {

  const { state } = useSidebar()
  const navigate = useNavigate()

  // Function to handle navigation
  const handleNavigation = (tab: string) => {
    setActiveTab(tab)

    // Navigate to the appropriate route based on the tab
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
      default:
        navigate({ to: "/customer/order" })
    }
  }

  return (
    <Sidebar collapsible="offcanvas" variant="sidebar" className="h-screen">
      <SidebarHeader className="h-12 flex items-center justify-between px-4">
        <div className="flex items-center">
          <span className="font-semibold text-sidebar-foreground group-data-[collapsible=offcanvas]:hidden">
            Customer Dashboard
          </span>
        </div>
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
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "schedule"}
                  onClick={() => handleNavigation("schedule")}
                  tooltip="Schedule"
                >
                  <Package className="h-5 w-5" />
                  <span>Schedule</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "notifications"}
                  onClick={() => handleNavigation("notifications")}
                  tooltip="Notifications"
                >
                  <MapPin className="h-5 w-5" />
                  <span>Notifications</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="mx-3 mb-6">
          <div className="rounded-lg bg-gradient-to-r from-green-50 to-green-100 p-3 border border-green-200">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-3 group-data-[collapsible=offcanvas]:hidden">
                <p className="text-sm font-medium text-green-800">Active Status</p>
                <p className="text-xs text-green-700">You're online and ready to order</p>
              </div>
            </div>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

