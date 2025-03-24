import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Package,
  MapPin,
  CheckCircle,
  Clock,
  BarChart3,
  LogOut,
  ChevronRight,
  Coffee,
  Menu,
  X,
  AlertCircle,
  TrendingUp,
  Truck,
  Award,
  Navigation,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "@tanstack/react-router"
import { Link } from "@tanstack/react-router"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"



import logo from "../assets/logo.png"
import chefIcon from "../assets/chef_icon.png"

import avatar1 from "../assets/avatar_1.png"
import avatar2 from "../assets/avatar_2.png"
import avatar3 from "../assets/avatar_3.png"

const pendingOrders = [
  {
      id: "ORD-1234",
      customer: "Alex Johnson",
      location: "Floor 3, Desk 42",
      items: ["Chicken Salad", "Sparkling Water"],
      placedAt: "12:00 PM",
      dueAt: "13:45 PM",
      notes: "Extra dressing on the side",
      status: "ready",
      time: "2 mins ago",
      avatar: avatar1,
      priority: "high",
      floor: "3",
      deskId: "42",
      coordinates: { x: 65, y: 5 },
    },
    {
      id: "ORD-1235",
      customer: "Sarah Miller",
      location: "Floor 2, Meeting Room B",
      items: ["Veggie Wrap", "Green Tea", "Chocolate Brownie"],
      placedAt: "11:43 AM",
      dueAt: "12:30 PM",
      notes: "No lettuce in the wrap",
      status: "ready",
      time: "5 mins ago",
      avatar: avatar2,
      priority: "medium",
      floor: "2",
      deskId: "MR-B",
      coordinates: { x: 65, y: 65 },
    },
    {
      id: "ORD-1236",
      customer: "David Chen",
      location: "Floor 4, Desk 15",
      items: ["Beef Burger", "Fries", "Cola"],
      placedAt: "10:39 AM",
      dueAt: "13:00 PM",
      status: "ready",
      time: "7 mins ago",
      avatar: avatar3,
      priority: "medium",
      floor: "4",
      deskId: "15",
      coordinates: { x: 45, y: 30 },
    },
];


const completedOrders = [
{
  timePlaced: "09:00 AM",
  orderNumber: "ORD001",
  order: "Margherita Pizza",
  specialRequests: "Extra Cheese",
  extras: "Garlic Bread",
  status: "Completed",
},
{
  timePlaced: "11:15 AM",
  orderNumber: "ORD002",
  order: "Veggie Burger",
  specialRequests: "No Mayo",
  extras: "Sweet Potato Fries",
  status: "In Progress",
},
{
  timePlaced: "12:00 PM",
  orderNumber: "ORD003",
  order: "Chicken Caesar Salad",
  specialRequests: "Dressing on the Side",
  extras: "Breadsticks",
  status: "Pending",
},
{
  timePlaced: "12:00 PM",
  orderNumber: "ORD003",
  order: "Chicken Caesar Salad",
  specialRequests: "Dressing on the Side",
  extras: "Breadsticks",
  status: "Pending",
},

];

export default function FoodPrepDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const navigate = useNavigate()

  const handleLogout = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });

    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          {/* Mobile sidebar toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden rounded-full"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo and title */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2">
              {/* Logo */}
              <h1 className="cursor-pointer" onClick={() => navigate({ to: "/food-prep-dashboard" })}>
                <img src={logo || "/placeholder.svg"} alt="Logo" className="w-auto h-10" />
              </h1>
            </div>
            <div className="h-8 w-[1px] bg-gray-200 hidden lg:block"></div>
            <h1 className="text-lg font-semibold md:text-xl">
              {activeTab === "dashboard" && "Food Preparation Dashboard"}
              {activeTab === "orders" && "Orders"}
              {activeTab === "inventory" && "Inventory"}
            </h1>
          </div>
          {/* Right-Side Header Action */}
          <div className="flex items-center gap-3">
              <Link to="/report-issue" className="flex items-center">
                {/* Round Button */}
                <Button variant="outline" size="lg" className="rounded-full py-3 px-6 flex items-center space-x-3">
                  {/* Report Issue Icon */}
                  <AlertCircle className="h-5 w-5 text-red-500" />

                  {/* Report Issue Text */}
                  <span className="text-red-500 text-sm font-semibold">Report Issue</span>
                </Button>
              </Link>

              {/* User Profile Icon */}
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-[#0052CC]">
                  <AvatarImage src={chefIcon} alt="Delivery Staff" />
                  <AvatarFallback>DS</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Chris Walker</p>
                  <p className="text-xs text-muted-foreground">foodprep@example.com</p>
                </div>
              </div>
            </div>
          </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div
            className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:translate-x-0 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:relative lg:w-64 border-r`}
          >
            {/* Sidebar layout */}
            <div className="flex h-full flex-col h-screen">
              {/* Main Menu at Top */}
              <nav className="flex flex-col space-y-2 px-3 py-4">
                <div className="px-3">
                  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Main Menu</h2>
                </div>

                <Button
                  variant={activeTab === "dashboard" ? "default" : "ghost"}
                  className={`w-full justify-start rounded-lg ${activeTab === "dashboard" ? "bg-[#0052CC]" : ""}`}
                  onClick={() => setActiveTab("dashboard")}
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Dashboard
                </Button>

                <Button
                  variant={activeTab === "orders" ? "default" : "ghost"}
                  className={`w-full justify-start rounded-lg ${activeTab === "orders" ? "bg-[#0052CC]" : ""}`}
                  onClick={() => {setActiveTab("orders"); navigate({ to: "/food-prep-dashboard/orders" });}}
                >
                  <Package className="mr-2 h-5 w-5" />
                  Orders
                  <Badge className="ml-auto bg-red-500 text-white">{pendingOrders.length}</Badge>
                </Button>

                <Button
                  variant={activeTab === "inventory" ? "default" : "ghost"}
                  className={`w-full justify-start rounded-lg ${activeTab === "inventory" ? "bg-[#0052CC]" : ""}`}
                  onClick={() => setActiveTab("inventory")}
                >
                  <Package className="mr-2 h-5 w-5" />
                  Inventory
                </Button>
              </nav>

              {/* User Profile Status (Sidebar) */}
              <div className="border-t p-4 mt-auto">
                  {/* Status indicator */}
                <div className="mx-3 mb-6">
                  <div className="rounded-lg bg-gradient-to-r from-green-50 to-green-100 p-3 border border-green-200">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">Active Status</p>
                        <p className="text-xs text-green-700">You're online and ready for deliveries</p>
                      </div>
                    </div>
                  </div>
                </div>
                  {/* Log Out Button */}
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                </div>
              </div>
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
          </div>
        )}
        </div>
      </div>

    </div>
  );

}
