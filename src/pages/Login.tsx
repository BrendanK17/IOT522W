import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      // Sign Up Logic
      if (localStorage.getItem(email)) {
        setError("An account with this email already exists.");
        return;
      }

      // Save credentials in localStorage
      localStorage.setItem(email, JSON.stringify({ password }));
      setError("");
      console.log("Account created for:", email);
      navigate({ to: "/customer" });
    } else {
      // Login Logic
      const storedCredentials = localStorage.getItem(email);

      if (storedCredentials) {
        const { password: storedPassword } = JSON.parse(storedCredentials);
        if (storedPassword === password) {
          setError("");
          console.log("Login successful for:", email);
          navigate({ to: "/customer/order" }); // Navigate to the customer's order page
        } else {
          setError("Invalid password.");
        }
      } else {
        setError("No account found with this email.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">{isSignUp ? "Sign Up" : "Sign In"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">{isSignUp ? "Create Account" : "Sign In"}</Button>
            <div className="text-center text-sm text-gray-500 mt-4">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <a
                    href="#"
                    onClick={() => setIsSignUp(false)}
                    className="text-blue-500 cursor-pointer"
                  >
                    Sign In
                  </a>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <a
                    href="#"
                    onClick={() => setIsSignUp(true)}
                    className="text-blue-500 cursor-pointer"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
