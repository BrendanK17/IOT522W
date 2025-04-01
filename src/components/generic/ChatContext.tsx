import { createContext, useState, type ReactNode } from "react"

type Customer = {
  id: string
  customer: string
  location: string
  avatar: string
  priority: string
}

interface ChatContextType {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  selectedCustomer: Customer | null
  setSelectedCustomer: (customer: Customer | null) => void
}

export const ChatContext = createContext<ChatContextType>({
  isOpen: false,
  setIsOpen: () => {},
  selectedCustomer: null,
  setSelectedCustomer: () => {},
})

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        setIsOpen,
        selectedCustomer,
        setSelectedCustomer,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

