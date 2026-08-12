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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export function RandomNumberGenerator() {
  const [min, setMin] = useState("1")
  const [max, setMax] = useState("100")
  const [count, setCount] = useState("1")
  const [unique, setUnique] = useState(false)
  const [sorted, setSorted] = useState(false)
  const [results, setResults] = useState<number[]>([])

  const generate = () => {
    const lo = Math.ceil(Number(min))
    const hi = Math.floor(Number(max))
    const n = Math.min(Math.max(1, Number(count) || 1), 10000)
    if (!Number.isFinite(lo) || !Number.isFinite(hi) || hi < lo) return
    const values: number[] = []
    if (unique && hi - lo + 1 < n) {
      setResults([])
      return
    }
    const seen = new Set<number>()
    while (values.length < n) {
      const v = lo + Math.floor(Math.random() * (hi - lo + 1))
      if (unique) {
        if (seen.has(v)) continue
        seen.add(v)
      }
      values.push(v)
    }
    setResults(sorted ? [...values].sort((a, b) => a - b) : values)
  }

  const text = results.join(", ")

  return (
    <Card>
      <CardHeader>
        <CardTitle>随机数生成</CardTitle>
        <CardDescription>生成指定范围内的随机整数</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel htmlFor="rn-min">最小值</FieldLabel>
              <Input id="rn-min" type="number" value={min} onChange={(e) => setMin(e.target.value)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="rn-max">最大值</FieldLabel>
              <Input id="rn-max" type="number" value={max} onChange={(e) => setMax(e.target.value)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="rn-count">个数</FieldLabel>
              <Input id="rn-count" type="number" min={1} value={count} onChange={(e) => setCount(e.target.value)} />
            </Field>
          </div>
          <div className="flex gap-6">
            <Field orientation="horizontal">
              <Switch id="rn-unique" checked={unique} onCheckedChange={setUnique} />
              <FieldLabel htmlFor="rn-unique">不重复</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Switch id="rn-sorted" checked={sorted} onCheckedChange={setSorted} />
              <FieldLabel htmlFor="rn-sorted">排序</FieldLabel>
            </Field>
          </div>
        </FieldGroup>
        <Button onClick={generate} className="w-fit">
          生成
        </Button>
        {results.length > 0 ? (
          <FieldGroup>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel>结果（{results.length} 个）</FieldLabel>
                <CopyButton text={text} />
              </div>
              <Textarea rows={4} readOnly className="font-mono" value={text} />
            </Field>
          </FieldGroup>
        ) : null}
      </CardContent>
    </Card>
  )
}

export function SerialNumberGenerator() {
  const [prefix, setPrefix] = useState("SN-")
  const [start, setStart] = useState("1")
  const [count, setCount] = useState("10")
  const [padLength, setPadLength] = useState("4")
  const [suffix, setSuffix] = useState("")
  const [output, setOutput] = useState("")

  const generate = () => {
    const startNum = Number(start) || 0
    const n = Math.min(Math.max(1, Number(count) || 1), 10000)
    const pad = Math.max(0, Number(padLength) || 0)
    const lines = Array.from(
      { length: n },
      (_, i) => `${prefix}${String(startNum + i).padStart(pad, "0")}${suffix}`
    )
    setOutput(lines.join("\n"))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>序列号生成</CardTitle>
        <CardDescription>按前缀 + 序号 + 后缀批量生成</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Field>
              <FieldLabel htmlFor="sn-prefix">前缀</FieldLabel>
              <Input id="sn-prefix" value={prefix} onChange={(e) => setPrefix(e.target.value)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="sn-start">起始序号</FieldLabel>
              <Input id="sn-start" type="number" value={start} onChange={(e) => setStart(e.target.value)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="sn-count">生成数量</FieldLabel>
              <Input id="sn-count" type="number" min={1} value={count} onChange={(e) => setCount(e.target.value)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="sn-pad">补零位数</FieldLabel>
              <Input id="sn-pad" type="number" min={0} value={padLength} onChange={(e) => setPadLength(e.target.value)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="sn-suffix">后缀</FieldLabel>
              <Input id="sn-suffix" value={suffix} onChange={(e) => setSuffix(e.target.value)} />
            </Field>
          </div>
        </FieldGroup>
        <Button onClick={generate} className="w-fit">
          生成
        </Button>
        {output ? (
          <FieldGroup>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel>结果</FieldLabel>
                <CopyButton text={output} />
              </div>
              <Textarea rows={8} readOnly className="font-mono" value={output} />
            </Field>
          </FieldGroup>
        ) : null}
      </CardContent>
    </Card>
  )
}
