import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Layers, Bot, TrendingUp } from "lucide-react"

interface ErrorStatsCardsProps {
  totalErrors: number
  uniquePatterns: number
  mostAffectedAgent: string
  risingCategories: number
}

export default function ErrorStatsCards({
  totalErrors,
  uniquePatterns,
  mostAffectedAgent,
  risingCategories,
}: ErrorStatsCardsProps) {
  const stats = [
    {
      title: "Total Errors (14d)",
      value: String(totalErrors),
      icon: AlertTriangle,
      description: "Last 14 days",
      color: "text-red-500",
    },
    {
      title: "Unique Patterns",
      value: String(uniquePatterns),
      icon: Layers,
      description: "Distinct error clusters",
      color: "text-orange-500",
    },
    {
      title: "Most Affected Agent",
      value: mostAffectedAgent,
      icon: Bot,
      description: "By failed sessions",
      color: "text-purple-500",
    },
    {
      title: "Rising Categories",
      value: String(risingCategories),
      icon: TrendingUp,
      description: "Error trends increasing",
      color: "text-yellow-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold truncate">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
