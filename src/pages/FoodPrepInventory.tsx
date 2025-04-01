import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { BarChart3, Package } from "lucide-react"; 
import Sidebar from "@/components/generic/Sidebar";
import { pendingOrders } from "@/lib/orders";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { meat_fish_inventory, vegetables_inventory, carbs_inventory, fruits_inventory, beverages_inventory } from "@/lib/inventory";

// Define the Inventory Item Type
interface InventoryItem {
  id: number;
  name: string;
  image: string;
  count: number;
}

// Define props for the InventoryCarousel component
interface InventoryCarouselProps {
  title: string;
  inventory: InventoryItem[];
  titleColor: string;
  pillColor: string;
  collapsed: boolean;
  toggleSection: () => void;
}

// Reusable Inventory Carousel Component
const InventoryCarousel: React.FC<InventoryCarouselProps> = ({ title, inventory, titleColor, pillColor, collapsed, toggleSection }) => {
  const [counts, setCounts] = useState<number[]>(inventory.map((item) => item.count));

  const increaseCount = (index: number) => {
    setCounts((prev) => {
      const newCounts = [...prev];
      newCounts[index] += 1;
      inventory[index].count = newCounts[index];
      return newCounts;
    });
  };

  const decreaseCount = (index: number) => {
    setCounts((prev) => {
      const newCounts = [...prev];
      if (newCounts[index] > 0) {
        newCounts[index] -= 1;
        inventory[index].count = newCounts[index];
      }
      return newCounts;
    });
  };

  return (
    <div>
      {/* Section Title with Toggle Functionality */}
      <h2 onClick={toggleSection} className={`text-1xl font-bold text-center text-black mb-4 px-2 py-1 rounded-lg cursor-pointer ${titleColor}`}>
        {title} {collapsed ? "▲" : "▼"}
      </h2>
      
      {!collapsed && (
        <Carousel opts={{ align: "start" }} className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {inventory.map((item, index) => (
              <CarouselItem key={item.id} className="md:basis-1/3 lg:basis-1/5">
                <div className={`p-1 relative ${counts[index] === 0 ? 'bg-gray-300 bg-opacity-40 rounded-lg' : ''}`}>
                  <Card className="flex flex-col items-center p-4 rounded-lg">
                    <div className={`${pillColor} text-black px-3 py-1 rounded-full mb-2 text-sm font-semibold h-8 flex items-center justify-center`} style={{ fontSize: item.name.length > 12 ? "0.75rem" : "0.875rem" }}>
                      {item.name}
                    </div>
                    <img src={item.image} alt={item.name} className={`w-24 h-24 object-contain rounded-lg mb-2 ${counts[index] === 0 ? 'opacity-50' : ''}`} />
                    {counts[index] === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-grey bg-opacity-50 rounded-lg">
                        <span className="bg-red-500 text-white font-semibold text-lg px-2 py-0.5 rounded-full">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <div className="flex items-center relative">
                      <Button variant="outline" size="icon" onClick={() => decreaseCount(index)} disabled={counts[index] === 0}>-</Button>
                      <span className="text-xl font-semibold mx-4">{counts[index]}</span>
                      <Button variant="outline" size="icon" onClick={() => increaseCount(index)}>+</Button>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};

export default function FoodPrepInventory() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("inventory");
  const navigate = useNavigate();
  const [orders, setOrders] = useState(pendingOrders);

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    meat_fish: true,
    vegetables: true,
    carbs: true,
    fruits: true,
    beverages: true,
  });
  
  const toggleSection = (section: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="flex">
        <Sidebar
          menuItems={[
            { label: "Dashboard", icon: <BarChart3 className="mr-2 h-5 w-5" />, value: "dashboard", path: "/food-prep-dashboard" },
            { label: "Orders", icon: <Package className="mr-2 h-5 w-5" />, value: "orders", badgeCount: orders.length, path: "/food-prep-dashboard/orders" },
            { label: "Inventory", icon: <Package className="mr-2 h-5 w-5" />, value: "inventory", path: "/food-prep-dashboard/inventory" },
          ]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onNavigate={(path) => navigate({ to: path })}
          sidebarOpen={sidebarOpen}
        />
        <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="rounded-xl bg-gradient-to-r from-[#f1f5f9] to-[#e2e8f0] p-6 text-white shadow-lg">
              <h1 className="text-2xl font-bold text-black">Welcome to the Inventory Dashboard</h1>
            </div>
            <InventoryCarousel title="FISH & MEAT" inventory={meat_fish_inventory} titleColor="bg-orange-400" pillColor="bg-orange-300" collapsed={collapsedSections.meat_fish} toggleSection={() => toggleSection("meat_fish")} />
            <InventoryCarousel title="CARBS" inventory={carbs_inventory} titleColor="bg-yellow-400" pillColor="bg-yellow-300" collapsed={collapsedSections.carbs} toggleSection={() => toggleSection("carbs")} />
            <InventoryCarousel title="VEGETABLES" inventory={vegetables_inventory} titleColor="bg-green-400" pillColor="bg-green-300" collapsed={collapsedSections.vegetables} toggleSection={() => toggleSection("vegetables")} />
            <InventoryCarousel title="FRUITS" inventory={fruits_inventory} titleColor="bg-red-400" pillColor="bg-red-300" collapsed={collapsedSections.fruits} toggleSection={() => toggleSection("fruits")} />
            <InventoryCarousel title="BEVERAGES" inventory={beverages_inventory} titleColor="bg-blue-400" pillColor="bg-blue-300" collapsed={collapsedSections.beverages} toggleSection={() => toggleSection("beverages")} />
          </div>
        </div>
      </div>
    </div>
  );
}
