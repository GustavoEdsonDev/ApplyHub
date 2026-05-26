import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function FavoritesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch favorite jobs
  const { data: jobs } = await supabase
    .from('job_applications')
    .select('*')
    .eq('user_id', user?.id)
    .eq('is_favorite', true)
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Vagas Favoritas</h1>
        <p className="text-muted-foreground">Suas vagas marcadas como favoritas.</p>
      </div>

      {jobs && jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={`/dashboard/jobs/${job.id}`}
              className="block rounded-lg border bg-card p-6 transition-colors hover:bg-muted"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{job.job_title}</h3>
                  <p className="text-muted-foreground">{job.company_name}</p>
                  <div className="mt-3 flex gap-3 text-sm text-muted-foreground">
                    {job.work_mode && <span>📍 {job.work_mode}</span>}
                    {job.salary && <span>💰 {job.salary}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl">⭐</span>
                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
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
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed bg-muted/50 p-12 text-center">
          <p className="text-muted-foreground mb-4">Nenhuma vaga favorita ainda.</p>
          <Button asChild>
            <Link href="/dashboard/jobs">Ver todas as vagas</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
