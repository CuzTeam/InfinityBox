"use client"

import { useState } from "react"
import { CopyIcon, RefreshCwIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

const charsets = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>?",
}

function generatePassword(length: number, pools: string[]) {
  const all = pools.join("")
  const values = new Uint32Array(length)
  crypto.getRandomValues(values)
  return Array.from(values, (v) => all[v % all.length]).join("")
}

function strengthOf(password: string, poolSize: number) {
  const entropy = password.length * Math.log2(poolSize)
  if (entropy < 45) return { label: "弱", className: "text-destructive" }
  if (entropy < 70) return { label: "中", className: "text-muted-foreground" }
  return { label: "强", className: "text-foreground" }
}

export function RandomPasswordGenerator() {
  const [length, setLength] = useState([16])
  const [options, setOptions] = useState({
    lower: true,
    upper: true,
    digits: true,
    symbols: false,
  })
  const [password, setPassword] = useState("")

  const pools = Object.entries(options)
    .filter(([, enabled]) => enabled)
    .map(([key]) => charsets[key as keyof typeof charsets])

  const generate = () => {
    if (pools.length === 0) return
    setPassword(generatePassword(length[0], pools))
  }

  const strength = password ? strengthOf(password, pools.join("").length) : null

  const copy = async () => {
    await navigator.clipboard.writeText(password)
    toast.success("已复制到剪贴板")
  }

  const optionLabels: Record<keyof typeof charsets, string> = {
    lower: "小写字母 (a-z)",
    upper: "大写字母 (A-Z)",
    digits: "数字 (0-9)",
    symbols: "符号 (!@#$…)",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>生成规则</CardTitle>
        <CardDescription>
          使用 crypto.getRandomValues 在本地生成，不上传网络
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <FieldGroup>
          <Field>
            <FieldLabel>长度：{length[0]} 位</FieldLabel>
            <Slider
              min={4}
              max={64}
              step={1}
              value={length}
              onValueChange={(value) =>
                setLength(Array.isArray(value) ? [...value] : [value])
              }
            />
          </Field>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {(Object.keys(charsets) as (keyof typeof charsets)[]).map((key) => (
              <Field key={key} orientation="horizontal">
                <Switch
                  id={`opt-${key}`}
                  checked={options[key]}
                  onCheckedChange={(checked) =>
                    setOptions((prev) => ({ ...prev, [key]: checked }))
                  }
                />
                <FieldLabel htmlFor={`opt-${key}`}>
                  {optionLabels[key]}
                </FieldLabel>
              </Field>
            ))}
          </div>
        </FieldGroup>

        <div className="flex justify-center">
          <Button onClick={generate} disabled={pools.length === 0}>
            <RefreshCwIcon data-icon="inline-start" />
            生成密码
          </Button>
        </div>

        {password ? (
          <div className="flex flex-col gap-2 rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="min-w-0 flex-1 truncate font-mono text-lg">
                {password}
              </p>
              {strength ? (
                <span className={`text-sm ${strength.className}`}>
                  强度：{strength.label}
                </span>
              ) : null}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={copy}>
                <CopyIcon data-icon="inline-start" />
                复制
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
