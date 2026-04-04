import dynamic from "next/dynamic"
import ErrorStatsCards from "@/components/errors/error-stats-cards"
import ErrorClusterTable from "@/components/errors/error-cluster-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ERROR_CLUSTERS,
  ERROR_FREQUENCY,
  TOTAL_ERRORS_14D,
  UNIQUE_PATTERNS,
  MOST_AFFECTED_AGENT,
  RISING_CATEGORIES,
} from "@/lib/mock-errors"

const ErrorFrequencyChart = dynamic(
  () => import("@/components/errors/error-frequency-chart"),
  {
    ssr: false,
    loading: () => (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Error Frequency (14 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full bg-muted animate-pulse rounded-md" />
        </CardContent>
      </Card>
    ),
  }
)

export default function ErrorAnalysisPage() {
  return (
    <div className="p-6 space-y-6">
      <ErrorStatsCards
        totalErrors={TOTAL_ERRORS_14D}
        uniquePatterns={UNIQUE_PATTERNS}
        mostAffectedAgent={MOST_AFFECTED_AGENT}
        risingCategories={RISING_CATEGORIES}
      />

      <ErrorFrequencyChart data={ERROR_FREQUENCY} />

      <ErrorClusterTable clusters={ERROR_CLUSTERS} />
    </div>
  )
}
