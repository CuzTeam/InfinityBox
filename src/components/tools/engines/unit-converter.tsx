"use client"

import { useState } from "react"
import { ArrowLeftRightIcon } from "lucide-react"

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
import type { UnitDef } from "@/lib/configs/units"

export function UnitConverter({
  units,
  defaultFrom,
  defaultTo,
  baseName,
}: {
  units: UnitDef[]
  defaultFrom: string
  defaultTo: string
  baseName?: string
}) {
  const [value, setValue] = useState("")
  const [fromKey, setFromKey] = useState(defaultFrom)
  const [toKey, setToKey] = useState(defaultTo)
  const [result, setResult] = useState<number | null>(null)

  const from = units.find((u) => u.key === fromKey) ?? units[0]
  const to = units.find((u) => u.key === toKey) ?? units[1]
  const num = Number(value)
  const valid = value.trim() !== "" && Number.isFinite(num)

  const convert = () => {
    if (!valid) return
    setResult(to.fromBase(from.toBase(num)))
  }

  const swap = () => {
    setFromKey(to.key)
    setToKey(from.key)
    setResult(null)
  }

  const unitSelect = (
    id: string,
    current: string,
    onChange: (k: string) => void
  ) => (
    <Select value={current} onValueChange={(v) => onChange(v as string)}>
      <SelectTrigger id={id} className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {units.map((u) => (
            <SelectItem key={u.key} value={u.key}>
              {u.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>单位换算</CardTitle>
        {baseName ? (
          <CardDescription>内部基准单位：{baseName}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
            <Field>
              <FieldLabel htmlFor="from-value">数值</FieldLabel>
              <Input
                id="from-value"
                type="number"
                placeholder="1"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Field>
            <div className="hidden sm:block" />
            <div />
          </div>
          <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
            <Field>
              <FieldLabel htmlFor="from-unit">从</FieldLabel>
              {unitSelect("from-unit", from.key, setFromKey)}
            </Field>
            <Button
              variant="outline"
              size="icon"
              onClick={swap}
              aria-label="交换单位"
            >
              <ArrowLeftRightIcon />
            </Button>
            <Field>
              <FieldLabel htmlFor="to-unit">到</FieldLabel>
              {unitSelect("to-unit", to.key, setToKey)}
            </Field>
          </div>
        </FieldGroup>

        <div className="flex justify-center">
          <Button disabled={!valid} onClick={convert}>
            换算
          </Button>
        </div>

        {result !== null ? (
          <div className="rounded-lg border bg-muted/50 p-4 text-center">
            <p className="text-sm text-muted-foreground">
              {num} {from.name} =
            </p>
            <p className="font-mono text-2xl font-semibold tabular-nums">
              {Number(result.toPrecision(10))}{" "}
              <span className="text-base font-normal">{to.name}</span>
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
