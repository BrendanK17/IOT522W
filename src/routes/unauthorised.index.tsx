import Unauthorised from "@/pages/Unauthorised"
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/unauthorised/')({
  component: Unauthorised,
})