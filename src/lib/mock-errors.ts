import { MOCK_SESSIONS } from "./mock-sessions"
import { ErrorCluster, ErrorFrequency } from "@/types"

export const ERROR_CLUSTERS: ErrorCluster[] = [
  {
    id: "err-001",
    errorCode: "CONTEXT_OVERFLOW",
    errorMessagePattern: "Request exceeds maximum context length",
    category: "context_overflow",
    occurrences: 14,
    affectedSessions: 8,
    firstSeenAt: "2026-03-15T09:00:00Z",
    lastSeenAt: "2026-04-04T09:17:32Z",
    affectedAgents: ["SupportBot"],
    trend: "rising",
  },
  {
    id: "err-002",
    errorCode: "RATE_LIMIT_EXCEEDED",
    errorMessagePattern: "429 Too Many Requests: rate limit exceeded",
    category: "rate_limit",
    occurrences: 22,
    affectedSessions: 11,
    firstSeenAt: "2026-03-10T11:00:00Z",
    lastSeenAt: "2026-04-04T11:01:08Z",
    affectedAgents: ["CodeFixAgent", "ResearchAgent"],
    trend: "rising",
  },
  {
    id: "err-003",
    errorCode: "QUERY_TIMEOUT",
    errorMessagePattern: "Query execution timeout after 30s",
    category: "timeout",
    occurrences: 9,
    affectedSessions: 5,
    firstSeenAt: "2026-03-20T16:00:00Z",
    lastSeenAt: "2026-04-02T16:05:30Z",
    affectedAgents: ["CodeFixAgent"],
    trend: "stable",
  },
  {
    id: "err-004",
    errorCode: "TOOL_FAILURE",
    errorMessagePattern: "HTTP 403 Forbidden: bot detection triggered",
    category: "tool_failure",
    occurrences: 7,
    affectedSessions: 4,
    firstSeenAt: "2026-03-25T15:30:00Z",
    lastSeenAt: "2026-04-03T15:32:10Z",
    affectedAgents: ["ResearchAgent"],
    trend: "stable",
  },
  {
    id: "err-005",
    errorCode: "SESSION_ABORTED",
    errorMessagePattern: "Session aborted due to unrecoverable error",
    category: "unknown",
    occurrences: 18,
    affectedSessions: 9,
    firstSeenAt: "2026-03-12T08:00:00Z",
    lastSeenAt: "2026-04-04T09:17:32Z",
    affectedAgents: ["SupportBot", "CodeFixAgent"],
    trend: "rising",
  },
  {
    id: "err-006",
    errorCode: "INVALID_TOOL_INPUT",
    errorMessagePattern: "Tool input schema validation failed",
    category: "invalid_input",
    occurrences: 5,
    affectedSessions: 3,
    firstSeenAt: "2026-03-28T12:00:00Z",
    lastSeenAt: "2026-04-01T14:20:00Z",
    affectedAgents: ["CodeFixAgent"],
    trend: "falling",
  },
]

// 14 days of error frequency by category
export const ERROR_FREQUENCY: ErrorFrequency[] = (() => {
  const start = new Date("2026-03-22")
  const data = [
    { rl: 1, to: 0, tf: 1, co: 1, ii: 0, uk: 1 },
    { rl: 2, to: 1, tf: 0, co: 1, ii: 0, uk: 2 },
    { rl: 1, to: 0, tf: 1, co: 2, ii: 1, uk: 1 },
    { rl: 3, to: 1, tf: 0, co: 1, ii: 0, uk: 2 },
    { rl: 2, to: 2, tf: 1, co: 3, ii: 1, uk: 2 },
    { rl: 4, to: 1, tf: 0, co: 2, ii: 0, uk: 3 },
    { rl: 3, to: 0, tf: 1, co: 1, ii: 1, uk: 2 },
    { rl: 2, to: 1, tf: 2, co: 2, ii: 0, uk: 1 },
    { rl: 4, to: 0, tf: 1, co: 3, ii: 1, uk: 3 },
    { rl: 5, to: 2, tf: 0, co: 2, ii: 0, uk: 2 },
    { rl: 3, to: 1, tf: 1, co: 3, ii: 1, uk: 2 },
    { rl: 4, to: 0, tf: 2, co: 4, ii: 0, uk: 3 },
    { rl: 6, to: 1, tf: 1, co: 3, ii: 1, uk: 4 },
    { rl: 5, to: 2, tf: 0, co: 4, ii: 0, uk: 3 },
  ]
  return data.map((d, i) => {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    return {
      date: date.toISOString().slice(0, 10),
      rate_limit: d.rl,
      timeout: d.to,
      tool_failure: d.tf,
      context_overflow: d.co,
      invalid_input: d.ii,
      unknown: d.uk,
    }
  })
})()

export const TOTAL_ERRORS_14D = ERROR_FREQUENCY.reduce(
  (s, d) => s + d.rate_limit + d.timeout + d.tool_failure + d.context_overflow + d.invalid_input + d.unknown,
  0
)
export const UNIQUE_PATTERNS = ERROR_CLUSTERS.length
export const MOST_AFFECTED_AGENT = (() => {
  const counts = new Map<string, number>()
  for (const s of MOCK_SESSIONS) {
    if (s.status === "failed") {
      counts.set(s.agentName, (counts.get(s.agentName) ?? 0) + 1)
    }
  }
  let top = ""
  let max = 0
  for (const [agent, count] of counts) {
    if (count > max) {
      max = count
      top = agent
    }
  }
  return top || "N/A"
})()
export const RISING_CATEGORIES = ERROR_CLUSTERS.filter((e) => e.trend === "rising").length
