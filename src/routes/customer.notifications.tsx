import CustomerNotifications from '@/pages/CustomerNotifications'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/customer/notifications')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CustomerNotifications />
}
