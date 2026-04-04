export type StepType = "llm_call" | "tool_call" | "retrieval" | "action" | "observation"
export type StepStatus = "success" | "error" | "pending"

export interface AgentStep {
  id: string
  stepNumber: number
  type: StepType
  status: StepStatus
  timestamp: string
  durationMs: number
  input: string
  output: string
  toolName?: string
  tokenUsage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
  error?: {
    code: string
    message: string
    stackTrace?: string
  }
}

export interface AgentSession {
  id: string
  agentName: string
  projectId: string
  projectName: string
  taskId: string
  taskName: string
  startedAt: string
  endedAt: string
  status: "completed" | "failed" | "running"
  totalSteps: number
  totalTokens: number
  totalCostUsd: number
  steps: AgentStep[]
}
