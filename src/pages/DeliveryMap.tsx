import { useEffect, useState } from "react"
import { MapPin, Navigation } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import floor1 from "../assets/floor-1.png"
import floor2 from "../assets/floor-2.png"
import floor3 from "../assets/floor-3.png"
import floor4 from "../assets/floor-4.png"
import { completedDeliveries, pendingDeliveries } from "@/lib/delivery/deliveries"
import DashboardHeader from "@/components/generic/DashboardHeader"
import Sidebar from "@/components/generic/Sidebar"
import { useNavigate } from "@tanstack/react-router"
import { deliveryMenuItems } from "@/lib/delivery/menuItems"

const allDeliveries = [...pendingDeliveries, ...completedDeliveries]

export default function DeliveryMap() {
  const [activeFloor, setActiveFloor] = useState("1")
  const [highlightedDesk, setHighlightedDesk] = useState<{ floor: string; deskId: string } | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("map")
  const navigate = useNavigate();

  const getDeliveriesForFloor = (floor: string) => {
    return allDeliveries.filter((delivery) => delivery.floor === floor)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <DashboardHeader title="Office Map" />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          menuItems={deliveryMenuItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onNavigate={(path) => navigate({ to: path })}
          sidebarOpen={sidebarOpen}
        />

        <div className="flex-1 px-8 py-6 md:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
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
                    {["1", "2", "3", "4"].map((floor) => (
                      <TabsTrigger
                        key={floor}
                        value={floor}
                        className="flex-1 translate-y-[-10px] border-b-2 border-transparent data-[state=active]:border-[#0052CC] data-[state=active]:bg-transparent data-[state=active]:text-[#0052CC] data-[state=active]:rounded-lg"
                      >
                        Floor {floor}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {[floor1, floor2, floor3, floor4].map((imgSrc, index) => {
                  const floorNum = (index + 1).toString()
                  return (
                    <TabsContent key={floorNum} value={floorNum} className="mt-0">
                      <div className="relative aspect-[16/9] w-full bg-gray-100 p-4">
                        <div className="h-full w-full bg-white rounded-lg border border-gray-200 relative">
                          <img src={imgSrc} alt={`Floor ${floorNum}`} className="absolute inset-0 w-full h-full object-contain" />

                          <div className="absolute top-4 left-4 bg-white/90 rounded-md shadow-md p-2 z-10">
                            <h3 className="text-sm font-bold">Floor {floorNum}</h3>
                            <p className="text-xs text-muted-foreground">
                              {floorNum === "1"
                                ? "Reception & Lobby Area"
                                : floorNum === "2"
                                ? "Meeting Rooms & Open Space"
                                : floorNum === "3"
                                ? "Engineering & Product Teams"
                                : "Executive Offices & Finance"}
                            </p>
                          </div>

                          {/* Your location marker */}
                          {floorNum === "1" && (
                            <div className="absolute" style={{ top: "59%", left: "10%" }}>
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white animate-pulse">
                                <Navigation className="h-5 w-5" />
                              </div>
                              <div className="mt-1 rounded-md bg-white px-2 py-1 text-xs font-medium shadow-sm">
                                Your Location
                              </div>
                            </div>
                          )}

                          {/* Delivery markers */}
                          {getDeliveriesForFloor(floorNum).map((delivery) => (
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
                                    highlightedDesk?.floor === delivery.floor &&
                                    highlightedDesk?.deskId === delivery.deskId
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
                                    highlightedDesk?.floor === delivery.floor &&
                                    highlightedDesk?.deskId === delivery.deskId
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
                  )
                })}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
