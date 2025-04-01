import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { useBasket } from "@/context/BasketContext"; // Use BasketContext
import DashboardHeader from "@/components/generic/DashboardHeader";
import { useState } from "react";

const menuItems = [
  { id: 1, name: "Club Sandwich", price: 6.95, description: "To your desk in 15 minutes!" },
  { id: 2, name: "Steak and Salad", price: 13.95, description: "To your desk in 20 minutes!" },
  { id: 3, name: "American Feast Deal", price: 12.95, description: "Available for delivery at 12:00" },
  { id: 4, name: "Roast Dinner Deal", price: 11.95, description: "Available for delivery at 12:00" },
  { id: 5, name: "Mexican Fiesta Deal", price: 9.95, description: "Available for delivery at 12:00" },
];

export default function Order() {
  const { basket, addToBasket, increaseQuantity, decreaseQuantity, removeFromBasket, updateComment } = useBasket(); // Using BasketContext
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("order") // to implement by the whoever is adding the sidebar

  const handleCheckout = () => {
    navigate({ to: "/customer/checkout" }); // Navigate to the checkout page
  };

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
        
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Card key={item.id} className="p-4 text-center bg-blue-100 shadow-md">
                <CardHeader>
                  <CardTitle className="text-blue-900">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
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
