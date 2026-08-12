"use client"

import { css, html, js } from "js-beautify"
import { useState } from "react"
import { toast } from "sonner"

import { CopyButton } from "@/components/copy-button"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

type Lang = "html" | "css" | "js"

function beautify(lang: Lang, code: string): string {
  const options = { indent_size: 2, max_preserve_newlines: 2 }
  if (lang === "html") return html(code, options)
  if (lang === "css") return css(code, options)
  return js(code, options)
}

function minify(lang: Lang, code: string): string {
  if (lang === "js") {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/(^|[^:])\/\/.*$/gm, "$1")
      .replace(/\n\s*/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim()
  }
  if (lang === "css") {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s*([{}:;,>])\s*/g, "$1")
      .replace(/;}/g, "}")
      .trim()
  }
  return code
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .trim()
}

export function CodeFormatter({ lang }: { lang: Lang }) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const run = (mode: "beautify" | "minify") => {
    if (!input.trim()) return
    try {
      setOutput(mode === "beautify" ? beautify(lang, input) : minify(lang, input))
    } catch {
      toast.error("处理失败，请检查代码是否有语法错误")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lang.toUpperCase()} 格式化 / 压缩</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="code-input">输入代码</FieldLabel>
            <Textarea
              id="code-input"
              rows={8}
              className="font-mono text-xs"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <div className="flex gap-2">
          <Button onClick={() => run("beautify")} disabled={!input.trim()}>
            格式化
          </Button>
          <Button
            variant="outline"
            onClick={() => run("minify")}
            disabled={!input.trim()}
          >
            压缩
          </Button>
        </div>
        <FieldGroup>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="code-output">输出</FieldLabel>
              <CopyButton text={output} disabled={!output} />
            </div>
            <Textarea
              id="code-output"
              rows={8}
              readOnly
              className="font-mono text-xs"
              value={output}
            />
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
