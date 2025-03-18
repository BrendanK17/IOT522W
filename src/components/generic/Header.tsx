import { Button } from "@/components/ui/button";
import { useNavigate, useRouter } from "@tanstack/react-router";  // Import useRouter to access the current route
import logo from '../../assets/logo.png';

export default function Header() {
  const navigate = useNavigate();
  const router = useRouter();

  // List of routes where you want to hide the header
  const hiddenRoutes = ['/delivery-dashboard'];

  // If the current route is in the hiddenRoutes list, don't render the header
  if (hiddenRoutes.includes(router.state.location.pathname)) {
    return null;  
  }

  return (
    <header className="sticky top-0 bg-white text-black py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200 z-10 w-full">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <h1
          className="cursor-pointer"
          onClick={() => navigate({ to: "/" })}
        >
          <img src={logo} alt="Logo" className="w-auto h-10" />
        </h1>

        {/* Navigation Buttons */}
        <nav className="flex space-x-4">
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
        </nav>
      </div>
    </header>
  );
}