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

const PI =
  "3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999998372978049951059731732816096318595024459455346908302642522308253344685035261931188171010003137838752886587533208381420617177669147303598253490428755468731159562863882353787593751957781857780532171226806613001927876611195909216420199"

export function PiQuery() {
  const [digits, setDigits] = useState("100")
  const [search, setSearch] = useState("")
  const [result, setResult] = useState<{
    piText: string
    searchText: string
    searchPos: number
  } | null>(null)

  const query = () => {
    const n = Math.min(Math.max(1, Number(digits) || 100), PI.length - 2)
    const cleaned = search.replace(/\D/g, "")
    setResult({
      piText: PI.slice(0, n + 2),
      searchText: cleaned,
      searchPos: cleaned ? PI.slice(2).indexOf(cleaned) : -1,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>圆周率查询</CardTitle>
        <CardDescription>
          内置 π 小数点后 {PI.length - 2} 位，可查询任意数字串的位置
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="pi-digits">显示位数</FieldLabel>
              <Input
                id="pi-digits"
                type="number"
                min={1}
                max={PI.length - 2}
                value={digits}
                onChange={(e) => setDigits(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="pi-search">查找数字串</FieldLabel>
              <Input
                id="pi-search"
                className="font-mono"
                placeholder="如 14159"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Field>
          </div>
        </FieldGroup>

        <div className="flex justify-center">
          <Button onClick={query}>查询</Button>
        </div>

        {result ? (
          <>
            {result.searchText ? (
              <p className="text-sm">
                {result.searchPos >= 0 ? (
                  <>
                    「{result.searchText}」首次出现在小数点后第{" "}
                    <span className="font-mono font-semibold">
                      {result.searchPos + 1}
                    </span>{" "}
                    位
                  </>
                ) : (
                  <span className="text-muted-foreground">未找到该数字串</span>
                )}
              </p>
            ) : null}

            <div className="relative">
              <div className="absolute top-2 right-2">
                <CopyButton text={result.piText} />
              </div>
              <p className="max-h-48 overflow-y-auto rounded-lg border bg-muted/50 p-4 font-mono text-sm leading-6 break-all">
                {result.piText}
              </p>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
