// UserMenu.tsx
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface UserMenuProps {
  role: "customer" | "food-prep-staff" | "delivery-staff";
  name: string;
  email: string;
  avatarSrc?: string;
}

export function UserMenu({ role, name, email, avatarSrc }: UserMenuProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  const rolesToRoute: Record<UserMenuProps["role"], string> = {
    "customer": "/customer-profile",
    "food-prep-staff": "/food-prep-profile",
    "delivery-staff": "/delivery-profile",
  };

  const handleLogout = () => {
    logout();
    toast.info("You have been logged out.");
    navigate({ to: "/login" });
  };

  const handleViewProfile = () => {
    const route = rolesToRoute[role];
    if (route) {
      navigate({ to: route });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      console.error("Invalid role");
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar className="h-8 w-8 border-2 border-[#0052CC]">
            <AvatarImage src={avatarSrc} alt={name} />
            <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={handleViewProfile} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>View Profile</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-500 focus:text-red-500 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4 text-red-500" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
