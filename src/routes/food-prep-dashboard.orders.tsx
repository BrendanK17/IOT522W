import FoodPrepOrders from '@/pages/FoodPrepOrders'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/food-prep-dashboard/orders')({
  component: FoodPrepOrders,
})
