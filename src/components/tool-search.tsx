"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { tools } from "@/lib/tools"

export function ToolSearch() {
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q))
    )
  }, [query])

  return (
    <div className="relative w-full max-w-xl">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="搜索工具，如：BMI、时间戳、密码…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </InputGroup>

      {query.trim() ? (
        <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted-foreground">
              没有匹配的工具
            </p>
          ) : (
            <ul className="max-h-72 overflow-y-auto p-1">
              {results.map((tool) => (
                <li key={`${tool.category}/${tool.slug}`}>
                  <Link
                    href={`/${tool.category}/${tool.slug}`}
                    className="flex flex-col rounded-md px-3 py-2 transition-colors hover:bg-muted"
                    onClick={() => setQuery("")}
                  >
                    <span className="text-sm font-medium">{tool.name}</span>
                    <span className="line-clamp-1 text-xs text-muted-foreground">
                      {tool.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  )
}
