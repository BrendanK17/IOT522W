import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Package,
  CheckCircle,
  Clock,
  CalendarClock,
  ChevronRight,
  TrendingUp,
  Award,
  MapPin,
  Calendar,
  Building,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NextShiftCard from "@/components/generic/NextShiftCard"

import { pendingOrders } from "@/lib/foodPrep/orders";
import { completedOrders } from "@/lib/foodPrep/orders";
import DashboardHeader from "@/components/generic/DashboardHeader"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { FoodPrepSidebar } from "@/components/customized/sidebar/FoodPrepSidebar"

import { shiftSchedule, userLocation } from "@/lib/foodPrep/user"

export default function FoodPrepDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <DashboardHeader
        title={
          activeTab === 'dashboard'
            ? 'Food Prep Dashboard'
            : activeTab === 'orders'
            ? 'Orders'
            : 'Inventory'
        }
      />

      <div className="flex-1 flex max-h-96">
        {/* Sidebar */}
        <SidebarProvider defaultOpen={!sidebarOpen}>
          <FoodPrepSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <SidebarInset className="flex-1 flex flex-col">
            <div className="flex items-center h-12 px-4 border-b">
              <SidebarTrigger className="mr-2 hover:bg-gray-100 rounded-md transition-colors" />
              <span className="font-medium text-sm text-muted-foreground">
                {activeTab === "dashboard"
                  ? "Food Prep Dashboard"
                  : activeTab === "orders"
                    ? "Orders"
                    : "Inventory"}
              </span>
            </div>

        {/* Main content */}
        <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Welcome banner */}
            <div className="rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0039A6] p-6 text-white shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-bold">Welcome back, Chris Walker!</h2> 
                    <p className="mt-1 text-blue-100">
                      You have {pendingOrders.length} orders waiting for you today.
                    </p>
                </div>
                <Button
                    className="bg-white text-[#0052CC] hover:bg-blue-50"
                    onClick={() => {
                      setActiveTab("orders")
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Start Preparing
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
              </div>
            </div> 
            <div className="flex items-center rounded-lg bg-gray-50 p-2 text-lg text-black gap-4 font-bold">
              <h3>Shift Stats Overview</h3>
            </div>

            {/* Stats cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="overflow-hidden border-none shadow-md">
                  <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-gradient-to-br from-[#0052CC]/10 to-[#0052CC]/30"></div>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Orders Prepared</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-[#0052CC]/10 flex items-center justify-center">
                      <Package className="h-4 w-4 text-[#0052CC]" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-[#0052CC]">{pendingOrders.length}</div>
                    <div className="mt-1 flex items-center text-xs">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        +2 from yesterday
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-none shadow-md">
                  <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-gradient-to-br from-green-100 to-green-200"></div>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{completedOrders.length}</div>
                    <div className="mt-1 flex items-center text-xs">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        +2 from yesterday
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-none shadow-md">
                  <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-gradient-to-br from-amber-100 to-amber-200"></div>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Preparation Time</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-amber-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-amber-600">12.6 min</div>
                    <div className="mt-1 flex items-center text-xs">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        +2.1 min from yesterday
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-none shadow-md">
                  <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-gradient-to-br from-purple-100 to-purple-200"></div>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Award className="h-4 w-4 text-purple-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">4.4/5</div>
                    <div className="mt-1 flex items-center text-xs">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        +0.2 from last week
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>   

            {/* Location and Shift Schedule */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <div className="grid grid-rows-2 gap-4 h-full">

                {/* NEXT SHIFT */}
                <NextShiftCard shiftSchedule={shiftSchedule} />   

                {/* User Location */}
                <Card className="overflow-hidden border-none shadow-md h-full">
                  <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-gradient-to-br from-blue-100 to-blue-200"></div>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Your Location</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center pb-4">
                    <Building className="h-8 w-8 text-blue-600 mr-2"/>
                    </div>
                    <div className="text-lg font-semibold text-blue-600">
                      {userLocation.building}
                    </div>
                    <div className="text-sm text-gray-600">
                      {userLocation.street}, {userLocation.city}
                    </div>
                  </CardContent>
                </Card>
                  </div>
              </div>

              {/* Shift Schedule */}
              <div className="col-span-2">
                <Card className="overflow-hidden border-none shadow-md h-full">
                  <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-gradient-to-br from-indigo-100 to-indigo-200"></div>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Shift Schedule</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-rows-5 gap-2">
                      {shiftSchedule.map((shift) => (
                        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-white p-3 border border-blue-200">
                        <div
                          key={shift.day}
                          className={`flex items-left px-4 py-2 rounded-lg min-w-[100px] ${
                            shift.shift === "OFF" ? "text-gray-400" : "text-blue-600 font-semibold"
                          }`}
                        >
                          <CalendarClock className="h-4 w-4 text-blue-600 mr-2" />
                          <span className="text-sm text-left text-gray-600">{shift.day}</span>
                          <span className="flex-grow text-base text-right">{shift.shift}</span>
                        </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>         
          </div>
        )}
        </div>
        </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
