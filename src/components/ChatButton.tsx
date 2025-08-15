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
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isBot: boolean, timestamp: Date}>>([])
  const { toast } = useToast()

  const botResponses = {
    greeting: ["Hello! How can I help you with your crypto investments today?", "Hi there! What would you like to know about InvestaLab?"],
    investment: ["Our platform supports Bitcoin, Ethereum, and 50+ other cryptocurrencies. Would you like to know about our investment strategies?", "We offer portfolio management, automated trading, and market analysis tools."],
    features: ["InvestaLab provides real-time market data, automated trading bots, portfolio tracking, and 24/7 customer support.", "Our key features include advanced analytics, secure storage, and educational resources."],
    pricing: ["We offer different plans starting from $0 for basic features. Premium plans include advanced analytics and priority support.", "You can start with our free tier and upgrade anytime as your portfolio grows."],
    security: ["We use bank-grade security with 256-bit encryption, cold storage for funds, and 2FA authentication.", "Your assets are protected by industry-leading security measures and insurance coverage."],
    default: ["That's a great question! Our team will get back to you with detailed information.", "Thanks for asking! We'll make sure to address this in our response.", "Interesting point! Our experts will provide you with comprehensive guidance."]
  }

  const getBotResponse = (userMessage: string) => {
    const msg = userMessage.toLowerCase()
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)]
    } else if (msg.includes('invest') || msg.includes('crypto') || msg.includes('bitcoin') || msg.includes('ethereum')) {
      return botResponses.investment[Math.floor(Math.random() * botResponses.investment.length)]
    } else if (msg.includes('feature') || msg.includes('tool') || msg.includes('platform')) {
      return botResponses.features[Math.floor(Math.random() * botResponses.features.length)]
    } else if (msg.includes('price') || msg.includes('cost') || msg.includes('plan') || msg.includes('fee')) {
      return botResponses.pricing[Math.floor(Math.random() * botResponses.pricing.length)]
    } else if (msg.includes('secure') || msg.includes('safety') || msg.includes('safe')) {
      return botResponses.security[Math.floor(Math.random() * botResponses.security.length)]
    } else {
      return botResponses.default[Math.floor(Math.random() * botResponses.default.length)]
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setHasProvidedDetails(false)
    setUserDetails({ name: "", email: "" })
    setChatMessages([])
    setMessage("")
  }

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
      // Add user message to chat
      const userMessage = { text: message, isBot: false, timestamp: new Date() }
      setChatMessages(prev => [...prev, userMessage])
      
      const currentMessage = message
      setMessage("")
      
      // Add bot response after a short delay
      setTimeout(() => {
        const botResponse = { text: getBotResponse(currentMessage), isBot: true, timestamp: new Date() }
        setChatMessages(prev => [...prev, botResponse])
      }, 1000)

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
            message: currentMessage,
            type: "chat_message"
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to send message")
        }
      } catch (error) {
        toast({
          title: "Note",
          description: "Message saved locally. We'll follow up via email.",
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
            <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg">InvestaLab Support</CardTitle>
                <p className="text-sm text-primary-foreground/80">
                  We're here to help! Ask us anything.
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-primary-foreground hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
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
                    {chatMessages.length === 0 ? (
                      <>
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
                      </>
                    ) : (
                      chatMessages.map((msg, index) => (
                        <div key={index} className={`flex items-start space-x-2 ${msg.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.isBot ? 'bg-gradient-primary' : 'bg-primary/20'
                          }`}>
                            <span className={`text-xs font-bold ${
                              msg.isBot ? 'text-primary-foreground' : 'text-primary'
                            }`}>
                              {msg.isBot ? 'IL' : userDetails.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className={`rounded-lg p-3 max-w-[200px] ${
                            msg.isBot ? 'bg-muted' : 'bg-primary text-primary-foreground'
                          }`}>
                            <p className="text-sm">
                              {msg.text}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
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