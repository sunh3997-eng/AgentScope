"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { DailyTokenUsage } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatTokens } from "@/lib/utils"

interface Props {
  data: DailyTokenUsage[]
}

export default function DailyUsageChart({ data }: Props) {
  const chartData = data.map((d) => ({
    date: d.date.slice(5), // "MM-DD"
    prompt: d.promptTokens,
    completion: d.completionTokens,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Daily Token Usage (30 days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
              <defs>
                <linearGradient id="promptGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="completionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                interval={6}
              />
              <YAxis
                tickFormatter={(v: number) => formatTokens(v)}
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={50}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  formatTokens(value),
                  name === "prompt" ? "Prompt tokens" : "Completion tokens",
                ]}
                contentStyle={{ fontSize: 12, borderRadius: "8px" }}
              />
              <Legend
                formatter={(value: string) => (
                  <span style={{ fontSize: 12 }}>
                    {value === "prompt" ? "Prompt tokens" : "Completion tokens"}
                  </span>
                )}
              />
              <Area
                type="monotone"
                dataKey="prompt"
                stackId="1"
                stroke="#3b82f6"
                fill="url(#promptGrad)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="completion"
                stackId="1"
                stroke="#8b5cf6"
                fill="url(#completionGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
