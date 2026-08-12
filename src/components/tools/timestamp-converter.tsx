"use client"

import { useEffect, useState } from "react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function formatDate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

export function TimestampConverter() {
  const [now, setNow] = useState<number | null>(null)
  const [tsInput, setTsInput] = useState("")
  const [dateInput, setDateInput] = useState("")
  const [tsResult, setTsResult] = useState<Date | null>(null)
  const [dateResult, setDateResult] = useState<number | null>(null)

  useEffect(() => {
    const update = () => setNow(Date.now())
    const start = setTimeout(update, 0)
    const timer = setInterval(update, 1000)
    return () => {
      clearTimeout(start)
      clearInterval(timer)
    }
  }, [])

  const tsNum = Number(tsInput.trim())
  const tsValid = tsInput.trim() !== "" && Number.isFinite(tsNum)

  const toDate = () => {
    if (!tsValid) return
    setTsResult(new Date(tsNum > 1e12 ? tsNum : tsNum * 1000))
  }

  const toTimestamp = () => {
    const parsed = new Date(dateInput.replace(" ", "T"))
    if (Number.isNaN(parsed.getTime())) return
    setDateResult(parsed.getTime())
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardDescription>当前 Unix 时间戳（本地时区）</CardDescription>
          <CardTitle className="font-mono text-3xl tabular-nums">
            {now === null ? "…" : Math.floor(now / 1000)}
          </CardTitle>
          <CardDescription className="font-mono">
            {now === null ? "" : formatDate(new Date(now))}
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="ts-to-date">
        <TabsList>
          <TabsTrigger value="ts-to-date">时间戳 → 日期</TabsTrigger>
          <TabsTrigger value="date-to-ts">日期 → 时间戳</TabsTrigger>
        </TabsList>

        <TabsContent value="ts-to-date">
          <Card>
            <CardContent className="flex flex-col gap-4 pt-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="ts-input">时间戳（秒或毫秒）</FieldLabel>
                  <Input
                    id="ts-input"
                    className="font-mono"
                    placeholder="1735689600"
                    value={tsInput}
                    onChange={(e) => setTsInput(e.target.value)}
                  />
                </Field>
              </FieldGroup>
              <div className="flex justify-center">
                <Button disabled={!tsValid} onClick={toDate}>
                  转换
                </Button>
              </div>
              {tsResult ? (
                <div className="flex flex-col gap-1 font-mono text-sm">
                  <p>本地时间：{formatDate(tsResult)}</p>
                  <p className="text-muted-foreground">
                    UTC：{tsResult.toISOString().replace("T", " ").slice(0, 19)}
                  </p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="date-to-ts">
          <Card>
            <CardContent className="flex flex-col gap-4 pt-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="date-input">
                    日期时间（YYYY-MM-DD HH:mm:ss）
                  </FieldLabel>
                  <Input
                    id="date-input"
                    className="font-mono"
                    placeholder="2025-01-01 00:00:00"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                  />
                </Field>
              </FieldGroup>
              <div className="flex justify-center">
                <Button disabled={!dateInput} onClick={toTimestamp}>
                  转换
                </Button>
              </div>
              {dateResult !== null ? (
                <div className="flex flex-col gap-1 font-mono text-sm">
                  <p>秒级：{Math.floor(dateResult / 1000)}</p>
                  <p>毫秒级：{dateResult}</p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
