"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { tools } from "@/lib/tools"

export function ToolSearch() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full max-w-xl items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm text-muted-foreground shadow-xs transition-colors hover:bg-muted/50"
      >
        <SearchIcon className="size-4" />
        搜索工具，如：BMI、时间戳、密码…
      </button>
      {open ? <SearchDialog onClose={() => setOpen(false)} /> : null}
    </>
  )
}

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

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

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/60 px-4 pt-[20vh] text-left backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b p-3">
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              ref={inputRef}
              placeholder="搜索工具，如：BMI、时间戳、密码…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>
        </div>

        {query.trim() ? (
          results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              没有匹配的工具
            </p>
          ) : (
            <ul className="max-h-72 overflow-y-auto p-1">
              {results.map((tool) => (
                <li key={`${tool.category}/${tool.slug}`}>
                  <Link
                    href={`/${tool.category}/${tool.slug}`}
                    className="flex flex-col rounded-md px-3 py-2 transition-colors hover:bg-muted"
                    onClick={onClose}
                  >
                    <span className="text-sm font-medium">{tool.name}</span>
                    <span className="line-clamp-1 text-xs text-muted-foreground">
                      {tool.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )
        ) : (
          <p className="px-4 py-6 text-center text-sm text-muted-foreground">
            输入关键词开始搜索，Esc 关闭
          </p>
        )}
      </div>
    </div>,
    document.body
  )
}
