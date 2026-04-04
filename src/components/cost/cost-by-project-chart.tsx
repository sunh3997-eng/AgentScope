"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { CostByProject } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatTokens } from "@/lib/utils"

interface Props {
  data: CostByProject[]
}

export default function CostByProjectChart({ data }: Props) {
  const chartData = data.map((d) => ({
    name: d.projectName,
    cost: parseFloat(d.totalCostUsd.toFixed(4)),
    tokens: d.totalTokens,
    sessions: d.sessionCount,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Cost by Project</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={(v: number) => `$${v.toFixed(3)}`}
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={60}
              />
              <Tooltip
                formatter={(value: number, name: string) => {
                  if (name === "cost") return [`$${value.toFixed(4)}`, "Cost"]
                  return [value, name]
                }}
                contentStyle={{
                  fontSize: 12,
                  borderRadius: "8px",
                }}
                labelFormatter={(label: string, payload) => {
                  const item = payload?.[0]?.payload
                  if (item) {
                    return `${label} · ${formatTokens(item.tokens)} tokens · ${item.sessions} sessions`
                  }
                  return label
                }}
              />
              <Bar dataKey="cost" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
