import { useState } from "react";
import {
  Package,
  CheckCircle,
  MapPin,
  Coffee,
  Truck
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardHeader from "@/components/generic/DashboardHeader";
import { pendingDeliveries, completedDeliveries } from "@/lib/delivery/deliveries";
import Sidebar from "@/components/generic/Sidebar";
import { deliveryMenuItems } from "@/lib/delivery/menuItems";
import { useNavigate } from "@tanstack/react-router";

export default function DeliveryList() {
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("deliveries")
  const navigate = useNavigate();

    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <DashboardHeader title="Deliveries" />
  
        <div className="flex flex-1">
          <Sidebar
            menuItems={deliveryMenuItems}
            activeTab="deliveries"
            setActiveTab={() => {}}
            onNavigate={(path) => navigate({ to: path })}
            sidebarOpen={false}
          />
  
          <div className="flex-1 p-8 space-y-8">
            <Tabs defaultValue="pending">
              <TabsList className="grid grid-cols-2 bg-gray-100 rounded-lg p-1">
                <TabsTrigger value="pending" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-[#0052CC]">
                  <Package className="mr-2 h-4 w-4" />
                  Pending ({pendingDeliveries.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-green-600">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Completed ({completedDeliveries.length})
                </TabsTrigger>
              </TabsList>
  
              <TabsContent value="pending" className="mt-6 grid gap-6 md:grid-cols-2">
                {pendingDeliveries.map((delivery) => (
                  <Card key={delivery.id} className={`border-none shadow-lg ${selectedDelivery === delivery.id ? "ring-2 ring-[#0052CC]" : ""}`}>
                    <div className={`h-2 ${delivery.priority === "high" ? "bg-red-500" : delivery.priority === "medium" ? "bg-amber-500" : "bg-green-500"}`} />
                    <CardHeader className="border-b">
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          <Badge className="bg-[#0052CC] text-white">{delivery.id}</Badge>
                          <Badge className={`${delivery.priority === "high" ? "bg-red-100 text-red-700" : delivery.priority === "medium" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                            {delivery.priority.charAt(0).toUpperCase() + delivery.priority.slice(1)} Priority
                          </Badge>
                        </div>
                        <span className="text-sm">{delivery.time}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src={delivery.avatar} />
                          <AvatarFallback>{delivery.customer.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{delivery.customer}</p>
                          <div className="text-sm text-muted-foreground">
                            <MapPin className="inline h-4 w-4 mr-1" />
                            {delivery.location}
                          </div>
                          <div className="mt-3">
                            <span className="text-sm font-semibold">Items:</span>
                            {delivery.items.map((item, i) => (
                              <div key={i} className="flex items-center bg-gray-50 rounded-lg p-2 mt-1 text-sm">
                                <Coffee className="mr-2 h-4 w-4 text-[#0052CC]" /> {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-between bg-gray-50">
                      <Button variant="outline" className="rounded-lg">
                        <MapPin className="mr-2 h-4 w-4" />View on Map
                      </Button>
                      <Button onClick={() => setSelectedDelivery(delivery.id)} className="bg-[#0052CC] rounded-lg">
                        Scan QR Code<Truck className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
  
              <TabsContent value="completed" className="mt-6 grid gap-6 md:grid-cols-2">
                {completedDeliveries.map((delivery) => (
                  <Card key={delivery.id} className="border-none shadow-md">
                    <div className="h-2 bg-green-500" />
                    <CardHeader className="border-b">
                      <div className="flex justify-between">
                        <Badge className="bg-gray-200">{delivery.id}</Badge>
                        <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" /> Delivered</Badge>
                      </div>
                      <span className="text-sm">{delivery.time}</span>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src={delivery.avatar} />
                          <AvatarFallback>{delivery.customer.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{delivery.customer}</p>
                          <div className="text-sm text-muted-foreground">
                            <MapPin className="inline h-4 w-4 mr-1" />
                            {delivery.location}
                          </div>
                          <div className="mt-3">
                            <span className="text-sm font-semibold">Items:</span>
                            {delivery.items.map((item, i) => (
                              <div key={i} className="flex items-center bg-gray-50 rounded-lg p-2 mt-1 text-sm">
                                <Coffee className="mr-2 h-4 w-4 text-gray-500" /> {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
}
