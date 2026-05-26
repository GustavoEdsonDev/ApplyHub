# Checklist Rápido - NetworkError

## ❌ Você está vendo "NetworkError when attempting to fetch resource"

Siga estes passos:

### 1️⃣ Verifique Console (F12 → Console)
Procure pelos logs com emojis. Você deve ver:
```
=== SUPABASE DEBUG ===
NEXT_PUBLIC_SUPABASE_URL: https://famkkufgqetauyncsipn.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY exists: true
✅ Variáveis parecem OK
Testando conexão com Supabase...
```

Se vir `❌` em alguma linha, vá para a seção correspondente abaixo.

### 2️⃣ Se a mensagem for "NÃO ESTÁ DEFINIDA"
```
❌ NEXT_PUBLIC_SUPABASE_URL NÃO ESTÁ DEFINIDA
```

**Solução:**
1. Abra o arquivo: `c:\Users\gustavo\hire-track-app\.env.local`
2. Verifique que tem essas duas linhas:
```
NEXT_PUBLIC_SUPABASE_URL=https://famkkufgqetauyncsipn.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_krOWwePBnAN4pBLu0kiLRQ_eje_6ncS
```
3. Se estiver vazio ou sem estas linhas, copie de cima para o arquivo
4. **Pare o dev server** (Ctrl+C)
5. **Reinicie**: `npm run dev`
6. **Recarregue a página** (Ctrl+F5 - hard refresh)

### 3️⃣ Se disser "Supabase respondeu com status: 404" ou semelhante
```
⚠️ Status não é 200. Projeto pode estar inativo.
```

**Solução:**
1. Vá em https://app.supabase.com
2. Procure o projeto `famkkufgqetauyncsipn`
3. Se estiver "Paused" ou "Inactive", clique para **Reactivate**
4. Aguarde ~1 minuto
5. Recarregue a página no navegador

### 4️⃣ Se disser "ERRO ao conectar Supabase"
```
❌ ERRO ao conectar Supabase: NetworkError when attempting to fetch resource.
```

**Isso significa:**
- Projeto Supabase está offline/deletado, OU
- Problema de conectividade, OU  
- Firewall/VPN bloqueando

**Tente:**
1. Verifique se consegue acessar https://app.supabase.com (sem VPN)
2. Se sim, vá lá e verifique status do projeto
3. Se projeto está green/ativo, tente:
   - Fechar e reabrir navegador
   - Limpar cache (Ctrl+Shift+Delete)
   - Reiniciar o dev server

### 5️⃣ Se nada funcionar
**Crie um novo projeto:**

1. Vá em https://app.supabase.com > **+ New Project**
2. Nome: `hire-track-dev`
3. Password: qualquer coisa
4. Espere completar (~2 min)
5. Vá em **Settings > API**
6. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Publishable Key (anon)** → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
7. Atualize `.env.local` com estes valores
8. Pare dev server e reinicie: `npm run dev`

---

**Se problema persiste, compartilhe:**
- Os logs completos do console (screenshot)
- O que vê em https://app.supabase.com (projeto ativo ou paused?)
