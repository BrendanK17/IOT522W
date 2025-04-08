import { BarChart3, CheckCircle, MapPin, Package } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "@tanstack/react-router"

interface FoodPrepSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function FoodPrepSidebar({
  activeTab,
  setActiveTab,
}: FoodPrepSidebarProps) {
  const { state } = useSidebar()
  const navigate = useNavigate() 

  return (
    <Sidebar collapsible="offcanvas" variant="sidebar" className="h-screen">
      <SidebarHeader className="h-12 flex items-center justify-between px-4">
        <div className="flex items-center">
          <span className="font-semibold text-sidebar-foreground group-data-[collapsible=offcanvas]:hidden">
            Food Prep System
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
                  onClick={() => {
                    setActiveTab("dashboard")
                    navigate({ to: "/food-prep-dashboard" })

                  }}
                  tooltip="Dashboard"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "orders"}
                  onClick={() => {
                    setActiveTab("orders")
                    navigate({ to: "/food-prep-dashboard/orders" })

                  }}
                  tooltip="Orders"
                >
                  <Package className="h-5 w-5" />
                  <span>Orders</span>
                  <Badge className="ml-auto bg-red-500 text-white">
                      {4}
                  </Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "inventory"}
                  onClick={() => {
                    setActiveTab("inventory")
                    navigate({ to: "/food-prep-dashboard/inventory" })
                  }}
                  tooltip="Inventory"
                >
                  <MapPin className="h-5 w-5" />
                  <span>Inventory</span>
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
                <p className="text-xs text-green-700">
                  You're online and ready for preparing
                </p>
              </div>
            </div>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
