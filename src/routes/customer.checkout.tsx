import { ProtectedRoute } from '@/context/ProtectedRoute';
import Checkout from '@/pages/Checkout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/customer/checkout')({
  component: () => (
    <ProtectedRoute allowedRoles={["customer"]}>
      <Checkout />
    </ProtectedRoute>
  ),
});