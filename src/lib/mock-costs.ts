import { MOCK_SESSIONS } from "./mock-sessions"
import { CostByProject, CostByAgent, CostByTask, DailyTokenUsage } from "@/types"

export const COST_BY_PROJECT: CostByProject[] = (() => {
  const map = new Map<string, CostByProject>()
  for (const s of MOCK_SESSIONS) {
    const existing = map.get(s.projectId)
    if (existing) {
      existing.totalCostUsd += s.totalCostUsd
      existing.totalTokens += s.totalTokens
      existing.sessionCount += 1
    } else {
      map.set(s.projectId, {
        projectId: s.projectId,
        projectName: s.projectName,
        totalCostUsd: s.totalCostUsd,
        totalTokens: s.totalTokens,
        sessionCount: 1,
      })
    }
  }
  return Array.from(map.values()).sort((a, b) => b.totalCostUsd - a.totalCostUsd)
})()

export const COST_BY_AGENT: CostByAgent[] = (() => {
  const map = new Map<string, CostByAgent>()
  for (const s of MOCK_SESSIONS) {
    const existing = map.get(s.agentName)
    if (existing) {
      existing.totalCostUsd += s.totalCostUsd
      existing.totalTokens += s.totalTokens
      existing.sessionCount += 1
    } else {
      map.set(s.agentName, {
        agentName: s.agentName,
        totalCostUsd: s.totalCostUsd,
        totalTokens: s.totalTokens,
        sessionCount: 1,
      })
    }
  }
  return Array.from(map.values()).sort((a, b) => b.totalCostUsd - a.totalCostUsd)
})()

export const COST_BY_TASK: CostByTask[] = MOCK_SESSIONS.map((s) => ({
  taskId: s.taskId,
  taskName: s.taskName,
  projectId: s.projectId,
  totalCostUsd: s.totalCostUsd,
  totalTokens: s.totalTokens,
}))

// 30 days of daily usage ending today (2026-04-04)
export const DAILY_TOKEN_USAGE: DailyTokenUsage[] = (() => {
  const days: DailyTokenUsage[] = []
  const base = new Date("2026-03-06")
  const seed = [
    4200, 5800, 3100, 6200, 8400, 7200, 5100,
    9800, 11200, 8600, 10400, 12800, 9200, 6800,
    7400, 8900, 11600, 14200, 10800, 9400, 12100,
    15600, 13200, 11800, 16400, 14800, 12600, 17200,
    15800, 18400,
  ]
  for (let i = 0; i < 30; i++) {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    const total = seed[i]
    const prompt = Math.floor(total * 0.72)
    const completion = total - prompt
    days.push({
      date: d.toISOString().slice(0, 10),
      promptTokens: prompt,
      completionTokens: completion,
      totalCostUsd: (prompt * 0.002 + completion * 0.008) / 1000,
    })
  }
  return days
})()

export const TOTAL_COST_MTD = MOCK_SESSIONS.reduce((s, r) => s + r.totalCostUsd, 0)
export const TOTAL_TOKENS = MOCK_SESSIONS.reduce((s, r) => s + r.totalTokens, 0)
export const TOTAL_SESSIONS = MOCK_SESSIONS.length
export const ACTIVE_PROJECTS = new Set(MOCK_SESSIONS.map((s) => s.projectId)).size
