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

const DICE_FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"]

export function DiceRoller() {
  const [count, setCount] = useState("2")
  const [sides, setSides] = useState("6")
  const [results, setResults] = useState<number[] | null>(null)

  const run = () => {
    const n = Math.min(Math.max(1, Number(count) || 1), 20)
    const s = Number(sides)
    setResults(
      Array.from({ length: n }, () => 1 + Math.floor(Math.random() * s))
    )
  }

  const total = results?.reduce((sum, v) => sum + v, 0) ?? 0
  const isD6 = sides === "6"

  return (
    <Card>
      <CardHeader>
        <CardTitle>掷骰子</CardTitle>
        <CardDescription>掷一组骰子，支持多种面数</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="dice-count">骰子数量</FieldLabel>
              <Input
                id="dice-count"
                type="number"
                min={1}
                max={20}
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="dice-sides">面数</FieldLabel>
              <Select value={sides} onValueChange={(v) => setSides(v as string)}>
                <SelectTrigger id="dice-sides" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {["4", "6", "8", "10", "12", "20"].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s} 面 (d{s})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </FieldGroup>
        <div className="flex justify-center">
          <Button onClick={run}>掷骰子</Button>
        </div>
        {results ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border bg-muted/50 p-4">
            <div className="flex flex-wrap justify-center gap-2">
              {results.map((v, i) =>
                isD6 ? (
                  <span key={i} className="text-4xl leading-none">
                    {DICE_FACES[v - 1]}
                  </span>
                ) : (
                  <span
                    key={i}
                    className="rounded-md border bg-background px-3 py-1 font-mono text-xl font-semibold tabular-nums"
                  >
                    {v}
                  </span>
                )
              )}
            </div>
            <p className="font-mono text-lg font-semibold">
              合计:{total}
            </p>
            <p className="font-mono text-sm text-muted-foreground">
              {results.join(" + ")} = {total}
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
