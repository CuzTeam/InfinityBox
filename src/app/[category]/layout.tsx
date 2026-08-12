import { ToolSidebar } from "@/components/tool-sidebar"

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto flex w-full max-w-7xl">
      <ToolSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
