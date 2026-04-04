"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ErrorFrequency } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const CATEGORY_COLORS: Record<string, string> = {
  rate_limit: "#ef4444",
  timeout: "#f59e0b",
  tool_failure: "#8b5cf6",
  context_overflow: "#3b82f6",
  invalid_input: "#10b981",
  unknown: "#94a3b8",
}

const CATEGORY_LABELS: Record<string, string> = {
  rate_limit: "Rate Limit",
  timeout: "Timeout",
  tool_failure: "Tool Failure",
  context_overflow: "Context Overflow",
  invalid_input: "Invalid Input",
  unknown: "Unknown",
}

interface Props {
  data: ErrorFrequency[]
}

export default function ErrorFrequencyChart({ data }: Props) {
  const categories = Object.keys(CATEGORY_COLORS)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Error Frequency (14 days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: string) => v.slice(5)}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={30}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: "8px" }}
                labelFormatter={(label: string) => `Date: ${label}`}
              />
              <Legend
                formatter={(value: string) => (
                  <span style={{ fontSize: 11 }}>{CATEGORY_LABELS[value] ?? value}</span>
                )}
              />
              {categories.map((cat) => (
                <Bar
                  key={cat}
                  dataKey={cat}
                  stackId="errors"
                  fill={CATEGORY_COLORS[cat]}
                  name={cat}
                  radius={cat === "unknown" ? [2, 2, 0, 0] : [0, 0, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
