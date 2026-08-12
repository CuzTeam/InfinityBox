import { BoxesIcon } from "lucide-react"
import Link from "next/link"

import { HeaderActions } from "@/components/header-actions"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { categories, getToolsByCategory } from "@/lib/tools"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BoxesIcon className="size-5" />
          InfinityBox
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {categories.map((category) => (
              <NavigationMenuItem key={category.slug}>
                <NavigationMenuTrigger>
                  {category.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-xl grid-cols-3 gap-0.5 p-1">
                    {getToolsByCategory(category.slug).map((tool) => (
                      <li key={tool.slug}>
                        <NavigationMenuLink
                          render={
                            <Link href={`/${tool.category}/${tool.slug}`} />
                          }
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{tool.name}</span>
                            <span className="line-clamp-1 text-xs text-muted-foreground">
                              {tool.description}
                            </span>
                          </div>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-1">
          <HeaderActions />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
