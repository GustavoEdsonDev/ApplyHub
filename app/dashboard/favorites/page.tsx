import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPin, DollarSign, Star } from 'lucide-react'
import { getStatusLabel, getWorkModeLabel } from '@/lib/label-helpers'
import DeleteJobButton from '@/components/delete-job-button'

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
    <div className="flex flex-col h-full">
      <div className="p-4 md:p-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Vagas Favoritas</h1>
          <p className="text-sm md:text-base text-muted-foreground">Suas vagas marcadas como favoritas.</p>
        </div>

        {jobs && jobs.length > 0 ? (
          <div className="space-y-3 md:space-y-4">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/dashboard/jobs/${job.id}`}
                className="block rounded-lg border bg-card p-4 md:p-6 transition-colors hover:bg-muted active:bg-muted"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold truncate">{job.job_title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground truncate">{job.company_name}</p>
                    <div className="mt-2 md:mt-3 flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground">
                      {job.work_mode && (
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {getWorkModeLabel(job.work_mode)}
                        </span>
                      )}
                      {job.salary && (
                        <span className="flex items-center gap-1">
                          <DollarSign size={14} />
                          {job.salary}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:flex-col md:items-end gap-2 md:gap-2 self-start md:self-auto">
                    <DeleteJobButton jobId={job.id} />
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span
                      className={`inline-block rounded-full px-2 md:px-3 py-1 text-xs font-medium ${
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
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed bg-muted/50 p-8 md:p-12 text-center">
            <p className="text-muted-foreground mb-4 text-sm md:text-base">Nenhuma vaga favorita ainda.</p>
            <Button asChild>
              <Link href="/dashboard/jobs">Ver todas as vagas</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
