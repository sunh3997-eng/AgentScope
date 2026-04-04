"use client"

import { useState } from "react"
import { ErrorCluster } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp } from "lucide-react"

const CATEGORY_COLORS: Record<string, "destructive" | "warning" | "secondary" | "outline"> = {
  rate_limit: "destructive",
  timeout: "warning",
  tool_failure: "warning",
  context_overflow: "secondary",
  invalid_input: "outline",
  unknown: "outline",
}

function TrendIcon({ trend }: { trend: ErrorCluster["trend"] }) {
  if (trend === "rising") return <TrendingUp className="h-4 w-4 text-red-500" />
  if (trend === "falling") return <TrendingDown className="h-4 w-4 text-green-500" />
  return <Minus className="h-4 w-4 text-muted-foreground" />
}

interface Props {
  clusters: ErrorCluster[]
}

export default function ErrorClusterTable({ clusters }: Props) {
  const [sortDesc, setSortDesc] = useState(true)

  const sorted = [...clusters].sort((a, b) =>
    sortDesc ? b.occurrences - a.occurrences : a.occurrences - b.occurrences
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Error Clusters</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Error Code</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Pattern</th>
                <th
                  className="px-4 py-3 text-right font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground"
                  onClick={() => setSortDesc(!sortDesc)}
                >
                  <span className="inline-flex items-center gap-1">
                    Occurrences
                    {sortDesc ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
                  </span>
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Sessions</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">Trend</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Agents</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((cluster, idx) => (
                <tr
                  key={cluster.id}
                  className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}
                >
                  <td className="px-4 py-3 font-mono text-xs font-medium">{cluster.errorCode}</td>
                  <td className="px-4 py-3">
                    <Badge variant={CATEGORY_COLORS[cluster.category] ?? "outline"} className="text-xs">
                      {cluster.category.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">
                    {cluster.errorMessagePattern}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">{cluster.occurrences}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{cluster.affectedSessions}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <TrendIcon trend={cluster.trend} />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {cluster.affectedAgents.map((agent) => (
                        <Badge key={agent} variant="outline" className="text-xs py-0">
                          {agent}
                        </Badge>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
