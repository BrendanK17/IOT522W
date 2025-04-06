"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import customerLogo from "../assets/persona/customer_logo.png"
import { Link } from "@tanstack/react-router"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, CheckCircle, UtensilsCrossed, Clock, Salad, Coffee, Cake, Beef, MilkOff, ShoppingBag } from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const navigate = useNavigate()

  const profileData = {
    name: "Customer",
    email: "customer@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Rd, New York City, NY, 12345",
    joinDate: "March 7, 2024",
    ordersPlaced: 256,
    lastOrder: "March 31, 2025",
  }

  const recentOrders = [
    {
      id: "ORD-5723",
      date: "March 31, 2025",
      time: "12:30 PM",
      total: "£24.99",
      status: "Delivered",
      items: [
        { name: "Chicken Caesar Salad", quantity: 1, price: "£12.99", icon: "Salad" },
        { name: "Sparkling Water", quantity: 1, price: "£3.50", icon: "Coffee" },
        { name: "Chocolate Brownie", quantity: 1, price: "£8.50", icon: "Cake" },
      ],
    },
    {
      id: "ORD-5698",
      date: "March 15, 2025",
      time: "1:15 PM",
      total: "£18.75",
      status: "Delivered",
      items: [
        { name: "Vegetable Pasta", quantity: 1, price: "£14.50", icon: "UtensilsCrossed" },
        { name: "Iced Tea", quantity: 1, price: "£4.25", icon: "Coffee" },
      ],
    },
    {
      id: "ORD-5642",
      date: "February 28, 2025",
      time: "11:45 AM",
      total: "£22.50",
      status: "Delivered",
      items: [
        { name: "Beef Burger & Fries", quantity: 1, price: "£16.99", icon: "Beef" },
        { name: "Vanilla Milkshake", quantity: 1, price: "£5.51", icon: "MilkOff" },
      ],
    },
    {
      id: "ORD-5621",
      date: "February 14, 2025",
      time: "12:00 PM",
      total: "£19.25",
      status: "Delivered",
      items: [
        { name: "Vegetable Curry & Rice", quantity: 1, price: "£15.50", icon: "UtensilsCrossed" },
        { name: "Mango Lassi", quantity: 1, price: "£3.75", icon: "Coffee" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="py-10 px-4 md:px-12 lg:px-24">
        <div className="mb-6">
          <Link to="/customer/order" className="flex items-center">
              <Button variant="outline" size="sm" className="gap-2 rounded-full">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
              </Button>
          </Link>  
        </div>

        <Card className="w-full border-none shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/20"></div>
              <div className="absolute right-20 bottom-5 w-20 h-20 rounded-full bg-white/20"></div>
              <div className="absolute left-40 top-10 w-10 h-10 rounded-full bg-white/20"></div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6 z-10">
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar className="h-20 w-20 border-4 border-[#0052CC]">
                  <AvatarImage src={customerLogo} alt="Customer avatar" />
                </Avatar>
              </div>
              <div className="text-center md:text-left">
                <CardTitle className="text-2xl font-bold">{profileData.name}</CardTitle>
                <CardDescription className="text-blue-100 text-lg mt-1">Customer</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-8">
                <div className="grid gap-4">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span>{profileData.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span>Joined {profileData.joinDate}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4">
                  <h3 className="text-lg font-semibold">Performance</h3>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm">
                      <div className="flex items-center justify-center mb-2">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="text-sm text-muted-foreground text-center">Orders Placed</p>
                      <p className="text-2xl font-bold text-center">{profileData.ordersPlaced}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm">
                      <div className="flex items-center justify-center mb-2">
                        <Calendar className="h-6 w-6 text-amber-600" />
                      </div>
                      <p className="text-sm text-muted-foreground text-center">Ordering For</p>
                      <p className="text-2xl font-bold text-center">1 yr</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Recent Canteen Orders</h3>
                  <Button variant="outline" size="sm">
                    View All Orders
                  </Button>
                </div>

                <div className="space-y-6">
                  {recentOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardHeader className="bg-slate-50 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <UtensilsCrossed className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">{order.id}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-slate-500" />
                              <span className="text-sm text-slate-600">
                                {order.date} at {order.time}
                              </span>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Item</TableHead>
                              <TableHead className="text-right">Qty</TableHead>
                              <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.items.map((item, index) => {
                              // Dynamically select the icon component based on the icon name
                              let ItemIcon
                              switch (item.icon) {
                                case "Salad":
                                  ItemIcon = Salad
                                  break
                                case "Coffee":
                                  ItemIcon = Coffee
                                  break
                                case "Cake":
                                  ItemIcon = Cake
                                  break
                                case "Beef":
                                  ItemIcon = Beef
                                  break
                                case "MilkOff":
                                  ItemIcon = MilkOff
                                  break
                                default:
                                  ItemIcon = UtensilsCrossed
                              }

                              return (
                                <TableRow key={index}>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <ItemIcon className="h-4 w-4 text-slate-500" />
                                      <span>{item.name}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right">{item.quantity}</TableCell>
                                  <TableCell className="text-right">{item.price}</TableCell>
                                </TableRow>
                              )
                            })}
                            <TableRow>
                              <TableCell colSpan={2} className="text-right font-medium">
                                Total
                              </TableCell>
                              <TableCell className="text-right font-bold">{order.total}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        <div className="mt-4 flex justify-end">
                          <Button
                            variant="default"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => navigate({ to: "/re-order" })}
                          >
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Reorder
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

