import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react"
import heroImage from "@/assets/crypto-hero.jpg"

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <TrendingUp className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">
              #1 Crypto Investment Platform
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="text-foreground">Invest in </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Cryptocurrency
            </span>
            <br />
            <span className="text-foreground">Like a </span>
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Pro
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of investors who trust InvestaLab to maximize their crypto portfolio returns with AI-powered insights and expert analysis.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-primary text-primary-foreground hover:shadow-crypto transition-all duration-300 group"
            >
              Start Investing Today
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("portfolio")}
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              View Portfolio Performance
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-primary mr-2" />
                <span className="text-2xl font-bold text-primary">847%</span>
              </div>
              <p className="text-sm text-muted-foreground">Average Returns</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="w-5 h-5 text-primary mr-2" />
                <span className="text-2xl font-bold text-primary">$2.4B</span>
              </div>
              <p className="text-sm text-muted-foreground">Assets Secured</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-primary mr-2" />
                <span className="text-2xl font-bold text-primary">50K+</span>
              </div>
              <p className="text-sm text-muted-foreground">Active Investors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}