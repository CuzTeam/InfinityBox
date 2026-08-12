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

const bases = [
  { key: "bin", label: "二进制", radix: 2 },
  { key: "oct", label: "八进制", radix: 8 },
  { key: "dec", label: "十进制", radix: 10 },
  { key: "hex", label: "十六进制", radix: 16 },
]

export function BaseConverter() {
  const [source, setSource] = useState({ key: "dec", value: "" })
  const [values, setValues] = useState<Record<string, string> | null>(null)

  const convert = () => {
    const b = bases.find((x) => x.key === source.key)!
    const cleaned = source.value.trim()
    if (!cleaned) return
    const num = parseInt(cleaned, b.radix)
    if (Number.isNaN(num)) return
    const next: Record<string, string> = {}
    for (const x of bases) next[x.key] = num.toString(x.radix)
    setValues(next)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>进制转换</CardTitle>
        <CardDescription>在任意一栏输入整数，点击转换后其余栏显示结果</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {bases.map((b) => (
              <Field key={b.key}>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor={b.key}>{b.label}</FieldLabel>
                  {values ? (
                    <CopyButton text={values[b.key]} disabled={!values[b.key]} />
                  ) : null}
                </div>
                <Input
                  id={b.key}
                  className="font-mono"
                  placeholder={b.radix === 16 ? "ff" : b.radix === 10 ? "255" : "1".repeat(4)}
                  value={source.key === b.key ? source.value : (values?.[b.key] ?? "")}
                  onChange={(e) => setSource({ key: b.key, value: e.target.value })}
                />
              </Field>
            ))}
          </div>
        </FieldGroup>
        <div className="flex justify-center">
          <Button disabled={!source.value.trim()} onClick={convert}>
            转换
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
