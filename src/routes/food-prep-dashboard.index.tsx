import FoodPrepDashboard from "@/pages/FoodPrepDashboard"
import { createFileRoute} from "@tanstack/react-router"

export const Route = createFileRoute("/food-prep-dashboard/")({
  component: FoodPrepDashboard,
})