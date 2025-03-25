import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export default function Unauthorised() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center flex-col gap-4">
      <h1 className="text-3xl font-bold">Unauthorised</h1>
      <p>You don't have access to this page.</p>
      <Button onClick={() => navigate({ to: '/' })}>Go Home</Button>
    </div>
  );
}
