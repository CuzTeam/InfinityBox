"use client"

import { useState } from "react"
import { SearchIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

const countries: [string, string][] = [
  ["中国", "cn"], ["中国香港", "hk"], ["中国台湾", "tw"], ["中国澳门", "mo"],
  ["日本", "jp"], ["韩国", "kr"], ["印度", "in"], ["泰国", "th"],
  ["越南", "vn"], ["马来西亚", "my"], ["新加坡", "sg"], ["印度尼西亚", "id"],
  ["菲律宾", "ph"], ["蒙古", "mn"], ["哈萨克斯坦", "kz"], ["沙特阿拉伯", "sa"],
  ["阿联酋", "ae"], ["土耳其", "tr"], ["以色列", "il"], ["伊朗", "ir"],
  ["英国", "gb"], ["法国", "fr"], ["德国", "de"], ["意大利", "it"],
  ["西班牙", "es"], ["葡萄牙", "pt"], ["荷兰", "nl"], ["比利时", "be"],
  ["瑞士", "ch"], ["奥地利", "at"], ["瑞典", "se"], ["挪威", "no"],
  ["丹麦", "dk"], ["芬兰", "fi"], ["波兰", "pl"], ["捷克", "cz"],
  ["希腊", "gr"], ["俄罗斯", "ru"], ["乌克兰", "ua"], ["埃及", "eg"],
  ["南非", "za"], ["尼日利亚", "ng"], ["肯尼亚", "ke"], ["美国", "us"],
  ["加拿大", "ca"], ["墨西哥", "mx"], ["巴西", "br"], ["阿根廷", "ar"],
  ["智利", "cl"], ["秘鲁", "pe"], ["哥伦比亚", "co"], ["澳大利亚", "au"],
  ["新西兰", "nz"],
]

export function FlagGallery() {
  const [query, setQuery] = useState("")

  const q = query.trim().toLowerCase()
  const filtered = q
    ? countries.filter(
        ([name, code]) => name.includes(q) || code.includes(q)
      )
    : countries

  return (
    <Card>
      <CardHeader>
        <CardTitle>世界各国国旗</CardTitle>
        <CardDescription>
          共 {countries.length} 个国家和地区，输入名称或代码筛选
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="输入关键词筛选，如 中国 / cn"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>

        {filtered.length > 0 ? (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filtered.map(([name, code]) => (
              <li
                key={code}
                className="flex flex-col items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/flags/${code}.png`}
                  alt={`${name}国旗`}
                  width={80}
                  height={60}
                  loading="lazy"
                  className="h-15 w-20 rounded-sm border object-cover"
                />
                <div className="text-center">
                  <p className="text-sm font-medium">{name}</p>
                  <p className="font-mono text-xs text-muted-foreground uppercase">
                    {code}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-6 text-center text-sm text-muted-foreground">
            没有匹配的国家或地区
          </p>
        )}
      </CardContent>
    </Card>
  )
}
