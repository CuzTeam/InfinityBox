"use client"

import { useState } from "react"
import { ArrowDownIcon, ArrowUpIcon, CopyIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

function encodeBase64(text: string) {
  const bytes = new TextEncoder().encode(text)
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

function decodeBase64(text: string): string | null {
  try {
    const binary = atob(text.trim())
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
    return new TextDecoder().decode(bytes)
  } catch {
    return null
  }
}

export function Base64Converter() {
  const [plain, setPlain] = useState("")
  const [encoded, setEncoded] = useState("")
  const [decodeError, setDecodeError] = useState(false)

  const handleEncode = () => {
    setEncoded(encodeBase64(plain))
    setDecodeError(false)
  }

  const handleDecode = () => {
    const result = decodeBase64(encoded)
    if (result === null) {
      setDecodeError(true)
      toast.error("解码失败：输入不是合法的 Base64")
      return
    }
    setDecodeError(false)
    setPlain(result)
  }

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    toast.success("已复制到剪贴板")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>文本 ⇄ Base64</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="plain">原文</FieldLabel>
              <Button
                variant="ghost"
                size="xs"
                disabled={!plain}
                onClick={() => copy(plain)}
              >
                <CopyIcon data-icon="inline-start" />
                复制
              </Button>
            </div>
            <Textarea
              id="plain"
              rows={5}
              placeholder="输入要编码的文本，支持中文"
              value={plain}
              onChange={(e) => setPlain(e.target.value)}
            />
          </Field>
        </FieldGroup>

        <div className="flex items-center justify-center gap-2">
          <Button onClick={handleEncode} disabled={!plain}>
            <ArrowDownIcon data-icon="inline-start" />
            编码
          </Button>
          <Button variant="outline" onClick={handleDecode} disabled={!encoded}>
            <ArrowUpIcon data-icon="inline-start" />
            解码
          </Button>
        </div>

        <FieldGroup>
          <Field data-invalid={decodeError || undefined}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="encoded">Base64</FieldLabel>
              <Button
                variant="ghost"
                size="xs"
                disabled={!encoded}
                onClick={() => copy(encoded)}
              >
                <CopyIcon data-icon="inline-start" />
                复制
              </Button>
            </div>
            <Textarea
              id="encoded"
              rows={5}
              className="font-mono"
              placeholder="Base64 编码结果"
              value={encoded}
              aria-invalid={decodeError || undefined}
              onChange={(e) => {
                setEncoded(e.target.value)
                setDecodeError(false)
              }}
            />
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
