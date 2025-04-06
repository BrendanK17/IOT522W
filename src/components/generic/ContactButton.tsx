import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContext } from "react"
import { ChatContext } from "@/components/generic/ChatContext"

interface ContactButtonProps {
  customer: {
    id: string
    customer: string
    location: string
    avatar: string
    priority: string
  }
}

export function ContactButton({ customer }: ContactButtonProps) {
  const { setSelectedCustomer, setIsOpen } = useContext(ChatContext)

  const handleContact = () => {
    setSelectedCustomer(customer)
    setIsOpen(true)
  }

  return (
    <Button variant="outline" onClick={handleContact} className="rounded-lg border-gray-300">
      <MessageSquare className="mr-2 h-4 w-4" />
      Contact Customer
    </Button>
  )
}

