"use client"

import { useState } from "react"
import { toast } from "sonner"

import { CopyButton } from "@/components/copy-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export type SymbolGroup = {
  name: string
  items: string[]
}

export function SymbolPicker({ groups }: { groups: SymbolGroup[] }) {
  const [picked, setPicked] = useState("")
  const [tab, setTab] = useState(groups[0].name)

  const pick = async (symbol: string) => {
    setPicked((prev) => prev + symbol)
    await navigator.clipboard.writeText(symbol)
    toast.success(`已复制 ${symbol}`)
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>已选内容</CardTitle>
              <CardDescription>点击符号即复制，并追加到这里</CardDescription>
            </div>
            <CopyButton text={picked} disabled={!picked} />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Textarea
            rows={3}
            value={picked}
            onChange={(e) => setPicked(e.target.value)}
          />
        </CardContent>
      </Card>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex-wrap">
          {groups.map((g) => (
            <TabsTrigger key={g.name} value={g.name}>
              {g.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {groups.map((g) => (
          <TabsContent key={g.name} value={g.name}>
            <Card>
              <CardContent className="flex flex-wrap gap-1 pt-6">
                {g.items.map((symbol, i) => (
                  <button
                    key={`${symbol}-${i}`}
                    type="button"
                    onClick={() => pick(symbol)}
                    className="flex h-10 min-w-10 items-center justify-center rounded-md px-2 text-xl whitespace-nowrap transition-colors hover:bg-muted"
                  >
                    {symbol}
                  </button>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      <Separator />
    </div>
  )
}
