# Auth Context e Hooks

Documentação sobre o sistema de autenticação com React Context e hooks personalizados.

## Estrutura Criada

### 1. AuthContext (`lib/contexts/auth-context.tsx`)
Contexto global que gerencia o estado de autenticação da aplicação.

**Estados disponíveis:**
- `user`: Objeto do usuário autenticado (null se não autenticado)
- `isLoading`: Booleano indicando se está carregando
- `isAuthenticated`: Booleano indicando se o usuário está autenticado
- `logout`: Função assíncrona para fazer logout

### 2. Hooks Personalizados

#### `useAuth()` - `lib/hooks/useAuth.ts`
Hook para acessar dados completos de autenticação.

```typescript
import { useAuth } from '@/lib/hooks'

export function MyComponent() {
  const { user, isLoading, isAuthenticated, logout, userId, userEmail } = useAuth()
  
  return (
    <div>
      {isAuthenticated && <p>Bem-vindo, {userEmail}</p>}
    </div>
  )
}
```

#### `useSession()` - `lib/hooks/useSession.ts`
Hook leve para acessar apenas informações de sessão.

```typescript
import { useSession } from '@/lib/hooks'

export function MyComponent() {
  const { user, isLoading, isAuthenticated } = useSession()
  
  if (isLoading) return <div>Carregando...</div>
  
  return (
    <div>
      {isAuthenticated ? <p>Autenticado</p> : <p>Não autenticado</p>}
    </div>
  )
}
```

#### `useAuthRedirect()` - `lib/hooks/useAuthRedirect.ts`
Hook que redireciona automaticamente para login se não autenticado.

```typescript
'use client'

import { useAuthRedirect } from '@/lib/hooks'

export function ProtectedComponent() {
  const { isAuthenticated, isLoading } = useAuthRedirect()
  
  if (isLoading) return <div>Carregando...</div>
  
  return <div>Conteúdo protegido</div>
}
```

## Exemplos de Uso nas Páginas

### Jobs Page (`app/dashboard/jobs/page.tsx`)
```typescript
'use client'

import { useAuth } from '@/lib/hooks'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function JobsPage() {
  const { userId, isLoading } = useAuth()
  const [jobs, setJobs] = useState([])
  const supabase = createClient()

  useEffect(() => {
    if (!userId) return
    
    const fetchJobs = async () => {
      const { data } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      setJobs(data || [])
    }

    fetchJobs()
  }, [userId, supabase])

  if (isLoading) return <div>Carregando...</div>

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Minhas Vagas</h1>
      {/* Conteúdo da página */}
    </div>
  )
}
```

### New Job Page (`app/dashboard/jobs/new/page.tsx`)
```typescript
'use client'

import { useAuth } from '@/lib/hooks'

export default function NewJobPage() {
  const { userId, isLoading } = useAuth()

  if (isLoading) return <div>Carregando...</div>

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Nova Vaga</h1>
      {/* Formulário para criar nova vaga */}
    </div>
  )
}
```

### Favorites Page (`app/dashboard/favorites/page.tsx`)
```typescript
'use client'

import { useAuth } from '@/lib/hooks'

export default function FavoritesPage() {
  const { userId, isLoading } = useAuth()

  if (isLoading) return <div>Carregando...</div>

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Vagas Favoritas</h1>
      {/* Conteúdo da página */}
    </div>
  )
}
```

## Componentes Criados

### DashboardHeader (`components/dashboard-header.tsx`)
Componente de header reutilizável que exibe:
- Email do usuário autenticado
- Botão de logout

**Uso:**
```typescript
import { DashboardHeader } from '@/components/dashboard-header'

export default function Layout({ children }) {
  return (
    <div>
      <DashboardHeader />
      {children}
    </div>
  )
}
```

## Fluxo de Autenticação

1. **RootLayout** envolve a aplicação com `<AuthProvider>`
2. **AuthProvider** verifica o usuário autenticado ao carregar
3. **Hooks** acessam o contexto de autenticação
4. **Componentes client** usam os dados de autenticação

## Notas Importantes

- Todos os componentes que usam hooks devem ter `'use client'` no topo
- O `AuthProvider` é inserido no `RootLayout`, então está disponível em toda a aplicação
- A verificação de autenticação no `DashboardLayout` continua funcionando (server-side)
- Os hooks funcionam em componentes client dentro de páginas server-rendered

## Próximos Passos

1. Atualize as páginas (`jobs`, `new`, `favorites`) para usar `'use client'` e os hooks se precisar de funcionalidades client-side
2. Use o `DashboardHeader` no `DashboardLayout`
3. Implemente `useAuthRedirect` em componentes que precisam de proteção adicional
