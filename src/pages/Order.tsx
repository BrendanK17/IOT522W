import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { useBasket } from "@/context/BasketContext"; // Use BasketContext
import DashboardHeader from "@/components/generic/DashboardHeader";
import { useState } from "react";
import { BarChart3, Package } from "lucide-react";
import { Sidebar } from "@/components/ui/sidebar";
import { CustomerSidebar } from "@/components/customized/sidebar/CustomerSidebar";

const menuItems = [
  { id: 1, name: "Club Sandwich", price: 6.95, photo: "https://www.seriouseats.com/thmb/HliR9y_Dqf3zbBR86k9Aie2uEnM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20231204-SEA-TurkeyClub-FredHardy-01-6679650f138a4f419e330a8a0f31576d.jpg" },
  { id: 2, name: "Chicken Salad", price: 9.95, photo: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-327831_11-3524329.jpg" },
  { id: 3, name: "Fish and Chips", price: 12.95, photo: "https://i0.wp.com/travelandmunchies.com/wp-content/uploads/2022/12/IMG_9513-scaled.jpg?fit=2560%2C1828&ssl=1" },
  { id: 4, name: "Pasta Salad", price: 8.95, photo: "https://www.southernliving.com/thmb/uv4cMY0isMucRojsotaKgzSqE2c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Pasta-Salad_Beauty-03_SEO51-b0632e62b2354da489fd418a9edc22f4-d7f09ce9d11742e5a61f8073d6d294f5.jpeg" },
  { id: 5, name: "Sushi", price: 11.95, photo: "https://www.thespruceeats.com/thmb/KKVYHEcAN6Jt7yvULfCB4r3ad30=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/what-is-sushi-5079606-hero-01-e5a0a26f194a49478f84e04193baaefa.jpg" },
  { id: 6, name: "Bean Wrap", price: 7.95, photo: "https://cdn.sanity.io/images/cq7w2e71/production/b9291dd6afead7ffac3a45b23b8b9c2a8722606e-973x1300.jpg" },
];

export default function Order() {
  const [activeTab, setActiveTab] = useState("orders");
  const { basket, addToBasket, increaseQuantity, decreaseQuantity, removeFromBasket, updateComment } = useBasket();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate({ to: "/customer/checkout" });
  };

  const sideMenuItems = [
    { label: "Order", icon: <BarChart3 className="mr-2 h-5 w-5" />, value: "order", path: "/customer/order" },
    { label: "Tracking", icon: <Package className="mr-2 h-5 w-5" />, value: "tracking", path: "/customer/track-order" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <DashboardHeader
                title={
                  activeTab === 'order'
                    ? 'Order Page'
                    : 'Checkout'
                }
              />

      <div className="min-h-screen p-6 bg-gray-50 flex">
      <CustomerSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingDeliveriesCount={3}
      />
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Card key={item.id} className="p-4 text-center bg-blue-100 shadow-md">
                <CardHeader>
                  <CardTitle className="text-blue-900">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={item.photo} alt={item.name} className="w-full h-32 object-cover rounded-lg" />
                  <p className="font-bold text-lg my-2 text-blue-700">£{item.price.toFixed(2)}</p>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => addToBasket({ ...item, comment: "", quantity: 1 })} // Add to basket functionality
                  >
                    Order
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <aside className="w-80 p-4 bg-blue-800 text-white rounded-2xl shadow-md ml-6">
          <h2 className="text-xl font-bold mb-4">Your Basket</h2>
          {basket.length === 0 ? (
            <p className="text-gray-300">Your basket is empty.</p>
          ) : (
            <ul className="space-y-2">
              {basket.map((item) => (
                <li key={item.id} className="border-b border-blue-700 pb-2">
                  <div className="flex justify-between items-center">
                    <span>
                      {item.name} x{item.quantity} - £{(item.price * item.quantity).toFixed(2)}
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        className="bg-red-500 hover:bg-red-600 text-white px-2"
                        onClick={() => decreaseQuantity(item.id)} // Decrease quantity functionality
                      >
                        -
                      </Button>
                      <Button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2"
                        onClick={() => increaseQuantity(item.id)} // Increase quantity functionality
                      >
                        +
                      </Button>
                      <Button
                        className="bg-red-700 hover:bg-red-800 text-white px-2"
                        onClick={() => removeFromBasket(item.id)} // Remove item from basket
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <Input
                    placeholder="Add any special requests here..."
                    value={item.comment || ""} // Ensure comment is always a string
                    onChange={(e) => updateComment(item.id, e.target.value)} // Update comment functionality
                    className="mt-2 bg-blue-100 text-blue-900"
                  />
                </li>
              ))}
              <p className="font-bold mt-4">
                Total: £{basket.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
              </p>
              <Button
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleCheckout} // Proceed to checkout
              >
                Proceed to Checkout
              </Button>
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
}