"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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

export type CalcField =
  | { key: string; label: string; kind: "number" | "text"; placeholder?: string }
  | {
      key: string
      label: string
      kind: "select"
      options: { value: string; label: string }[]
      defaultValue: string
    }
  | { key: string; label: string; kind: "date" }

export function SimpleCalc({
  fields,
  compute,
}: {
  fields: CalcField[]
  compute: (values: Record<string, string>) => React.ReactNode
}) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    for (const field of fields) {
      initial[field.key] = field.kind === "select" ? field.defaultValue : ""
    }
    return initial
  })
  const [result, setResult] = useState<Record<string, string> | null>(null)

  const set = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }))

  const allFilled = fields.every((f) => values[f.key]?.trim())

  return (
    <Card>
      <CardHeader>
        <CardTitle>输入参数</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <Field key={field.key}>
                <FieldLabel htmlFor={field.key}>{field.label}</FieldLabel>
                {field.kind === "select" ? (
                  <Select
                    value={values[field.key]}
                    onValueChange={(v) => set(field.key, v as string)}
                  >
                    <SelectTrigger id={field.key} className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {field.options.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.key}
                    type={field.kind === "date" ? "date" : field.kind}
                    placeholder={field.kind === "number" || field.kind === "text" ? field.placeholder : undefined}
                    value={values[field.key]}
                    onChange={(e) => set(field.key, e.target.value)}
                  />
                )}
              </Field>
            ))}
          </div>
        </FieldGroup>
        <div className="flex justify-center">
          <Button disabled={!allFilled} onClick={() => setResult(values)}>
            计算
          </Button>
        </div>
        {result ? (
          <div className="rounded-lg border bg-muted/50 p-4">
            {compute(result)}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

export function ResultLine({
  label,
  value,
  mono = true,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={mono ? "font-mono font-medium tabular-nums" : "font-medium"}>
        {value}
      </span>
    </div>
  )
}
