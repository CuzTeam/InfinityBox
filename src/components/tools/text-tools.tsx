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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export function WordCounter() {
  const [text, setText] = useState("")
  const [stats, setStats] = useState<{ label: string; value: number }[] | null>(
    null
  )

  const run = () => {
    if (!text) return
    const chars = text.length
    const noWhitespace = text.replace(/\s/g, "").length
    const latinWords = (text.match(/[a-zA-Z0-9_'-]+/g) ?? []).length
    const cjkChars = (
      text.match(/[一-鿿㐀-䶿豈-﫿]/g) ?? []
    ).length
    const lines = text.split("\n").length
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length
    setStats([
      { label: "字符数", value: chars },
      { label: "字符数（不含空白）", value: noWhitespace },
      { label: "英文单词数", value: latinWords },
      { label: "中文汉字数", value: cjkChars },
      { label: "行数", value: lines },
      { label: "段落数", value: paragraphs },
    ])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>字数统计</CardTitle>
        <CardDescription>统计字符、单词、汉字、行数与段落数</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="wc-input">输入文本</FieldLabel>
            <Textarea
              id="wc-input"
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <div className="flex justify-center">
          <Button disabled={!text} onClick={run}>
            统计
          </Button>
        </div>
        {stats ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border bg-muted/50 p-3 text-center"
              >
                <p className="font-mono text-xl font-semibold tabular-nums">
                  {s.value.toLocaleString("zh-CN")}
                </p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

export function TextDedup() {
  const [input, setInput] = useState("")
  const [sort, setSort] = useState("none")
  const [trimEmpty, setTrimEmpty] = useState(true)
  const [result, setResult] = useState<{ text: string; removed: number } | null>(
    null
  )

  const run = () => {
    if (!input) return
    let lines = input.split("\n")
    if (trimEmpty) lines = lines.filter((l) => l.trim())
    const before = lines.length
    const seen = new Set<string>()
    lines = lines.filter((l) => {
      if (seen.has(l)) return false
      seen.add(l)
      return true
    })
    if (sort === "asc") lines = [...lines].sort((a, b) => a.localeCompare(b))
    if (sort === "desc") lines = [...lines].sort((a, b) => b.localeCompare(a))
    setResult({ text: lines.join("\n"), removed: before - lines.length })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>文本去重与排序</CardTitle>
        <CardDescription>按行去重，可选排序与去除空行</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="td-input">输入文本（每行一条）</FieldLabel>
            <Textarea
              id="td-input"
              rows={6}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Field>
          <div className="flex flex-wrap items-center gap-6">
            <Field className="w-40">
              <FieldLabel htmlFor="td-sort">排序方式</FieldLabel>
              <Select value={sort} onValueChange={(v) => setSort(v as string)}>
                <SelectTrigger id="td-sort" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="none">保持原顺序</SelectItem>
                    <SelectItem value="asc">升序 (A→Z)</SelectItem>
                    <SelectItem value="desc">降序 (Z→A)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field orientation="horizontal">
              <Switch
                id="td-trim"
                checked={trimEmpty}
                onCheckedChange={setTrimEmpty}
              />
              <FieldLabel htmlFor="td-trim">去除空行</FieldLabel>
            </Field>
          </div>
        </FieldGroup>
        <div className="flex justify-center">
          <Button disabled={!input} onClick={run}>
            处理
          </Button>
        </div>
        {result ? (
          <FieldGroup>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="td-output">
                  结果（去除 {result.removed} 条重复）
                </FieldLabel>
                <CopyButton text={result.text} />
              </div>
              <Textarea id="td-output" rows={6} readOnly value={result.text} />
            </Field>
          </FieldGroup>
        ) : null}
      </CardContent>
    </Card>
  )
}

export function LineNumbers() {
  const [input, setInput] = useState("")
  const [start, setStart] = useState("1")
  const [separator, setSeparator] = useState(". ")
  const [output, setOutput] = useState("")

  const run = () => {
    if (!input) return
    const startNum = Math.max(0, Number(start) || 1)
    setOutput(
      input
        .split("\n")
        .map((line, i) => `${startNum + i}${separator}${line}`)
        .join("\n")
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>行号添加器</CardTitle>
        <CardDescription>为每行文本添加递增行号</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="ln-input">输入文本</FieldLabel>
            <Textarea
              id="ln-input"
              rows={6}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="ln-start">起始行号</FieldLabel>
              <Input
                id="ln-start"
                type="number"
                min={0}
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="ln-sep">分隔符</FieldLabel>
              <Input
                id="ln-sep"
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
              />
            </Field>
          </div>
        </FieldGroup>
        <div className="flex justify-center">
          <Button disabled={!input} onClick={run}>
            添加行号
          </Button>
        </div>
        {output ? (
          <FieldGroup>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="ln-output">结果</FieldLabel>
                <CopyButton text={output} />
              </div>
              <Textarea
                id="ln-output"
                rows={6}
                readOnly
                className="font-mono"
                value={output}
              />
            </Field>
          </FieldGroup>
        ) : null}
      </CardContent>
    </Card>
  )
}

const LOREM_WORDS =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(
    " "
  )

function loremParagraph(wordCount: number) {
  const words: string[] = []
  for (let i = 0; i < wordCount; i++) {
    words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)])
  }
  const text = words.join(" ")
  return text.charAt(0).toUpperCase() + text.slice(1) + "."
}

export function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState("3")
  const [wordsPer, setWordsPer] = useState("50")
  const [output, setOutput] = useState("")

  const run = () => {
    const p = Math.min(Math.max(1, Number(paragraphs) || 3), 50)
    const w = Math.min(Math.max(10, Number(wordsPer) || 50), 200)
    setOutput(
      Array.from({ length: p }, () => loremParagraph(w)).join("\n\n")
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lorem Ipsum 生成器</CardTitle>
        <CardDescription>生成排版占位用的假文</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="li-p">段落数</FieldLabel>
              <Input
                id="li-p"
                type="number"
                min={1}
                max={50}
                value={paragraphs}
                onChange={(e) => setParagraphs(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="li-w">每段单词数</FieldLabel>
              <Input
                id="li-w"
                type="number"
                min={10}
                max={200}
                value={wordsPer}
                onChange={(e) => setWordsPer(e.target.value)}
              />
            </Field>
          </div>
        </FieldGroup>
        <div className="flex justify-center">
          <Button onClick={run}>生成</Button>
        </div>
        {output ? (
          <FieldGroup>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="li-output">结果</FieldLabel>
                <CopyButton text={output} />
              </div>
              <Textarea id="li-output" rows={8} readOnly value={output} />
            </Field>
          </FieldGroup>
        ) : null}
      </CardContent>
    </Card>
  )
}
