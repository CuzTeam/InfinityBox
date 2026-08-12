"use client"

import { useState } from "react"
import { PlayIcon, SquareIcon } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const MORSE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.",
  H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.",
  O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-",
  V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "!": "-.-.--", "'": ".----.",
  '"': ".-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
  ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
  "/": "-..-.", "@": ".--.-.",
}

const REVERSE = Object.fromEntries(
  Object.entries(MORSE).map(([char, code]) => [code, char])
)

function encode(text: string) {
  return text
    .toUpperCase()
    .split("")
    .map((char) => (char === " " ? "/" : (MORSE[char] ?? "")))
    .filter(Boolean)
    .join(" ")
}

function decode(code: string) {
  return code
    .split("/")
    .map((word) =>
      word
        .trim()
        .split(/\s+/)
        .map((c) => REVERSE[c] ?? "")
        .join("")
    )
    .join(" ")
}

export function MorseCodeTranslator() {
  const [encodeInput, setEncodeInput] = useState("")
  const [decodeInput, setDecodeInput] = useState("")
  const [encoded, setEncoded] = useState("")
  const [decoded, setDecoded] = useState("")
  const [playing, setPlaying] = useState(false)

  const play = async (code: string) => {
    if (!code || playing) return
    setPlaying(true)
    const ctx = new AudioContext()
    const unit = 0.07
    let time = ctx.currentTime + 0.05
    for (const symbol of code) {
      if (symbol === ".") {
        beep(ctx, time, unit)
        time += unit * 2
      } else if (symbol === "-") {
        beep(ctx, time, unit * 3)
        time += unit * 4
      } else if (symbol === " ") {
        time += unit * 2
      } else if (symbol === "/") {
        time += unit * 6
      }
    }
    const wait = (time - ctx.currentTime) * 1000
    setTimeout(() => {
      void ctx.close()
      setPlaying(false)
    }, Math.max(wait, 0))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>摩斯密码</CardTitle>
        <CardDescription>
          支持字母、数字和常见标点；空格转为 / 分词
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="encode">
          <TabsList>
            <TabsTrigger value="encode">文本 → 摩斯码</TabsTrigger>
            <TabsTrigger value="decode">摩斯码 → 文本</TabsTrigger>
          </TabsList>
          <TabsContent value="encode" className="flex flex-col gap-3">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="morse-e-in">输入文本</FieldLabel>
                <Textarea
                  id="morse-e-in"
                  rows={3}
                  placeholder="HELLO WORLD"
                  value={encodeInput}
                  onChange={(e) => setEncodeInput(e.target.value)}
                />
              </Field>
            </FieldGroup>
            <div className="flex justify-center">
              <Button
                disabled={!encodeInput}
                onClick={() => setEncoded(encode(encodeInput))}
              >
                转换
              </Button>
            </div>
            {encoded ? (
              <div className="flex items-start justify-between gap-2 rounded-lg border bg-muted/50 p-4">
                <p className="min-w-0 flex-1 font-mono text-lg break-all">
                  {encoded}
                </p>
                <div className="flex shrink-0 gap-1">
                  <CopyButton text={encoded} />
                  <Button
                    variant="ghost"
                    size="xs"
                    disabled={playing}
                    onClick={() => play(encoded)}
                  >
                    {playing ? (
                      <SquareIcon data-icon="inline-start" />
                    ) : (
                      <PlayIcon data-icon="inline-start" />
                    )}
                    {playing ? "播放中" : "播放"}
                  </Button>
                </div>
              </div>
            ) : null}
          </TabsContent>
          <TabsContent value="decode" className="flex flex-col gap-3">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="morse-d-in">
                  输入摩斯码（. 和 -，空格分隔字母，/ 分隔单词）
                </FieldLabel>
                <Textarea
                  id="morse-d-in"
                  rows={3}
                  className="font-mono"
                  placeholder=".... . .-.. .-.. --- / .-- --- .-. .-.. -.."
                  value={decodeInput}
                  onChange={(e) => setDecodeInput(e.target.value)}
                />
              </Field>
            </FieldGroup>
            <div className="flex justify-center">
              <Button
                disabled={!decodeInput}
                onClick={() => setDecoded(decode(decodeInput))}
              >
                转换
              </Button>
            </div>
            {decoded ? (
              <div className="flex items-start justify-between gap-2 rounded-lg border bg-muted/50 p-4">
                <p className="min-w-0 flex-1 text-lg break-all">{decoded}</p>
                <CopyButton text={decoded} />
              </div>
            ) : null}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function beep(ctx: AudioContext, start: number, duration: number) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.frequency.value = 700
  osc.connect(gain)
  gain.connect(ctx.destination)
  gain.gain.setValueAtTime(0.2, start)
  gain.gain.setValueAtTime(0, start + duration)
  osc.start(start)
  osc.stop(start + duration)
}
