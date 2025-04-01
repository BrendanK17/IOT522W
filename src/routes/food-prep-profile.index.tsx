import { ProtectedRoute } from "@/context/ProtectedRoute";
import FoodPrepProfile from "@/pages/FoodPrepProfile";
import { createFileRoute} from "@tanstack/react-router"

export const Route = createFileRoute('/food-prep-profile/')({
  component: () => (
    <ProtectedRoute allowedRoles={["food-prep-staff"]}>
      <FoodPrepProfile />
    </ProtectedRoute>
  ),
});