import FoodPrepInventory from '@/pages/FoodPrepInventory'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/food-prep-dashboard/inventory')({
  component: FoodPrepInventory,
})
