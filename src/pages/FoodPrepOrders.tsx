import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import OrderCard from "@/components/generic/FoodPrepOrderCard";
import Sidebar from "@/components/generic/Sidebar";
import FoodPrepOrdersTable from "@/components/generic/FoodPrepTable";
import CircularProgress from "@/components/customized/progress/progress-10";
import { pendingOrders } from "@/lib/foodPrep/orders";
import { completedOrders } from "@/lib/foodPrep/orders";
import DashboardHeader from "@/components/generic/DashboardHeader";
import { menuItems } from "@/lib/foodPrep/menuItems";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <DashboardHeader
        title={
          activeTab === 'dashboard'
            ? 'Food Prep Dashboard'
            : activeTab === 'orders'
            ? 'Orders'
            : 'Inventory'
        }
      />

      <div className="flex">
        {/* Sidebar */}
        <div className="sticky top-0 h-screen overflow-y-auto border-r bg-white shadow-sm">
          <Sidebar
            menuItems={menuItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onNavigate={(path) => navigate({ to: path })}
            sidebarOpen={sidebarOpen}
          />
        </div>  

        {/* Main content */}
        <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">
          <div className="space-y-8">

            {/* Welcome banner */}
            <div className="rounded-xl bg-gradient-to-r from-[#f1f5f9] to-[#e2e8f0] p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                    {/* Left Section - Text */}
                    <div>
                        <h2 className="text-2xl font-bold text-black">{pendingOrders.length} orders pending...</h2>
                        <p className="mt-1 text-black">
                            You have prepared {completedOrders.length} out of {(pendingOrders.length + completedOrders.length)} orders today.
                        </p>
                    </div>

                    {/* Right Section - Circular Progress with Padding */}
                    <div className="p-2"> 
                        <CircularProgress progress={progress} />
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
