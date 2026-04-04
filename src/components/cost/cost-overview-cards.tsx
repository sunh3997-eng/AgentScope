import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Zap, FolderOpen, Activity } from "lucide-react"
import { formatCurrency, formatTokens } from "@/lib/utils"

interface CostOverviewCardsProps {
  totalCostMtd: number
  totalTokens: number
  activeSessions: number
  activeProjects: number
}

export default function CostOverviewCards({
  totalCostMtd,
  totalTokens,
  activeSessions,
  activeProjects,
}: CostOverviewCardsProps) {
  const stats = [
    {
      title: "Total Cost (MTD)",
      value: formatCurrency(totalCostMtd),
      icon: DollarSign,
      description: "Month to date",
      color: "text-blue-600",
    },
    {
      title: "Total Tokens",
      value: formatTokens(totalTokens),
      icon: Zap,
      description: "Across all sessions",
      color: "text-purple-600",
    },
    {
      title: "Active Projects",
      value: String(activeProjects),
      icon: FolderOpen,
      description: "Projects tracked",
      color: "text-green-600",
    },
    {
      title: "Total Sessions",
      value: String(activeSessions),
      icon: Activity,
      description: "Agent sessions",
      color: "text-orange-600",
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
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
