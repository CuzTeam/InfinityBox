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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const table: Record<string, Record<string, string[]>> = {
  A: { A: ["A", "O"], B: ["A", "B", "AB", "O"], AB: ["A", "B", "AB"], O: ["A", "O"] },
  B: { A: ["A", "B", "AB", "O"], B: ["B", "O"], AB: ["A", "B", "AB"], O: ["B", "O"] },
  AB: { A: ["A", "B", "AB"], B: ["A", "B", "AB"], AB: ["A", "B", "AB"], O: ["A", "B"] },
  O: { A: ["A", "O"], B: ["B", "O"], AB: ["A", "B"], O: ["O"] },
}

const types = ["A", "B", "AB", "O"]

export function BloodType() {
  const [parent1, setParent1] = useState("A")
  const [parent2, setParent2] = useState("O")
  const [result, setResult] = useState<{
    possible: string[]
    impossible: string[]
  } | null>(null)

  const query = () => {
    const possible = table[parent1][parent2]
    setResult({
      possible,
      impossible: types.filter((t) => !possible.includes(t)),
    })
  }

  const typeSelect = (
    id: string,
    value: string,
    onChange: (v: string) => void
  ) => (
    <Select value={value} onValueChange={(v) => onChange(v as string)}>
      <SelectTrigger id={id} className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {types.map((t) => (
            <SelectItem key={t} value={t}>
              {t} 型
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>血型遗传规律</CardTitle>
        <CardDescription>根据父母血型推算子女可能的血型</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="p1">父亲 / 母亲一方</FieldLabel>
              {typeSelect("p1", parent1, setParent1)}
            </Field>
            <Field>
              <FieldLabel htmlFor="p2">另一方</FieldLabel>
              {typeSelect("p2", parent2, setParent2)}
            </Field>
          </div>
        </FieldGroup>
        <div className="flex justify-center">
          <Button onClick={query}>查询</Button>
        </div>
        {result ? (
          <div className="flex flex-col gap-2 rounded-lg border bg-muted/50 p-4">
            <p className="text-sm">
              子女可能的血型：
              <span className="font-mono text-lg font-semibold">
                {result.possible.join("、")}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              不可能的血型：
              {result.impossible.length > 0 ? result.impossible.join("、") : "无"}
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
