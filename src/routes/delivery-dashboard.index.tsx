import DeliveryDashboard from "@/pages/DeliveryDashboard"
import { createFileRoute} from "@tanstack/react-router"

export const Route = createFileRoute("/delivery-dashboard/")({
  component: DeliveryDashboard,
})