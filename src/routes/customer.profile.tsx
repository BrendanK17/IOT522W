import Profile from '@/pages/Profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/customer/profile')({
  component: Profile,
})
