"use client"

import { CheckIcon, CopyIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function CopyButton({
  text,
  disabled,
}: {
  text: string
  disabled?: boolean
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success("已复制到剪贴板")
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Button variant="ghost" size="xs" disabled={disabled} onClick={copy}>
      {copied ? (
        <CheckIcon data-icon="inline-start" />
      ) : (
        <CopyIcon data-icon="inline-start" />
      )}
      复制
    </Button>
  )
}
