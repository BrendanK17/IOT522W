import { BarChart3, Package, MapPin } from "lucide-react";
import { pendingDeliveries } from "@/lib/delivery/deliveries";

export const deliveryMenuItems = [
  {
    label: "Dashboard",
    icon: <BarChart3 className="mr-2 h-5 w-5" />,
    value: "dashboard",
    path: "/delivery-dashboard",
  },
  {
    label: "Deliveries",
    icon: <Package className="mr-2 h-5 w-5" />,
    value: "deliveries",
    badgeCount: pendingDeliveries.length,
    path: "/delivery-dashboard/deliveries",
  },
  {
    label: "Office Map",
    icon: <MapPin className="mr-2 h-5 w-5" />,
    value: "map",
    path: "/delivery-dashboard/map",
  },
];
