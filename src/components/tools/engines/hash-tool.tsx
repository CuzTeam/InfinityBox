"use client"

import CryptoJS from "crypto-js"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

type Algo = { key: string; label: string }

export function HashTool({ algorithms }: { algorithms: Algo[] }) {
  const [input, setInput] = useState("")
  const [tab, setTab] = useState(algorithms[0].key)
  const [result, setResult] = useState("")

  const hash = (key: string) => {
    if (!input) return ""
    const wordArray = CryptoJS.enc.Utf8.parse(input)
    switch (key) {
      case "md5":
        return CryptoJS.MD5(wordArray).toString()
      case "sha1":
        return CryptoJS.SHA1(wordArray).toString()
      case "sha224":
        return CryptoJS.SHA224(wordArray).toString()
      case "sha256":
        return CryptoJS.SHA256(wordArray).toString()
      case "sha384":
        return CryptoJS.SHA384(wordArray).toString()
      case "sha512":
        return CryptoJS.SHA512(wordArray).toString()
      case "sha3":
        return CryptoJS.SHA3(wordArray).toString()
      case "ripemd160":
        return CryptoJS.RIPEMD160(wordArray).toString()
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>哈希计算</CardTitle>
        <CardDescription>输出为十六进制小写</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="hash-input">输入文本</FieldLabel>
            <Textarea
              id="hash-input"
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <div className="flex justify-center">
          <Button disabled={!input} onClick={() => setResult(hash(tab))}>
            计算
          </Button>
        </div>
        <Tabs
          value={tab}
          onValueChange={(v) => {
            setTab(v)
            setResult("")
          }}
        >
          <TabsList>
            {algorithms.map((a) => (
              <TabsTrigger key={a.key} value={a.key}>
                {a.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {algorithms.map((a) => (
            <TabsContent key={a.key} value={a.key}>
              {result ? (
                <div className="flex items-start justify-between gap-2 rounded-lg border bg-muted/50 p-4">
                  <p className="min-w-0 flex-1 font-mono text-sm break-all">
                    {result}
                  </p>
                  <CopyButton text={result} />
                </div>
              ) : null}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

export function HmacTool({ algorithms }: { algorithms: Algo[] }) {
  const [input, setInput] = useState("")
  const [key, setKey] = useState("")
  const [tab, setTab] = useState(algorithms[0].key)
  const [result, setResult] = useState("")

  const hash = (algoKey: string) => {
    if (!input || !key) return ""
    const message = CryptoJS.enc.Utf8.parse(input)
    const secret = CryptoJS.enc.Utf8.parse(key)
    switch (algoKey) {
      case "md5":
        return CryptoJS.HmacMD5(message, secret).toString()
      case "sha1":
        return CryptoJS.HmacSHA1(message, secret).toString()
      case "sha256":
        return CryptoJS.HmacSHA256(message, secret).toString()
      case "sha512":
        return CryptoJS.HmacSHA512(message, secret).toString()
      case "ripemd160":
        return CryptoJS.HmacRIPEMD160(message, secret).toString()
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>HMAC 哈希</CardTitle>
        <CardDescription>基于密钥的消息认证码</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="hmac-key">密钥</FieldLabel>
            <Input
              id="hmac-key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="hmac-input">消息文本</FieldLabel>
            <Textarea
              id="hmac-input"
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <div className="flex justify-center">
          <Button
            disabled={!input || !key}
            onClick={() => setResult(hash(tab))}
          >
            计算
          </Button>
        </div>
        <Tabs
          value={tab}
          onValueChange={(v) => {
            setTab(v)
            setResult("")
          }}
        >
          <TabsList>
            {algorithms.map((a) => (
              <TabsTrigger key={a.key} value={a.key}>
                {a.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {algorithms.map((a) => (
            <TabsContent key={a.key} value={a.key}>
              {result ? (
                <div className="flex items-start justify-between gap-2 rounded-lg border bg-muted/50 p-4">
                  <p className="min-w-0 flex-1 font-mono text-sm break-all">
                    {result}
                  </p>
                  <CopyButton text={result} />
                </div>
              ) : null}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
