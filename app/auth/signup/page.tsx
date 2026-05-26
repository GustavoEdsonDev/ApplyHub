import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { LoginForm } from '@/components/login-form'

export default async function LoginPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <main className="w-full max-w-sm rounded-xl border bg-card p-6 text-card-foreground">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Use seu email e senha para acessar.
          </p>
        </header>

        <LoginForm />
      </main>
    </div>
  )
}
