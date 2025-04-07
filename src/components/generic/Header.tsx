import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import logo from '../../assets/logo.png';
import { ThemeToggle } from "@/components/themes/ThemeToggle"

interface HeaderProps{
  role: "customer" | "food-prep-staff" | "delivery-staff";
}

export default function Header({ role }: HeaderProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogoClick = () => {
    const roleToRoute: Record<typeof role, string> = {
      "customer": "/customer/orders",
      "food-prep-staff": "food-prep-dashboard",
      "delivery-staff": "/delivery-dashboard",
    };

    if (user && role && roleToRoute[role]) {
      navigate({ to: roleToRoute[role] });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate({ to: "/" }); // fallback
    }
  };
  

  return (
    <header className="sticky top-0 bg-white text-black py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200 z-10 w-full">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo + Role-specific Buttons */}
        <div className="flex items-center space-x-4">
          <h1 className="cursor-pointer" onClick={handleLogoClick}>
            <img src={logo} alt="Logo" className="w-auto h-10" />
          </h1>
        </div>

        {/* Auth Buttons */}
        <nav className="flex space-x-4 items-center">
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                logout();
                navigate({ to: "/login" });
              }}
            >
              Log out
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/login" })}>
                Log in
              </Button>

              <Button
                size="sm"
                onClick={() => navigate({ to: "/signup" })}
                className="bg-blue-600 text-white hover:bg-blue-800"
              >
                Sign up
              </Button>
            </>
          )}
        </nav>
        
      </div>
      
    </header>
  );
}
