"use client"

import { useMemo, useState } from "react"
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

export type TableData = {
  columns: string[]
  rows: string[][]
  note?: string
}

export function DataTable({
  data,
  searchable = true,
}: {
  data: TableData
  searchable?: boolean
}) {
  const [query, setQuery] = useState("")

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return data.rows
    return data.rows.filter((row) =>
      row.some((cell) => cell.toLowerCase().includes(q))
    )
  }, [query, data.rows])

  return (
    <Card>
      <CardHeader>
        <CardTitle>数据查询</CardTitle>
        {data.note ? <CardDescription>{data.note}</CardDescription> : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {searchable ? (
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="输入关键词筛选…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>
        ) : null}
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                {data.columns.map((col) => (
                  <th
                    key={col}
                    className="px-3 py-2 text-left font-medium whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2 whitespace-nowrap">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={data.columns.length}
                    className="px-3 py-6 text-center text-muted-foreground"
                  >
                    没有匹配的数据
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground">
          共 {rows.length} 条{query.trim() ? `（筛选自 ${data.rows.length} 条）` : ""}
        </p>
      </CardContent>
    </Card>
  )
}
