import { Card, CardContent } from "@/components/ui/card"
import { Brain, TrendingUp, Shield, Users } from "lucide-react"

export function About() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Our advanced algorithms analyze market trends 24/7 to provide you with data-driven investment recommendations."
    },
    {
      icon: TrendingUp,
      title: "Proven Performance",
      description: "Track record of consistent returns with transparent reporting and real-time portfolio performance monitoring."
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Your investments are protected with military-grade encryption and cold storage solutions."
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Access to professional crypto advisors and a community of successful investors at your fingertips."
    }
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">InvestaLab</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We combine cutting-edge technology with decades of financial expertise to help you navigate 
            the cryptocurrency market with confidence and maximize your investment potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-crypto transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company stats */}
        <div className="mt-20 bg-gradient-dark rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-3xl lg:text-4xl font-bold text-primary mb-2">5+</h4>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
            <div>
              <h4 className="text-3xl lg:text-4xl font-bold text-primary mb-2">200+</h4>
              <p className="text-muted-foreground">Cryptocurrencies</p>
            </div>
            <div>
              <h4 className="text-3xl lg:text-4xl font-bold text-primary mb-2">99.9%</h4>
              <p className="text-muted-foreground">Uptime</p>
            </div>
            <div>
              <h4 className="text-3xl lg:text-4xl font-bold text-primary mb-2">24/7</h4>
              <p className="text-muted-foreground">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}