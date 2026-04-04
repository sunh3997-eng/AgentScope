import dynamic from "next/dynamic"
import CostOverviewCards from "@/components/cost/cost-overview-cards"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  COST_BY_PROJECT,
  COST_BY_AGENT,
  DAILY_TOKEN_USAGE,
  TOTAL_COST_MTD,
  TOTAL_TOKENS,
  TOTAL_SESSIONS,
  ACTIVE_PROJECTS,
} from "@/lib/mock-costs"

const DailyUsageChart = dynamic(
  () => import("@/components/cost/daily-usage-chart"),
  {
    ssr: false,
    loading: () => (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daily Token Usage (30 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full bg-muted animate-pulse rounded-md" />
        </CardContent>
      </Card>
    ),
  }
)

const CostByProjectChart = dynamic(
  () => import("@/components/cost/cost-by-project-chart"),
  {
    ssr: false,
    loading: () => (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cost by Project</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full bg-muted animate-pulse rounded-md" />
        </CardContent>
      </Card>
    ),
  }
)

const CostByAgentChart = dynamic(
  () => import("@/components/cost/cost-by-agent-chart"),
  {
    ssr: false,
    loading: () => (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cost by Agent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full bg-muted animate-pulse rounded-md" />
        </CardContent>
      </Card>
    ),
  }
)

export default function TokenCostsPage() {
  return (
    <div className="p-6 space-y-6">
      <CostOverviewCards
        totalCostMtd={TOTAL_COST_MTD}
        totalTokens={TOTAL_TOKENS}
        activeSessions={TOTAL_SESSIONS}
        activeProjects={ACTIVE_PROJECTS}
      />

      <DailyUsageChart data={DAILY_TOKEN_USAGE} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CostByProjectChart data={COST_BY_PROJECT} />
        <CostByAgentChart data={COST_BY_AGENT} />
      </div>
    </div>
  )
}
