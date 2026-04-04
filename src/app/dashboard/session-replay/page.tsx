"use client"

import { useState } from "react"
import { MOCK_SESSIONS } from "@/lib/mock-sessions"
import SessionList from "@/components/session-replay/session-list"
import StepTimeline from "@/components/session-replay/step-timeline"
import { AgentSession } from "@/types"

export default function SessionReplayPage() {
  const [selected, setSelected] = useState<AgentSession>(MOCK_SESSIONS[0])

  return (
    <div className="flex h-full">
      {/* Session list sidebar */}
      <div className="w-80 flex-shrink-0 border-r bg-background h-full">
        <div className="px-4 py-3 border-b">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Sessions ({MOCK_SESSIONS.length})
          </h2>
        </div>
        <div className="h-[calc(100%-48px)]">
          <SessionList
            sessions={MOCK_SESSIONS}
            selectedId={selected.id}
            onSelect={setSelected}
          />
        </div>
      </div>

      {/* Step timeline */}
      <div className="flex-1 overflow-hidden">
        <StepTimeline session={selected} />
      </div>
    </div>
  )
}
