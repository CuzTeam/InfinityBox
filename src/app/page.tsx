import Link from "next/link"
import { ArrowRightIcon, FolderGit2Icon, ShieldCheckIcon, ZapIcon } from "lucide-react"

import { ToolSearch } from "@/components/tool-search"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { categories, getToolsByCategory, tools } from "@/lib/tools"

const highlights = [
  { icon: ZapIcon, text: "纯浏览器本地运行，毫秒级响应" },
  { icon: ShieldCheckIcon, text: "数据不上传，隐私安全" },
  { icon: FolderGit2Icon, text: "完全开源，欢迎贡献" },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="border-b bg-gradient-to-b from-muted/60 to-background">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center sm:py-24">
          <Badge variant="secondary">开源在线工具箱</Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            InfinityBox
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            无限工具，一盒搞定。{tools.length} 个免费在线工具，覆盖{" "}
            {categories.length} 大分类，全部在你的浏览器本地运行。
          </p>
          <ToolSearch />
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {highlights.map((item) => (
              <span key={item.text} className="flex items-center gap-1.5">
                <item.icon className="size-4" />
                {item.text}
              </span>
            ))}
          </div>
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
