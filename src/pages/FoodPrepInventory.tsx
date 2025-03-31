import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { BarChart3, Package } from "lucide-react"; 
import Sidebar from "@/components/generic/Sidebar";
// import pendingOrders from "@/pages/FoodPrepOrders" // let's put all hard coded data in another file


// // // // // // // // // // // // // // // // // // // // // 

// adding just to have the notif on orders on the side menu //

// // // // // // // // // // // // // // // // // // // // // 

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

// // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // 




export default function FoodPrepInventory() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("inventory")
  const navigate = useNavigate()
  const [orders, setOrders] = useState(pendingOrders); // // // // // // // // // // // // // // // // // // // // // 


  const menuItems = [
    { label: "Dashboard", icon: <BarChart3 className="mr-2 h-5 w-5" />, value: "dashboard", path: "/food-prep-dashboard" },
    { label: "Orders", icon: <Package className="mr-2 h-5 w-5" />, value: "orders", badgeCount: orders.length, path: "/food-prep-dashboard/orders" },
    { label: "Inventory", icon: <Package className="mr-2 h-5 w-5" />, value: "inventory", path: "/food-prep-dashboard/inventory" },
  ];

  const handleLogout = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="flex">
        {/* Sidebar Component */}
        <Sidebar
            menuItems={menuItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onNavigate={(path) => navigate({ to: path })}
            sidebarOpen={sidebarOpen}
        />

        {/* Main content */}
        <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Welcome banner */}
            <div className="rounded-xl bg-gradient-to-r from-[#f1f5f9] to-[#e2e8f0] p-6 text-white shadow-lg">
              <h1 className="text-2xl font-bold text-black">Welcome to the Inventory Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
