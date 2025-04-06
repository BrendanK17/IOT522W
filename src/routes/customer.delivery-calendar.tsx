import DeliveryCalendar from '@/pages/CustomerCalendar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/customer/delivery-calendar')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DeliveryCalendar />
}
