import Header from "@/components/generic/Header";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export default function Unauthorised() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Unauthorised</h1>
        <p>You don't have access to this page.</p>
        <Button onClick={() => navigate({ to: '/' })}>Go Home</Button>
      </div>
    </div>
  );
}
