# Diagnóstico: NetworkError ao conectar no Supabase

## Passos para Diagnosticar

### 1. Verificar Console do Navegador
- Abra o navegador em `http://localhost:3000`
- Pressione `F12` para abrir Developer Tools
- Vá em **Console**
- Procure por logs com `✅` ou `❌`:
  - ✅ NEXT_PUBLIC_SUPABASE_URL válida
  - ✅ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY válida
  - ✅ Supabase server respondeu

Se estiver com `❌`, veja a solução abaixo.

### 2. Verificar .env.local

Arquivo: `c:\Users\gustavo\hire-track-app\.env.local`

Deve conter:
```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_seu_chave_aqui
```

**Importante:**
- A URL deve terminar com `.supabase.co`
- A chave deve começar com `sb_`
- Sem espaços extras

### 3. Validar Projeto Supabase

1. Vá em https://app.supabase.com
2. Selecione seu projeto
3. Vá em **Settings > API**
4. Verifique se a URL e Publishable Key correspondem ao seu `.env.local`
5. Se o projeto estiver com status "Paused" ou "Inactive", reative-o

### 4. Se nada funcionar

**Opção A: Criar novo projeto Supabase**
1. https://app.supabase.com > New Project
2. Escolha um nome e senha de banco
3. Espere completar (~2 min)
4. Copie a URL e Publishable Key para `.env.local`
5. Recarregue a página

**Opção B: Verificar conectividade**
```bash
# No terminal, teste conexão com Supabase
curl -i https://famkkufgqetauyncsipn.supabase.co/auth/v1/verify
```

Se receber erro 4XX ou conexão recusada, o projeto está inativo/deletado.

## Solução Rápida

1. **Pare o dev server**: Ctrl+C no terminal
2. **Delete `.next` folder**: `rm -r .next` (ou delete manualmente)
3. **Reinicie**: `npm run dev`
4. **Limpe cache**: Ctrl+Shift+Delete no navegador (Hard Refresh)
5. **Tente login novamente**

## Logs Úteis

Se ainda não funcionar, copie e compartilhe os erros do console:
- `Login error details:` (seus detalhes de erro)
- `AuthRetryableFetchError:` (erro da rede)
- `Supabase URL:` (mostram sua configuração)

---

**Checklist:**
- [ ] URL termina com `.supabase.co`
- [ ] Chave começa com `sb_`
- [ ] Projeto Supabase está ativo em https://app.supabase.com
- [ ] `.env.local` existe e tem valores
- [ ] Recarregou a página após mudar `.env.local`
