import FoodPrepDashboard from "@/pages/FoodPrepInventory"
import { createFileRoute} from "@tanstack/react-router"

export const Route = createFileRoute("/food-prep-inventory")({
  component: FoodPrepDashboard,
})