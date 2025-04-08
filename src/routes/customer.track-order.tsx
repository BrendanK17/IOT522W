import { ProtectedRoute } from '@/context/ProtectedRoute'
import TrackOrder from '@/pages/TrackOrder'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/customer/track-order')({
  component: () => (
    <ProtectedRoute allowedRoles={["customer"]}>
      <TrackOrder />
    </ProtectedRoute>
  ),
})