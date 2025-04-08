import { ProtectedRoute } from '@/context/ProtectedRoute'
import FoodPrepOrders from '@/pages/FoodPrepOrders'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/food-prep-dashboard/orders')({
  component: () => (
    <ProtectedRoute allowedRoles={["food-prep-staff"]}>
      <FoodPrepOrders />
    </ProtectedRoute>
  ),
})
