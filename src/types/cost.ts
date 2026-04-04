export interface CostByProject {
  projectId: string
  projectName: string
  totalCostUsd: number
  totalTokens: number
  sessionCount: number
}

export interface CostByTask {
  taskId: string
  taskName: string
  projectId: string
  totalCostUsd: number
  totalTokens: number
}

export interface CostByAgent {
  agentName: string
  totalCostUsd: number
  totalTokens: number
  sessionCount: number
}

export interface DailyTokenUsage {
  date: string
  promptTokens: number
  completionTokens: number
  totalCostUsd: number
}
