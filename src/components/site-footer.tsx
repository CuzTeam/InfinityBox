import { GithubIcon, MailIcon, XIcon } from "@/components/icons"

const socials = [
  {
    label: "Email",
    href: "mailto:hi@mail.cuz-lab.tech",
    icon: MailIcon,
  },
  {
    label: "X",
    href: "https://x.com/Lonely_25565",
    icon: XIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/CuzTeam/InfinityBox",
    icon: GithubIcon,
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 pt-12 pb-6">
        <div>
          <p className="text-3xl font-semibold tracking-tight">InfinityBox</p>
          <p className="mt-1 text-sm text-muted-foreground">构建开源工具箱。</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <s.icon className="size-5" />
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Cuz Technology © 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
