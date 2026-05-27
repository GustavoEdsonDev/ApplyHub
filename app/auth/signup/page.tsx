import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Separator } from '@/components/ui/separator'
import { SignupForm } from '@/components/signup-form'
import { createClient } from '@/lib/supabase/server'

export default async function SignupPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <main className="w-full max-w-sm rounded-xl border bg-card p-6 text-card-foreground">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Criar conta</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Crie sua conta usando email e senha.
          </p>
        </header>
        <SignupForm />
        <div className="py-5">
          <Separator />
        </div>
        <p className="text-sm text-muted-foreground">
          Já tem conta?
          <Link href="/auth/login" className="text-foreground underline underline-offset-4">
            Entrar
          </Link>
        </p>
      </main>
    </div>
  )
}
