'use client'

import { useAuth } from '@/lib/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { ThemeSwitch } from '@/components/theme-switch'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export function DashboardHeader() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  const userName = (user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário')

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/auth/login')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  if (isLoading) {
    return null
  }

  return (
    <div className="flex items-center justify-between py-3 px-4 md:px-6 border-b bg-card">
      <div className="flex-1">
        <p className="text-xs md:text-sm text-muted-foreground">Bem-vindo,</p>
        <p className="font-semibold text-sm md:text-base truncate">{userName}</p>
      </div>
      
      <div className="flex items-center gap-2 md:gap-3">
        <ThemeSwitch />
        <Button onClick={handleLogout} variant="ghost" size="sm" className="gap-2">
          <LogOut size={16} />
          <span className="hidden sm:inline">Sair</span>
        </Button>
      </div>
    </div>
  )
}
