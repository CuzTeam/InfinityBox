"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
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

type BmiLevel = {
  label: string
  range: string
  test: (bmi: number) => boolean
}

const levels: BmiLevel[] = [
  { label: "偏瘦", range: "≤ 18.4", test: (bmi) => bmi <= 18.4 },
  { label: "正常", range: "18.5 ~ 23.9", test: (bmi) => bmi > 18.4 && bmi <= 23.9 },
  { label: "过重", range: "24.0 ~ 27.9", test: (bmi) => bmi > 23.9 && bmi <= 27.9 },
  { label: "肥胖", range: "≥ 28.0", test: (bmi) => bmi > 27.9 },
]

export function BmiCalculator() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmi, setBmi] = useState<number | null>(null)

  const heightNum = Number(height)
  const weightNum = Number(weight)
  const valid = heightNum > 0 && weightNum > 0
  const level = bmi ? levels.find((l) => l.test(bmi)) : null

  const run = () => {
    if (!valid) return
    setBmi(weightNum / (heightNum / 100) ** 2)
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>输入身高体重</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="height">身高 (cm)</FieldLabel>
                <Input
                  id="height"
                  type="number"
                  min={0}
                  placeholder="170"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="weight">体重 (kg)</FieldLabel>
                <Input
                  id="weight"
                  type="number"
                  min={0}
                  placeholder="65"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </Field>
            </div>
          </FieldGroup>
          <div className="mt-4 flex justify-center">
            <Button disabled={!valid} onClick={run}>
              计算
            </Button>
          </div>
        </CardContent>
      </Card>

      {bmi !== null && level ? (
        <Card>
          <CardHeader>
            <CardDescription>你的 BMI 指数</CardDescription>
            <CardTitle className="flex items-center gap-3 text-3xl">
              {bmi.toFixed(1)}
              <Badge variant={level.label === "正常" ? "secondary" : "outline"}>
                {level.label}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              {levels.map((l) => (
                <div
                  key={l.label}
                  className={
                    l.label === level.label
                      ? "font-medium text-foreground"
                      : undefined
                  }
                >
                  {l.label}：{l.range}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
