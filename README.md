# ApplyHub

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Sobre o projeto

**ApplyHub** é uma aplicação web para gerenciar candidaturas de emprego de forma simples, organizada e visual.

O objetivo do projeto é ajudar candidatos a acompanharem suas vagas, empresas, status de candidatura, favoritas, modalidade de trabalho, salário e observações em um único dashboard.

A aplicação foi desenvolvida com foco em produtividade, organização e experiência do usuário, utilizando tecnologias modernas do ecossistema React e Next.js.

---

## Funcionalidades

- Autenticação de usuários com Supabase Auth
- Cadastro de vagas
- Listagem de candidaturas
- Visualização de detalhes de cada vaga
- Edição de informações da candidatura
- Exclusão de vagas
- Sistema de vagas favoritas
- Página dedicada para favoritos
- Dashboard com estatísticas
- Contagem total de vagas
- Contagem de vagas em progresso
- Contagem de vagas favoritas
- Status da candidatura
- Suporte a modo escuro
- Interface responsiva
- Componentes reutilizáveis com shadcn/ui
- Estilização com Tailwind CSS
- Proteção de dados por usuário com Supabase RLS

---

## Principais telas

### Home

Página inicial de apresentação do projeto, com chamada para login e cadastro.

### Login

Tela para usuários acessarem suas contas usando email e senha.

### Cadastro

Tela para criação de nova conta.

### Dashboard

Área principal do usuário após login, com resumo das candidaturas:

- Total de vagas
- Vagas em progresso
- Vagas favoritas
- Vagas recentes

### Minhas Vagas

Página com todas as candidaturas cadastradas pelo usuário.

Cada card pode exibir informações como:

- Nome da empresa
- Cargo
- Modalidade
- Salário
- Status
- Favorito
- Ações como visualizar e deletar

### Favoritas

Página que lista apenas as vagas marcadas como favoritas.

### Detalhes da vaga

Página individual para visualizar as informações completas de uma candidatura.

---

## Status das candidaturas

O sistema permite organizar as vagas por status, como:

- Salvo
- Candidatura enviada
- Teste técnico
- Entrevista
- Oferta
- Rejeitado

Esses status ajudam o usuário a entender em qual etapa está cada processo seletivo.

---

## Tecnologias utilizadas

### Front-end

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Radix UI**
- **Lucide React**

### Back-end / Banco de dados

- **Supabase**
- **Supabase Auth**
- **PostgreSQL**

### Ferramentas

- **ESLint**
- **Vercel**
- **Git**
- **GitHub**

---

## Estrutura do projeto

```bash
ApplyHub/
├── app/
│   ├── api/
│   │   └── job-applications/
│   ├── auth/
│   ├── dashboard/
│   │   ├── favorites/
│   │   └── jobs/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── delete-job-button.tsx
│   ├── login-form.tsx
│   ├── signup-form.tsx
│   └── theme-switch.tsx
│
├── lib/
│   ├── contexts/
│   ├── supabase/
│   ├── constants.ts
│   ├── label-helpers.ts
│   └── utils.ts
│
├── public/
├── middleware.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/GustavoEdsonDev/ApplyHub.git
```

### 2. Entre na pasta do projeto

```bash
cd ApplyHub
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica_do_supabase
```

Você encontra esses valores no painel do Supabase:

```txt
Project Settings > API
```

---

## Configuração do Supabase

Para o projeto funcionar corretamente, é necessário ter um projeto no Supabase com autenticação e banco de dados configurados.

### Authentication

No painel do Supabase:

```txt
Authentication > Providers
```

Ative o login por email.

Para desenvolvimento local, você pode desativar a confirmação de email:

```txt
Authentication > Providers > Email > Confirm email
```

### Redirect URL

Adicione a URL de callback para desenvolvimento local:

```txt
http://localhost:3000/auth/callback
```

Em produção, adicione também a URL do deploy:

```txt
https://seu-dominio.com/auth/callback
```

---

## Tabela principal

A tabela principal do projeto é `job_applications`.

Exemplo de estrutura recomendada:

```sql
create table job_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company_name text not null,
  job_title text not null,
  job_url text,
  salary text,
  modality text,
  seniority text,
  stack text,
  status text not null default 'saved',
  notes text,
  is_favorite boolean not null default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

### Campos principais

| Campo | Descrição |
|---|---|
| `id` | Identificador único da vaga |
| `user_id` | ID do usuário dono da candidatura |
| `company_name` | Nome da empresa |
| `job_title` | Nome do cargo |
| `job_url` | Link da vaga |
| `salary` | Salário informado |
| `modality` | Remoto, híbrido ou presencial |
| `seniority` | Estágio, júnior, pleno etc. |
| `stack` | Tecnologias exigidas |
| `status` | Status da candidatura |
| `notes` | Anotações pessoais |
| `is_favorite` | Define se a vaga é favorita |
| `created_at` | Data de criação |
| `updated_at` | Data da última atualização |

---

## Políticas de segurança no Supabase

É recomendado ativar Row Level Security na tabela `job_applications`.

```sql
alter table job_applications enable row level security;
```

### Permitir que o usuário veja apenas suas vagas

```sql
create policy "Users can view their own job applications"
on job_applications
for select
using (auth.uid() = user_id);
```

### Permitir que o usuário crie suas vagas

```sql
create policy "Users can insert their own job applications"
on job_applications
for insert
with check (auth.uid() = user_id);
```

### Permitir que o usuário atualize suas vagas

```sql
create policy "Users can update their own job applications"
on job_applications
for update
using (auth.uid() = user_id);
```

### Permitir que o usuário delete suas vagas

```sql
create policy "Users can delete their own job applications"
on job_applications
for delete
using (auth.uid() = user_id);
```

---

## Rodando o servidor de desenvolvimento

```bash
npm run dev
```

Depois acesse:

```txt
http://localhost:3000
```

---

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a build de produção |
| `npm run start` | Inicia a aplicação em produção |
| `npm run lint` | Executa o ESLint |

---

## Deploy

O projeto pode ser publicado facilmente na Vercel.

### Passos para deploy

1. Faça push do projeto para o GitHub
2. Acesse a Vercel
3. Importe o repositório
4. Configure as variáveis de ambiente
5. Faça o deploy

Variáveis necessárias:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica_do_supabase
```

---

## Melhorias futuras

Algumas ideias para evolução do projeto:

- Filtros por status
- Filtros por modalidade
- Filtros por senioridade
- Busca por empresa ou cargo
- Gráficos de candidaturas por status
- Histórico de alterações da vaga
- Notificações de follow-up
- Exportação para CSV
- Upload de currículo
- Integração com LinkedIn
- Integração com Google Calendar
- Página de perfil do usuário
- Kanban de candidaturas
- Testes automatizados
- Toasts no lugar de alerts
- Paginação ou infinite scroll
- Melhorias de acessibilidade

---

## Aprendizados do projeto

Durante o desenvolvimento do ApplyHub foram praticados conceitos importantes de aplicações modernas, como:

- Autenticação com Supabase
- Proteção de rotas
- Server Components no Next.js
- Client Components no Next.js
- Integração com banco PostgreSQL
- CRUD completo
- Consumo de API routes
- Organização de componentes
- Estilização com Tailwind CSS
- Componentização com shadcn/ui
- Deploy na Vercel
- Controle de estado em componentes client
- Separação entre lógica de servidor e cliente
- Uso de Row Level Security no Supabase

---

## Autor

Desenvolvido por **Gustavo Edson Nunes**.

- GitHub: [GustavoEdsonDev](https://github.com/GustavoEdsonDev)

---

## Licença

Este projeto está sob a licença MIT.

Sinta-se livre para estudar, modificar e utilizar este projeto como referência.