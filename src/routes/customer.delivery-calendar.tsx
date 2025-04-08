import { ProtectedRoute } from '@/context/ProtectedRoute'
import DeliveryCalendar from '@/pages/CustomerCalendar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/customer/delivery-calendar')({
  component: () => (
    <ProtectedRoute allowedRoles={["customer"]}>
      <DeliveryCalendar />
    </ProtectedRoute>
  ),
})
