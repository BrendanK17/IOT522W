import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { login } from "../lib/auth.ts"; // Correct import for auth.ts
import { Mail, Lock, LogIn } from "lucide-react";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = login(email, password);
    if (user) {
      toast.success(`Welcome, ${user.role}!`);
      if (user.role === "customer") navigate({ to: "/customer/order" });
      else if (user.role === "food-prep-staff") navigate({ to: "/food-prep-dashboard" });
      else if (user.role === "delivery-staff") navigate({ to: "/delivery-dashboard" });
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#E6F0FF] to-white p-4">
      <Toaster position="top-right" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-[#0052CC]/5 blur-xl hidden lg:block"></div>
      <div className="absolute bottom-20 left-20 h-40 w-40 rounded-full bg-[#0052CC]/10 blur-xl hidden lg:block"></div>

      <div className="w-full max-w-[450px]">
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-2 pb-2">
            <div className="mx-auto h-12 w-12 rounded-full bg-[#0052CC]/10 flex items-center justify-center mb-2">
              <LogIn className="h-6 w-6 text-[#0052CC]" />
            </div>
            <CardTitle className="text-center text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Log in to your DeskDash account
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleLogin} className="space-y-5">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <a href="#" className="text-xs text-[#0052CC] hover:underline">
                    Forgot password?
                  </a>
                </div>
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
              </div>

              <Button type="submit" className="w-full bg-[#0052CC] hover:bg-[#0052CC]/90 text-white py-2 h-11 mt-2">
                Log In
                <LogIn className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#0052CC] font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;