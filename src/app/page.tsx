import Link from "next/link"
import { Activity, Play, DollarSign, AlertTriangle, ArrowRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Navbar from "@/components/layout/navbar"

const features = [
  {
    icon: Play,
    title: "Session Replay",
    description:
      "Replay every agent decision step-by-step. Inspect input/output, tool calls, and token usage at each stage of the decision chain.",
    href: "/dashboard/session-replay",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: DollarSign,
    title: "Token Cost Attribution",
    description:
      "Break down token spend by project, task, and agent. Identify which workflows are burning your budget with real-time dashboards.",
    href: "/dashboard/token-costs",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: AlertTriangle,
    title: "Error Root Cause Analysis",
    description:
      "Automatically cluster agent failures by error pattern. Track frequency trends, affected sessions, and which agents need attention.",
    href: "/dashboard/error-analysis",
    color: "text-red-600",
    bg: "bg-red-50",
  },
]

const stats = [
  { label: "Agent Sessions Tracked", value: "8+" },
  { label: "Token Granularity", value: "Per-step" },
  { label: "Error Categories", value: "6 types" },
  { label: "Replay Latency", value: "< 200ms" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="container mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm text-muted-foreground mb-6">
          <Activity className="h-3.5 w-3.5 text-primary" />
          AI Agent Observability Platform
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
          Observe.{" "}
          <span className="text-primary">Debug.</span>{" "}
          Optimize.
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          AgentScope gives your team full visibility into AI agent behavior —
          replay decisions, track token costs, and identify failure patterns
          before they reach production.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/dashboard/session-replay">
            <Button size="lg" variant="outline" className="gap-2">
              <Play className="h-4 w-4" />
              View Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything you need to understand your agents</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three powerful tools designed specifically for teams running AI coding agents at scale.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="group hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className={`w-10 h-10 rounded-lg ${feature.bg} flex items-center justify-center mb-2`}>
                    <Icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={feature.href} className={`inline-flex items-center gap-1 text-sm font-medium ${feature.color} hover:underline`}>
                    View feature
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to observe your agents?</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg max-w-xl mx-auto">
            Start with the demo dashboard — no setup required. See session replay,
            cost attribution, and error analysis in action.
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="gap-2">
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Activity className="h-4 w-4 text-primary" />
            AgentScope
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 AgentScope. AI Agent Observability Platform.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="https://github.com" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Github className="h-3.5 w-3.5" />
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
