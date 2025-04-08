import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/generic/Header";
import { Button } from "@/components/ui/button";

export default function Unauthorised() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleRedirect = () => {
    if (user?.email === "customer@example.com") {
      navigate({ to: "/customer/order" });
    } else if (user?.email === "foodprep@example.com") {
      navigate({ to: "/food-prep-dashboard" });
    } else if (user?.email === "delivery@example.com") {
      navigate({ to: "/delivery-dashboard" });
    } else {
      navigate({ to: "/" });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Unauthorised</h1>
        <p>You don't have access to this page.</p>
        <Button onClick={handleRedirect}>Go to Your Dashboard</Button>
      </div>
    </div>
  );
}
