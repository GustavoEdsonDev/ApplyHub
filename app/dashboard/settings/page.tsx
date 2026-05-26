'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  async function handleSignOut() {
    setIsLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/auth/login'
  }

  async function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSaving(true)

    const formData = new FormData(e.currentTarget)
    const newPassword = formData.get('new_password') as string

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) throw error

      alert('Senha atualizada com sucesso!')
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error(error)
      alert('Erro ao atualizar senha')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerencie sua conta e preferências.</p>
      </div>

      <div className="space-y-8">
        {/* Change Password */}
        <div className="max-w-2xl rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Alterar Senha</h2>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <FieldSet disabled={isSaving}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="new_password">Nova Senha</FieldLabel>
                  <FieldContent>
                    <input
                      id="new_password"
                      name="new_password"
                      type="password"
                      required
                      minLength={6}
                      className={cn(
                        'h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'
                      )}
                      placeholder="••••••••"
                    />
                  </FieldContent>
                </Field>
              </FieldGroup>
            </FieldSet>

            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Atualizando...' : 'Atualizar Senha'}
            </Button>
          </form>
        </div>

        {/* Sign Out */}
        <div className="max-w-2xl rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Sessão</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Saia da sua conta e faça login novamente em outro dispositivo.
          </p>

          <Button
            variant="destructive"
            onClick={handleSignOut}
            disabled={isLoading}
          >
            {isLoading ? 'Saindo...' : 'Sair'}
          </Button>
        </div>
      </div>
    </div>
  )
}
