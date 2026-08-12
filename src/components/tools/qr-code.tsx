"use client"

import { useRef, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { DownloadIcon } from "lucide-react"
import { toast } from "sonner"

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
import { Textarea } from "@/components/ui/textarea"

export function QrCodeGenerator() {
  const [text, setText] = useState("")
  const [size, setSize] = useState("256")
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("M")
  const [generated, setGenerated] = useState<{
    text: string
    size: number
    level: "L" | "M" | "Q" | "H"
  } | null>(null)
  const svgRef = useRef<HTMLDivElement>(null)

  const generate = () => {
    if (!text.trim()) return
    setGenerated({ text, size: Number(size), level })
  }

  const download = () => {
    const svg = svgRef.current?.querySelector("svg")
    if (!svg) return
    const canvas = document.createElement("canvas")
    const sizeNum = generated?.size ?? 256
    canvas.width = sizeNum
    canvas.height = sizeNum
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const img = new Image()
    img.onload = () => {
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, sizeNum, sizeNum)
      ctx.drawImage(img, 0, 0)
      const link = document.createElement("a")
      link.download = "qrcode.png"
      link.href = canvas.toDataURL("image/png")
      link.click()
      toast.success("已下载 PNG")
    }
    img.src = `data:image/svg+xml;base64,${btoa(new XMLSerializer().serializeToString(svg))}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>二维码生成</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="qr-text">内容（文本 / 链接）</FieldLabel>
            <Textarea
              id="qr-text"
              rows={3}
              placeholder="https://…"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="qr-size">尺寸 (px)</FieldLabel>
              <Input
                id="qr-size"
                type="number"
                min={64}
                max={1024}
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="qr-level">容错级别</FieldLabel>
              <Select
                value={level}
                onValueChange={(v) => setLevel(v as typeof level)}
              >
                <SelectTrigger id="qr-level" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="L">L (7%)</SelectItem>
                    <SelectItem value="M">M (15%)</SelectItem>
                    <SelectItem value="Q">Q (25%)</SelectItem>
                    <SelectItem value="H">H (30%)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </FieldGroup>

        <div className="flex justify-center">
          <Button disabled={!text.trim()} onClick={generate}>
            生成
          </Button>
        </div>

        {generated ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border bg-white p-6">
            <div ref={svgRef}>
              <QRCodeSVG
                value={generated.text}
                size={generated.size}
                level={generated.level}
              />
            </div>
            <Button variant="outline" onClick={download}>
              <DownloadIcon data-icon="inline-start" />
              下载 PNG
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
