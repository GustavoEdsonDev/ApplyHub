import Link from "next/link";
import { DollarSign, MapPin, Plus, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { getStatusLabel } from "@/lib/label-helpers";
import DeleteJobButton from "@/components/delete-job-button";

export default async function JobsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: jobs, error } = await supabase
    .from("job_applications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar vagas:", error);
  }

  const safeJobs = jobs ?? [];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-6 py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Minhas Vagas</h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie todas as suas candidaturas.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/jobs/new">
            <Plus className="mr-2 h-4 w-4" />
            Nova vaga
          </Link>
        </Button>
      </div>

      {safeJobs.length > 0 ? (
        <div className="space-y-4">
          {safeJobs.map((job) => (
            <div
              key={job.id}
              className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-colors hover:bg-accent/50"
            >
              <div className="flex items-start justify-between gap-6">
                <Link
                  href={`/dashboard/jobs/${job.id}`}
                  className="min-w-0 flex-1"
                >
                  <h2 className="font-semibold">{job.job_title}</h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {job.company_name}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    {job.modality && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.modality}
                      </span>
                    )}

                    {job.salary && (
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </span>
                    )}
                  </div>
                </Link>

                <div className="flex min-w-fit flex-col items-end gap-4">
                  <DeleteJobButton jobId={job.id} />

                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      job.status === "applied"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                        : job.status === "technical_test"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                        : job.status === "interview"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : job.status === "offer"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                        : job.status === "rejected"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                    }`}
                  >
                    {getStatusLabel(job.status)}
                  </span>

                  {job.is_favorite && (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-10 text-center text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold">Nenhuma vaga cadastrada</h2>

          <p className="mt-2 text-muted-foreground">
            Comece adicionando sua primeira candidatura.
          </p>

          <Button asChild className="mt-6">
            <Link href="/dashboard/jobs/new">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar primeira vaga
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}