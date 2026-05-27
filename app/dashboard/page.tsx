import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { getStatusLabel } from "@/lib/label-helpers";

export default async function DashboardPage() {
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

  const recentJobs = safeJobs.slice(0, 5);

  const inProgressStatuses = ["applied", "technical_test", "interview"];

  const totalJobs = safeJobs.length;

  const inProgressJobs = safeJobs.filter((job) =>
    inProgressStatuses.includes(job.status)
  ).length;

  const favoriteJobs = safeJobs.filter((job) => job.is_favorite).length;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-6 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bem-vindo!</h1>
        <p className="mt-1 text-muted-foreground">
          Acompanhe suas candidaturas aqui.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-sm transition-colors hover:bg-accent/50">
          <p className="text-sm font-medium text-muted-foreground">
            Total de vagas
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            {totalJobs}
          </h2>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm transition-colors hover:bg-accent/50">
          <p className="text-sm font-medium text-muted-foreground">
            Em progresso
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            {inProgressJobs}
          </h2>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm transition-colors hover:bg-accent/50">
          <p className="text-sm font-medium text-muted-foreground">
            Favoritas
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            {favoriteJobs}
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Vagas recentes
          </h2>

          <Button asChild>
            <Link href="/dashboard/jobs/new">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar vaga
            </Link>
          </Button>
        </div>

        {recentJobs.length > 0 ? (
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <Link
                key={job.id}
                href={`/dashboard/jobs/${job.id}`}
                className="block rounded-xl border bg-card p-5 text-card-foreground shadow-sm transition-colors hover:bg-accent/50"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{job.job_title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {job.company_name}
                    </p>
                  </div>

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
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-8 text-center text-card-foreground shadow-sm">
            <p className="text-muted-foreground">
              Nenhuma vaga cadastrada ainda.
            </p>

            <Button asChild className="mt-4">
              <Link href="/dashboard/jobs/new">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar primeira vaga
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}