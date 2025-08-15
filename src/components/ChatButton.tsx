import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, User, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: ""
  })
  const [hasProvidedDetails, setHasProvidedDetails] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userDetails.name.trim() && userDetails.email.trim()) {
      setHasProvidedDetails(true)
      toast({
        title: "Details saved!",
        description: "You can now send your message.",
      })
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && hasProvidedDetails) {
      setIsSubmitting(true)
      
      try {
        const response = await fetch("https://formspree.io/f/meogzgyo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userDetails.name,
            email: userDetails.email,
            message: message,
            type: "chat_message"
          }),
        })

        if (response.ok) {
          toast({
            title: "Message sent!",
            description: "We'll get back to you soon.",
          })
          setMessage("")
        } else {
          throw new Error("Failed to send message")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-primary text-primary-foreground hover:shadow-crypto transition-all duration-300 rounded-full"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96">
          <Card className="h-full border-border/50 bg-card/95 backdrop-blur-sm shadow-2xl">
            <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="text-lg">InvestaLab Support</CardTitle>
              <p className="text-sm text-primary-foreground/80">
                We're here to help! Ask us anything.
              </p>
            </CardHeader>
            <CardContent className="p-0 h-full flex flex-col">
              {/* Chat Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto">
                {!hasProvidedDetails ? (
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-primary-foreground font-bold">IL</span>
                      </div>
                      <div className="bg-muted rounded-lg p-3 max-w-[200px]">
                        <p className="text-sm text-foreground">
                          Hello! 👋 Welcome to InvestaLab. Please provide your details to get started.
                        </p>
                      </div>
                    </div>
                    
                    <form onSubmit={handleDetailsSubmit} className="space-y-3">
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Your name"
                          value={userDetails.name}
                          onChange={(e) => setUserDetails(prev => ({...prev, name: e.target.value}))}
                          className="pl-10"
                          required
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="Your email"
                          value={userDetails.email}
                          onChange={(e) => setUserDetails(prev => ({...prev, email: e.target.value}))}
                          className="pl-10"
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-primary text-primary-foreground"
                      >
                        Start Chat
                      </Button>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-primary-foreground font-bold">IL</span>
                      </div>
                      <div className="bg-muted rounded-lg p-3 max-w-[200px]">
                        <p className="text-sm text-foreground">
                          Hi {userDetails.name}! 👋 How can I help you today?
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-primary-foreground font-bold">IL</span>
                      </div>
                      <div className="bg-muted rounded-lg p-3 max-w-[200px]">
                        <p className="text-sm text-foreground">
                          I can help you with:
                        </p>
                        <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                          <li>• Investment strategies</li>
                          <li>• Platform features</li>
                          <li>• Account setup</li>
                          <li>• Portfolio management</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              {hasProvidedDetails && (
                <div className="p-4 border-t border-border">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-background/50"
                      disabled={isSubmitting}
                    />
                    <Button 
                      type="submit" 
                      size="icon"
                      className="bg-gradient-primary text-primary-foreground"
                      disabled={isSubmitting}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}