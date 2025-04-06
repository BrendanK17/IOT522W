import { ProtectedRoute } from "@/context/ProtectedRoute";
import DeliveryMap from "@/pages/DeliveryMap";
import { createFileRoute} from "@tanstack/react-router"

export const Route = createFileRoute('/delivery-dashboard/map/')({
  component: () => (
    <ProtectedRoute allowedRoles={["delivery-staff"]}>
      <DeliveryMap />
    </ProtectedRoute>
  ),
});