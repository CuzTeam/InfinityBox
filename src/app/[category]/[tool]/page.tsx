import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRightIcon } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { ToolRenderer } from "@/components/tools"
import { getCategory, getTool, tools } from "@/lib/tools"

export const dynamicParams = false

export function generateStaticParams() {
  return tools.map((tool) => ({
    category: tool.category,
    tool: tool.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; tool: string }>
}): Promise<Metadata> {
  const { category, tool: toolSlug } = await params
  const tool = getTool(category, toolSlug)
  if (!tool) return {}
  return {
    title: tool.name,
    description: tool.description,
    keywords: tool.keywords,
  }
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ category: string; tool: string }>
}) {
  const { category: categorySlug, tool: toolSlug } = await params
  const category = getCategory(categorySlug)
  const tool = getTool(categorySlug, toolSlug)
  if (!category || !tool) notFound()

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          首页
        </Link>
        <ChevronRightIcon className="size-3.5" />
        <Link href={`/#${category.slug}`} className="hover:text-foreground">
          {category.name}
        </Link>
        <ChevronRightIcon className="size-3.5" />
        <span className="text-foreground">{tool.name}</span>
      </nav>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">{tool.name}</h1>
        <p className="text-muted-foreground">{tool.description}</p>
      </div>

      <ToolRenderer toolKey={`${categorySlug}/${toolSlug}`} />

      {tool.article ? (
        <>
          <Separator />
          <article className="flex flex-col gap-3 text-sm leading-7 text-muted-foreground">
            <h2 className="text-base font-semibold text-foreground">
              {tool.name}说明
            </h2>
            {tool.article.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 16)}>{paragraph}</p>
            ))}
          </article>
        </>
      ) : null}
    </div>
  )
}
