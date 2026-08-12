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
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export function ReplaceText() {
  const [input, setInput] = useState("")
  const [search, setSearch] = useState("")
  const [replacement, setReplacement] = useState("")
  const [useRegex, setUseRegex] = useState(false)
  const [caseSensitive, setCaseSensitive] = useState(true)
  const [result, setResult] = useState<{ output: string; error: string } | null>(
    null
  )

  const run = () => {
    if (!input) return
    if (!search) {
      setResult({ output: input, error: "" })
      return
    }
    try {
      let output: string
      if (useRegex) {
        const flags = caseSensitive ? "g" : "gi"
        output = input.replace(new RegExp(search, flags), replacement)
      } else if (caseSensitive) {
        output = input.split(search).join(replacement)
      } else {
        const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        output = input.replace(new RegExp(escaped, "gi"), replacement)
      }
      setResult({ output, error: "" })
    } catch {
      setResult({ output: "", error: "正则表达式无效" })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>文本替换</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="rp-search">查找内容</FieldLabel>
              <Input
                id="rp-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="rp-replace">替换为</FieldLabel>
              <Input
                id="rp-replace"
                value={replacement}
                onChange={(e) => setReplacement(e.target.value)}
              />
            </Field>
          </div>
          <div className="flex gap-6">
            <Field orientation="horizontal">
              <Switch id="rp-regex" checked={useRegex} onCheckedChange={setUseRegex} />
              <FieldLabel htmlFor="rp-regex">正则表达式</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Switch
                id="rp-case"
                checked={caseSensitive}
                onCheckedChange={setCaseSensitive}
              />
              <FieldLabel htmlFor="rp-case">区分大小写</FieldLabel>
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="rp-input">原文本</FieldLabel>
            <Textarea
              id="rp-input"
              rows={6}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <div className="flex justify-center">
          <Button disabled={!input} onClick={run}>
            替换
          </Button>
        </div>
        {result ? (
          <FieldGroup>
            <Field data-invalid={!!result.error || undefined}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="rp-output">结果</FieldLabel>
                <CopyButton
                  text={result.output}
                  disabled={!result.output || !!result.error}
                />
              </div>
              <Textarea
                id="rp-output"
                rows={6}
                readOnly
                value={result.error ? `⚠ ${result.error}` : result.output}
              />
            </Field>
          </FieldGroup>
        ) : null}
      </CardContent>
    </Card>
  )
}
