import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"


const orders = [
  {
    timePlaced: "10:30 AM",
    orderNumber: "ORD001",
    order: "Margherita Pizza",
    specialRequests: "Extra Cheese",
    extras: "Garlic Bread",
    status: "Completed",
  },
  {
    timePlaced: "11:15 AM",
    orderNumber: "ORD002",
    order: "Veggie Burger",
    specialRequests: "No Mayo",
    extras: "Sweet Potato Fries",
    status: "In Progress",
  },
  {
    timePlaced: "12:00 PM",
    orderNumber: "ORD003",
    order: "Chicken Caesar Salad",
    specialRequests: "Dressing on the Side",
    extras: "Breadsticks",
    status: "Pending",
  },
  {
    timePlaced: "12:45 PM",
    orderNumber: "ORD004",
    order: "BBQ Ribs",
    specialRequests: "Extra Sauce",
    extras: "Coleslaw",
    status: "Completed",
  },
  {
    timePlaced: "1:20 PM",
    orderNumber: "ORD005",
    order: "Fish and Chips",
    specialRequests: "Lemon Wedges",
    extras: "Tartar Sauce",
    status: "Completed",
  },
  {
    timePlaced: "2:10 PM",
    orderNumber: "ORD006",
    order: "Spaghetti Bolognese",
    specialRequests: "No Cheese",
    extras: "Garlic Knots",
    status: "In Progress",
  },
  {
    timePlaced: "3:05 PM",
    orderNumber: "ORD007",
    order: "Steak Sandwich",
    specialRequests: "Medium Rare",
    extras: "Onion Rings",
    status: "Pending",
  },
];

export default function FoodPrepDashboard() {
    return (
      <div className="flex flex-col h-screen px-6 md:px-16 lg:px-28 py-4">
        <h1 className="text-3xl font-bold">Incoming Orders Dashboard</h1>
        <h3 className="text-lg font-medium mt-2">Food Preparation</h3>
        <Separator className="my-4 border-gray-400" />
        <div className="flex justify-center items-center mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] font-bold">Order Number</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Special Requests</TableHead>
                <TableHead>Extras</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((orders) => (
                <TableRow key={orders.orderNumber}>
                  <TableCell className="font-medium">{orders.orderNumber}</TableCell>
                  <TableCell>{orders.order}</TableCell>
                  <TableCell>{orders.specialRequests}</TableCell>
                  <TableCell>{orders.extras}</TableCell>
                  <TableCell className="text-right">{orders.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      );
} 