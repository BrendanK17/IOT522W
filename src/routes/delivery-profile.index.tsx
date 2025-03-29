import { ProtectedRoute } from "@/context/ProtectedRoute";
import DeliveryProfile from "@/pages/DeliveryProfile"
import { createFileRoute} from "@tanstack/react-router"

export const Route = createFileRoute('/delivery-profile/')({
  component: () => (
    <ProtectedRoute allowedRoles={["delivery-staff"]}>
      <DeliveryProfile />
    </ProtectedRoute>
  ),
});