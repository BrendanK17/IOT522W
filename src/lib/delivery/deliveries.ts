import avatar1 from "../../assets/avatar_1.png"
import avatar2 from "../../assets/avatar_2.png"
import avatar3 from "../../assets/avatar_3.png"
import avatar4 from "../../assets/avatar_4.png"
import avatar5 from "../../assets/avatar_5.png"
import avatar6 from "../../assets/avatar_6.png"
import avatar7 from "../../assets/avatar_7.png"

// Update the mock data to include floor, deskId and coordinates for map functionality
export const pendingDeliveries = [
  {
    id: "ORD-1234",
    customer: "Alex Johnson",
    location: "Floor 3, Desk 42",
    items: ["Chicken Salad", "Sparkling Water"],
    status: "ready",
    time: "Due 2 mins ago",
    avatar: avatar1,
    priority: "high",
    floor: "3",
    deskId: "42",
    coordinates: { x: 65, y: 5 },
    phoneNumber: "+1-555-0123",
  },
  {
    id: "ORD-1235",
    customer: "Sarah Miller",
    location: "Floor 2, Meeting Room B",
    items: ["Veggie Wrap", "Green Tea", "Chocolate Brownie"],
    status: "ready",
    time: "Due in 5 mins",
    avatar: avatar2,
    priority: "medium",
    floor: "2",
    deskId: "MR-B",
    coordinates: { x: 65, y: 65 },
    phoneNumber: "+1-555-0789",
  },
  {
    id: "ORD-1236",
    customer: "David Chen",
    location: "Floor 4, Desk 15",
    items: ["Beef Burger", "Fries", "Cola"],
    status: "ready",
    time: "Due in 7 mins",
    avatar: avatar3,
    priority: "medium",
    floor: "4",
    deskId: "15",
    coordinates: { x: 45, y: 30 },
    phoneNumber: "+1-555-0912",
  },
  {
    id: "ORD-1237",
    customer: "Lisa Wong",
    location: "Floor 1, Reception",
    items: ["Pasta Carbonara", "Garlic Bread", "Iced Tea"],
    status: "ready",
    time: "Due in 10 mins",
    avatar: avatar4,
    priority: "low",
    floor: "1",
    deskId: "Reception",
    coordinates: { x: 58, y: 40 },
    phoneNumber: "+1-555-0848",
  },
]

export const completedDeliveries = [
  {
    id: "ORD-1230",
    customer: "Emma Wilson",
    location: "Floor 1, Reception",
    items: ["Caesar Salad", "Orange Juice"],
    status: "completed",
    time: "25 mins ago",
    avatar: avatar5,
    floor: "1",
    deskId: "Reception",
    coordinates: { x: 81, y: 80 },
    phoneNumber: "+1-555-1345",
  },
  {
    id: "ORD-1231",
    customer: "Michael Brown",
    location: "Floor 3, Desk 28",
    items: ["Tuna Sandwich", "Apple", "Water"],
    status: "completed",
    time: "45 mins ago",
    avatar: avatar6,
    floor: "3",
    deskId: "28",
    coordinates: { x: 54, y: 82 },
    phoneNumber: "+1-555-1678",
  },
  {
    id: "ORD-1232",
    customer: "James Smith",
    location: "Floor 2, Meeting Room A",
    items: ["Chicken Wrap", "Coffee"],
    status: "completed",
    time: "1 hour ago",
    avatar: avatar7,
    floor: "2",
    deskId: "MR-A",
    coordinates: { x: 25, y: 45 },
    phoneNumber: "+1-555-1901",
  },
]