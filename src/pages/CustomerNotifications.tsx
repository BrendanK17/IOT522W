"use client"

import { useState } from "react"
import { Bell, CheckCircle, Clock, Send, Search, Package, Coffee, MessageSquare, MoreVertical } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { CustomerSidebar } from "@/components/customized/sidebar/CustomerSidebar"
import DashboardHeader from "@/components/generic/DashboardHeader"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Define types for our data
interface DeliveryNotification {
  id: string
  staffName: string
  staffAvatar: string
  message: string
  timestamp: string
  orderId: string
  items: string[]
  status: "on_the_way" | "delivered" | "preparing"
  location: string
  isRead: boolean
}

// Sample delivery notifications
const deliveryNotifications: DeliveryNotification[] = [
  {
    id: "notif-1",
    staffName: "Alex Johnson",
    staffAvatar: "/placeholder.svg?height=40&width=40",
    message: "Hi there! I'll be at your desk in about 5 minutes with your cappuccino and blueberry muffin.",
    timestamp: "Just now",
    orderId: "ORD-1007",
    items: ["Cappuccino", "Blueberry Muffin"],
    status: "on_the_way",
    location: "Floor 2, Desk 2B",
    isRead: false,
  },
  {
    id: "notif-2",
    staffName: "Maria Garcia",
    staffAvatar: "/placeholder.svg?height=40&width=40",
    message: "Hello! I'm on my way with your chicken salad and sparkling water. Will be at your desk in 5 minutes.",
    timestamp: "10 minutes ago",
    orderId: "ORD-1006",
    items: ["Chicken Salad", "Sparkling Water"],
    status: "delivered",
    location: "Floor 3, Meeting Room A",
    isRead: true,
  },
  {
    id: "notif-3",
    staffName: "James Wilson",
    staffAvatar: "/placeholder.svg?height=40&width=40",
    message: "Your breakfast platter and orange juice are ready! I'll be at your desk in about 5 minutes.",
    timestamp: "Yesterday, 8:55 AM",
    orderId: "ORD-1005",
    items: ["Breakfast Platter", "Orange Juice"],
    status: "delivered",
    location: "Floor 1, Desk 1C",
    isRead: true,
  },
  {
    id: "notif-4",
    staffName: "Sarah Chen",
    staffAvatar: "/placeholder.svg?height=40&width=40",
    message: "I'm on my way with your veggie wrap and iced tea. Should be at your desk in about 5 minutes!",
    timestamp: "April 2, 12:25 PM",
    orderId: "ORD-1004",
    items: ["Veggie Wrap", "Iced Tea"],
    status: "delivered",
    location: "Floor 2, Desk 2D",
    isRead: true,
  },
]

export default function CustomerNotifications() {
  const [activeNotification, setActiveNotification] = useState<string | null>("notif-1")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [newMessage, setNewMessage] = useState<string>("")
  const [notifications, setNotifications] = useState(deliveryNotifications)
  const [activeTab, setActiveTab] = useState("orders");
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Filter notifications based on search term
  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.items.some((item) => item.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Get active notification
  const activeNotificationData = notifications.find((n) => n.id === activeNotification)

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    // In a real app, you would send this to an API
    // For now, we'll just clear the input
    setNewMessage("")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
        <DashboardHeader
        title={
        activeTab === 'dashboard' ? 'Dashboard' : 
        activeTab === 'schedule' ? 'Schedule' :
        activeTab === 'notifications' ? 'Notifications' : 'Notifications'
                }
              />
        <div className="flex-1 flex max-h-96">
        <SidebarProvider defaultOpen={!sidebarOpen}>
          <CustomerSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <SidebarInset className="flex-1 flex flex-col">
            <div className="flex items-center h-12 px-4 border-b">
              <SidebarTrigger className="mr-2 hover:bg-gray-100 rounded-md transition-colors" />
              <span className="font-medium text-sm text-muted-foreground">
                {activeTab === "dashboard"
                ? "Overview"
                : activeTab === "schedule"
                ? "Schedule Overview"
                : activeTab === "notifications"
                ? "Recent Notifications"
                : "Chat"
                }
              </span>
            </div>        

            {/* Main chat interface */}
            <div className="flex h-full">
              {/* Left sidebar - notifications list */}
              <div className="w-80 border-r flex flex-col bg-gray-50">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold">Delivery Updates</h2>
                    <Badge className="bg-[#0052CC]">{notifications.filter((n) => !n.isRead).length}</Badge>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search notifications"
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <Tabs defaultValue="all" className="flex-1 flex flex-col">
                  <TabsList className="grid w-full grid-cols-2 px-4 py-2">
                    <TabsTrigger value="all">All Updates</TabsTrigger>
                    <TabsTrigger value="unread">Unread</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="flex-1 overflow-auto p-0">
                    <div className="divide-y">
                      {filteredNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`flex items-start gap-3 p-3 cursor-pointer hover:bg-gray-100 transition-colors
                            ${activeNotification === notification.id ? "bg-blue-50" : ""}
                            ${!notification.isRead ? "bg-blue-50/50" : ""}
                          `}
                          onClick={() => {
                            setActiveNotification(notification.id)
                            if (!notification.isRead) {
                              markAsRead(notification.id)
                            }
                          }}
                        >
                          <div className="relative mt-1">
                            <Avatar>
                              <AvatarImage src={notification.staffAvatar} alt={notification.staffName} />
                              <AvatarFallback>{notification.staffName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {!notification.isRead && (
                              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#0052CC] border-2 border-white"></span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <p className="font-medium truncate">{notification.staffName}</p>
                              <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                {notification.timestamp}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{notification.message}</p>
                            <div className="flex items-center mt-1">
                              <Badge
                                variant="outline"
                                className={
                                  notification.status === "delivered"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : notification.status === "on_the_way"
                                      ? "bg-blue-50 text-blue-700 border-blue-200"
                                      : "bg-amber-50 text-amber-700 border-amber-200"
                                }
                              >
                                {notification.status === "delivered"
                                  ? "Delivered"
                                  : notification.status === "on_the_way"
                                    ? "On the way"
                                    : "Preparing"}
                              </Badge>
                              <span className="text-xs text-muted-foreground ml-2">{notification.orderId}</span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {filteredNotifications.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                            <Bell className="h-6 w-6 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium mb-1">No notifications found</h3>
                          <p className="text-sm text-muted-foreground max-w-md">
                            Try adjusting your search or check back later
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="unread" className="flex-1 overflow-auto p-0">
                    <div className="divide-y">
                      {filteredNotifications
                        .filter((n) => !n.isRead)
                        .map((notification) => (
                          <div
                            key={notification.id}
                            className={`flex items-start gap-3 p-3 cursor-pointer hover:bg-gray-100 transition-colors
                            ${activeNotification === notification.id ? "bg-blue-50" : ""}
                            bg-blue-50/50
                          `}
                            onClick={() => {
                              setActiveNotification(notification.id)
                              markAsRead(notification.id)
                            }}
                          >
                            <div className="relative mt-1">
                              <Avatar>
                                <AvatarImage src={notification.staffAvatar} alt={notification.staffName} />
                                <AvatarFallback>{notification.staffName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#0052CC] border-2 border-white"></span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <p className="font-medium truncate">{notification.staffName}</p>
                                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                  {notification.timestamp}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">{notification.message}</p>
                              <div className="flex items-center mt-1">
                                <Badge
                                  variant="outline"
                                  className={
                                    notification.status === "delivered"
                                      ? "bg-green-50 text-green-700 border-green-200"
                                      : notification.status === "on_the_way"
                                        ? "bg-blue-50 text-blue-700 border-blue-200"
                                        : "bg-amber-50 text-amber-700 border-amber-200"
                                  }
                                >
                                  {notification.status === "delivered"
                                    ? "Delivered"
                                    : notification.status === "on_the_way"
                                      ? "On the way"
                                      : "Preparing"}
                                </Badge>
                                <span className="text-xs text-muted-foreground ml-2">{notification.orderId}</span>
                              </div>
                            </div>
                          </div>
                        ))}

                      {filteredNotifications.filter((n) => !n.isRead).length === 0 && (
                        <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                            <CheckCircle className="h-6 w-6 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium mb-1">All caught up!</h3>
                          <p className="text-sm text-muted-foreground max-w-md">You have no unread notifications</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right side - message detail */}
              {activeNotificationData ? (
                <div className="flex-1 flex flex-col">
                  {/* Message header */}
                  <div className="h-16 border-b flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={activeNotificationData.staffAvatar} alt={activeNotificationData.staffName} />
                        <AvatarFallback>{activeNotificationData.staffName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{activeNotificationData.staffName}</h3>
                        <p className="text-xs text-muted-foreground">
                          Delivery Staff • {activeNotificationData.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Message content */}
                  <div className="flex-1 overflow-auto p-6 bg-gray-50">
                    <Card className="mb-6 border-none shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="mt-1">
                            <AvatarImage
                              src={activeNotificationData.staffAvatar}
                              alt={activeNotificationData.staffName}
                            />
                            <AvatarFallback>{activeNotificationData.staffName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <h3 className="font-medium">{activeNotificationData.staffName}</h3>
                              <span className="text-xs text-muted-foreground">{activeNotificationData.timestamp}</span>
                            </div>
                            <p className="text-gray-700 mb-4">{activeNotificationData.message}</p>

                            <div className="bg-white rounded-lg border p-4">
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                  <Package className="h-4 w-4 text-[#0052CC] mr-2" />
                                  <span className="font-medium">{activeNotificationData.orderId}</span>
                                </div>
                                <Badge
                                  className={
                                    activeNotificationData.status === "delivered"
                                      ? "bg-green-100 text-green-700"
                                      : activeNotificationData.status === "on_the_way"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-amber-100 text-amber-700"
                                  }
                                >
                                  {activeNotificationData.status === "delivered"
                                    ? "Delivered"
                                    : activeNotificationData.status === "on_the_way"
                                      ? "On the way"
                                      : "Preparing"}
                                </Badge>
                              </div>

                              <div className="flex items-center text-sm text-muted-foreground mb-3">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>Delivery location: {activeNotificationData.location}</span>
                              </div>

                              <div className="space-y-2">
                                <p className="text-sm font-medium">Items:</p>
                                <div className="flex flex-wrap gap-2">
                                  {activeNotificationData.items.map((item, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center bg-gray-100 rounded-md px-3 py-1.5 text-sm"
                                    >
                                      <Coffee className="h-4 w-4 mr-2 text-[#0052CC]" />
                                      {item}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Previous messages would go here */}
                    <div className="text-center text-sm text-muted-foreground py-4">
                      <p>This is the beginning of your conversation with {activeNotificationData.staffName}</p>
                    </div>
                  </div>

                  {/* Message input */}
                  <div className="p-4 border-t bg-white">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Type a message..."
                        className="flex-1"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage()
                          }
                        }}
                      />
                      <Button className="bg-[#0052CC]" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No message selected</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Select a notification from the list to view details
                    </p>
                  </div>
                </div>
              )}
            </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
    </div>
  )
}

