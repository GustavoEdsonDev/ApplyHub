import Link from 'next/link'
import { ArrowRight, BarChart3, BriefcaseBusiness, CheckCircle2, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Mail, Code } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold">
            ApplyHub
          </Link>

          <nav className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Entrar</Link>
            </Button>

            <Button asChild>
              <Link href="/auth/signup">Criar conta</Link>
            </Button>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <span className="rounded-full border px-3 py-1 text-sm text-muted-foreground">
            Organize sua busca por vagas
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
            Controle suas candidaturas em um só lugar.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            O ApplyHub ajuda você a acompanhar vagas, empresas, salários,
            stacks exigidas, status das candidaturas e anotações importantes
            durante sua busca por emprego.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Começar agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/login">Já tenho conta</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-4 shadow-sm">
          <div className="rounded-xl border bg-background p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Candidaturas</p>
                <h2 className="text-3xl font-bold">24 vagas</h2>
              </div>

              <BriefcaseBusiness className="h-8 w-8 text-muted-foreground" />
            </div>

            <div className="mt-6 grid gap-3">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">Front-end Júnior</p>
                  <p className="text-xs text-muted-foreground">Remoto · React</p>
                </div>
                <span className="rounded-full bg-muted px-2 py-1 text-xs">
                  Aplicado
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">Estágio Full Stack</p>
                  <p className="text-xs text-muted-foreground">Híbrido · Next.js</p>
                </div>
                <span className="rounded-full bg-muted px-2 py-1 text-xs">
                  Entrevista
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">Dev React Native</p>
                  <p className="text-xs text-muted-foreground">Remoto · Mobile</p>
                </div>
                <span className="rounded-full bg-muted px-2 py-1 text-xs">
                  Favorita
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <BriefcaseBusiness className="mb-2 h-6 w-6" />
              <CardTitle>Cadastre vagas</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Salve empresa, cargo, salário, modalidade, senioridade, stack e link da vaga.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CheckCircle2 className="mb-2 h-6 w-6" />
              <CardTitle>Acompanhe o status</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Controle se a vaga está salva, aplicada, em entrevista, recusada ou aprovada.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="mb-2 h-6 w-6" />
              <CardTitle>Veja estatísticas</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Tenha um dashboard com total de candidaturas, favoritas e vagas por status.
            </CardContent>
          </Card>
        </div>
      </section>
        <footer className="border-t bg-card px-4 py-10 text-muted-foreground sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <h3 className="text-xl font-semibold text-foreground">
                  ApplyHub
                </h3>
              </div>

              <p className="mb-4 text-sm">
                Uma aplicação moderna de gerenciamento financeiro criada para
                ajudar você a controlar seu dinheiro com facilidade e confiança.
              </p>

              <p className="text-sm text-muted-foreground">
                Criado com Next.js, TypeScript e Supabase para uma experiência
                fluida.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-foreground">
                Conecte-se com o Desenvolvedor
              </h4>

              <div className="space-y-3">
                <a
                  href="https://github.com/GustavoEdsonDev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition hover:text-primary"
                >
                  <Code className="size-4" />
                  <span>GitHub: GustavoEdsonDev</span>
                </a>

                <a
                  href="mailto:gustavoedsonunnunes@gmail.com"
                  className="flex items-center gap-2 text-sm transition hover:text-primary"
                >
                  <Mail className="size-4" />
                  <span className="break-all">gustavoedsonunnunes@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-xs sm:text-sm">
            <p>
              &copy; 2026 ApplyHub - Desenvolvido por Gustavo Edson. Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}