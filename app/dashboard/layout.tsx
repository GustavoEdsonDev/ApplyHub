import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card">
        <div className="flex flex-col gap-8 p-6">
          {/* Logo */}
          <div className="font-bold text-xl">ApplyHub</div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            <a
              href="/dashboard"
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Dashboard
            </a>
            <a
              href="/dashboard/jobs"
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Minhas Vagas
            </a>
            <a
              href="/dashboard/favorites"
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Favoritas
            </a>
            <a
              href="/dashboard/settings"
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Configurações
            </a>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
