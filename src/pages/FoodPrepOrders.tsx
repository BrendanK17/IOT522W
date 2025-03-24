import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import OrderCard from "@/components/generic/FoodPrepOrderCard";
import { BarChart3, Package } from "lucide-react";
import Sidebar from "@/components/generic/Sidebar";
import FoodPrepOrdersTable from "@/components/generic/FoodPrepTable";
import CircularProgress from "@/components/customized/progress/progress-10";


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
        notes: ["[Chicken Salad] Extra dressing on the side"],
        status: "readyForPickup",
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
        notes: ["[Veggie Wrap] No lettuce"],
        status: "orderPlaced",
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
        notes: [],
        status: "beingPrepared",
        time: "7 mins ago",
        avatar: avatar3,
        priority: "medium",
        floor: "4",
        deskId: "15",
        coordinates: { x: 45, y: 30 },
      },
      {
        id: "ORD-1237",
        customer: "Emily Davis",
        location: "Floor 1, Desk 5",
        items: ["Caesar Salad", "Iced Tea"],
        placedAt: "09:00 AM",
        dueAt: "10:30 AM",
        notes: ["[Caesar Salad] No croutons"],
        status: "orderPlaced",
        time: "10 mins ago",
        avatar: avatar1,
        priority: "low",
        floor: "1",
        deskId: "5",
        coordinates: { x: 20, y: 80 },
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

const progress = Math.round(completedOrders.length/(pendingOrders.length + completedOrders.length)*100)

export default function FoodPrepOrders() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("orders")
  const navigate = useNavigate()
  const [orderView, setOrderView] = useState("cards")
  const [orders, setOrders] = useState(pendingOrders);


  const changeStatus = (newStatus: string, status: string) => {
    status = newStatus;
  }

  const menuItems = [
    { label: "Dashboard", icon: <BarChart3 className="mr-2 h-5 w-5" />, value: "dashboard", path: "/food-prep-dashboard" },
    { label: "Orders", icon: <Package className="mr-2 h-5 w-5" />, value: "orders", badgeCount: orders.length },
    { label: "Inventory", icon: <Package className="mr-2 h-5 w-5" />, value: "inventory" },
  ];

  const handleLogout = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });

    navigate({ to: "/" });
  };

  return (    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="flex">
        {/* Sidebar Component */}
        <Sidebar
            menuItems={menuItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onNavigate={(path) => navigate({ to: path })}
            sidebarOpen={sidebarOpen}
            handleLogout={() => console.log("Logging out...")}
        />  

        {/* Main content */}
        <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">
        <div className="space-y-8">

            {/* Welcome banner */}
            <div className="rounded-xl bg-gradient-to-r from-[#f1f5f9] to-[##e2e8f0] p-6 text-white shadow-lg">
                <div className="grid grid-cols-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between col-span-3">
                        <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold text-black">{pendingOrders.length} orders pending...</h2>
                        <p className="mt-1 text-black">
                            You have prepared {completedOrders.length} out of {(pendingOrders.length + completedOrders.length)} orders today.
                        </p>
                        </div>
                        <div className="flex items-center justify-center space-x-4 col-span-1">
                            <CircularProgress
                            progress={progress}
                            />
                        </div>
                    </div>
                    {/* Order View Switch */}
                    <div className="flex items-center space-x-2">
                    <Switch id="order-table-view" onClick={() => setOrderView("table")} />
                    <Label htmlFor="order-table-view">Table View</Label>
                    </div>
                </div>
            </div>

            {/* Order View Switch */}
            <div className="flex items-center space-x-2">
            <Switch
                id="order-table-view"
                checked={orderView === "table"} // This ensures the switch reflects the current view
                onCheckedChange={(checked) => setOrderView(checked ? "table" : "cards")} // Toggle back to "cards" when unchecked
            />
            <Label htmlFor="order-table-view">Table View</Label>
            </div>


            {/* Orders */}
            <div className="space-y-4">
            {orderView === "cards" && (
                <div className="grid gap-6 md:grid-cols-2">
                    <OrderCard key={orders[0].id} order={orders[0]} changeStatus={changeStatus} />
                    <OrderCard key={orders[1].id} order={orders[1]} changeStatus={changeStatus} />
                    <OrderCard key={orders[2].id} order={orders[2]} changeStatus={changeStatus} />
                    <OrderCard key={orders[3].id} order={orders[3]} changeStatus={changeStatus} />
                </div>
            )}

            {orderView === "table" && (
                <FoodPrepOrdersTable orders={orders} changeStatus={changeStatus} />
            )}
            </div>
        </div>
        </div>

        </div>
    </div>
  );

}
