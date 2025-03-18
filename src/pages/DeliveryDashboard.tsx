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
  Search,
  Menu,
  X,
  AlertCircle,
  TrendingUp,
  Truck,
  Zap,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from "@tanstack/react-router"
import { Link } from "@tanstack/react-router";

import logo from '../assets/logo.png'
import deliveryStaffIcon from "../assets/delivery_staff_icon.png"
import avatar1 from "../assets/avatar_1.png"
import avatar2 from "../assets/avatar_2.png"
import avatar3 from "../assets/avatar_3.png"
import avatar4 from "../assets/avatar_4.png"
import avatar5 from "../assets/avatar_5.png"
import avatar6 from "../assets/avatar_6.png"
import avatar7 from "../assets/avatar_7.png"

// Mock data for deliveries
const pendingDeliveries = [
  {
    id: "ORD-1234",
    customer: "Alex Johnson",
    location: "Floor 3, Desk 42",
    items: ["Chicken Salad", "Sparkling Water"],
    status: "ready",
    time: "2 mins ago",
    avatar: avatar1,
    priority: "high",
  },
  {
    id: "ORD-1235",
    customer: "Sarah Miller",
    location: "Floor 2, Meeting Room B",
    items: ["Veggie Wrap", "Green Tea", "Chocolate Brownie"],
    status: "ready",
    time: "5 mins ago",
    avatar: avatar2,
    priority: "medium",
  },
  {
    id: "ORD-1236",
    customer: "David Chen",
    location: "Floor 4, Desk 15",
    items: ["Beef Burger", "Fries", "Cola"],
    status: "ready",
    time: "7 mins ago",
    avatar: avatar3,
    priority: "medium",
  },
  {
    id: "ORD-1237",
    customer: "Lisa Wong",
    location: "Floor 1, Reception",
    items: ["Pasta Carbonara", "Garlic Bread", "Iced Tea"],
    status: "ready",
    time: "10 mins ago",
    avatar: avatar4,
    priority: "low",
  },
]

const completedDeliveries = [
  {
    id: "ORD-1230",
    customer: "Emma Wilson",
    location: "Floor 1, Reception",
    items: ["Caesar Salad", "Orange Juice"],
    status: "completed",
    time: "25 mins ago",
    avatar: avatar5,
  },
  {
    id: "ORD-1231",
    customer: "Michael Brown",
    location: "Floor 3, Desk 28",
    items: ["Tuna Sandwich", "Apple", "Water"],
    status: "completed",
    time: "45 mins ago",
    avatar: avatar6,
  },
  {
    id: "ORD-1232",
    customer: "James Smith",
    location: "Floor 2, Meeting Room A",
    items: ["Chicken Wrap", "Coffee"],
    status: "completed",
    time: "1 hour ago",
    avatar: avatar7,
  },
]

export default function DeliveryDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleLogout = () => {
    // In a real app, you would clear auth state here
    navigate({ to: "/" })
  }

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
              <h1
                className="cursor-pointer"
                onClick={() => navigate({ to: "/delivery-dashboard" })}>
                <img src={logo} alt="Logo" className="w-auto h-10" />
              </h1>
            </div>
            <div className="h-8 w-[1px] bg-gray-200 hidden lg:block"></div>
            <h1 className="text-lg font-semibold md:text-xl">
              {activeTab === "dashboard" && "Delivery Dashboard"}
              {activeTab === "deliveries" && "Deliveries"}
              {activeTab === "map" && "Office Floor Map"}
            </h1>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">

          <Link to="/report-issue" className="flex items-center">
              {/* Round Button */}
              <Button
                variant="outline"
                size="lg" 
                className="rounded-full py-3 px-6 flex items-center space-x-3">
                {/* Report Issue Icon */}
                <AlertCircle className="h-5 w-5 text-red-500" />
                
                {/* Report Issue Text */}
                <span className="text-red-500 text-sm font-semibold">Report Issue</span>
              </Button>
            </Link>


            {/* User menu */}
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border-2 border-[#0052CC]">
                <AvatarImage src={deliveryStaffIcon} alt="Delivery Staff" />
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Delivery Staff</p>
                <p className="text-xs text-muted-foreground">delivery@example.com</p>
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
          <div className="flex h-full flex-col pt-16">
            {/* Navigation */}
            <nav className="flex flex-col h-full space-y-2 px-3 py-6">
              <div className="mb-6 px-3">
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
                variant={activeTab === "deliveries" ? "default" : "ghost"}
                className={`w-full justify-start rounded-lg ${activeTab === "deliveries" ? "bg-[#0052CC]" : ""}`}
                onClick={() => setActiveTab("deliveries")}
              >
                <Package className="mr-2 h-5 w-5" />
                Deliveries
                <Badge className="ml-auto bg-red-500 text-white">{pendingDeliveries.length}</Badge>
              </Button>

              <Button
                variant={activeTab === "map" ? "default" : "ghost"}
                className={`w-full justify-start rounded-lg ${activeTab === "map" ? "bg-[#0052CC]" : ""}`}
                onClick={() => setActiveTab("map")}
              >
                <MapPin className="mr-2 h-5 w-5" />
                Office Map
              </Button>

            </nav>

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

            {/* User profile */}
            <div className="border-t p-4 mt-auto">
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
                    <h2 className="text-2xl font-bold">Welcome back, Delivery Staff!</h2>
                    <p className="mt-1 text-blue-100">
                      You have {pendingDeliveries.length} deliveries waiting for you today.
                    </p>
                  </div>
                  <Button className="bg-white text-[#0052CC] hover:bg-blue-50"
                  onClick={() => {
                    setActiveTab("deliveries");
                    window.scrollTo(0, 0);
                  }}>
                    Start Delivering
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Stats cards */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="overflow-hidden border-none shadow-md">
                  <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-gradient-to-br from-[#0052CC]/10 to-[#0052CC]/30"></div>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Deliveries</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-[#0052CC]/10 flex items-center justify-center">
                      <Package className="h-4 w-4 text-[#0052CC]" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-[#0052CC]">{pendingDeliveries.length}</div>
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
                    <div className="text-3xl font-bold text-green-600">{completedDeliveries.length}</div>
                    <div className="mt-1 flex items-center text-xs">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        +1 from yesterday
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-none shadow-md">
                  <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-gradient-to-br from-amber-100 to-amber-200"></div>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Delivery Time</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-amber-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-amber-600">4.2 min</div>
                    <div className="mt-1 flex items-center text-xs">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        -0.5 min from yesterday
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
                    <div className="text-3xl font-bold text-purple-600">4.9/5</div>
                    <div className="mt-1 flex items-center text-xs">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        +0.2 from last week
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent deliveries */}
              <Card className="border-none shadow-lg">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                <div className="flex items-center justify-between mt-4">
                    <CardTitle >Recent Deliveries</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg mt-2"
                      onClick={() => {
                        setActiveTab("deliveries");
                        window.scrollTo(0, 0);
                      }}
                    >
                      View All
                    </Button>
                  </div>
                  <CardDescription>Your most recent deliveries and their status</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {[...pendingDeliveries, ...completedDeliveries].slice(0, 4).map((delivery) => (
                      <div key={delivery.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                        <Avatar className="h-10 w-10 border border-gray-200">
                          <AvatarImage src={delivery.avatar} alt={delivery.customer} />
                          <AvatarFallback>
                            {delivery.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{delivery.customer}</p>
                            <Badge
                              variant={delivery.status === "completed" ? "outline" : "default"}
                              className={
                                delivery.status === "completed"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-[#0052CC]"
                              }
                            >
                              {delivery.status === "completed" ? "Delivered" : "Ready for Pickup"}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-3 w-3" />
                              {delivery.location}
                            </div>
                            <p className="text-xs text-muted-foreground">{delivery.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

            </div>
          )}

          {activeTab === "deliveries" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Deliveries</h2>
              </div>

              <Tabs defaultValue="pending" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-lg p-1 bg-gray-100">
                  <TabsTrigger
                    value="pending"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:text-[#0052CC] data-[state=active]:shadow"
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Pending ({pendingDeliveries.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="completed"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Completed ({completedDeliveries.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {pendingDeliveries.map((delivery) => (
                      <Card
                        key={delivery.id}
                        className={`overflow-hidden border-none shadow-lg transition-all hover:shadow-xl ${
                          selectedDelivery === delivery.id ? "ring-2 ring-[#0052CC]" : ""
                        }`}
                      >
                        <div
                          className={`h-2 w-full ${
                            delivery.priority === "high"
                              ? "bg-red-500"
                              : delivery.priority === "medium"
                                ? "bg-amber-500"
                                : "bg-green-500"
                          }`}
                        ></div>
                        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 pb-3 border-b">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-[#0052CC] text-white border-none mt-3">
                                {delivery.id}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={`
                                border-none mt-3
                                ${
                                  delivery.priority === "high"
                                    ? "bg-red-100 text-red-700"
                                    : delivery.priority === "medium"
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-green-100 text-green-700"
                                }
                              `}
                              >
                                {delivery.priority === "high"
                                  ? "High Priority"
                                  : delivery.priority === "medium"
                                    ? "Medium Priority"
                                    : "Low Priority"}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium mt-3">{delivery.time}</p>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12 border-2 border-gray-200">
                              <AvatarImage src={delivery.avatar} alt={delivery.customer} />
                              <AvatarFallback>
                                {delivery.customer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium text-lg">{delivery.customer}</p>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <MapPin className="mr-1 h-3 w-3" />
                                {delivery.location}
                              </div>
                              <div className="mt-4">
                                <p className="text-sm font-medium mb-2">Items:</p>
                                <div className="grid grid-cols-1 gap-2">
                                  {delivery.items.map((item, index) => (
                                    <div key={index} className="flex items-center rounded-lg bg-gray-50 p-2 text-sm">
                                      <Coffee className="mr-2 h-4 w-4 text-[#0052CC]" />
                                      {item}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t bg-gray-50 px-6 py-4">
                          <Button
                            variant="outline"
                            onClick={() => setActiveTab("map")}
                            className="rounded-lg border-gray-300"
                          >
                            <MapPin className="mr-2 h-4 w-4" />
                            View on Map
                          </Button>
                          <Button
                            onClick={() => setSelectedDelivery(delivery.id)}
                            className="bg-[#0052CC] rounded-lg shadow-md hover:shadow-lg transition-all"
                          >
                            Scan QR Code
                            <Truck className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="completed" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {completedDeliveries.map((delivery) => (
                      <Card key={delivery.id} className="overflow-hidden border-none shadow-md">
                        <div className="h-2 w-full bg-green-500"></div>
                        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 pb-3 border-b">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 mt-4">
                              <Badge variant="outline" className="bg-gray-200 text-gray-700 border-none">
                                {delivery.id}
                              </Badge>
                              <Badge variant="outline" className="bg-green-100 text-green-700 border-none">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Delivered
                              </Badge>
                            </div>
                            <p className="text-sm font-medium">{delivery.time}</p>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12 border-2 border-gray-200">
                              <AvatarImage src={delivery.avatar} alt={delivery.customer} />
                              <AvatarFallback>
                                {delivery.customer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium text-lg">{delivery.customer}</p>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <MapPin className="mr-1 h-3 w-3" />
                                {delivery.location}
                              </div>
                              <div className="mt-4">
                                <p className="text-sm font-medium mb-2">Items:</p>
                                <div className="grid grid-cols-1 gap-2">
                                  {delivery.items.map((item, index) => (
                                    <div key={index} className="flex items-center rounded-lg bg-gray-50 p-2 text-sm">
                                      <Coffee className="mr-2 h-4 w-4 text-gray-500" />
                                      {item}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {activeTab === "map" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Office Floor Map</h2>
              </div>

              <Card className="border-none shadow-lg">
                <CardContent className="p-0">
                  <div className="aspect-[16/9] w-full bg-gray-100 flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-gray-500" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Map View </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

