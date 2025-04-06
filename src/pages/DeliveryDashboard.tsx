// File: src/pages/delivery/DeliveryDashboardOverview.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Clock, Package, CheckCircle, TrendingUp, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DashboardHeader from "@/components/generic/DashboardHeader";
import { useNavigate } from "@tanstack/react-router";
import { pendingDeliveries, completedDeliveries } from "@/lib/delivery/deliveries";
import Sidebar from "@/components/generic/Sidebar";
import { useState } from "react";
import { deliveryMenuItems } from "@/lib/delivery/menuItems";

export default function DeliveryDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <DashboardHeader title="Delivery Dashboard" />

      <div className="flex flex-1">
        <Sidebar
          menuItems={deliveryMenuItems}
          activeTab="dashboard"
          setActiveTab={() => {}}
          onNavigate={(path) => navigate({ to: path })}
          sidebarOpen={sidebarOpen}
        />

        {/* Main content area */}
        <div className="flex-1 p-8 space-y-8">
          <div className="rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0039A6] p-6 text-white shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold">Welcome back, Delivery Staff!</h2>
                <p className="mt-1 text-blue-100">
                  You have {pendingDeliveries.length} deliveries waiting for you today.
                </p>
              </div>
              <Button
                className="bg-white text-[#0052CC] hover:bg-blue-50"
                onClick={() => navigate({ to: "/delivery-dashboard/deliveries" })}
              >
                Start Delivering
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Deliveries Card */}
            <Card className="shadow-md border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Deliveries</CardTitle>
                <div className="h-8 w-8 rounded-full bg-[#0052CC]/10 flex items-center justify-center">
                  <Package className="h-4 w-4 text-[#0052CC]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#0052CC]">{pendingDeliveries.length}</div>
                <Badge className="mt-1 bg-green-100 text-green-800">
                  <TrendingUp className="mr-1 h-3 w-3" /> +2 from yesterday
                </Badge>
              </CardContent>
            </Card>

            {/* Completed Today Card */}
            <Card className="shadow-md border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{completedDeliveries.length}</div>
                <Badge className="mt-1 bg-green-100 text-green-800">
                  <TrendingUp className="mr-1 h-3 w-3" /> +1 from yesterday
                </Badge>
              </CardContent>
            </Card>

            {/* Avg. Delivery Time Card */}
            <Card className="shadow-md border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg. Delivery Time</CardTitle>
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-600">4.2 min</div>
                <Badge className="mt-1 bg-green-100 text-green-800">
                  <TrendingUp className="mr-1 h-3 w-3" /> -0.5 min from yesterday
                </Badge>
              </CardContent>
            </Card>

            {/* Customer Rating Card */}
            <Card className="shadow-md border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Award className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">4.9/5</div>
                <Badge className="mt-1 bg-green-100 text-green-800">
                  <TrendingUp className="mr-1 h-3 w-3" /> +0.2 from last week
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
