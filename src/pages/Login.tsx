import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, LogIn } from "lucide-react";
import { Label } from "@/components/ui/label";
import Header from "@/components/generic/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const loggedIn = login(email, password);
    if (loggedIn) {
      toast.success(`Logged in successfully! Redirecting...`);
      setTimeout(() => {
        if (email === "customer@example.com") navigate({ to: "/customer/order" });
        else if (email === "foodprep@example.com") navigate({ to: "/food-prep-dashboard" });
        else if (email === "delivery@example.com") navigate({ to: "/delivery-dashboard" });
      }, 1500);
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#E6F0FF] to-white p-4">
        <Toaster position="top-right" />
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
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
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
    </div>
  );
};

export default Login;
