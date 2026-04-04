export type ErrorCategory =
  | "rate_limit"
  | "timeout"
  | "invalid_input"
  | "tool_failure"
  | "context_overflow"
  | "unknown"

export interface ErrorCluster {
  id: string
  errorCode: string
  errorMessagePattern: string
  category: ErrorCategory
  occurrences: number
  affectedSessions: number
  firstSeenAt: string
  lastSeenAt: string
  affectedAgents: string[]
  trend: "rising" | "stable" | "falling"
}

export interface ErrorFrequency {
  date: string
  rate_limit: number
  timeout: number
  tool_failure: number
  context_overflow: number
  invalid_input: number
  unknown: number
}
