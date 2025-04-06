import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { FoodPrepSidebar } from "@/components/customized/sidebar/FoodPrepSidebar"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { meat_fish_inventory, vegetables_inventory, carbs_inventory, fruits_inventory, beverages_inventory } from "@/lib/foodPrep/inventory";
import DashboardHeader from "@/components/generic/DashboardHeader";
import { Input } from "@/components/ui/input"; // Assuming you have a custom Input component from ShadCN
import { Search } from "lucide-react"; // Icon for the search, you can use other icons if you prefer
import { Badge } from "@/components/ui/badge";
import { 
  CupSoda, Apple, 
  Carrot, 
  Bean, 
  Beef,
  CircleAlert,
  TriangleAlert, 
  ChevronUp,
  ChevronDown} from "lucide-react";


const allInventories = [
  ...meat_fish_inventory,
  ...vegetables_inventory,
  ...carbs_inventory,
  ...fruits_inventory,
  ...beverages_inventory,
];

const itemsNeedingRestock = allInventories.filter((item) => item.count === 0).length;

const lowStockThreshold = 30;

const itemsLowOnStock = allInventories.filter(
  (item) => item.count > 0 && item.count < lowStockThreshold
).length;


interface InventoryItem {
  id: number;
  name: string;
  image: string;
  count: number;
}

interface InventoryCardProps {
  title: React.ReactNode;
  inventory: InventoryItem[];
  collapsed: boolean;
  toggleSection: () => void;
  icon: React.ReactNode;
  iconColour: string;     // Tailwind class like 'text-red-600'
  iconBg: string;        // Tailwind class like 'bg-red-100'
  stripColour: string;    // Tailwind class like 'bg-red-500'
}

const InventoryCard: React.FC<InventoryCardProps> = ({ title, inventory, collapsed, toggleSection, icon, iconBg, iconColour, stripColour }) => {
  const [counts, setCounts] = useState<number[]>(inventory.map((item) => item.count));

  const increaseCount = (index: number) => {
    setCounts((prev) => prev.map((count, i) => (i === index ? count + 1 : count)));
  };

  const decreaseCount = (index: number) => {
    setCounts((prev) => prev.map((count, i) => (i === index && count > 0 ? count - 1 : count)));
  };

  return (
    <Card className={`overflow-hidden shadow-md`}>
      {/* Top color strip */}
      <div className={`h-2 w-full ${stripColour}`} />

      <CardHeader className="bg-white pb-3 border-b">
        <div className="flex items-center justify-between">
          {/* Icon and Name */}
          <div className="flex items-center gap-3">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${iconBg}`}>
              <div className={`${iconColour}`}>{icon}</div>
            </div>
            <p className="text-base font-medium">{title}</p>
          </div>

          <div className="flex gap-1 items-center">
            <div onClick={toggleSection} className="cursor-pointer">
              {collapsed ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>
        
        </div>
      </CardHeader>
        
      
        {!collapsed && (
        <CardContent className="pt-2 pb-4">
        <div className="mt-10">
          <Carousel opts={{ align: "start" }} className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {inventory.map((item, index) => (
                <CarouselItem key={item.id} className="md:basis-1/3 lg:basis-1/5">
                  <div className={`p-1 relative ${counts[index] === 0 ? 'bg-gray-300 bg-opacity-40 rounded-lg' : ''}`}>
                    <Card className="flex flex-col items-center p-4 rounded-lg">
                    <div className={`text-black px-3 py-1 rounded-full mb-2 text-sm font-semibold h-8 flex items-center justify-center`} style={{ fontSize: item.name.length > 12 ? "0.75rem" : "0.875rem" }}>
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
        </CardContent>
        )}
      <CardFooter className="bg-white">
      <div className="flex items-center gap-3">
        <Badge variant="outline" className={`border-none mt-3 ${iconBg}`}>
          {inventory.filter(item => item.count === 0).length} item{inventory.filter(item => item.count === 0).length !== 1 && "s"} out of stock
        </Badge>
        <Badge variant="outline" className={`border-none mt-3 ${iconBg}`}>
        {inventory.length} item{inventory.length !== 1 && "s"} in inventory
        </Badge>
      </div>
      </CardFooter>
    </Card>
  );
};



export default function FoodPrepInventory() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("inventory");
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(""); // To track the value in the search bar
  const [searchActive, setSearchActive] = useState(false); // To track if search is active


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    // If there's any value, set searchActive to true, otherwise false
    if (value.trim().length > 0) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  };

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

  // Filter the inventory data based on the search query
  const filteredItems = allInventories.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Initialize counts based on filteredItems count
  const [counts, setCounts] = useState(() => filteredItems.map((item) => item.count));

  // Update counts only when filteredItems changes and counts is not already in sync
  useEffect(() => {
    // If counts are not already in sync with filteredItems, update them
    if (filteredItems.length !== counts.length || !filteredItems.every((item, index) => item.count === counts[index])) {
      setCounts(filteredItems.map((item) => item.count));
    }
  }, [filteredItems]); // Only run when filteredItems changes

  // Function to increase the count of an item
  const increaseCount = (itemId: number) => {
    setCounts((prev) =>
      prev.map((count, i) =>
        filteredItems[i].id === itemId ? count + 1 : count
      )
    );
  };

  // Function to decrease the count of an item
  const decreaseCount = (itemId: number) => {
    setCounts((prev) =>
      prev.map((count, i) =>
        filteredItems[i].id === itemId && count > 0 ? count - 1 : count
      )
    );
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
            {/* Welcome banner */}
            <div className="rounded-xl bg-gradient-to-r from-[#f5f5f5] to-white p-6 shadow-lg">
              <div className="flex items-center justify-between">

                {/* Left Section - Text */}
                <div>
                  <p className="text-2xl font-bold text-black">
                    Welcome to the Inventory Dashboard
                  </p>
                </div>

                {/* Right Section - Alert Pills */}
                <div className="flex space-x-4">
                  {itemsNeedingRestock > 0 && (
                    <Badge variant="outline" className="bg-[#fee2e2] text-red-600 border-none mt-3">
                      <CircleAlert className="inline-block mr-1" />
                      {itemsNeedingRestock} item{itemsNeedingRestock !== 1 ? 's' : ''} need restocking
                    </Badge>
                  )}

                  {itemsLowOnStock > 0 && (
                    <Badge variant="outline" className="bg-[#fef3c7] text-amber-600 border-none mt-3">
                    <TriangleAlert className="inline-block mr-1" />
                    {itemsLowOnStock} item{itemsLowOnStock !== 1 ? 's' : ''} low on stock
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            {/* Search Bar Section */}
            <div className="flex justify-start items-center gap-2 mt-6">
              <Input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search items..."
                className="border w-lg rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                variant="outline"
                className="text-black bg-white border rounded-md"
                disabled={!searchActive} // Disable button if search is empty
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="text-black bg-white border rounded-md ml-auto mr-4"
                onClick={() => {
                  setSearchValue("");
                  setSearchActive(false);
                }}
              >
                View All
              </Button>
            </div>
            
            </div>

            {/* Display search results */}
            {searchActive && filteredItems.length > 0 ? (
                  <div className="mt-4">
                    <p className="text-lg font-semibold">
                      Search Results for "{searchValue}"
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                      {filteredItems.map((item) => (
                        <Card key={item.id} className="flex flex-col items-center p-4 rounded-lg shadow-md">
                          <div className="text-black px-3 py-1 rounded-full mb-2 text-sm font-semibold h-8 flex items-center justify-center">
                            {item.name}
                          </div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-contain rounded-lg mb-2"
                          />
                          {/* Count control with increase and decrease buttons */}
                          <div className="flex items-center relative">
                            <Button variant="outline" size="icon" onClick={() => decreaseCount(item.id)} disabled={counts[filteredItems.findIndex(i => i.id === item.id)] === 0}>-</Button>
                            <span className="text-xl font-semibold mx-4">
                              {counts[filteredItems.findIndex(i => i.id === item.id)]}
                            </span>
                            <Button variant="outline" size="icon" onClick={() => increaseCount(item.id)}>+</Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  searchActive && filteredItems.length === 0 && (
                    <p className="text-gray-500 mt-4">No items found for "{searchValue}"</p>
                  )
                )}

            {!searchActive && (
              <div className="flex flex-col gap-4 mt-4">
                <InventoryCard
                  title="MEAT & FISH"
                  inventory={meat_fish_inventory}
                  icon={<Beef className="h-4 w-4 text-fuchsia-600" />}
                  iconBg="bg-fuchsia-100"
                  iconColour="text-fuchsia-600"
                  stripColour="bg-fuchsia-500"
                  collapsed={collapsedSections.meat_fish}
                  toggleSection={() => toggleSection("meat_fish")}
                />
                <InventoryCard
                  title="CARBS"
                  inventory={carbs_inventory}
                  icon={<Bean className="h-4 w-4 text-yellow-600" />}
                  iconBg="bg-yellow-100"
                  iconColour="text-yellow-600"
                  stripColour="bg-yellow-500"
                  collapsed={collapsedSections.carbs}
                  toggleSection={() => toggleSection("carbs")}
                />
                <InventoryCard
                  title="VEGETABLES"
                  inventory={vegetables_inventory}
                  icon={<Carrot className="h-4 w-4 text-green-600" />}
                  iconBg="bg-green-100"
                  iconColour="text-green-600"
                  stripColour="bg-green-500"
                  collapsed={collapsedSections.vegetables}
                  toggleSection={() => toggleSection("vegetables")}
                />
                <InventoryCard
                  title="FRUITS"
                  inventory={fruits_inventory}
                  icon={<Apple className="h-4 w-4 text-red-600" />}
                  iconBg="bg-red-100"
                  iconColour="text-red-600"
                  stripColour="bg-red-500"
                  collapsed={collapsedSections.fruits}
                  toggleSection={() => toggleSection("fruits")}
                />
                <InventoryCard
                  title="BEVERAGES"
                  inventory={beverages_inventory}
                  icon={<CupSoda className="h-4 w-4 text-blue-600" />}
                  iconBg="bg-blue-100"
                  iconColour="text-blue-600"
                  stripColour="bg-blue-500"
                  collapsed={collapsedSections.beverages}
                  toggleSection={() => toggleSection("beverages")}
                />
              </div>
              )}
            </div>
        </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
    </div>
  );
}
