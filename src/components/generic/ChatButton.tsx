import { useState } from "react"
import { MessageSquare, X, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeliveryChat } from "@/components/generic/DeliveryChat"
import { AnimatePresence, motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Import the pending deliveries type
import { pendingDeliveries } from "@/lib/delivery/deliveries"

type Customer = {
  id: string
  customer: string
  location: string
  avatar: string
  priority: string
  phoneNumber: string
}

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCustomerSelector, setShowCustomerSelector] = useState(false)
  // Add a key to force re-render of the chat component
  const [chatKey, setChatKey] = useState(0)

  // Filter customers based on search query
  const filteredCustomers = pendingDeliveries.filter(
    (delivery) =>
      delivery.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Select a customer and open the chat
  const selectCustomer = (customer: Customer) => {
    // If selecting a different customer, increment the key to reset the chat
    if (!selectedCustomer || selectedCustomer.id !== customer.id) {
      setChatKey((prevKey) => prevKey + 1)
    }

    setSelectedCustomer(customer)
    setShowCustomerSelector(false)
    setIsOpen(true)
  }

  // Handle "Change Customer" action
  const handleChangeCustomer = () => {
    setShowCustomerSelector(true)
    // We'll increment the key when a new customer is selected in the selectCustomer function
  }

  return (
    <>
      {/* Customer selector dialog */}
      <Dialog open={showCustomerSelector} onOpenChange={setShowCustomerSelector}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Customer to Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((delivery) => (
                  <div
                    key={delivery.id}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectCustomer(delivery)}
                  >
                    <Avatar className="h-10 w-10 border border-gray-200">
                      <AvatarImage src={delivery.avatar} alt={delivery.customer} />
                      <AvatarFallback>
                        {delivery.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{delivery.customer}</p>
                        <Badge
                          variant="outline"
                          className={`
                            border-none ml-2 shrink-0
                            ${
                              delivery.priority === "high"
                                ? "bg-red-100 text-red-700"
                                : delivery.priority === "medium"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-green-100 text-green-700"
                            }
                          `}
                        >
                          {delivery.priority === "high" ? "High" : delivery.priority === "medium" ? "Medium" : "Low"}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="truncate">{delivery.location}</span>
                        <span className="mx-1">•</span>
                        <span className="shrink-0">{delivery.id}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">No customers found</div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating chat button with dropdown */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
        {/* Selected customer indicator */}
        {selectedCustomer && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-white rounded-full shadow-md px-3 py-1 flex items-center gap-2"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={selectedCustomer.avatar} alt={selectedCustomer.customer} />
              <AvatarFallback>
                {selectedCustomer.customer
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{selectedCustomer.customer}</span>
          </motion.div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={`h-14 w-14 rounded-full shadow-lg p-0 ${
                isOpen ? "bg-gray-700 hover:bg-gray-800" : "bg-[#0052CC] hover:bg-[#0039A6]"
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {!isOpen ? (
              <>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setShowCustomerSelector(true)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Select Customer</span>
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem className="cursor-pointer" onClick={() => setIsOpen(false)}>
                <X className="mr-2 h-4 w-4" />
                <span>Close Chat</span>
              </DropdownMenuItem>
            )}
            {isOpen && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleChangeCustomer}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Change Customer</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && selectedCustomer && (
          <motion.div
            key={chatKey} // Add the key here to force re-render
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[400px]"
          >
            <DeliveryChat
              key={chatKey} // Also add the key here for good measure
              customerName={selectedCustomer.customer}
              customerPhone={selectedCustomer.phoneNumber}
              customerLocation={selectedCustomer.location}
              orderId={selectedCustomer.id}
              avatar={selectedCustomer.avatar}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

