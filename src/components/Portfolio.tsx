import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react"
import dashboardImage from "@/assets/dashboard-preview.jpg"

export function Portfolio() {
  const portfolioStats = [
    {
      title: "Total Portfolio Value",
      value: "$2,847,293",
      change: "+23.4%",
      isPositive: true,
      icon: DollarSign
    },
    {
      title: "24h Change",
      value: "$47,829",
      change: "+12.7%",
      isPositive: true,
      icon: TrendingUp
    },
    {
      title: "Monthly Return",
      value: "34.2%",
      change: "+8.9%",
      isPositive: true,
      icon: Percent
    },
    {
      title: "Total Profit",
      value: "$1,293,847",
      change: "+847%",
      isPositive: true,
      icon: TrendingUp
    }
  ]

  const topPerformers = [
    { name: "Bitcoin", symbol: "BTC", price: "$43,289", change: "+5.7%", isPositive: true },
    { name: "Ethereum", symbol: "ETH", price: "$2,847", change: "+8.2%", isPositive: true },
    { name: "Solana", symbol: "SOL", price: "$89.34", change: "+12.4%", isPositive: true },
    { name: "Cardano", symbol: "ADA", price: "$0.52", change: "-2.1%", isPositive: false },
  ]

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Portfolio <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Performance</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Track your investments in real-time with comprehensive analytics and insights. 
            See how our strategies have delivered exceptional returns for our clients.
          </p>
        </div>

        {/* Portfolio Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {portfolioStats.map((stat, index) => (
            <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-crypto transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <Badge 
                    variant={stat.isPositive ? "default" : "destructive"}
                    className={stat.isPositive ? "bg-primary text-primary-foreground" : ""}
                  >
                    {stat.change}
                  </Badge>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-6">
              Real-Time Dashboard
            </h3>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Monitor your entire cryptocurrency portfolio from a single, intuitive dashboard. 
              Get instant insights, track performance metrics, and make informed decisions with 
              our advanced analytics platform.
            </p>
            
            {/* Top Performers */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground mb-3">Top Performers Today</h4>
              {topPerformers.map((crypto, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">
                        {crypto.symbol[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{crypto.name}</p>
                      <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{crypto.price}</p>
                    <div className="flex items-center space-x-1">
                      {crypto.isPositive ? (
                        <TrendingUp className="w-3 h-3 text-primary" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-destructive" />
                      )}
                      <span className={`text-sm ${crypto.isPositive ? 'text-primary' : 'text-destructive'}`}>
                        {crypto.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-xl"></div>
            <img 
              src={dashboardImage}
              alt="InvestaLab Dashboard Preview"
              className="relative z-10 w-full rounded-2xl shadow-2xl border border-border/50"
            />
          </div>
        </div>
      </div>
    </section>
  )
}