"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronDownIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { categories, getToolsByCategory } from "@/lib/tools"

export function ToolSidebar() {
  const pathname = usePathname()
  const currentCategory = pathname.split("/")[1]
  const [override, setOverride] = useState<{
    slug: string | null
    at: string
  } | null>(null)

  const openSlug =
    override && override.at === pathname ? override.slug : currentCategory

  const toggle = (slug: string) => {
    setOverride({ slug: openSlug === slug ? null : slug, at: pathname })
  }

  return (
    <aside className="sticky top-14 hidden w-60 shrink-0 self-start lg:block">
      <div className="h-[calc(100vh-3.5rem)] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <nav className="flex flex-col gap-1 px-3 py-4">
          {categories.map((category) => {
            const open = openSlug === category.slug
            return (
              <Collapsible
                key={category.slug}
                open={open}
                onOpenChange={() => toggle(category.slug)}
                className="flex flex-col"
              >
                <CollapsibleTrigger
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-2 text-sm font-semibold transition-colors hover:bg-muted",
                    currentCategory === category.slug && "text-foreground"
                  )}
                >
                  <category.icon className="size-4 text-muted-foreground" />
                  <span className="flex-1 text-left">{category.name}</span>
                  <ChevronDownIcon
                    className={cn(
                      "size-4 text-muted-foreground transition-transform duration-200",
                      open && "rotate-180"
                    )}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="flex flex-col gap-0.5 py-1 pl-8">
                    {getToolsByCategory(category.slug).map((tool) => {
                      const href = `/${tool.category}/${tool.slug}`
                      const active = pathname === href
                      return (
                        <li key={tool.slug}>
                          <Link
                            href={href}
                            className={cn(
                              "block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                              active && "bg-muted font-medium text-foreground"
                            )}
                          >
                            {tool.name}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
