'use client'

import { useAuthContext } from '@/lib/contexts/auth-context'

export function useSession() {
  const context = useAuthContext()
  
  return {
    user: context.user,
    isLoading: context.isLoading,
    isAuthenticated: context.isAuthenticated,
  }
}
