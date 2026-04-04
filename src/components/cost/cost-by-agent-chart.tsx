"use client"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { CostByAgent } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"]

interface Props {
  data: CostByAgent[]
}

export default function CostByAgentChart({ data }: Props) {
  const chartData = data.map((d) => ({
    name: d.agentName,
    value: parseFloat(d.totalCostUsd.toFixed(4)),
    tokens: d.totalTokens,
    sessions: d.sessionCount,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Cost by Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(4)}`, "Cost"]}
                contentStyle={{ fontSize: 12, borderRadius: "8px" }}
              />
              <Legend
                formatter={(value: string) => (
                  <span style={{ fontSize: 12 }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
