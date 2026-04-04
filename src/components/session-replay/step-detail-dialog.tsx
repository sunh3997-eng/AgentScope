"use client"

import { AgentStep } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { formatDuration, formatTokens } from "@/lib/utils"

interface StepDetailDialogProps {
  step: AgentStep | null
  open: boolean
  onClose: () => void
}

function prettyJson(raw: string): string {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2)
  } catch {
    return raw
  }
}

export default function StepDetailDialog({ step, open, onClose }: StepDetailDialogProps) {
  if (!step) return null

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Step {step.stepNumber} — {step.type.replace("_", " ")}
            <Badge
              variant={step.status === "error" ? "destructive" : "success"}
              className="ml-1"
            >
              {step.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Duration: {formatDuration(step.durationMs)}
            {step.toolName && ` · Tool: ${step.toolName}`}
          </DialogDescription>
        </DialogHeader>

        {step.error && (
          <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm">
            <p className="font-semibold text-destructive">{step.error.code}</p>
            <p className="text-destructive/80 mt-1">{step.error.message}</p>
            {step.error.stackTrace && (
              <pre className="mt-2 text-xs text-destructive/70 overflow-auto whitespace-pre-wrap">
                {step.error.stackTrace}
              </pre>
            )}
          </div>
        )}

        <Tabs defaultValue="input" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="w-fit">
            <TabsTrigger value="input">Input</TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
            {step.tokenUsage && <TabsTrigger value="tokens">Token Usage</TabsTrigger>}
          </TabsList>
          <TabsContent value="input" className="flex-1 overflow-auto">
            <pre className="rounded-md bg-muted p-4 text-xs font-mono whitespace-pre-wrap overflow-auto max-h-72">
              {prettyJson(step.input)}
            </pre>
          </TabsContent>
          <TabsContent value="output" className="flex-1 overflow-auto">
            <pre className="rounded-md bg-muted p-4 text-xs font-mono whitespace-pre-wrap overflow-auto max-h-72">
              {step.output ? prettyJson(step.output) : <span className="text-muted-foreground">(empty)</span>}
            </pre>
          </TabsContent>
          {step.tokenUsage && (
            <TabsContent value="tokens">
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="rounded-md border p-4 text-center">
                  <p className="text-2xl font-bold">{formatTokens(step.tokenUsage.promptTokens)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Prompt tokens</p>
                </div>
                <div className="rounded-md border p-4 text-center">
                  <p className="text-2xl font-bold">{formatTokens(step.tokenUsage.completionTokens)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Completion tokens</p>
                </div>
                <div className="rounded-md border p-4 text-center">
                  <p className="text-2xl font-bold">{formatTokens(step.tokenUsage.totalTokens)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total tokens</p>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
