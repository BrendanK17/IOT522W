import TrackOrder from '@/pages/TrackOrder'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/customer/track-order')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TrackOrder />
}
