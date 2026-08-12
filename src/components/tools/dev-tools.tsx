"use client"

import { useState } from "react"

import { CopyButton } from "@/components/copy-button"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function JsonFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  const run = (minify: boolean) => {
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      setOutput(minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2))
      setError("")
    } catch (e) {
      setOutput("")
      setError(e instanceof Error ? e.message : "JSON 格式错误")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>JSON 格式化 / 压缩</CardTitle>
        <CardDescription>校验 JSON 并美化或压缩</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="jf-input">输入 JSON</FieldLabel>
            <Textarea
              id="jf-input"
              rows={8}
              className="font-mono"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <div className="flex justify-center gap-3">
          <Button disabled={!input.trim()} onClick={() => run(false)}>
            格式化
          </Button>
          <Button
            variant="outline"
            disabled={!input.trim()}
            onClick={() => run(true)}
          >
            压缩
          </Button>
        </div>
        {error ? (
          <p className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            ⚠ {error}
          </p>
        ) : null}
        {output ? (
          <FieldGroup>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="jf-output">结果</FieldLabel>
                <CopyButton text={output} />
              </div>
              <Textarea
                id="jf-output"
                rows={10}
                readOnly
                className="font-mono"
                value={output}
              />
            </Field>
          </FieldGroup>
        ) : null}
      </CardContent>
    </Card>
  )
}

function decodeBase64Url(part: string) {
  const b64 = part.replace(/-/g, "+").replace(/_/g, "/")
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4)
  const bytes = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function JwtDecoder() {
  const [input, setInput] = useState("")
  const [header, setHeader] = useState("")
  const [payload, setPayload] = useState("")
  const [meta, setMeta] = useState<string[]>([])
  const [error, setError] = useState("")

  const run = () => {
    if (!input.trim()) return
    const parts = input.trim().split(".")
    if (parts.length !== 3) {
      setError("无效的 JWT：应包含 header.payload.signature 三段")
      setHeader("")
      setPayload("")
      return
    }
    try {
      const h = JSON.parse(decodeBase64Url(parts[0]))
      const p = JSON.parse(decodeBase64Url(parts[1]))
      setHeader(JSON.stringify(h, null, 2))
      setPayload(JSON.stringify(p, null, 2))
      const info: string[] = []
      if (p.exp)
        info.push(
          `过期时间：${new Date(p.exp * 1000).toLocaleString("zh-CN")}${p.exp * 1000 < Date.now() ? "（已过期）" : ""}`
        )
      if (p.iat)
        info.push(`签发时间：${new Date(p.iat * 1000).toLocaleString("zh-CN")}`)
      if (p.iss) info.push(`签发者：${p.iss}`)
      if (p.sub) info.push(`主题：${p.sub}`)
      setMeta(info)
      setError("")
    } catch {
      setError("解码失败，请检查 JWT 格式")
      setHeader("")
      setPayload("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>JWT 解码器</CardTitle>
        <CardDescription>解码 JWT 的 Header 与 Payload（不验证签名）</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="jwt-input">输入 JWT</FieldLabel>
            <Textarea
              id="jwt-input"
              rows={4}
              className="font-mono"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <div className="flex justify-center">
          <Button disabled={!input.trim()} onClick={run}>
            解码
          </Button>
        </div>
        {error ? (
          <p className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            ⚠ {error}
          </p>
        ) : null}
        {header && payload ? (
          <>
            {meta.length > 0 ? (
              <div className="flex flex-col gap-1 rounded-lg border bg-muted/50 p-3 text-sm">
                {meta.map((m) => (
                  <p key={m}>{m}</p>
                ))}
              </div>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel>Header</FieldLabel>
                  <CopyButton text={header} />
                </div>
                <Textarea rows={8} readOnly className="font-mono" value={header} />
              </Field>
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel>Payload</FieldLabel>
                  <CopyButton text={payload} />
                </div>
                <Textarea
                  rows={8}
                  readOnly
                  className="font-mono"
                  value={payload}
                />
              </Field>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}

type RegexMatch = {
  index: number
  match: string
  groups: string[]
}

export function RegexTester() {
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("g")
  const [text, setText] = useState("")
  const [matches, setMatches] = useState<RegexMatch[] | null>(null)
  const [error, setError] = useState("")

  const run = () => {
    if (!pattern || !text) return
    try {
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g")
      const found: RegexMatch[] = []
      for (const m of text.matchAll(re)) {
        found.push({
          index: m.index ?? 0,
          match: m[0],
          groups: m.slice(1).map((g) => g ?? ""),
        })
        if (found.length >= 1000) break
      }
      setMatches(found)
      setError("")
    } catch (e) {
      setMatches(null)
      setError(e instanceof Error ? e.message : "正则表达式错误")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>正则表达式测试</CardTitle>
        <CardDescription>测试正则并列出全部匹配与分组</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
            <Field>
              <FieldLabel htmlFor="rx-pattern">正则表达式</FieldLabel>
              <Input
                id="rx-pattern"
                className="font-mono"
                placeholder="\d+"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="rx-flags">标志位</FieldLabel>
              <Input
                id="rx-flags"
                className="font-mono"
                placeholder="g"
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
              />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="rx-text">测试文本</FieldLabel>
            <Textarea
              id="rx-text"
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <div className="flex justify-center">
          <Button disabled={!pattern || !text} onClick={run}>
            测试
          </Button>
        </div>
        {error ? (
          <p className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            ⚠ {error}
          </p>
        ) : null}
        {matches ? (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              共 {matches.length} 个匹配
            </p>
            {matches.length > 0 ? (
              <div className="flex max-h-80 flex-col gap-2 overflow-y-auto">
                {matches.map((m, i) => (
                  <div
                    key={`${m.index}-${i}`}
                    className="rounded-lg border bg-muted/50 p-3 font-mono text-sm"
                  >
                    <p className="break-all">
                      <span className="text-muted-foreground">#{i + 1} </span>
                      {m.match}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      位置 {m.index}
                      {m.groups.length > 0
                        ? ` · 分组: ${m.groups.map((g) => JSON.stringify(g)).join(", ")}`
                        : ""}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
