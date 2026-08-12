"use client"

import { useState } from "react"
import { DownloadIcon } from "lucide-react"

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

function hashString(text: string) {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function HashAvatar() {
  const [text, setText] = useState("")
  const [avatar, setAvatar] = useState<{ svg: string; text: string } | null>(
    null
  )

  const generate = () => {
    if (!text) return
    const h = hashString(text)
    const hue = h % 360
    const cells: boolean[] = []
    for (let i = 0; i < 15; i++) {
      cells.push(((h >> i) & 1) === 1)
    }
    const full: boolean[] = []
    for (let row = 0; row < 5; row++) {
      const r = cells.slice(row * 3, row * 3 + 3)
      full.push(r[0], r[1], r[2], r[1], r[0])
    }
    const color = `hsl(${hue} 65% 50%)`
    const rects = full
      .map((filled, i) =>
        filled
          ? `<rect x="${(i % 5) * 20}" y="${Math.floor(i / 5) * 20}" width="20" height="20"/>`
          : ""
      )
      .join("")
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#f4f4f5"/><g fill="${color}">${rects}</g></svg>`
    setAvatar({ svg, text })
  }

  const download = () => {
    if (!avatar) return
    const blob = new Blob([avatar.svg], { type: "image/svg+xml" })
    const link = document.createElement("a")
    link.download = `avatar-${avatar.text}.svg`
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>哈希头像生成</CardTitle>
        <CardDescription>
          同一文本永远生成同一头像，适合作为默认头像
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="avatar-text">输入文本（用户名 / 邮箱）</FieldLabel>
            <Input
              id="avatar-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <div className="flex justify-center">
          <Button disabled={!text} onClick={generate}>
            生成
          </Button>
        </div>
        {avatar ? (
          <div className="flex items-center gap-6">
            <div
              className="size-32 overflow-hidden rounded-xl border"
              dangerouslySetInnerHTML={{ __html: avatar.svg }}
            />
            <Button variant="outline" onClick={download}>
              <DownloadIcon data-icon="inline-start" />
              下载 SVG
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
