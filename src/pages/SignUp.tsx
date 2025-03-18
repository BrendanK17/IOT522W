import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Toaster, toast } from "sonner"
import { Link } from "@tanstack/react-router"
import { Mail, Lock, User, ArrowRight, Utensils, MapPin, ChefHat } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { signup } from "../lib/auth"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("customer")

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()

    const response = signup(email, password, role)
    if (response === "User created successfully") {
      toast.success("Account created! You can now log in.")
    } else {
      toast.error(response)
    }
  }

  // Role icons and descriptions
  const roleInfo = {
    customer: {
      icon: <Utensils className="h-5 w-5" />,
      description: "Order food to your desk",
    },
    "food-prep-staff": {
      icon: <ChefHat className="h-5 w-5" />,
      description: "Prepare orders in the kitchen",
    },
    "delivery-staff": {
      icon: <MapPin className="h-5 w-5" />,
      description: "Deliver food to customers",
    },
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#E6F0FF] to-white p-4">
      <Toaster position="top-right" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 h-32 w-32 rounded-full bg-[#0052CC]/5 blur-xl hidden lg:block"></div>
      <div className="absolute bottom-20 right-20 h-40 w-40 rounded-full bg-[#0052CC]/10 blur-xl hidden lg:block"></div>

      <Card className="w-full max-w-[450px] shadow-xl border-0">
        <CardHeader className="space-y-2 pb-2">
          <div className="mx-auto h-12 w-12 rounded-full bg-[#0052CC]/10 flex items-center justify-center mb-2">
            <User className="h-6 w-6 text-[#0052CC]" />
          </div>
          <CardTitle className="text-center text-2xl font-bold">Join DeskDash</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Create your account and start ordering food to your desk
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="pl-10 border-gray-200 focus:border-[#0052CC] focus:ring-[#0052CC]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 border-gray-200 focus:border-[#0052CC] focus:ring-[#0052CC]"
                />
              </div>
              <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium">
                I want to
              </Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role" className="w-full border-gray-200 focus:border-[#0052CC] focus:ring-[#0052CC]">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer" className="flex items-center">
                    <div className="flex items-center gap-2">
                      <Utensils className="h-4 w-4" />
                      <span>Order food (Customer)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="food-prep-staff">
                    <div className="flex items-center gap-2">
                      <ChefHat className="h-4 w-4" />
                      <span>Prepare food (Kitchen Staff)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="delivery-staff">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Deliver food (Delivery Staff)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Role description */}
            <div className="rounded-lg bg-[#E6F0FF] p-3 flex items-start gap-3">
              {roleInfo[role as keyof typeof roleInfo].icon}
              <div>
                <p className="text-sm font-medium">
                  {role === "customer" ? "Customer" : role === "food-prep-staff" ? "Kitchen Staff" : "Delivery Staff"}
                </p>
                <p className="text-xs text-muted-foreground">{roleInfo[role as keyof typeof roleInfo].description}</p>
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#0052CC] hover:bg-[#0052CC]/90 text-white py-2 h-11 mt-2">
              Create Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-[#0052CC] font-medium hover:underline">
                Log in
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-muted-foreground">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Signup