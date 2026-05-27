'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeSwitch } from '@/components/theme-switch'
import { useAuth } from '@/lib/hooks/useAuth'

export function HomeNav() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário'

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/auth/login')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <nav className="flex items-center gap-3">
      <ThemeSwitch />
      
      {isLoading ? (
        <div className="h-10 w-24 bg-muted rounded animate-pulse" />
      ) : user ? (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">{userName}</span>
          <Button onClick={handleLogout} variant="ghost" size="sm" className="gap-2">
            <LogOut size={16} />
            Sair
          </Button>
        </div>
      ) : (
        <>
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Entrar</Link>
          </Button>

          <Button asChild>
            <Link href="/auth/signup">Criar conta</Link>
          </Button>
        </>
      )}
    </nav>
  )
}
