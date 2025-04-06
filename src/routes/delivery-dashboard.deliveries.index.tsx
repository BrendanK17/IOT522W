import { ProtectedRoute } from "@/context/ProtectedRoute";
import DeliveryList from "@/pages/DeliveryList";
import { createFileRoute} from "@tanstack/react-router"

export const Route = createFileRoute('/delivery-dashboard/deliveries/')({
  component: () => (
    <ProtectedRoute allowedRoles={["delivery-staff"]}>
      <DeliveryList />
    </ProtectedRoute>
  ),
});