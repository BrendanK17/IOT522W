import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import logo from '../../assets/logo.png';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white text-black py-4 px-8 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1
          className="cursor-pointer"
          onClick={() => navigate({ to: "/" })}
        >
          <img src={logo} alt="Logo" className="w-auto h-10 " />
        </h1>

        {/* Customer Login Button */}
        <nav className="flex space-x-4">
          <Button variant="ghost" 
          className="px-4 py-2 rounded-full bg-gray-100 text-black transition duration-300 hover:bg-blue-600 hover:text-white" 
          onClick={() => navigate({ to: "/customer" })}>
            Login
          </Button>

        {/* Sign Up Button */}
        <Button
            variant="ghost"
            className="px-4 py-2 rounded-full bg-blue-600 text-white transition duration-300 hover:bg-blue-700"
            onClick={() => navigate({ to: "/signup" })}
          >
            Sign Up
          </Button>  
        </nav>
      </div>
    </header>
  );
}
