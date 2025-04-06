import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

type Message = {
  id: string
  content: string
  sender: "staff" | "system"
  timestamp: Date
}

interface DeliveryChatProps {
  customerName: string
  customerPhone: string
  customerLocation?: string
  orderId?: string
  avatar?: string
}

export function DeliveryChat({ customerName, customerPhone, customerLocation, orderId, avatar }: DeliveryChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  if (lastMessageRef.current) {
    lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add staff message
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "staff",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")

    // Show typing indicator
    setIsTyping(true)

    // After 2 seconds, add system message
    setTimeout(() => {
      setIsTyping(false)

      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Message sent to ${customerName}. For urgent updates please call ${customerPhone}.`,
        sender: "system",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, systemMessage])
    }, 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="w-full h-[450px] flex flex-col shadow-xl border">
      <CardHeader className="pb-2 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatar} alt={customerName} />
              <AvatarFallback>
                {customerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span>{customerName}</span>
              <span className="text-xs text-muted-foreground">{customerPhone}</span>
            </div>
          </CardTitle>
          {orderId && (
            <Badge variant="outline" className="bg-[#0052CC] text-white border-none">
              {orderId}
            </Badge>
          )}
        </div>
        {customerLocation && (
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            {customerLocation}
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-full p-4">
            {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                No messages yet. Send a message to contact the customer.
            </div>
            ) : (
            <div className="flex flex-col gap-3">
                {messages.map((message, index) => (
                <div
                    key={message.id}
                    ref={index === messages.length - 1 ? lastMessageRef : null} // Attach ref to last message
                    className={`flex ${message.sender === "staff" ? "justify-end" : "justify-start"}`}
                >
                    <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg ${
                        message.sender === "staff" ? "bg-[#0052CC] text-white" : "bg-muted"
                    }`}
                    >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    </div>
                </div>
                ))}

                {isTyping && (
                <div className="flex justify-start">
                    <div className="bg-muted px-4 py-2 rounded-lg">
                    <div className="flex gap-1 items-center">
                        <div
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "300ms" }}
                        ></div>
                    </div>
                    </div>
                </div>
                )}
            </div>
            )}
        </ScrollArea>
    </CardContent>

      <CardFooter className="pt-2">
        <form
          className="flex w-full gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
        >
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

