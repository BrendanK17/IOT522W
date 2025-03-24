import * as React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Coffee, BadgeAlert, BadgeCheck } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  location: string;
  items: string[];
  placedAt: string;
  dueAt: string;
  notes: string[];
  status: string;
  time: string;
  avatar: string;
  priority: string;
}

interface OrderCardProps {
  order: Order;
  changeStatus: (orderId: string, newStatus: string) => void;
}

// Status badge styles & labels
const STATUS_STYLES: Record<string, string> = {
  orderPlaced: "bg-slate-100 text-slate-700",
  beingPrepared: "bg-red-100 text-red-700",
  beingPackaged: "bg-amber-100 text-amber-700",
  readyForPickup: "bg-green-100 text-green-700",
};

const STATUS_LABELS: Record<string, string> = {
  orderPlaced: "Order Placed",
  beingPrepared: "Being Prepared",
  beingPackaged: "Being Packaged",
  readyForPickup: "Ready for Pickup",
};

const PRIORITY_STYLES: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
};

const OrderCard: React.FC<OrderCardProps> = ({ order, changeStatus }) => {
  // Store status locally so the badge updates immediately
  const [status, setStatus] = React.useState(order.status);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus); // Update local state
    changeStatus(order.id, newStatus); // Update parent state
  };

  return (
    <Card className="overflow-hidden border-none shadow-md">
        <div
            className={`h-2 w-full ${
                order.priority === "high"
                ? "bg-red-500"
                : order.priority === "medium"
                ? "bg-amber-500"
                : "bg-green-500"
            }`}
        ></div>
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 pb-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Order ID */}
            <Badge variant="outline" className="bg-[#0052CC] text-white border-none mt-3">
              {order.id}
            </Badge>

            {/* Priority Badge */}
            <Badge variant="outline" className={`border-none mt-3 ${PRIORITY_STYLES[order.priority]}`}>
              {order.priority === "high"
                ? "High Priority"
                : order.priority === "medium"
                ? "Medium Priority"
                : "Low Priority"}
            </Badge>

            {/* Dynamic Status Badge - now updates immediately */}
            <Badge variant="outline" className={`border-none mt-3 ${STATUS_STYLES[status]}`}>
              {STATUS_LABELS[status]}
            </Badge>
          </div>
          <p className="text-sm font-medium mt-3">DUE AT {order.dueAt}</p>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="pt-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar className="h-12 w-12 border-2 border-gray-200">
            <AvatarImage src={order.avatar} alt={order.customer} />
            <AvatarFallback>
              {order.customer
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          {/* Order Details */}
          <div className="flex-1">
            <p className="font-medium text-lg">{order.customer}</p>

            {/* Items List */}
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Items</p>
              <div className="grid grid-cols-1 gap-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center rounded-lg bg-gray-50 p-2 text-sm">
                    <Coffee className="mr-2 h-4 w-4 text-[#0052CC]" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Notes */}
              {order.notes && (
                <>
                  <p className="text-sm font-medium mt-4 mb-2">Notes</p>
                    <div className="grid grid-cols-1 gap-2">
                    {order.notes.length > 0 ? (
                        order.notes.map((note, index) => (
                        <div key={index} className="flex items-center rounded-lg bg-gray-50 p-2 text-sm">
                            <BadgeAlert className="mr-2 h-4 w-4 text-[#ef4444]" />
                            {note}
                        </div>
                        ))
                    ) : (
                        <div className="flex items-center rounded-lg bg-gray-50 p-2 text-sm text-gray-500">
                        <BadgeCheck className="mr-2 h-4 w-4 text-gray-400" />
                        No Notes
                        </div>
                    )}
                    </div>
                </>
              )}

              {/* Status Selector */}
              <div className="flex justify-center gap-4 mt-4 w-full">
                <Select onValueChange={handleStatusChange} defaultValue={status}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="orderPlaced">Order Placed</SelectItem>
                    <SelectItem value="beingPrepared">Being Prepared</SelectItem>
                    <SelectItem value="beingPackaged">Being Packaged</SelectItem>
                    <SelectItem value="readyForPickup">Ready for Pickup</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;