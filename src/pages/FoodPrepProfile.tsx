import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Package, CheckCircle } from "lucide-react"
import foodPrepStaffIcon from "../assets/avatar_4.png"
import { Link } from "@tanstack/react-router"

export default function ProfilePage() {
  const profileData = {
    name: "Food Prep Staff",
    email: "foodprep@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Prep Lane, Chop Town, TX 12345",
    joinDate: "September 1, 2020",
    mealsPrepped: 1982,    
    pendingOrders: 4,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

      <div className="py-10 px-4 md:px-12 lg:px-24">
        <div className="mb-6">
        <Link to="/food-prep-dashboard" className="flex items-center">
          <Button variant="outline" size="sm" className="gap-2 rounded-full">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>  
        </div>

        <Card className="w-full border-none shadow-xl overflow-hidden">           <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/20"></div>
              <div className="absolute right-20 bottom-5 w-20 h-20 rounded-full bg-white/20"></div>
              <div className="absolute left-40 top-10 w-10 h-10 rounded-full bg-white/20"></div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6 z-10">
            <div className="flex items-center gap-2 cursor-pointer">
            <Avatar className="h-20 w-20 border-4 border-[#0052CC]">
                <AvatarImage src={foodPrepStaffIcon} />
            </Avatar>
            </div>
              <div className="text-center md:text-left">
                <CardTitle className="text-2xl font-bold">{profileData.name}</CardTitle>
                <CardDescription className="text-blue-100 text-lg mt-1">Delivery Personnel</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
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
                  <p className="text-sm text-muted-foreground text-center">Completed</p>
                  <p className="text-2xl font-bold text-center">{profileData.mealsPrepped}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Pending</p>
                  <p className="text-2xl font-bold text-center">{profileData.pendingOrders}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="h-6 w-6 text-amber-600" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Experience</p>
                  <p className="text-2xl font-bold text-center">1 yr</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
