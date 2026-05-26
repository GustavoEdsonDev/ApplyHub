'use client'

import { useEffect, useState } from 'react'

export function SupabaseDebug() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Log environment variables (safe - only public keys)
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    
    console.log('=== SUPABASE DEBUG ===')
    console.log('NEXT_PUBLIC_SUPABASE_URL:', url)
    console.log('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY exists:', !!key)
    
    if (!url) {
      console.error('❌ NEXT_PUBLIC_SUPABASE_URL NÃO ESTÁ DEFINIDA')
      console.log('Solução: Adicione ao .env.local:\nNEXT_PUBLIC_SUPABASE_URL=https://seu-id.supabase.co')
      return
    }
    
    if (!key) {
      console.error('❌ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY NÃO ESTÁ DEFINIDA')
      console.log('Solução: Adicione ao .env.local:\nNEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=seu_chave_aqui')
      return
    }

    if (!url.includes('supabase.co')) {
      console.error('❌ URL PARECE INVÁLIDA:', url)
      return
    }

    if (!key.startsWith('sb_')) {
      console.warn('⚠️ CHAVE NÃO COMEÇA COM "sb_". Pode estar incorreta:', key.substring(0, 20))
    }

    console.log('✅ Variáveis parecem OK')
    console.log('Testando conexão com Supabase...')

    // Test with a simple OPTIONS request to avoid CORS issues
    fetch(`${url}/auth/v1/`, {
      method: 'OPTIONS',
    })
      .then((res) => {
        console.log('✅ Supabase respondeu com status:', res.status)
        if (!res.ok) {
          console.warn('⚠️ Status não é 200. Projeto pode estar inativo.')
        }
      })
      .catch((err) => {
        console.error('❌ ERRO ao conectar Supabase:', err.message)
        console.error('Causas possíveis:')
        console.error('1. Projeto Supabase está paused/deletado')
        console.error('2. URL está incorreta')
        console.error('3. Problema de conectividade')
        console.error('4. Firewall/VPN bloqueando acesso')
      })
  }, [mounted])

  return null
}
