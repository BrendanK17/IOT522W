import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate({ to: "/" })}
        >
          DESK DASH
        </h1>
        <nav className="flex space-x-4">
          <Button variant="ghost" onClick={() => navigate({ to: "/customer" })}>
            Customer Login
          </Button>
        </nav>
      </div>
    </header>
  );
}
