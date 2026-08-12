"use client"

import { useState } from "react"

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function PercentageCalculator() {
  const [mode, setMode] = useState("of")
  const [a, setA] = useState("")
  const [b, setB] = useState("")
  const [result, setResult] = useState("")

  const run = () => {
    const x = Number(a)
    const y = Number(b)
    if (a === "" || b === "" || !Number.isFinite(x) || !Number.isFinite(y))
      return
    if (mode === "of") {
      setResult(`${y} 的 ${x}% = ${((y * x) / 100).toLocaleString("zh-CN")}`)
    } else if (mode === "what") {
      if (y === 0) return
      setResult(
        `${x} 是 ${y} 的 ${((x / y) * 100).toLocaleString("zh-CN", { maximumFractionDigits: 6 })}%`
      )
    } else {
      if (x === 0) return
      const change = ((y - x) / Math.abs(x)) * 100
      setResult(
        `从 ${x} 到 ${y}:${change >= 0 ? "增长" : "下降"} ${Math.abs(change).toLocaleString("zh-CN", { maximumFractionDigits: 6 })}%`
      )
    }
  }

  const labels: Record<string, [string, string]> = {
    of: ["百分比 (%)", "数值"],
    what: ["数值 A", "数值 B"],
    change: ["原值", "新值"],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>百分比计算器</CardTitle>
        <CardDescription>
          计算某数的百分比、占比与百分比变化
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="pct-mode">计算类型</FieldLabel>
            <Select value={mode} onValueChange={(v) => setMode(v as string)}>
              <SelectTrigger id="pct-mode" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="of">X% 的 Y 是多少</SelectItem>
                  <SelectItem value="what">A 是 B 的百分之几</SelectItem>
                  <SelectItem value="change">从 A 到 B 变化百分之几</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="pct-a">{labels[mode][0]}</FieldLabel>
              <Input
                id="pct-a"
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="pct-b">{labels[mode][1]}</FieldLabel>
              <Input
                id="pct-b"
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
              />
            </Field>
          </div>
        </FieldGroup>
        <div className="flex justify-center">
          <Button disabled={a === "" || b === ""} onClick={run}>
            计算
          </Button>
        </div>
        {result ? (
          <div className="rounded-lg border bg-muted/50 p-4 text-center">
            <p className="font-mono text-lg font-semibold">{result}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

export function DateDifference() {
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [result, setResult] = useState<{ label: string; value: string }[] | null>(
    null
  )

  const run = () => {
    if (!start || !end) return
    const d1 = new Date(start)
    const d2 = new Date(end)
    if (Number.isNaN(d1.getTime()) || Number.isNaN(d2.getTime())) return
    const ms = Math.abs(d2.getTime() - d1.getTime())
    const days = Math.floor(ms / 86400000)
    setResult([
      { label: "天数", value: `${days.toLocaleString("zh-CN")} 天` },
      {
        label: "周数",
        value: `${(days / 7).toLocaleString("zh-CN", { maximumFractionDigits: 2 })} 周`,
      },
      {
        label: "月数（约）",
        value: `${(days / 30.4375).toLocaleString("zh-CN", { maximumFractionDigits: 2 })} 个月`,
      },
      {
        label: "小时",
        value: `${Math.floor(ms / 3600000).toLocaleString("zh-CN")} 小时`,
      },
    ])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>日期差计算器</CardTitle>
        <CardDescription>计算两个日期之间的间隔</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="dd-start">开始日期</FieldLabel>
              <Input
                id="dd-start"
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="dd-end">结束日期</FieldLabel>
              <Input
                id="dd-end"
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </Field>
          </div>
        </FieldGroup>
        <div className="flex justify-center">
          <Button disabled={!start || !end} onClick={run}>
            计算
          </Button>
        </div>
        {result ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {result.map((r) => (
              <div
                key={r.label}
                className="rounded-lg border bg-muted/50 p-3 text-center"
              >
                <p className="font-mono font-semibold tabular-nums">{r.value}</p>
                <p className="text-xs text-muted-foreground">{r.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
