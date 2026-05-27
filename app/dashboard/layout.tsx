import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardHeader } from '@/components/dashboard-header'
import { MobileNav } from '@/components/mobile-nav'

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
  
  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/jobs', label: 'Minhas Vagas' },
    { href: '/dashboard/favorites', label: 'Favoritas' },
    { href: '/dashboard/settings', label: 'Configurações' },
  ]

  return (
    <div className="flex flex-col min-h-screen md:flex-row bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:border-r md:flex-col bg-card">
        <div className="flex flex-col gap-8 p-6">
          {/* Logo */}
          <div className="font-bold text-xl">ApplyHub</div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header with Nav */}
        <div className="flex items-center justify-between md:hidden py-3 px-4 border-b bg-card">
          <div className="font-bold text-lg">ApplyHub</div>
          <MobileNav />
        </div>
        
        <DashboardHeader />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
