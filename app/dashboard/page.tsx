import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

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
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Bem-vindo!</h1>
        <p className="text-muted-foreground">Acompanhe suas candidaturas aqui.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total de vagas</p>
          <h2 className="text-3xl font-bold">{jobs?.length || 0}</h2>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">Em progresso</p>
          <h2 className="text-3xl font-bold">
            {jobs?.filter((j) => j.status === 'applied').length || 0}
          </h2>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">Favoritas</p>
          <h2 className="text-3xl font-bold">
            {jobs?.filter((j) => j.is_favorite).length || 0}
          </h2>
        </div>
      </div>

      {/* Recent jobs */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Vagas recentes</h2>
          <Button asChild>
            <Link href="/dashboard/jobs/new">+ Adicionar vaga</Link>
          </Button>
        </div>

        {jobs && jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/dashboard/jobs/${job.id}`}
                className="block rounded-lg border bg-card p-4 transition-colors hover:bg-muted"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{job.job_title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company_name}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      job.status === 'applied'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                        : job.status === 'interview'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed bg-muted/50 p-12 text-center">
            <p className="text-muted-foreground mb-4">Nenhuma vaga cadastrada ainda.</p>
            <Button asChild>
              <Link href="/dashboard/jobs/new">Adicionar primeira vaga</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
