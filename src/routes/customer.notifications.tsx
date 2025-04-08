import { ProtectedRoute } from '@/context/ProtectedRoute'
import CustomerNotifications from '@/pages/CustomerNotifications'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/customer/notifications')({
  component: () => (
    <ProtectedRoute allowedRoles={["customer"]}>
      <CustomerNotifications />
    </ProtectedRoute>
  ),
})
