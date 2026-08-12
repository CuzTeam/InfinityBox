"use client"

import CryptoJS from "crypto-js"
import { useState } from "react"
import { toast } from "sonner"

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

type CipherName = "AES" | "DES" | "RC4" | "Rabbit"

export function CipherTool({ cipher }: { cipher: CipherName }) {
  const [key, setKey] = useState("")
  const [plain, setPlain] = useState("")
  const [encrypted, setEncrypted] = useState("")
  const [encryptResult, setEncryptResult] = useState("")
  const [decryptResult, setDecryptResult] = useState("")

  const encrypt = () => {
    if (!plain || !key) return
    setEncryptResult(CryptoJS[cipher].encrypt(plain, key).toString())
  }

  const decrypt = () => {
    if (!encrypted || !key) return
    try {
      const result = CryptoJS[cipher]
        .decrypt(encrypted, key)
        .toString(CryptoJS.enc.Utf8)
      if (!result) {
        toast.error("解密失败：密钥错误或密文损坏")
        return
      }
      setDecryptResult(result)
    } catch {
      toast.error("解密失败：密钥错误或密文损坏")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{cipher} 加密 / 解密</CardTitle>
        <CardDescription>在浏览器本地完成，密钥不会上传</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="cipher-key">密钥</FieldLabel>
            <Input
              id="cipher-key"
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <Tabs defaultValue="encrypt">
          <TabsList>
            <TabsTrigger value="encrypt">加密</TabsTrigger>
            <TabsTrigger value="decrypt">解密</TabsTrigger>
          </TabsList>
          <TabsContent value="encrypt" className="flex flex-col gap-3">
            <Field>
              <FieldLabel htmlFor="plain">明文</FieldLabel>
              <Textarea
                id="plain"
                rows={4}
                value={plain}
                onChange={(e) => setPlain(e.target.value)}
              />
            </Field>
            <div className="flex justify-center">
              <Button disabled={!plain || !key} onClick={encrypt}>
                加密
              </Button>
            </div>
            {encryptResult ? (
              <div className="flex items-start justify-between gap-2 rounded-lg border bg-muted/50 p-4">
                <p className="min-w-0 flex-1 font-mono text-sm break-all">
                  {encryptResult}
                </p>
                <CopyButton text={encryptResult} />
              </div>
            ) : null}
          </TabsContent>
          <TabsContent value="decrypt" className="flex flex-col gap-3">
            <Field>
              <FieldLabel htmlFor="encrypted">密文 (Base64)</FieldLabel>
              <Textarea
                id="encrypted"
                rows={4}
                className="font-mono"
                value={encrypted}
                onChange={(e) => setEncrypted(e.target.value)}
              />
            </Field>
            <div className="flex justify-center">
              <Button disabled={!encrypted || !key} onClick={decrypt}>
                解密
              </Button>
            </div>
            {decryptResult ? (
              <div className="flex items-start justify-between gap-2 rounded-lg border bg-muted/50 p-4">
                <p className="min-w-0 flex-1 text-sm break-all whitespace-pre-wrap">
                  {decryptResult}
                </p>
                <CopyButton text={decryptResult} />
              </div>
            ) : null}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
