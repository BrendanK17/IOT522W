import { ProtectedRoute } from "@/context/ProtectedRoute";
import FoodPrepDashboard from "@/pages/FoodPrepDashboard"
import { createFileRoute} from "@tanstack/react-router"

export const Route = createFileRoute('/food-prep-dashboard/')({
  component: () => (
    <ProtectedRoute allowedRoles={["food-prep-staff"]}>
      <FoodPrepDashboard />
    </ProtectedRoute>
  ),
});