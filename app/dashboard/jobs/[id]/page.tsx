import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Trash2, Star } from 'lucide-react'
import DeleteJobButton from '@/components/delete-job-button'
import { getStatusLabel, getWorkModeLabel, getSeniorityLabel } from '@/lib/label-helpers'

interface JobPageProps {
  params: Promise<{ id: string }>
}

export default async function JobDetailPage(props: JobPageProps) {
  const params = await props.params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: job } = await supabase
    .from('job_applications')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user?.id)
    .single()

  if (!job) {
    notFound()
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{job.job_title}</h1>
          <p className="text-lg text-muted-foreground">{job.company_name}</p>
        </div>
        <div className="flex gap-4">
          <DeleteJobButton jobId={params.id} />
          <Button variant="outline" asChild>
            <Link href={`/dashboard/jobs/${params.id}/edit`}>Editar</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/jobs">Voltar</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="font-semibold mb-4">Informações da vaga</h2>
            <div className="space-y-4">
              {job.job_url && (
                <div>
                  <p className="text-sm text-muted-foreground">URL</p>
                  <a
                    href={job.job_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {job.job_url}
                  </a>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Modelo de trabalho</p>
                <p>{getWorkModeLabel(job.work_mode) || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Senioridade</p>
                <p>{getSeniorityLabel(job.seniority) || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Status</p>
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                job.status === 'applied'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                  : job.status === 'interview'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
              }`}
            >
              {getStatusLabel(job.status)}
            </span>
          </div>

          {job.salary && (
            <div className="rounded-lg border bg-card p-6">
              <p className="text-sm text-muted-foreground mb-2">Salário</p>
              <p className="text-xl font-semibold">
                {job.salary} {job.salary_currency}
              </p>
            </div>
          )}

          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Favorita</p>
            <div className="flex items-center gap-2">
              {job.is_favorite ? (
                <>
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  <span>Sim</span>
                </>
              ) : (
                <span>Não</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
