import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Clock, Coffee, Package, Truck, MapPin, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import DashboardHeader from "@/components/generic/DashboardHeader"
import { CustomerSidebar } from "@/components/customized/sidebar/CustomerSidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

// Helper functions for date manipulation
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay()
}

// Sample delivery data
const sampleDeliveries = [
  {
    id: "DEL-1001",
    date: new Date(2025, 3, 8),
    time: "10:30-10:45",
    items: ["Cappuccino", "Blueberry Muffin"],
    status: "scheduled",
    location: "Floor 2, Desk 2B",
    notes: "Please deliver to reception if I'm not at my desk",
  },
  {
    id: "DEL-1002",
    date: new Date(2025, 3, 12),
    time: "14:15-14:30",
    items: ["Chicken Salad", "Sparkling Water"],
    status: "scheduled",
    location: "Floor 3, Meeting Room A",
    notes: "For the team meeting",
  },
  {
    id: "DEL-1003",
    date: new Date(2025, 3, 15),
    time: "09:00-09:15",
    items: ["Breakfast Platter", "Orange Juice"],
    status: "scheduled",
    location: "Floor 1, Desk 1C",
    notes: "",
  },
  {
    id: "DEL-1004",
    date: new Date(2025, 3, 15),
    time: "12:30-12:45",
    items: ["Veggie Wrap", "Iced Tea"],
    status: "scheduled",
    location: "Floor 2, Desk 2D",
    notes: "",
  },
  {
    id: "DEL-1005",
    date: new Date(2025, 3, 22),
    time: "11:45-12:00",
    items: ["Caesar Salad", "Lemonade"],
    status: "scheduled",
    location: "Floor 4, Executive Suite",
    notes: "Please call when arriving",
  },
  {
    id: "DEL-1006",
    date: new Date(2025, 3, 28),
    time: "15:00-15:15",
    items: ["Coffee Box (12 cups)", "Assorted Pastries"],
    status: "scheduled",
    location: "Floor 3, Conference Room B",
    notes: "For the quarterly review meeting",
  },
]

// Format date to Month Day, Year
const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return date.toLocaleDateString("en-US", options)
}

export default function CustomerDeliveryCalendar() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedDeliveries, setSelectedDeliveries] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("orders");
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Navigate to previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  // Navigate to next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Get deliveries for a specific date
  const getDeliveriesForDate = (date: Date) => {
    return sampleDeliveries.filter((delivery) => {
      const deliveryDate = new Date(delivery.date)
      return (
        deliveryDate.getDate() === date.getDate() &&
        deliveryDate.getMonth() === date.getMonth() &&
        deliveryDate.getFullYear() === date.getFullYear()
      )
    })
  }

  // Handle date selection
  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    const deliveriesForDate = getDeliveriesForDate(date)
    setSelectedDeliveries(deliveriesForDate)
  }

  // Check if a date has deliveries
  const hasDeliveries = (date: Date) => {
    return getDeliveriesForDate(date).length > 0
  }

  // Get number of deliveries for a date
  const getDeliveryCount = (date: Date) => {
    return getDeliveriesForDate(date).length
  }

  // Render calendar grid
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-100 bg-gray-50/50"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const isToday =
        today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear

      const deliveryCount = getDeliveryCount(date)
      const hasDelivery = deliveryCount > 0

      days.push(
        <div
          key={`day-${day}`}
          className={`h-24 border border-gray-100 p-1 transition-colors relative
            ${isToday ? "bg-blue-50" : "hover:bg-gray-50"} 
            ${hasDelivery ? "cursor-pointer" : ""}
          `}
          onClick={hasDelivery ? () => handleDateClick(date) : undefined}
        >
          <div className="flex justify-between">
            <span className={`text-sm font-medium ${isToday ? "text-[#0052CC]" : ""}`}>{day}</span>
            {hasDelivery && <Badge className="bg-[#0052CC]">{deliveryCount}</Badge>}
          </div>

          {hasDelivery && (
            <div className="mt-1 space-y-1">
              {getDeliveriesForDate(date)
                .slice(0, 2)
                .map((delivery, index) => (
                  <div
                    key={index}
                    className="text-xs bg-[#0052CC]/10 text-[#0052CC] rounded p-1 truncate flex items-center"
                  >
                    <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                    {delivery.time}
                  </div>
                ))}
              {deliveryCount > 2 && <div className="text-xs text-gray-500 italic">+ {deliveryCount - 2} more</div>}
            </div>
          )}
        </div>,
      )
    }

    return days
  }

  return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
        <DashboardHeader
            title={
            activeTab === 'dashboard' ? 'Dashboard' :
            activeTab === 'schedule' ? 'Schedule' :
            activeTab === 'notifications' ? 'Notifications' : 'Delivery Schedule'
                }
              />
        <div className="flex-1 flex max-h-96">
        <SidebarProvider defaultOpen={!sidebarOpen}>
          <CustomerSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <SidebarInset className="flex-1 flex flex-col">
            <div className="flex items-center h-12 px-4 border-b mt-4">
              <SidebarTrigger className="mr-2 hover:bg-gray-100 rounded-md transition-colors" />
              <span className="font-medium text-sm text-muted-foreground">
                {activeTab === "dashboard"
                ? "Overview"
                : activeTab === "schedule"
                ? "Schedule Overview"
                : activeTab === "notifications"
                ? "Recent Notifications"
                : "Schedule Overview"
                }
              </span>
            </div>        

        <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Welcome banner */}
            <div className="rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0039A6] p-6 text-white shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-bold">Welcome to Your Delivery Calendar</h2>
                  <p className="mt-1 text-blue-100">View and manage all your scheduled deliveries in one place.</p>
                </div>
                <Button
                  className="bg-white text-[#0052CC] hover:bg-blue-50"
                  onClick={() => {
                    // Reset to current month/year
                    setCurrentMonth(today.getMonth())
                    setCurrentYear(today.getFullYear())
                  }}
                >
                  Today
                </Button>
              </div>
            </div>

            {/* Calendar */}
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center mt-4">
                    <Calendar className="h-5 w-5 text-[#0052CC] mr-2" />
                    <CardTitle>Delivery Calendar</CardTitle>
                  </div>
                  <div className="flex items-center space-x-4 mt-4">
                    <Button variant="outline" size="icon" onClick={prevMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-xl font-bold">
                      {monthNames[currentMonth]} {currentYear}
                    </h2>
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>View your scheduled deliveries for the month</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Day headers */}
                  {dayNames.map((day, index) => (
                    <div
                      key={index}
                      className="h-10 flex items-center justify-center font-medium text-sm bg-gray-100 rounded"
                    >
                      {day}
                    </div>
                  ))}

                  {/* Calendar days */}
                  {renderCalendarDays()}
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t px-6 py-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-[#0052CC] mr-2"></div>
                    <span>Scheduled Delivery</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-100 mr-2"></div>
                    <span>Today</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click on a day with deliveries to see details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardFooter>
            </Card>

            {/* Upcoming deliveries */}
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-[#0052CC] mr-2" />
                  <CardTitle>Upcoming Deliveries</CardTitle>
                </div>
                <CardDescription>Your next scheduled deliveries</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {sampleDeliveries
                    .filter((delivery) => delivery.date >= today)
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .slice(0, 3)
                    .map((delivery, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-[#0052CC]/10 flex items-center justify-center">
                          <Package className="h-5 w-5 text-[#0052CC]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{delivery.id}</p>
                            <Badge className="bg-[#0052CC]">Scheduled</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-3 w-3" />
                              {delivery.location}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              {formatDate(delivery.date)} at {delivery.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {sampleDeliveries.filter((delivery) => delivery.date >= today).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No Upcoming Deliveries</h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        You don't have any scheduled deliveries coming up.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dialog for showing deliveries for selected date */}
        <Dialog open={selectedDate !== null} onOpenChange={(open) => !open && setSelectedDate(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedDate && formatDate(selectedDate)}</DialogTitle>
              <DialogDescription>
                {selectedDeliveries.length} {selectedDeliveries.length === 1 ? "delivery" : "deliveries"} scheduled
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {selectedDeliveries.map((delivery, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-md">
                  <div className="h-2 w-full bg-[#0052CC]"></div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-[#0052CC] text-white border-none">
                        {delivery.id}
                      </Badge>
                      <p className="text-sm font-medium">{delivery.time}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-[#0052CC]" />
                        <span className="font-medium">Location:</span>
                        <span className="ml-2">{delivery.location}</span>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Items:</p>
                        <div className="grid grid-cols-1 gap-2">
                          {delivery.items.map((item: string, idx: number) => (
                            <div key={idx} className="flex items-center rounded-lg bg-gray-50 p-2 text-sm">
                              <Coffee className="mr-2 h-4 w-4 text-[#0052CC]" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      {delivery.notes && (
                        <div className="text-sm">
                          <p className="font-medium mb-1">Notes:</p>
                          <p className="text-gray-600 bg-yellow-50 p-2 rounded">{delivery.notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t bg-gray-50 px-6 py-3">
                    <Button variant="outline" className="rounded-lg border-gray-300">
                      Reschedule
                    </Button>
                    <Button
                    variant="outline"
                    className="rounded-lg border-red-300 bg-red-100 text-red-700 hover:bg-red-200 -ml-20"
                    >
                    Cancel
                    </Button>
                    <Button className="bg-[#0052CC] rounded-lg">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
    </div>
    </div>
  );
}

