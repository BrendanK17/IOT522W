import Order from '@/pages/Order'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/customer/order')({
  component: Order,
})
