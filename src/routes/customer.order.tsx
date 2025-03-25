import Order from '@/pages/Order';
import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '../context/ProtectedRoute';

export const Route = createFileRoute('/customer/order')({
  component: () => (
    <ProtectedRoute allowedRoles={["customer"]}>
      <Order />
    </ProtectedRoute>
  ),
});