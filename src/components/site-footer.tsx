function TablerIcon({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function MailIcon({ className }: { className?: string }) {
  return (
    <TablerIcon className={className}>
      <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
      <path d="M3 7l9 6l9 -6" />
    </TablerIcon>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <TablerIcon className={className}>
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </TablerIcon>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <TablerIcon className={className}>
      <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
    </TablerIcon>
  )
}

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
