import { Button } from "@/components/ui/button";
import { useNavigate, useRouter } from "@tanstack/react-router";
import logo from '../../assets/logo.png';
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const router = useRouter();
  const { user, logout } = useAuth();

  const isActiveRoute = (path: string) => router.state.location.pathname === path;

  return (
    <header className="sticky top-0 bg-white text-black py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200 z-10 w-full">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo + Role-specific Buttons */}
        <div className="flex items-center space-x-4">
          <h1 className="cursor-pointer" onClick={() => navigate({ to: "/" })}>
            <img src={logo} alt="Logo" className="w-auto h-10" />
          </h1>

          {user?.role === "delivery-staff" && (
            <>
              <Button
                variant={isActiveRoute("/delivery-dashboard") ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate({ to: "/delivery-dashboard" })}
                className={isActiveRoute("/delivery-dashboard") ? "bg-green-400 text-white hover:bg-green-700" : ""}
              >
                Delivery Dashboard
              </Button>
            </>
          )}

          {user?.role === "customer" && (
            <>
              <Button
                variant={isActiveRoute("/customer/order") ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate({ to: "/customer/order" })}
                className={isActiveRoute("/customer/order") ? "bg-blue-400 text-white hover:bg-blue-700" : ""}
              >
                Order
              </Button>


              <Button
                variant={isActiveRoute("/customer/checkout") ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate({ to: "/customer/checkout" })}
                className={isActiveRoute("/customer/checkout") ? "bg-blue-400 text-white hover:bg-blue-700" : ""}
              >
                Checkout
              </Button>
            </>
          )}
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
