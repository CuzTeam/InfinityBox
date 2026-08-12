"use client"

import { diffLines } from "diff"
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
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export function CompareText() {
  const [left, setLeft] = useState("")
  const [right, setRight] = useState("")
  const [parts, setParts] = useState<ReturnType<typeof diffLines> | null>(null)

  const compare = () => {
    if (!left && !right) return
    setParts(diffLines(left, right))
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>文本对比</CardTitle>
          <CardDescription>
            <span className="mr-3 text-green-600 dark:text-green-400">绿色 = 新增</span>
            <span className="text-red-600 dark:text-red-400">红色 = 删除</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="cmp-left">原文本</FieldLabel>
                <Textarea
                  id="cmp-left"
                  rows={8}
                  className="font-mono text-xs"
                  value={left}
                  onChange={(e) => setLeft(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="cmp-right">对比文本</FieldLabel>
                <Textarea
                  id="cmp-right"
                  rows={8}
                  className="font-mono text-xs"
                  value={right}
                  onChange={(e) => setRight(e.target.value)}
                />
              </Field>
            </div>
          </FieldGroup>
          <div className="mt-4 flex justify-center">
            <Button disabled={!left && !right} onClick={compare}>
              对比
            </Button>
          </div>
        </CardContent>
      </Card>

      {parts ? (
        <Card>
          <CardContent className="pt-6">
            <pre className="overflow-x-auto rounded-lg border font-mono text-xs leading-5">
              {parts.map((part, i) => (
                <div
                  key={i}
                  className={cn(
                    "px-3 whitespace-pre-wrap",
                    part.added && "bg-green-500/15 text-green-700 dark:text-green-400",
                    part.removed && "bg-red-500/15 text-red-700 line-through dark:text-red-400"
                  )}
                >
                  {part.value.replace(/\n$/, "")}
                </div>
              ))}
            </pre>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
