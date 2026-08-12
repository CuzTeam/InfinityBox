"use client"

import { useState } from "react"

import { CopyButton } from "@/components/copy-button"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

function CodecCard({
  title,
  encodeLabel,
  decodeLabel,
  encode,
  decode,
}: {
  title: string
  encodeLabel: string
  decodeLabel: string
  encode: (text: string) => string
  decode: (text: string) => string
}) {
  const [encodeInput, setEncodeInput] = useState("")
  const [decodeInput, setDecodeInput] = useState("")
  const [encodeResult, setEncodeResult] = useState("")
  const [decodeResult, setDecodeResult] = useState("")

  const safeRun = (
    fn: (t: string) => string,
    input: string,
    set: (v: string) => void
  ) => {
    if (!input) return
    try {
      set(fn(input))
    } catch {
      set("⚠ 转换失败，请检查输入格式")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="encode">
          <TabsList>
            <TabsTrigger value="encode">{encodeLabel}</TabsTrigger>
            <TabsTrigger value="decode">{decodeLabel}</TabsTrigger>
          </TabsList>
          <TabsContent value="encode" className="flex flex-col gap-3">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor={`${title}-e-in`}>输入</FieldLabel>
                <Textarea
                  id={`${title}-e-in`}
                  rows={4}
                  value={encodeInput}
                  onChange={(e) => setEncodeInput(e.target.value)}
                />
              </Field>
            </FieldGroup>
            <div className="flex justify-center">
              <Button
                disabled={!encodeInput}
                onClick={() => safeRun(encode, encodeInput, setEncodeResult)}
              >
                {encodeLabel}
              </Button>
            </div>
            {encodeResult ? <ResultBox text={encodeResult} /> : null}
          </TabsContent>
          <TabsContent value="decode" className="flex flex-col gap-3">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor={`${title}-d-in`}>输入</FieldLabel>
                <Textarea
                  id={`${title}-d-in`}
                  rows={4}
                  className="font-mono"
                  value={decodeInput}
                  onChange={(e) => setDecodeInput(e.target.value)}
                />
              </Field>
            </FieldGroup>
            <div className="flex justify-center">
              <Button
                disabled={!decodeInput}
                onClick={() => safeRun(decode, decodeInput, setDecodeResult)}
              >
                {decodeLabel}
              </Button>
            </div>
            {decodeResult ? <ResultBox text={decodeResult} /> : null}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function ResultBox({ text }: { text: string }) {
  return (
    <div className="flex items-start justify-between gap-2 rounded-lg border bg-muted/50 p-4">
      <p className="min-w-0 flex-1 font-mono text-sm break-all whitespace-pre-wrap">
        {text}
      </p>
      <CopyButton text={text} disabled={!text} />
    </div>
  )
}

export function UrlCodec() {
  return (
    <CodecCard
      title="URL 编码 / 解码"
      encodeLabel="编码"
      decodeLabel="解码"
      encode={(t) => encodeURIComponent(t)}
      decode={(t) => decodeURIComponent(t)}
    />
  )
}

export function UnicodeCodec() {
  return (
    <CodecCard
      title="Unicode 编码 / 解码"
      encodeLabel="编码 (\\uXXXX)"
      decodeLabel="解码"
      encode={(t) =>
        Array.from(t)
          .map((char) => {
            const code = char.codePointAt(0) ?? 0
            return code > 0xffff
              ? char
              : `\\u${code.toString(16).padStart(4, "0")}`
          })
          .join("")
      }
      decode={(t) =>
        t.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
          String.fromCharCode(parseInt(hex, 16))
        )
      }
    />
  )
}

export function AsciiConverter() {
  return (
    <CodecCard
      title="文本 ⇄ ASCII 码"
      encodeLabel="文本 → ASCII"
      decodeLabel="ASCII → 文本"
      encode={(t) =>
        Array.from(t)
          .map((char) => char.codePointAt(0))
          .join(" ")
      }
      decode={(t) =>
        t
          .trim()
          .split(/[\s,]+/)
          .map((n) => String.fromCodePoint(Number(n)))
          .join("")
      }
    />
  )
}
