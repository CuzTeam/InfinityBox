"use client"

import { useState } from "react"

import { CopyButton } from "@/components/copy-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export function ImageToBase64() {
  const [result, setResult] = useState("")
  const [info, setInfo] = useState<{ name: string; size: number; preview: string } | null>(null)

  const handleFile = (file: File | undefined) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      setResult(dataUrl)
      setInfo({ name: file.name, size: file.size, preview: dataUrl })
    }
    reader.readAsDataURL(file)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>图片转 Base64</CardTitle>
        <CardDescription>
          选择本地图片，输出 Data URL，图片不会上传
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="image-file">选择图片</FieldLabel>
            <input
              id="image-file"
              type="file"
              accept="image/*"
              className="flex h-9 w-full cursor-pointer items-center rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1 file:text-sm file:text-primary-foreground"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </Field>
        </FieldGroup>
        {info ? (
          <div className="flex items-center gap-4 rounded-lg border p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={info.preview}
              alt={info.name}
              className="size-16 rounded-md object-contain"
            />
            <div className="min-w-0 text-sm">
              <p className="truncate font-medium">{info.name}</p>
              <p className="text-muted-foreground">
                原始 {(info.size / 1024).toFixed(1)} KB · Base64{" "}
                {(result.length / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        ) : null}
        <FieldGroup>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="b64-output">Base64 输出</FieldLabel>
              <CopyButton text={result} disabled={!result} />
            </div>
            <Textarea
              id="b64-output"
              rows={6}
              readOnly
              className="font-mono text-xs"
              value={result}
            />
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
