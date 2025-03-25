import { ProtectedRoute } from "@/context/ProtectedRoute";
import Login from "@/pages/Login"
import { createFileRoute} from "@tanstack/react-router"

export const Route = createFileRoute('/customer/')({
  component: () => (
    <ProtectedRoute allowedRoles={["customer"]}>
      <Login />
    </ProtectedRoute>
  ),
});