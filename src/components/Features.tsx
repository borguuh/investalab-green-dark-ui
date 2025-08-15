import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Smartphone, 
  BarChart3, 
  Bell, 
  Calculator, 
  Lock, 
  Zap,
  Globe,
  Award
} from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Smartphone,
      title: "Mobile Trading",
      description: "Trade on the go with our powerful mobile app. Execute trades, monitor positions, and manage your portfolio from anywhere.",
      badge: "iOS & Android",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive charts, technical indicators, and market analysis tools to make informed investment decisions.",
      badge: "Pro Tools",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Custom price alerts, market news notifications, and portfolio performance updates delivered instantly.",
      badge: "Real-time",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Calculator,
      title: "Portfolio Optimizer",
      description: "AI-driven portfolio rebalancing suggestions to optimize your risk-reward ratio automatically.",
      badge: "AI Powered",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Lock,
      title: "Multi-Layer Security",
      description: "2FA, cold storage, insurance coverage, and advanced security protocols to protect your investments.",
      badge: "Bank Grade",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Zap,
      title: "Instant Execution",
      description: "Lightning-fast trade execution with minimal slippage and competitive fees across all markets.",
      badge: "Ultra Fast",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: Globe,
      title: "Global Markets",
      description: "Access to major cryptocurrency exchanges worldwide with unified portfolio management.",
      badge: "Worldwide",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Award,
      title: "Expert Insights",
      description: "Daily market analysis, expert commentary, and investment research from our team of professionals.",
      badge: "Premium",
      color: "from-indigo-500 to-indigo-600"
    }
  ]

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Powerful <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need to succeed in cryptocurrency trading and investment, 
            all in one comprehensive platform designed for both beginners and professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-crypto transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature highlight */}
        <div className="mt-16 bg-gradient-primary rounded-3xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
            Ready to Experience the Future of Crypto Trading?
          </h3>
          <p className="text-primary-foreground/80 text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of successful investors who have already discovered the power of InvestaLab's advanced features.
          </p>
          <div className="flex items-center justify-center space-x-6 text-primary-foreground/60 text-sm">
            <span>✓ No Setup Fees</span>
            <span>✓ 30-Day Trial</span>
            <span>✓ Expert Support</span>
          </div>
        </div>
      </div>
    </section>
  )
}