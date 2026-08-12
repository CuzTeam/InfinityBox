"use client"

import JsBarcode from "jsbarcode"
import { useRef, useState } from "react"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formats = [
  { value: "CODE128", label: "CODE128（任意字符）" },
  { value: "EAN13", label: "EAN-13（13 位数字）" },
  { value: "EAN8", label: "EAN-8（8 位数字）" },
  { value: "UPC", label: "UPC-A（12 位数字）" },
  { value: "CODE39", label: "CODE39（字母数字）" },
]

export function BarCodeGenerator() {
  const [text, setText] = useState("")
  const [format, setFormat] = useState("CODE128")
  const [error, setError] = useState(false)
  const [generated, setGenerated] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  const generate = () => {
    if (!text || !svgRef.current) return
    try {
      JsBarcode(svgRef.current, text, {
        format,
        displayValue: true,
        margin: 12,
      })
      setError(false)
      setGenerated(true)
    } catch {
      setError(true)
      setGenerated(false)
    }
  }

  const download = () => {
    const svg = svgRef.current
    if (!svg) return
    const blob = new Blob([new XMLSerializer().serializeToString(svg)], {
      type: "image/svg+xml",
    })
    const link = document.createElement("a")
    link.download = "barcode.svg"
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>条形码生成</CardTitle>
        <CardDescription>
          不同格式对内容有严格要求，选 CODE128 最通用
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="bar-text">内容</FieldLabel>
              <Input
                id="bar-text"
                className="font-mono"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="bar-format">格式</FieldLabel>
              <Select value={format} onValueChange={(v) => setFormat(v as string)}>
                <SelectTrigger id="bar-format" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {formats.map((f) => (
                      <SelectItem key={f.value} value={f.value}>
                        {f.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </FieldGroup>

        <div className="flex justify-center">
          <Button disabled={!text} onClick={generate}>
            生成
          </Button>
        </div>

        <div
          className={`flex-col items-center gap-3 rounded-lg border bg-white p-6 ${
            generated || error ? "flex" : "hidden"
          }`}
        >
          {error ? (
            <p className="text-sm text-destructive">
              内容不符合 {format} 格式要求
            </p>
          ) : null}
          <svg ref={svgRef} className={generated && !error ? "" : "hidden"} />
          {generated && !error ? (
            <Button variant="outline" onClick={download}>
              <DownloadIcon data-icon="inline-start" />
              下载 SVG
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
