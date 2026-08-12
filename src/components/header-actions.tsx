"use client"

import { useState } from "react"
import { SearchIcon } from "lucide-react"

import { GithubIcon } from "@/components/icons"
import { SearchDialog } from "@/components/tool-search"
import { Button } from "@/components/ui/button"

export function HeaderActions() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="搜索工具"
        onClick={() => setSearchOpen(true)}
      >
        <SearchIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="GitHub"
        render={
          <a
            href="https://github.com/CuzTeam/InfinityBox"
            target="_blank"
            rel="noopener noreferrer"
          />
        }
      >
        <GithubIcon />
      </Button>
      {searchOpen ? <SearchDialog onClose={() => setSearchOpen(false)} /> : null}
    </>
  )
}
