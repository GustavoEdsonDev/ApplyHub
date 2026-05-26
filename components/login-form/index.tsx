'use client'

import { useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

function isValidEmail(value: string) {
  // minimal check; Supabase will do the real validation server-side
  return value.includes('@') && value.includes('.')
}

export function LoginForm() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const emailError = useMemo(() => {
    if (!email) return null
    if (!isValidEmail(email)) return 'Informe um email válido.'
    return null
  }, [email])

  const passwordError = useMemo(() => {
    if (!password) return null
    if (password.length < 6) return 'A senha deve ter pelo menos 6 caracteres.'
    return null
  }, [password])

  const canSubmit = !!email && !!password && !emailError && !passwordError && !isPending

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError('Preencha email e senha.')
      return
    }

    if (emailError || passwordError) {
      setError('Revise os campos antes de continuar.')
      return
    }

    startTransition(async () => {
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        return
      }

      router.replace('/')
      router.refresh()
    })
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-5">
      <FieldSet disabled={isPending}>
        <FieldGroup>
          <Field data-invalid={!!emailError}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <FieldContent>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  'h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  emailError ? 'border-destructive' : 'border-input'
                )}
                placeholder="voce@exemplo.com"
                aria-invalid={!!emailError}
              />
              <FieldError>{emailError}</FieldError>
            </FieldContent>
          </Field>

          <Field data-invalid={!!passwordError}>
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <FieldContent>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(
                  'h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  passwordError ? 'border-destructive' : 'border-input'
                )}
                placeholder="••••••••"
                aria-invalid={!!passwordError}
              />
              <FieldError>{passwordError}</FieldError>
            </FieldContent>
          </Field>
        </FieldGroup>
      </FieldSet>

      <FieldError>{error}</FieldError>

      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"
      >
        {isPending ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  )
}
