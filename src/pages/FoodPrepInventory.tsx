import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { BarChart3, Package } from "lucide-react"; 
import Sidebar from "@/components/generic/Sidebar";
import { pendingOrders } from "@/lib/orders";


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
