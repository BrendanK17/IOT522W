import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "@tanstack/react-router";
import logo from '../../assets/logo.png';

export default function FoodPrepHeader() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  // Determine which button should be highlighted based on the current path
  const isIncomingOrdersActive = location.pathname === "/food-prep-dashboard";
  const isInventoryActive = location.pathname === "/food-prep-inventory";

  return (
    <header className="sticky top-0 bg-white text-black py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200 z-10 w-full">
  <div className="w-full flex justify-between items-center"> {/* Use justify-between to space out the sections */}
    
    {/* Left Section: Logo and Navigation Buttons */}
    <div className="flex items-center space-x-6"> {/* Logo + Navigation */}
      <h1
        className="cursor-pointer"
        onClick={() => navigate({ to: "/" })}
      >
        <img src={logo} alt="Logo" className="w-auto h-10" />
      </h1>

      {/* Navigation Buttons */}
      <nav className="flex space-x-6">
        {/* Incoming Orders Dashboard Button */}
        <Button
          variant={isIncomingOrdersActive ? "default" : "ghost"} // Apply default style if active
          size="sm"
          onClick={() => navigate({ to: "/food-prep-dashboard" })}
          className={isIncomingOrdersActive ? "bg-orange-400 text-white hover:bg-orange-700" : ""}
        >
          Incoming Orders
        </Button>

        {/* Inventory Dashboard Button */}
        <Button
          variant={isInventoryActive ? "default" : "ghost"} // Apply default style if active
          size="sm"
          onClick={() => navigate({ to: "/food-prep-inventory" })}
          className={isInventoryActive ? "bg-orange-400 text-white hover:bg-orange-700" : ""}
        >
          Inventory Dashboard
        </Button>
      </nav>
    </div>

    {/* Right Section: Login and Sign Up Buttons */}
    <div className="flex space-x-4">
      {/* Customer Login Button */}
      <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/login" })}>
        Log in
      </Button>

      {/* Sign Up Button */}
      <Button
        size="sm"
        onClick={() => navigate({ to: "/signup" })}
        className="bg-blue-600 text-white hover:bg-blue-800"
      >
        Sign up
      </Button>
    </div>

  </div>
</header>

  );
}
