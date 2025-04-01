import { BarChart3, Package } from "lucide-react";

// Note that the order count is hard coded at 4
export const menuItems = [
    { label: "Dashboard", icon: <BarChart3 className="mr-2 h-5 w-5" />, value: "dashboard", path: "/food-prep-dashboard" },
    { label: "Orders", icon: <Package className="mr-2 h-5 w-5" />, value: "orders", badgeCount: 4, path: "/food-prep-dashboard/orders" },
    { label: "Inventory", icon: <Package className="mr-2 h-5 w-5" />, value: "inventory", path: "/food-prep-dashboard/inventory" }
];