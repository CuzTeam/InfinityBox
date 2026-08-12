"use client"

import { useEffect, useRef, useState } from "react"
import { PlayIcon } from "lucide-react"

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

export function Lottery() {
  const [listText, setListText] = useState("")
  const [winnerCount, setWinnerCount] = useState("1")
  const [rolling, setRolling] = useState(false)
  const [current, setCurrent] = useState("")
  const [winners, setWinners] = useState<string[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const names = listText
    .split(/[\n,，、]+/)
    .map((s) => s.trim())
    .filter(Boolean)

  const start = () => {
    const count = Math.min(Math.max(1, Number(winnerCount) || 1), names.length)
    if (names.length === 0 || rolling) return
    setRolling(true)
    setWinners([])
    timerRef.current = setInterval(() => {
      setCurrent(names[Math.floor(Math.random() * names.length)])
    }, 60)
    setTimeout(() => {
      if (timerRef.current) clearInterval(timerRef.current)
      const pool = [...names]
      const picked: string[] = []
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * pool.length)
        picked.push(pool.splice(idx, 1)[0])
      }
      setWinners(picked)
      setCurrent(picked[0])
      setRolling(false)
    }, 2000)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>在线抽奖</CardTitle>
        <CardDescription>
          输入候选名单（每行一个或用逗号分隔），随机抽取
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="lottery-list">
              候选名单（{names.length} 人）
            </FieldLabel>
            <Textarea
              id="lottery-list"
              rows={6}
              placeholder={"张三\n李四\n王五"}
              value={listText}
              onChange={(e) => setListText(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="lottery-count">抽取人数</FieldLabel>
            <Input
              id="lottery-count"
              type="number"
              min={1}
              value={winnerCount}
              onChange={(e) => setWinnerCount(e.target.value)}
            />
          </Field>
        </FieldGroup>

        <div className="flex flex-col items-center gap-4 rounded-lg border bg-muted/50 p-8">
          <p
            className={`text-3xl font-bold tracking-wide ${rolling ? "animate-pulse" : ""}`}
          >
            {current || "?"}
          </p>
          <Button onClick={start} disabled={names.length === 0 || rolling}>
            <PlayIcon data-icon="inline-start" />
            {rolling ? "抽取中…" : "开始抽奖"}
          </Button>
          {winners.length > 0 ? (
            <p className="text-sm text-muted-foreground">
              中奖名单：{winners.join("、")}
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
