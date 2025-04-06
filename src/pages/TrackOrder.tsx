import { useNavigate } from "@tanstack/react-router";
import Sidebar from "@/components/generic/Sidebar";
import { useState, useEffect } from "react";
import { BarChart3, Package } from "lucide-react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import avatar1 from "../assets/avatar_1.png"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function TrackOrder() {
    const [activeTab, setActiveTab] = useState("tracking");
    const [orderStatusIndex, setOrderStatusIndex] = useState(0);
    const [estimatedTime, setEstimatedTime] = useState("30 minutes");
    const navigate = useNavigate();

    const sideMenuItems = [
        { label: "Dashboard", icon: <BarChart3 className="mr-2 h-5 w-5" />, value: "dashboard", path: "/customer/order" },
        { label: "Deliveries", icon: <Package className="mr-2 h-5 w-5" />, value: "tracking", path: "/customer/track-order" },
    ];

    const statusSteps = ["Preparing", "Cooking", "Out for Delivery", "Delivered"];

    useEffect(() => {
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
    }, []);

    return (
        <div className="min-h-screen flex bg-gray-50">
            <Sidebar
                menuItems={sideMenuItems}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onNavigate={(path) => navigate({ to: path })}
                sidebarOpen={false}
            />
            <div className="flex-1 p-6">
                <Avatar className="h-10 w-10 border border-gray-200">
                    <AvatarImage src={avatar1} alt={"Alex Johnson"} />
                    <AvatarFallback>
                    {/* <Stepper activeStep={orderStatusIndex} alternativeLabel className="mt-4">
                        {statusSteps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper> */}
                    </AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold mb-4">Deliveries</h1>
                <Paper elevation={3} className="p-6 w-full max-w-lg mx-auto text-center rounded-lg shadow-md">
                    <div className="flex items-center justify-center space-x-4">
                        <Avatar src="https://i.pravatar.cc/40?img=1" alt="Alex Johnson" />
                        <div>
                            <h2 className="font-semibold text-lg">Alex Johnson</h2>
                            <p className="text-gray-500 text-sm">Floor 3, Desk 42</p>
                        </div>
                    </div>
                    <h3 className="font-semibold mt-4">Items:</h3>
                    <ul className="space-y-1">
                        <li className="bg-gray-100 px-3 py-1 rounded text-sm">Chicken Salad</li>
                        <li className="bg-gray-100 px-3 py-1 rounded text-sm">Sparkling Water</li>
                    </ul>
                    <Stepper activeStep={orderStatusIndex} alternativeLabel className="mt-4">
                        {statusSteps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <p className="text-gray-500 mt-4">Estimated Time: {estimatedTime}</p>
                </Paper>
            </div>
        </div>
    );
}
