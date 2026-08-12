import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { ToolSearch } from "@/components/tool-search"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { categories, getToolsByCategory, tools } from "@/lib/tools"

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="border-b bg-gradient-to-b from-muted/60 to-background">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center sm:py-20">
          <h1 className="text-4xl font-bold tracking-tight">InfinityBox</h1>
          <p className="text-muted-foreground">
            无限工具，一盒搞定。{tools.length} 个免费在线工具。
          </p>
          <ToolSearch />
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10">
        {categories.map((category) => {
          const categoryTools = getToolsByCategory(category.slug)
          return (
            <section
              key={category.slug}
              id={category.slug}
              className="flex scroll-mt-20 flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <category.icon className="size-5 text-muted-foreground" />
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  <span className="text-sm text-muted-foreground">
                    {categoryTools.length} 个工具
                  </span>
                </div>
                <span className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
                  {category.description}
                  <ArrowRightIcon className="size-3.5" />
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categoryTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/${tool.category}/${tool.slug}`}
                    className="group"
                  >
                    <Card className="h-full transition-colors group-hover:border-foreground/20">
                      <CardHeader>
                        <CardTitle>{tool.name}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
