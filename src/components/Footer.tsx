import { TrendingUp, Twitter, Facebook, Linkedin, Github } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Features", href: "#features" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Trading", href: "#" },
        { name: "Analytics", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Blog", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact Us", href: "#contact" },
        { name: "API Docs", href: "#" },
        { name: "Status", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Security", href: "#" },
        { name: "Compliance", href: "#" }
      ]
    }
  ]

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" }
  ]

  const scrollToSection = (id: string) => {
    if (id.startsWith("#")) {
      const element = document.getElementById(id.substring(1))
      element?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)
    
    try {
      const response = await fetch("https://formspree.io/f/meogzgyo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          type: "newsletter_subscription"
        }),
      })

      if (response.ok) {
        toast({
          title: "Subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        })
        setEmail("")
      } else {
        throw new Error("Failed to subscribe")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-gradient-dark border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                InvestaLab
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The leading cryptocurrency investment platform trusted by over 50,000 investors worldwide. 
              Build your crypto portfolio with confidence.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="bg-gradient-primary rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-primary-foreground mb-2">
              Stay Updated
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Get the latest crypto insights and market analysis delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-primary-foreground placeholder-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
                disabled={isSubmitting}
              />
              <button 
                type="submit"
                className="px-6 py-2 bg-white text-primary font-medium rounded-lg hover:bg-white/90 transition-colors duration-300 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm">
            © 2024 InvestaLab. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground mt-4 md:mt-0">
            <span>🔒 Bank-grade security</span>
            <span>📈 24/7 trading</span>
            <span>🌍 Global access</span>
          </div>
        </div>
      </div>
    </footer>
  )
}