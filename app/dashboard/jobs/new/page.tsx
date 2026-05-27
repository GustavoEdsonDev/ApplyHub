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
import { Checkbox } from '@/components/ui/checkbox'
import { Plus } from 'lucide-react'
import { statusOptions, workModeOptions, seniorityOptions } from '@/lib/constants'
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
      salary: formData.get('salary') ? Number(formData.get('salary')) : null,
      salary_currency: formData.get('salary_currency') || 'BRL',
      work_mode: formData.get('work_mode') || workModeOptions.remote,
      seniority: formData.get('seniority') || seniorityOptions.junior,
      status: formData.get('status') || statusOptions.saved,
      is_favorite: formData.get('is_favorite') === 'on',
    }

    try {
      const res = await fetch('/api/job-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const responseData = await res.json()

      if (!res.ok) {
        const errorMsg = responseData?.error || 'Failed to create job'
        throw new Error(errorMsg)
      }

      router.push('/dashboard/jobs')
    } catch (error) {
      console.error('Error creating job:', error)
      const message = error instanceof Error ? error.message : 'Erro ao criar vaga'
      alert(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 md:p-8 flex-1">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Nova Vaga</h1>
          <p className="text-sm md:text-base text-muted-foreground">Cadastre uma nova oportunidade.</p>
        </div>

        <div className="max-w-2xl rounded-lg border bg-card p-4 md:p-6">
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

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
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

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="work_mode">Modelo de trabalho</FieldLabel>
                    <FieldContent>
                      <select
                        id="work_mode"
                        name="work_mode"
                        defaultValue={workModeOptions.remote}
                        className={cn(
                          'h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'
                        )}
                      >
                        <option value={workModeOptions.remote}>Remoto</option>
                        <option value={workModeOptions.onsite}>Presencial</option>
                        <option value={workModeOptions.hybrid}>Híbrido</option>
                      </select>
                    </FieldContent>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="seniority">Senioridade</FieldLabel>
                    <FieldContent>
                      <select
                        id="seniority"
                        name="seniority"
                        defaultValue={seniorityOptions.junior}
                        className={cn(
                          'h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'
                        )}
                      >
                        <option value={seniorityOptions.internship}>Estágio</option>
                        <option value={seniorityOptions.junior}>Júnior</option>
                        <option value={seniorityOptions.mid_level}>Pleno</option>
                        <option value={seniorityOptions.senior}>Sênior</option>
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
                      defaultValue={statusOptions.saved}
                      className={cn(
                        'h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'
                      )}
                    >
                      <option value={statusOptions.saved}>Salvo</option>
                      <option value={statusOptions.applied}>Candidatura Enviada</option>
                      <option value={statusOptions.technical_test}>Teste Técnico</option>
                      <option value={statusOptions.interview}>Entrevista</option>
                      <option value={statusOptions.offer}>Oferta</option>
                      <option value={statusOptions.rejected}>Rejeitado</option>
                    </select>
                  </FieldContent>
                </Field>
              </FieldGroup>
            </FieldSet>

            <div className="flex items-center gap-2">
              <Checkbox id="is_favorite" name="is_favorite" />
              <label htmlFor="is_favorite" className="text-sm cursor-pointer">
                Marcar como favorita
              </label>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <Button type="submit" disabled={isLoading} className="flex items-center justify-center gap-2">
                {isLoading ? (
                  'Criando...'
                ) : (
                  <>
                    <Plus size={16} />
                    Criar vaga
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="md:w-auto"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
