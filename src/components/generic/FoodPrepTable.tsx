import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dot, BadgeAlert, BadgeCheck, ChefHat } from "lucide-react";
import { useState } from "react";

interface Order {
  id: string;
  items: string[];
  notes: string[];
  status: string;
  priority: string;
  dueAt: string;
}

const STATUS_STYLES: Record<string, string> = {
  orderPlaced: "bg-slate-100",
  beingPrepared: "bg-red-100",
  beingPackaged: "bg-amber-100",
  readyForPickup: "bg-green-100",
};

const PRIORITY_STYLES: Record<string, string> = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-green-500",
};

interface Props {
  orders: Order[];
  changeStatus: (newStatus: string, orderId: string) => void;
}

export default function FoodPrepOrdersTable({ orders, changeStatus }: Props) {
  const [orderStatuses, setOrderStatuses] = useState(() => {
    return orders.reduce((acc, order) => {
      acc[order.id] = order.status;
      return acc;
    }, {} as Record<string, string>);
  });

  const handleStatusChange = (newStatus: string, orderId: string) => {
    setOrderStatuses((prev) => {
      const updatedStatuses = { ...prev, [orderId]: newStatus };
      // Ensure status change is reflected in the parent component
      changeStatus(newStatus, orderId);
      return updatedStatuses;
    });
  };

  return (
    <Table>
        <TableHeader className="text-black">
        <TableRow>
            <TableHead className="w-1 relative">
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200"></span>
            </TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due At</TableHead>
        </TableRow>
        </TableHeader>

      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id} className={STATUS_STYLES[orderStatuses[order.id]]}>
            <TableCell className="w-1 relative">
              <span className={`absolute left-0 top-0 bottom-0 w-1 ${PRIORITY_STYLES[order.priority]}`}></span>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                <ChefHat className="h-4 w-4 text-[#0052CC]" />
                {order.id}
                </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Dot className="h-4 w-4 text-black" />
                    {item}
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                {order.notes.length > 0 ? (
                  order.notes.map((note, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <BadgeAlert className="h-4 w-4 text-[#ef4444]" />
                      {note}
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2 text-gray-400 italic">
                    <BadgeCheck className="h-4 w-4" /> No Notes
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <Select value={orderStatuses[order.id]} onValueChange={(value) => handleStatusChange(value, order.id)}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="orderPlaced">Order Placed</SelectItem>
                  <SelectItem value="beingPrepared">Being Prepared</SelectItem>
                  <SelectItem value="beingPackaged">Being Packaged</SelectItem>
                  <SelectItem value="readyForPickup">Ready for Pickup</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>{order.dueAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
