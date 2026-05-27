import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { getStatusLabel } from '@/lib/label-helpers'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch recent jobs
  const { data: jobs } = await supabase
    .from('job_applications')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 md:p-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Bem-vindo!</h1>
          <p className="text-sm md:text-base text-muted-foreground">Acompanhe suas candidaturas aqui.</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 mb-8">
          <div className="rounded-lg border bg-card p-4 md:p-6">
            <p className="text-xs md:text-sm text-muted-foreground">Total de vagas</p>
            <h2 className="text-2xl md:text-3xl font-bold mt-1 md:mt-2">{jobs?.length || 0}</h2>
          </div>

          <div className="rounded-lg border bg-card p-4 md:p-6">
            <p className="text-xs md:text-sm text-muted-foreground">Em progresso</p>
            <h2 className="text-2xl md:text-3xl font-bold mt-1 md:mt-2">
              {jobs?.filter((j) => j.status === 'applied').length || 0}
            </h2>
          </div>

          <div className="rounded-lg border bg-card p-4 md:p-6">
            <p className="text-xs md:text-sm text-muted-foreground">Favoritas</p>
            <h2 className="text-2xl md:text-3xl font-bold mt-1 md:mt-2">
              {jobs?.filter((j) => j.is_favorite).length || 0}
            </h2>
          </div>
        </div>

        {/* Recent jobs */}
        <div>
          <div className="mb-4 md:mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-lg md:text-xl font-semibold">Vagas recentes</h2>
            <Button asChild className="w-full md:w-auto">
              <Link href="/dashboard/jobs/new" className="flex items-center justify-center gap-2">
                <Plus size={16} />
                Adicionar vaga
              </Link>
            </Button>
          </div>

          {jobs && jobs.length > 0 ? (
            <div className="space-y-3 md:space-y-4">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/dashboard/jobs/${job.id}`}
                  className="block rounded-lg border bg-card p-4 md:p-4 transition-colors hover:bg-muted active:bg-muted"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm md:text-base truncate">{job.job_title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground truncate">{job.company_name}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 md:px-3 py-1 text-xs font-medium whitespace-nowrap ${
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
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed bg-muted/50 p-8 md:p-12 text-center">
              <p className="text-muted-foreground mb-4 text-sm md:text-base">Nenhuma vaga cadastrada ainda.</p>
              <Button asChild>
                <Link href="/dashboard/jobs/new">Adicionar primeira vaga</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
