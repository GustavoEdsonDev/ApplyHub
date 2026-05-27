'use client'

import { useAuthContext } from '@/lib/contexts/auth-context'

export function useAuth() {
  const context = useAuthContext()
  
  return {
    user: context.user,
    isLoading: context.isLoading,
    isAuthenticated: context.isAuthenticated,
    logout: context.logout,
    userId: context.user?.id,
    userEmail: context.user?.email,
  }
}
