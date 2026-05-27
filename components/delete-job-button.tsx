'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export default function DeleteJobButton({ jobId }: { jobId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja deletar esta vaga?')) {
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch(`/api/job-applications/${jobId}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Erro ao deletar vaga')

      // Redirecionar para a lista de vagas após deletar
      router.push('/dashboard/jobs')
    } catch (error) {
      console.error(error)
      alert('Erro ao deletar vaga')
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleDelete}
      disabled={isLoading}
      variant="ghost"
      size="sm"
      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
    >
      <Trash2 size={16} />
    </Button>
  )
}
