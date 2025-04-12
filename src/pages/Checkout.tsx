import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useBasket } from "@/context/BasketContext";
import DashboardHeader from "@/components/generic/DashboardHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

interface FormData {
  name: string;
  address: string;
  paymentMethod: string;
  deliveryTime: string;
}

export default function Checkout() {
  const { basket } = useBasket();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("checkout");
  const [priorityDelivery, setPriorityDelivery] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    paymentMethod: "",
    deliveryTime: "",
  });

  const standardSlots: string[] = [
    "12:00-12:15", "12:15-12:30", "12:30-12:45", "12:45-13:00",
    "13:00-13:15", "13:15-13:30", "13:30-13:45", "13:45-14:00"
  ];

  const prioritySlots: string[] = [
    "12:00-12:05", "12:05-12:10", "12:10-12:15", "12:15-12:20", "12:20-12:25",
    "12:25-12:30", "12:30-12:35", "12:35-12:40", "12:40-12:45",
    "12:45-12:50", "12:50-12:55", "13:00-13:05", "13:05-13:10", "13:10-13:15",
    "13:15-13:20", "13:20-13:25", "13:25-13:30", "13:30-13:35", "13:35-13:40",
    "13:40-13:45", "13:45-13:50", "13:50-13:55", "13:55-14:00"
  ];

  const deliverySlots = priorityDelivery ? prioritySlots : standardSlots;

  const disabledSlots = priorityDelivery
    ? ["12:30-12:35", "12:35-12:40", "12:40-12:45"]
    : ["12:30-12:45"];

  const isSlotDisabled = (slot: string): boolean => disabledSlots.includes(slot);

  const basePrice = basket.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalPrice = priorityDelivery ? basePrice + 2 : basePrice;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handlePriorityChange = (checked: CheckedState) => {
    if (typeof checked === "boolean") {
      setPriorityDelivery(checked);
    }
  };

  // Reset delivery time when switching off priority
  useEffect(() => {
    if (!priorityDelivery && !standardSlots.includes(formData.deliveryTime)) {
      setFormData((prev) => ({
        ...prev,
        deliveryTime: standardSlots[0],
      }));
    }
  }, [priorityDelivery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order placed successfully!");
    navigate({ to: "/customer/track-order" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <DashboardHeader title={activeTab === "order" ? "Order Page" : "Checkout"} />
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
        <Card className="max-w-md w-full p-6">
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
          </CardHeader>
          <CardContent>
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

              {priorityDelivery && (
                <div className="border-b pb-2 mb-2">
                  <div className="flex justify-between text-blue-600 font-medium">
                    <span>Priority Delivery</span>
                    <span>+£2.00</span>
                  </div>
                </div>
              )}

              <p className="font-bold text-lg mt-2">Total: £{totalPrice.toFixed(2)}</p>
            </div>

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

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="priority"
                  checked={priorityDelivery}
                  onCheckedChange={handlePriorityChange}
                />
                <label htmlFor="priority" className="text-sm font-medium leading-snug">
                  Priority Delivery (+£2) <br />
                  <span className="text-xs text-gray-500">
                    5-minute time slots available
                  </span>
                </label>
              </div>

              <Select
                value={formData.deliveryTime}
                onValueChange={(value: string) => handleSelectChange("deliveryTime", value)}
                required
              >
                <SelectTrigger className="bg-white border border-gray-300 rounded-md p-2 w-full text-gray-700">
                  <span>{formData.deliveryTime || "Select Delivery Time"}</span>
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {deliverySlots.map((slot) => {
                    const disabled = isSlotDisabled(slot);
                    return (
                      <SelectItem
                        key={slot}
                        value={slot}
                        disabled={disabled}
                        className={disabled ? "opacity-50 cursor-not-allowed" : ""}
                      >
                        {slot}{disabled ? " (Not available)" : ""}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <Select
                value={formData.paymentMethod}
                onValueChange={(value: string) => handleSelectChange("paymentMethod", value)}
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
                Back to Order
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
