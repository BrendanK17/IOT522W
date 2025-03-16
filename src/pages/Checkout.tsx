import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useBasket } from "@/context/BasketContext"; // Importing the BasketContext

export default function Checkout() {
  const { basket } = useBasket(); // Using BasketContext
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "",
    deliveryTime: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order placed successfully!");
    navigate({ to: "/" });
  };

  // Calculate the total price from the basket context
  const totalPrice = basket.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <Card className="max-w-md w-full p-6">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Basket Summary */}
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Order Summary</h2>
            {basket.length === 0 ? (
              <p>Your basket is empty.</p>
            ) : (
              basket.map((item) => (
                <div key={item.id} className="border-b pb-2 mb-2">
                  <div className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span>£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  {item.comment && <p className="text-sm text-gray-500">Comment: {item.comment}</p>}
                </div>
              ))
            )}
            <p className="font-bold text-lg mt-2">Total: £{totalPrice.toFixed(2)}</p>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Input
              name="address"
              placeholder="Desk Number or Pickup Location"
              value={formData.address}
              onChange={handleInputChange}
              required
            />

            <Select
              value={formData.deliveryTime}
              onValueChange={(value) => handleSelectChange("deliveryTime", value)}
              required
            >
              <SelectTrigger className="bg-white border border-gray-300 rounded-md p-2 w-full text-gray-700">
                <span>{formData.deliveryTime || "Select Delivery Time"}</span>
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                <SelectItem value="12:00">12:00</SelectItem>
                <SelectItem value="12:30">12:30</SelectItem>
                <SelectItem value="13:00">13:00</SelectItem>
                <SelectItem value="13:30">13:30</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={formData.paymentMethod}
              onValueChange={(value) => handleSelectChange("paymentMethod", value)}
              required
            >
              <SelectTrigger className="bg-white border border-gray-300 rounded-md p-2 w-full text-gray-700">
                <span>{formData.paymentMethod || "Select Payment Method"}</span>
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                <SelectItem value="Card">Card</SelectItem>
                <SelectItem value="Apple Pay">Apple Pay</SelectItem>
                <SelectItem value="Google Pay">Google Pay</SelectItem>
              </SelectContent>
            </Select>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" type="submit">
              Place Order
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => navigate({ to: "/customer/order" })}
            >
              Back to Menu
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
