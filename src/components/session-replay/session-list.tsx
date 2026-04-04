"use client"

import { AgentSession } from "@/types"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatCurrency, formatTokens, formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface SessionListProps {
  sessions: AgentSession[]
  selectedId: string
  onSelect: (session: AgentSession) => void
}

function statusVariant(status: AgentSession["status"]) {
  if (status === "completed") return "success" as const
  if (status === "failed") return "destructive" as const
  return "secondary" as const
}

export default function SessionList({ sessions, selectedId, onSelect }: SessionListProps) {
  return (
    <ScrollArea className="h-full">
      <div className="p-3 space-y-2">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => onSelect(session)}
            className={cn(
              "w-full text-left rounded-lg border p-3 transition-colors hover:bg-accent",
              selectedId === session.id
                ? "border-primary bg-primary/5"
                : "border-border bg-card"
            )}
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="font-medium text-sm truncate">{session.agentName}</span>
              <Badge variant={statusVariant(session.status)} className="flex-shrink-0 text-xs">
                {session.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate mb-2">{session.taskName}</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs py-0">{session.projectName}</Badge>
              <span>{session.totalSteps} steps</span>
              <span>{formatTokens(session.totalTokens)} tok</span>
              <span>{formatCurrency(session.totalCostUsd)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{formatDate(session.startedAt)}</p>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}
