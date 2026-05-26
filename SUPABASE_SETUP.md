# Setup Supabase para o HireTrack

## 1. Pré-requisitos
- Conta no [Supabase](https://app.supabase.com)
- Projeto Supabase criado

## 2. Configurar Variáveis de Ambiente

Copie `.env.example` para `.env.local` e preencha:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=seu_anon_key_aqui
```

Obtenha esses valores em:
- Dashboard Supabase > Settings > API
- Procure por "Project URL" e "Publishable Key (anon)"

## 3. Configurar Authentication

No Supabase Dashboard:

### 3.1 Habilitar Email Auth
- Vá em **Authentication > Providers**
- Certifique-se que "Email" está habilitado

### 3.2 Configurar Email Confirmation (IMPORTANTE para o erro CORS)
- Vá em **Authentication > Providers > Email**

**Opção A: Desenvolvimento (sem confirmação de email)**
- Disable "Confirm email" 
- Isso permite signup instantâneo sem redirect

**Opção B: Produção (com confirmação de email)**
- Enable "Confirm email"
- Você receberá email com link de confirmação
- Precisa configurar SMTP (ou usar padrão)

### 3.3 Adicionar Redirect URLs (CRÍTICO)
- Vá em **Authentication > URL Configuration**
- Adicione Redirect URLs:
  ```
  http://localhost:3000/auth/callback
  ```
- Para produção, adicione também:
  ```
  https://seu-dominio.com/auth/callback
  ```

## 4. Resolver Erro CORS

Se receber: `CORS request did not succeed`

**Causas:**
1. Redirect URLs não configuradas no Supabase
2. Email confirmation habilitado mas URL de callback não autorizada

**Solução:**
- Verifique o passo 3.3 acima
- Depois de adicionar, aguarde ~30 segundos para propagação
- Recarregue a página e tente novamente

## 5. Tabelas necessárias

As tabelas são criadas automaticamente na primeira execução:
- `job_applications` - Vagas candidatadas
- `profiles` - Perfil do usuário

## 6. Testar

1. Start dev server: `npm run dev`
2. Acesse http://localhost:3000
3. Clique em "Criar conta"
4. Preencha email e senha
5. Se configurado sem email confirmation: redireciona para dashboard
6. Se com email confirmation: verá mensagem "Verifique seu email"

## Troubleshooting

### Erro: "CORS request did not succeed"
- ✅ Verifique Redirect URLs em Authentication > URL Configuration
- ✅ Recarregue a página após adicionar URLs (5-30 segundos)

### Erro: "Invalid login credentials"
- ✅ Verifique email/senha (case-sensitive)
- ✅ Confirme se está usando usuario correto do Supabase

### Sessão não persiste após reload
- ✅ Middleware está configurado em `/middleware.ts`
- ✅ Verifique se os cookies estão sendo salvos

### Email não recebido
- ✅ Se usando SMTP customizado: verifique configurações
- ✅ Se usando padrão: pode levar até 5 minutos
- ✅ Verifique spam/lixo eletrônico
