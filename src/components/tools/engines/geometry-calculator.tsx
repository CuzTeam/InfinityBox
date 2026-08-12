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

export type Shape = {
  key: string
  name: string
  inputs: { key: string; label: string }[]
  formula: string
  compute: (v: Record<string, number>) => number
}

export function GeometryCalculator({
  shapes,
  resultLabel,
}: {
  shapes: Shape[]
  resultLabel: string
}) {
  const [shapeKey, setShapeKey] = useState(shapes[0].key)
  const [values, setValues] = useState<Record<string, string>>({})
  const [result, setResult] = useState<number | null>(null)

  const shape = shapes.find((s) => s.key === shapeKey) ?? shapes[0]
  const allValid = shape.inputs.every((input) => {
    const v = Number(values[input.key])
    return values[input.key] && Number.isFinite(v) && v > 0
  })

  const run = () => {
    if (!allValid) return
    const nums: Record<string, number> = {}
    for (const input of shape.inputs) nums[input.key] = Number(values[input.key])
    setResult(shape.compute(nums))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>选择图形</CardTitle>
        <CardDescription>{shape.formula}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="geo-shape">图形</FieldLabel>
            <Select
              value={shape.key}
              onValueChange={(v) => {
                setShapeKey(v as string)
                setValues({})
                setResult(null)
              }}
            >
              <SelectTrigger id="geo-shape" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {shapes.map((s) => (
                    <SelectItem key={s.key} value={s.key}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {shape.inputs.map((input) => (
              <Field key={input.key}>
                <FieldLabel htmlFor={`geo-${input.key}`}>
                  {input.label}
                </FieldLabel>
                <Input
                  id={`geo-${input.key}`}
                  type="number"
                  min={0}
                  value={values[input.key] ?? ""}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, [input.key]: e.target.value }))
                  }
                />
              </Field>
            ))}
          </div>
        </FieldGroup>
        <div className="flex justify-center">
          <Button disabled={!allValid} onClick={run}>
            计算
          </Button>
        </div>
        {result !== null ? (
          <div className="rounded-lg border bg-muted/50 p-4 text-center">
            <p className="text-sm text-muted-foreground">
              {shape.name}的{resultLabel}
            </p>
            <p className="font-mono text-2xl font-semibold tabular-nums">
              {Number(result.toPrecision(10))}
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
