import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardHeader from "@/components/generic/DashboardHeader";
import { CustomerSidebar } from "@/components/customized/sidebar/CustomerSidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Paper from "@mui/material/Paper";
import avatar1 from "../assets/avatar_1.png";

export default function TrackOrder() {
  const [activeTab, setActiveTab] = useState("tracking");

  // Developer flag: set to true to simulate having an order, false otherwise
  const hasOrder = true;

  // Hardcoded order data for demo
  const demoOrder = [
    { id: 1, name: "Chicken Salad", quantity: 1 },
    { id: 2, name: "Sparkling Water", quantity: 1 },
  ];

  const [orderStatusIndex, setOrderStatusIndex] = useState(0);
  const estimatedTime = "30 minutes";
  const statusSteps = ["Preparing", "Cooking", "Out for Delivery", "Delivered"];

  useEffect(() => {
    if (!hasOrder) return;

    let index = 0;
    const interval = setInterval(() => {
      setOrderStatusIndex(index);
      if (index < statusSteps.length - 1) {
        index++;
      } else {
        clearInterval(interval);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [hasOrder]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader title="Track Your Order" />
      <div className="flex flex-1 max-h-96">
        <SidebarProvider defaultOpen={true}>
          <CustomerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <SidebarInset className="flex-1 flex flex-col overflow-auto">
            <div className="flex items-center h-12 px-4 border-b mt-4">
              <SidebarTrigger className="mr-2 hover:bg-gray-100 rounded-md transition-colors" />
              <span className="font-medium text-sm text-muted-foreground">
                Track Your Order
              </span>
            </div>

            <div className="flex flex-1 items-center justify-center p-6">
              {!hasOrder ? (
                <div className="text-gray-500 text-xl">
                  No orders placed yet. Please make an order first.
                </div>
              ) : (
                <Paper elevation={3} className="p-6 w-full max-w-lg text-center rounded-lg shadow-md">
                  <Avatar className="mx-auto h-16 w-16 border border-gray-200 mb-4">
                    <AvatarImage src={avatar1} alt="Alex Johnson" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <h2 className="font-semibold text-lg">Alex Johnson</h2>
                  <p className="text-gray-500 text-sm">Floor 3, Desk 42</p>

                  <h3 className="font-semibold mt-4">Items:</h3>
                  <ul className="space-y-1 mb-4">
                    {demoOrder.map((item) => (
                      <li key={item.id} className="bg-gray-100 px-3 py-1 rounded text-sm">
                        {item.name} x{item.quantity}
                      </li>
                    ))}
                  </ul>

                  <Stepper activeStep={orderStatusIndex} alternativeLabel>
                    {statusSteps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  <p className="text-gray-500 mt-4">Estimated Time: {estimatedTime}</p>
                </Paper>
              )}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
