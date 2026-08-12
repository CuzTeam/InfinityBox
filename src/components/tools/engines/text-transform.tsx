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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export type TransformMode = {
  key: string
  label: string
  fn: (text: string) => string
}

export function TextTransform({ modes }: { modes: TransformMode[] }) {
  const [input, setInput] = useState("")
  const [modeKey, setModeKey] = useState(modes[0].key)
  const [output, setOutput] = useState("")

  const mode = modes.find((m) => m.key === modeKey) ?? modes[0]

  const run = () => {
    if (!input) return
    setOutput(mode.fn(input))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>文本转换</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          {modes.length > 1 ? (
            <Field>
              <FieldLabel htmlFor="mode">转换方式</FieldLabel>
              <Select
                value={mode.key}
                onValueChange={(v) => setModeKey(v as string)}
              >
                <SelectTrigger id="mode" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {modes.map((m) => (
                      <SelectItem key={m.key} value={m.key}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          ) : null}
          <Field>
            <FieldLabel htmlFor="input">输入文本</FieldLabel>
            <Textarea
              id="input"
              rows={5}
              placeholder="输入要转换的文本"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <div className="flex justify-center">
          <Button disabled={!input} onClick={run}>
            转换
          </Button>
        </div>
        <FieldGroup>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="output">转换结果</FieldLabel>
              <CopyButton text={output} disabled={!output} />
            </div>
            <Textarea id="output" rows={5} readOnly value={output} />
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
