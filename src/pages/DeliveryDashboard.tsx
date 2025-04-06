import { useState, useEffect } from "react";
import {
  Package,
  MapPin,
  CheckCircle,
  Clock,
  ChevronRight,
  Coffee,
  Truck,
  Award,
  Navigation,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatButton } from "@/components/generic/ChatButton";
import { ChatProvider } from "@/components/generic/ChatContext";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

import floor1 from "../assets/floor-1.png";
import floor2 from "../assets/floor-2.png";
import floor3 from "../assets/floor-3.png";
import floor4 from "../assets/floor-4.png";
import DashboardHeader from "@/components/generic/DashboardHeader";
import { completedDeliveries, pendingDeliveries } from "@/lib/delivery/deliveries";
import { DeliverySidebar } from "@/components/customized/sidebar/DeliverySidebar";

const allDeliveries = [...pendingDeliveries, ...completedDeliveries];

export default function DeliveryDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
  const [activeFloor, setActiveFloor] = useState("1");
  const [highlightedDesk, setHighlightedDesk] = useState<{ floor: string; deskId: string } | null>(null);

  const viewOnMap = (delivery: any) => {
    setActiveTab("map");
    setActiveFloor(delivery.floor);
    setHighlightedDesk({
      floor: delivery.floor,
      deskId: delivery.deskId,
    });

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 300);
  };

  useEffect(() => {
    if (activeTab !== "map") {
      setHighlightedDesk(null);
    }
  }, [activeTab]);

  const getDeliveriesForFloor = (floor: string) => {
    return allDeliveries.filter((delivery) => delivery.floor === floor);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <DashboardHeader
        title={
          activeTab === "dashboard"
            ? "Delivery Dashboard"
            : activeTab === "deliveries"
              ? "Deliveries"
              : "Office Floor Map"
        }
      />

      <div className="flex-1 flex max-h-96">
        <SidebarProvider defaultOpen={!sidebarOpen}>
          <DeliverySidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            pendingDeliveriesCount={pendingDeliveries.length}
          />

          <SidebarInset className="flex-1 flex flex-col">
            <div className="flex items-center h-12 px-4 border-b mt-4">
              <SidebarTrigger className="mr-2 hover:bg-gray-100 rounded-md transition-colors" />
              <span className="font-medium text-sm text-muted-foreground">
                {activeTab === "dashboard"
                  ? "Overview"
                  : activeTab === "deliveries"
                    ? "All Deliveries"
                    : "Floor Navigation"}
              </span>
            </div>

            <div className="flex-1 px-4 py-6 md:px-6 lg:px-8 overflow-auto">
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
                      <Button
                        className="bg-white text-[#0052CC] hover:bg-blue-50"
                        onClick={() => {
                          setActiveTab("deliveries")
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          })
                        }}
                      >
                        Start Delivering
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Stats cards */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="overflow-hidden border-none shadow-md">
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
                        <CardTitle>Recent Deliveries</CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg mt-2"
                          onClick={() => {
                            setActiveTab("deliveries")
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            })
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
                          <div
                            key={delivery.id}
                            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                          >
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
                                        <div
                                          key={index}
                                          className="flex items-center rounded-lg bg-gray-50 p-2 text-sm"
                                        >
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
                                onClick={() => viewOnMap(delivery)}
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
                                        <div
                                          key={index}
                                          className="flex items-center rounded-lg bg-gray-50 p-2 text-sm"
                                        >
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
                    {/* Key for Pin Colors */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                        <span>Delivered</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#0052CC] mr-2"></div>
                        <span>Pending</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-red-500 mr-2"></div>
                        <span>High Priority</span>
                      </div>
                    </div>
                  </div>

                  <Card className="border-none shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                      <div className="flex items-center justify-between mt-8">
                        <CardTitle>Floor Maps</CardTitle>
                        <CardDescription>Navigate through different floors to find delivery locations</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Tabs value={activeFloor} onValueChange={setActiveFloor} className="w-full">
                        <div className="border-b">
                          <TabsList className="flex w-full rounded-none bg-transparent h-12 border-b">
                            <TabsTrigger
                              value="1"
                              className="
                              flex-1 translate-y-[-10px]  /* Moves the tab name up */
                              border-b-2 border-transparent 
                              data-[state=active]:border-[#0052CC] 
                              data-[state=active]:bg-transparent 
                              data-[state=active]:text-[#0052CC] 
                              data-[state=active]:rounded-lg  /* Adds rounded corners to active tab */
                            "
                            >
                              Floor 1
                            </TabsTrigger>
                            <TabsTrigger
                              value="2"
                              className="
                              flex-1 translate-y-[-10px]  /* Moves the tab name up */
                              border-b-2 border-transparent 
                              data-[state=active]:border-[#0052CC] 
                              data-[state=active]:bg-transparent 
                              data-[state=active]:text-[#0052CC] 
                              data-[state=active]:rounded-lg  /* Adds rounded corners to active tab */
                            "
                            >
                              Floor 2
                            </TabsTrigger>
                            <TabsTrigger
                              value="3"
                              className="
                              flex-1 translate-y-[-10px]  /* Moves the tab name up */
                              border-b-2 border-transparent 
                              data-[state=active]:border-[#0052CC] 
                              data-[state=active]:bg-transparent 
                              data-[state=active]:text-[#0052CC] 
                              data-[state=active]:rounded-lg  /* Adds rounded corners to active tab */
                            "
                            >
                              Floor 3
                            </TabsTrigger>
                            <TabsTrigger
                              value="4"
                              className="
                              flex-1 translate-y-[-10px]  /* Moves the tab name up */
                              border-b-2 border-transparent 
                              data-[state=active]:border-[#0052CC] 
                              data-[state=active]:bg-transparent 
                              data-[state=active]:text-[#0052CC] 
                              data-[state=active]:rounded-lg  /* Adds rounded corners to active tab */
                            "
                            >
                              Floor 4
                            </TabsTrigger>
                          </TabsList>
                        </div>

                        {/* Floor 1 Map */}
                        <TabsContent value="1" className="mt-0">
                          <div className="relative aspect-[16/9] w-full bg-gray-100 p-4">
                            <div className="h-full w-full bg-white rounded-lg border border-gray-200 relative">
                              <img
                                src={floor1 || "/placeholder.svg"}
                                alt="Floor 2 Plan"
                                className="absolute inset-0 w-full h-full object-contain"
                              />
                              <div className="absolute top-4 left-4 bg-white rounded-md shadow-md p-2">
                                <h3 className="text-sm font-bold">Floor 1</h3>
                                <p className="text-xs text-muted-foreground">Reception & Lobby Area</p>
                              </div>

                              {/* Your location indicator */}
                              <div className="absolute" style={{ top: "59%", left: "10%" }}>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white animate-pulse">
                                  <Navigation className="h-5 w-5" />
                                </div>
                                <div className="mt-1 rounded-md bg-white px-2 py-1 text-xs font-medium shadow-sm">
                                  Your Location
                                </div>
                              </div>

                              {/* Delivery markers for this floor */}
                              {getDeliveriesForFloor("1").map((delivery) => (
                                <div
                                  key={delivery.id}
                                  className="absolute"
                                  style={{
                                    top: `${delivery.coordinates.y}%`,
                                    left: `${delivery.coordinates.x}%`,
                                  }}
                                >
                                  <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full
                                      ${
                                        highlightedDesk &&
                                        highlightedDesk.floor === delivery.floor &&
                                        highlightedDesk.deskId === delivery.deskId
                                          ? "bg-red-500 text-white animate-bounce"
                                          : delivery.status === "completed"
                                            ? "bg-green-500 text-white"
                                            : "bg-[#0052CC] text-white"
                                      }`}
                                  >
                                    <MapPin className="h-5 w-5" />
                                  </div>
                                  <div
                                    className={`mt-1 rounded-md bg-white px-2 py-1 text-xs font-medium shadow-sm
                                    ${
                                      highlightedDesk &&
                                      highlightedDesk.floor === delivery.floor &&
                                      highlightedDesk.deskId === delivery.deskId
                                        ? "ring-2 ring-red-500"
                                        : ""
                                    }`}
                                  >
                                    {delivery.customer} - {delivery.deskId}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        {/* Floor 2 Map */}
                        <TabsContent value="2" className="mt-0">
                          <div className="relative aspect-[16/9] w-full bg-gray-100 p-4">
                            <div className="h-full w-full bg-white rounded-lg border border-gray-200 relative">
                              <img
                                src={floor2 || "/placeholder.svg"}
                                alt="Floor 2 Plan"
                                className="absolute inset-0 w-full h-full object-contain"
                              />

                              <div className="absolute top-4 left-4 bg-white/90 rounded-md shadow-md p-2 z-10">
                                <h3 className="text-sm font-bold">Floor 2</h3>
                                <p className="text-xs text-muted-foreground">Meeting Rooms & Open Space</p>
                              </div>

                              {/* Delivery markers for this floor */}
                              {getDeliveriesForFloor("2").map((delivery) => (
                                <div
                                  key={delivery.id}
                                  className="absolute z-20"
                                  style={{
                                    top: `${delivery.coordinates.y}%`,
                                    left: `${delivery.coordinates.x}%`,
                                  }}
                                >
                                  <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full
                                      ${
                                        highlightedDesk &&
                                        highlightedDesk.floor === delivery.floor &&
                                        highlightedDesk.deskId === delivery.deskId
                                          ? "bg-red-500 text-white animate-bounce"
                                          : delivery.status === "completed"
                                            ? "bg-green-500 text-white"
                                            : "bg-[#0052CC] text-white"
                                      }`}
                                  >
                                    <MapPin className="h-5 w-5" />
                                  </div>
                                  <div
                                    className={`mt-1 rounded-md bg-white px-2 py-1 text-xs font-medium shadow-sm
                                    ${
                                      highlightedDesk &&
                                      highlightedDesk.floor === delivery.floor &&
                                      highlightedDesk.deskId === delivery.deskId
                                        ? "ring-2 ring-red-500"
                                        : ""
                                    }`}
                                  >
                                    {delivery.customer} - {delivery.deskId}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        {/* Floor 3 Map */}
                        <TabsContent value="3" className="mt-0">
                          <div className="relative aspect-[16/9] w-full bg-gray-100 p-4">
                            <div className="h-full w-full bg-white rounded-lg border border-gray-200 relative">
                              <img
                                src={floor3 || "/placeholder.svg"}
                                alt="Floor 3 Plan"
                                className="absolute inset-0 w-full h-full object-contain"
                              />

                              <div className="absolute top-4 left-4 bg-white/90 rounded-md shadow-md p-2 z-10">
                                <h3 className="text-sm font-bold">Floor 3</h3>
                                <p className="text-xs text-muted-foreground">Engineering & Product Teams</p>
                              </div>

                              {/* Delivery markers for this floor */}
                              {getDeliveriesForFloor("3").map((delivery) => (
                                <div
                                  key={delivery.id}
                                  className="absolute z-20"
                                  style={{
                                    top: `${delivery.coordinates.y}%`,
                                    left: `${delivery.coordinates.x}%`,
                                  }}
                                >
                                  <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full
                                      ${
                                        highlightedDesk &&
                                        highlightedDesk.floor === delivery.floor &&
                                        highlightedDesk.deskId === delivery.deskId
                                          ? "bg-red-500 text-white animate-bounce"
                                          : delivery.status === "completed"
                                            ? "bg-green-500 text-white"
                                            : "bg-[#0052CC] text-white"
                                      }`}
                                  >
                                    <MapPin className="h-5 w-5" />
                                  </div>
                                  <div
                                    className={`mt-1 rounded-md bg-white px-2 py-1 text-xs font-medium shadow-sm
                                    ${
                                      highlightedDesk &&
                                      highlightedDesk.floor === delivery.floor &&
                                      highlightedDesk.deskId === delivery.deskId
                                        ? "ring-2 ring-red-500"
                                        : ""
                                    }`}
                                  >
                                    {delivery.customer} - {delivery.deskId}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        {/* Floor 4 Map */}
                        <TabsContent value="4" className="mt-0">
                          <div className="relative aspect-[16/9] w-full bg-gray-100 p-4">
                            <div className="h-full w-full bg-white rounded-lg border border-gray-200 relative">
                              <div className="absolute top-4 left-4 bg-white rounded-md shadow-md p-2">
                                <h3 className="text-sm font-bold">Floor 4</h3>
                                <p className="text-xs text-muted-foreground">Executive Offices & Finance</p>
                              </div>

                              <img
                                src={floor4 || "/placeholder.svg"}
                                alt="Floor 4 Plan"
                                className="absolute inset-0 w-full h-full object-contain"
                              />

                              {/* Delivery markers for this floor */}
                              {getDeliveriesForFloor("4").map((delivery) => (
                                <div
                                  key={delivery.id}
                                  className="absolute"
                                  style={{
                                    top: `${delivery.coordinates.y}%`,
                                    left: `${delivery.coordinates.x}%`,
                                  }}
                                >
                                  <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full
                                      ${
                                        highlightedDesk &&
                                        highlightedDesk.floor === delivery.floor &&
                                        highlightedDesk.deskId === delivery.deskId
                                          ? "bg-red-500 text-white animate-bounce"
                                          : delivery.status === "completed"
                                            ? "bg-green-500 text-white"
                                            : "bg-[#0052CC] text-white"
                                      }`}
                                  >
                                    <MapPin className="h-5 w-5" />
                                  </div>
                                  <div
                                    className={`mt-1 rounded-md bg-white px-2 py-1 text-xs font-medium shadow-sm
                                    ${
                                      highlightedDesk &&
                                      highlightedDesk.floor === delivery.floor &&
                                      highlightedDesk.deskId === delivery.deskId
                                        ? "ring-2 ring-red-500"
                                        : ""
                                    }`}
                                  >
                                    {delivery.customer} - {delivery.deskId}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>

                  {/* Nearby deliveries on this floor */}
                  <Card className="border-none shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                      <div className="flex items-center justify-between mt-5">
                        <CardTitle>Deliveries on Floor {activeFloor}</CardTitle>
                        <Badge className="bg-[#0052CC]">{getDeliveriesForFloor(activeFloor).length} Deliveries</Badge>
                      </div>
                      <CardDescription>All deliveries located on the current floor</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {getDeliveriesForFloor(activeFloor).map((delivery) => (
                          <div
                            key={delivery.id}
                            className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer
                              ${
                                highlightedDesk &&
                                highlightedDesk.floor === delivery.floor &&
                                highlightedDesk.deskId === delivery.deskId
                                  ? "bg-red-50"
                                  : ""
                              }`}
                            onClick={() =>
                              setHighlightedDesk({
                                floor: delivery.floor,
                                deskId: delivery.deskId,
                              })
                            }
                          >
                            <div
                              className={`h-10 w-10 rounded-full flex items-center justify-center
                              ${
                                delivery.status === "completed"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-[#0052CC]/10 text-[#0052CC]"
                              }`}
                            >
                              <MapPin className="h-5 w-5" />
                            </div>
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

                        {getDeliveriesForFloor(activeFloor).length === 0 && (
                          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                              <Package className="h-6 w-6 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium mb-1">No Deliveries</h3>
                            <p className="text-sm text-muted-foreground max-w-md">
                              There are currently no deliveries scheduled for Floor {activeFloor}.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              <ChatProvider>
                <ChatButton />
              </ChatProvider>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
