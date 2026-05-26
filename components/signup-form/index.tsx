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

// Regex para validação de email RFC 5322 simplificado
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value)
}

function getInputClassName(hasError: boolean): string {
  return cn(
    'h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring',
    hasError ? 'border-destructive' : 'border-input'
  )
}

export function SignupForm() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
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

  const confirmPasswordError = useMemo(() => {
    if (!confirmPassword) return null
    if (confirmPassword !== password) return 'As senhas não conferem.'
    return null
  }, [confirmPassword, password])

  const canSubmit =
    !!email &&
    !!password &&
    !!confirmPassword &&
    !emailError &&
    !passwordError &&
    !confirmPasswordError &&
    !isPending

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!canSubmit) return

    startTransition(async () => {
      try {
        const supabase = createClient()

        // Para usar emailRedirectTo, você precisa configurar as Redirect URLs no Supabase
        // Vá em Authentication > URL Configuration e adicione: http://localhost:3000/auth/callback
        const emailRedirectTo = typeof window !== 'undefined' 
          ? `${window.location.origin}/auth/callback`
          : 'http://localhost:3000/auth/callback'

        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { 
            emailRedirectTo,
          },
        })

        if (signUpError) {
          console.error('Signup error:', signUpError)
          
          // Se receber erro de CORS/Network, é problema de configuração no Supabase
          if (signUpError.message?.includes('CORS') || signUpError.message?.includes('Failed to fetch')) {
            setError('Erro de conexão. Verifique se as Redirect URLs estão configuradas no Supabase Dashboard em Authentication > URL Configuration.')
          } else {
            setError(signUpError.message)
          }
          return
        }

        // Se houver sessão, email confirmation está desabilitado e usuário entrou direto
        if (data.session) {
          router.replace('/')
          router.refresh()
          return
        }

        // Sem sessão = email confirmation habilitado, aguardando confirmação
        setSuccess('Conta criada! Verifique seu email para confirmar o cadastro.')
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro desconhecido ao criar conta'
        console.error('Catch error:', err)
        setError(message)
      }
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
                className={getInputClassName(!!emailError)}
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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={getInputClassName(!!passwordError)}
                placeholder="••••••••"
                aria-invalid={!!passwordError}
              />
              <FieldError>{passwordError}</FieldError>
            </FieldContent>
          </Field>

          <Field data-invalid={!!confirmPasswordError}>
            <FieldLabel htmlFor="confirmPassword">Confirmar senha</FieldLabel>
            <FieldContent>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={getInputClassName(!!confirmPasswordError)}
                placeholder="••••••••"
                aria-invalid={!!confirmPasswordError}
              />
              <FieldError>{confirmPasswordError}</FieldError>
            </FieldContent>
          </Field>
        </FieldGroup>
      </FieldSet>

      {error && <FieldError>{error}</FieldError>}

      {success && (
        <div
          role="status"
          className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100"
        >
          {success}
        </div>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity disabled:opacity-50"
      >
        {isPending && (
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {isPending ? 'Criando…' : 'Criar conta'}
      </button>
    </form>
  )
}