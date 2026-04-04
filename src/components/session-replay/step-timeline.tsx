"use client"

import { useState } from "react"
import { AgentSession, AgentStep } from "@/types"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDuration, formatTokens } from "@/lib/utils"
import StepDetailDialog from "./step-detail-dialog"
import {
  Brain,
  Wrench,
  Search,
  Zap,
  Eye,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"

function StepIcon({ type }: { type: AgentStep["type"] }) {
  const cls = "h-4 w-4"
  switch (type) {
    case "llm_call": return <Brain className={cls} />
    case "tool_call": return <Wrench className={cls} />
    case "retrieval": return <Search className={cls} />
    case "action": return <Zap className={cls} />
    case "observation": return <Eye className={cls} />
  }
}

function StatusIcon({ status }: { status: AgentStep["status"] }) {
  if (status === "success") return <CheckCircle2 className="h-4 w-4 text-green-500" />
  if (status === "error") return <AlertCircle className="h-4 w-4 text-destructive" />
  return <Clock className="h-4 w-4 text-yellow-500" />
}

function stepTypeColor(type: AgentStep["type"]): string {
  switch (type) {
    case "llm_call": return "bg-blue-100 text-blue-700"
    case "tool_call": return "bg-purple-100 text-purple-700"
    case "retrieval": return "bg-green-100 text-green-700"
    case "action": return "bg-orange-100 text-orange-700"
    case "observation": return "bg-slate-100 text-slate-700"
  }
}

interface StepTimelineProps {
  session: AgentSession
}

export default function StepTimeline({ session }: StepTimelineProps) {
  const [selectedStep, setSelectedStep] = useState<AgentStep | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  function openStep(step: AgentStep) {
    setSelectedStep(step)
    setDialogOpen(true)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Session header */}
      <div className="px-6 py-4 border-b bg-card flex-shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-semibold text-lg">{session.taskName}</h2>
            <p className="text-sm text-muted-foreground">
              {session.agentName} · {session.projectName}
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{session.totalSteps} steps</span>
            <span>{formatTokens(session.totalTokens)} tokens</span>
            <span className="font-medium text-foreground">
              ${session.totalCostUsd.toFixed(4)}
            </span>
            <Badge
              variant={
                session.status === "completed"
                  ? "success"
                  : session.status === "failed"
                  ? "destructive"
                  : "secondary"
              }
            >
              {session.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <ScrollArea className="flex-1">
        <div className="px-6 py-4">
          {session.steps.map((step, idx) => (
            <div key={step.id} className="flex gap-4 mb-2">
              {/* Left: connector */}
              <div className="flex flex-col items-center w-8 flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-background z-10 text-xs font-bold text-muted-foreground">
                  {step.stepNumber}
                </div>
                {idx < session.steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border mt-1" />
                )}
              </div>

              {/* Right: step card */}
              <button
                onClick={() => openStep(step)}
                className={cn(
                  "flex-1 text-left rounded-lg border p-4 mb-4 transition-colors hover:bg-accent",
                  step.status === "error" && "border-destructive/30 bg-destructive/5 hover:bg-destructive/10"
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", stepTypeColor(step.type))}>
                      <StepIcon type={step.type} />
                      {step.type.replace("_", " ")}
                    </span>
                    {step.toolName && (
                      <span className="text-xs text-muted-foreground font-mono">{step.toolName}()</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0">
                    <StatusIcon status={step.status} />
                    <span>{formatDuration(step.durationMs)}</span>
                    {step.tokenUsage && (
                      <span className="hidden sm:inline">{formatTokens(step.tokenUsage.totalTokens)} tok</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground font-medium mb-0.5">Input</p>
                    <p className="font-mono text-foreground/80 truncate">
                      {step.input.slice(0, 100)}{step.input.length > 100 ? "…" : ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium mb-0.5">Output</p>
                    <p className="font-mono text-foreground/80 truncate">
                      {step.output
                        ? `${step.output.slice(0, 100)}${step.output.length > 100 ? "…" : ""}`
                        : <span className="text-muted-foreground">(empty)</span>}
                    </p>
                  </div>
                </div>

                {step.error && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-destructive">
                    <AlertCircle className="h-3 w-3" />
                    <span className="font-medium">{step.error.code}:</span>
                    <span className="truncate">{step.error.message.slice(0, 80)}</span>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <StepDetailDialog
        step={selectedStep}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  )
}
