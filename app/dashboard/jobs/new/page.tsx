'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function NewJobPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      company_name: formData.get('company_name'),
      job_title: formData.get('job_title'),
      job_url: formData.get('job_url'),
      salary: formData.get('salary'),
      salary_currency: formData.get('salary_currency') || 'BRL',
      work_mode: formData.get('work_mode') || 'remote',
      seniority: formData.get('seniority') || 'junior',
      status: formData.get('status') || 'saved',
    }

    try {
      const res = await fetch('/api/job-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Failed to create job')

      router.push('/dashboard/jobs')
    } catch (error) {
      console.error(error)
      alert('Erro ao criar vaga')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Nova Vaga</h1>
        <p className="text-muted-foreground">Cadastre uma nova oportunidade.</p>
      </div>

      <div className="max-w-2xl rounded-lg border bg-card p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FieldSet disabled={isLoading}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="company_name">Empresa</FieldLabel>
                <FieldContent>
                  <input
                    id="company_name"
                    name="company_name"
                    required
                    className={cn(
                      'h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'
                    )}
                    placeholder="Ex: Google"
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="job_title">Posição</FieldLabel>
                <FieldContent>
                  <input
                    id="job_title"
                    name="job_title"
                    required
                    className={cn(
                      'h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'
                    )}
                    placeholder="Ex: Front-end Senior"
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="job_url">URL da vaga</FieldLabel>
                <FieldContent>
                  <input
                    id="job_url"
                    name="job_url"
                    type="url"
                    className={cn(
                      'h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'
                    )}
                    placeholder="https://..."
                  />
                </FieldContent>
              </Field>

              <div className="grid gap-6 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="salary">Salário</FieldLabel>
                  <FieldContent>
                    <input
                      id="salary"
                      name="salary"
                      type="number"
                      className={cn(
                        'h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'
                      )}
                      placeholder="Ex: 5000"
                    />
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="salary_currency">Moeda</FieldLabel>
                  <FieldContent>
                    <select
                      id="salary_currency"
                      name="salary_currency"
                      defaultValue="BRL"
                      className={cn(
                        'h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'
                      )}
                    >
                      <option value="BRL">BRL</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </FieldContent>
                </Field>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="work_mode">Modelo de trabalho</FieldLabel>
                  <FieldContent>
                    <select
                      id="work_mode"
                      name="work_mode"
                      defaultValue="remote"
                      className={cn(
                        'h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'
                      )}
                    >
                      <option value="remote">Remoto</option>
                      <option value="on-site">Presencial</option>
                      <option value="hybrid">Híbrido</option>
                    </select>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="seniority">Senioridade</FieldLabel>
                  <FieldContent>
                    <select
                      id="seniority"
                      name="seniority"
                      defaultValue="junior"
                      className={cn(
                        'h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'
                      )}
                    >
                      <option value="junior">Júnior</option>
                      <option value="mid">Pleno</option>
                      <option value="senior">Sênior</option>
                    </select>
                  </FieldContent>
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <FieldContent>
                  <select
                    id="status"
                    name="status"
                    defaultValue="saved"
                    className={cn(
                      'h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'
                    )}
                  >
                    <option value="saved">Salvo</option>
                    <option value="applied">Aplicado</option>
                    <option value="interview">Entrevista</option>
                    <option value="rejected">Rejeitado</option>
                    <option value="hired">Contratado</option>
                  </select>
                </FieldContent>
              </Field>
            </FieldGroup>
          </FieldSet>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Criando...' : 'Criar vaga'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
