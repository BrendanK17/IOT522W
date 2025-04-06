import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { FoodPrepSidebar } from "@/components/customized/sidebar/FoodPrepSidebar"
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { meat_fish_inventory, vegetables_inventory, carbs_inventory, fruits_inventory, beverages_inventory } from "@/lib/foodPrep/inventory";
import DashboardHeader from "@/components/generic/DashboardHeader";
import { SquareChevronDown, SquareChevronUp, CupSoda, Apple, Carrot, Bean, Beef } from "lucide-react";

interface InventoryItem {
  id: number;
  name: string;
  image: string;
  count: number;
}

interface InventoryCarouselProps {
  title: React.ReactNode;
  inventory: InventoryItem[];
  titleColor: string;
  pillColor: string;
  collapsed: boolean;
  toggleSection: () => void;
}

const InventoryCarousel: React.FC<InventoryCarouselProps> = ({ title, inventory, titleColor, pillColor, collapsed, toggleSection }) => {
  const [counts, setCounts] = useState<number[]>(inventory.map((item) => item.count));

  const increaseCount = (index: number) => {
    setCounts((prev) => prev.map((count, i) => (i === index ? count + 1 : count)));
  };

  const decreaseCount = (index: number) => {
    setCounts((prev) => prev.map((count, i) => (i === index && count > 0 ? count - 1 : count)));
  };

  return (
    <Card className={`p-5 rounded-lg shadow-md ${titleColor.replace("bg", "border")} border-4 relative`}>
      <h2 onClick={toggleSection} className="text-sm font-bold text-black absolute top-2 left-4 cursor-pointer">
        {title}
      </h2>
      <div onClick={toggleSection} className="absolute top-2 right-4 cursor-pointer">
        {collapsed ? <SquareChevronUp /> : <SquareChevronDown />}
      </div>
      {!collapsed && (
        <div className="mt-10">
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
        </div>
      )}
    </Card>
  );
};

export default function FoodPrepInventory() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("inventory");
  const navigate = useNavigate();
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    meat_fish: false,
    vegetables: false,
    carbs: false,
    fruits: false,
    beverages: false,
  });

  const toggleSection = (section: string) => {
    setCollapsedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <DashboardHeader title="Inventory" />
      <div className="flex">
        
      <div className="flex-1 flex max-h-96">
        {/* Sidebar */}
        <SidebarProvider defaultOpen={!sidebarOpen}>
          <FoodPrepSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <SidebarInset className="flex-1 flex flex-col">
            <div className="flex items-center h-12 px-4 border-b mt-4">
              <SidebarTrigger className="mr-2 hover:bg-gray-100 rounded-md transition-colors" />
              <span className="font-medium text-sm text-muted-foreground">
                {activeTab === "dashboard"
                  ? "Overview"
                  : activeTab === "deliveries"
                    ? "Orders"
                    : "Inventory"}
              </span>
            </div>

        <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">
          <div className="space-y-8">
            <h1 className="text-2xl font-bold text-black">Welcome to the Inventory Dashboard</h1>
            <InventoryCarousel title={<><Beef className="inline-block mr-2" /> FISH & MEAT</>} inventory={meat_fish_inventory} titleColor="bg-orange-400" pillColor="bg-orange-300" collapsed={collapsedSections.meat_fish} toggleSection={() => toggleSection("meat_fish")} />
            <InventoryCarousel title={<><Bean className="inline-block mr-2" /> CARBS</>} inventory={carbs_inventory} titleColor="bg-yellow-400" pillColor="bg-yellow-300" collapsed={collapsedSections.carbs} toggleSection={() => toggleSection("carbs")} />
            <InventoryCarousel title={<><Carrot className="inline-block mr-2" /> VEGETABLES</>} inventory={vegetables_inventory} titleColor="bg-green-400" pillColor="bg-green-300" collapsed={collapsedSections.vegetables} toggleSection={() => toggleSection("vegetables")} />
            <InventoryCarousel title={<><Apple className="inline-block mr-2" /> FRUITS</>} inventory={fruits_inventory} titleColor="bg-red-400" pillColor="bg-red-300" collapsed={collapsedSections.fruits} toggleSection={() => toggleSection("fruits")} />
            <InventoryCarousel title={<><CupSoda className="inline-block mr-2" /> BEVERAGES</>} inventory={beverages_inventory} titleColor="bg-blue-400" pillColor="bg-blue-300" collapsed={collapsedSections.beverages} toggleSection={() => toggleSection("beverages")} />
          </div>
        </div>
        </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
    </div>
  );
}
