import { ProtectedRoute } from "@/context/ProtectedRoute";
import CustomerProfile from "@/pages/CustomerProfile";
import { createFileRoute} from "@tanstack/react-router"

export const Route = createFileRoute('/customer-profile/')({
  component: () => (
    <ProtectedRoute allowedRoles={["customer"]}>
      <CustomerProfile />
    </ProtectedRoute>
  ),
});