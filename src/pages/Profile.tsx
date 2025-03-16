import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export default function Profile() {
  const navigate = useNavigate();
  
  const email = localStorage.getItem("email") || ""; // Get email from localStorage or use an empty string
  const storedProfile = JSON.parse(localStorage.getItem(email) || "{}");
  
  // Default profile data
  const defaultProfile = {
    name: storedProfile?.name || "",
    email: storedProfile?.email || email,
    password: storedProfile?.password || "",
  };

  const [profile, setProfile] = useState(defaultProfile);
  const [error, setError] = useState("");
  
  useEffect(() => {
    if (!email) {
      navigate({ to: "/customer" });
    }
  }, [email, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (profile.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Update the profile data in localStorage
    localStorage.setItem(profile.email, JSON.stringify({ name: profile.name, email: profile.email, password: profile.password }));
    setError("");
    console.log("Profile updated:", profile);
    alert("Profile updated successfully!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                placeholder="you@example.com"
                disabled
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={profile.password}
                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                placeholder="••••••••"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">Update Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
