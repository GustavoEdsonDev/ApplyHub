// Status mappings
export const statusOptions = {
  saved: 'saved',
  applied: 'applied',
  technical_test: 'technical_test',
  interview: 'interview',
  offer: 'offer',
  rejected: 'rejected',
} as const

export const statusLabels: Record<string, string> = {
  saved: 'Salvo',
  applied: 'Candidatura Enviada',
  technical_test: 'Teste Técnico',
  interview: 'Entrevista',
  offer: 'Oferta',
  rejected: 'Rejeitado',
}

// Work mode mappings
export const workModeOptions = {
  remote: 'remote',
  onsite: 'onsite',
  hybrid: 'hybrid',
} as const

export const workModeLabels: Record<string, string> = {
  remote: 'Remoto',
  onsite: 'Presencial',
  hybrid: 'Híbrido',
}

// Seniority mappings
export const seniorityOptions = {
  internship: 'internship',
  junior: 'junior',
  mid_level: 'mid_level',
  senior: 'senior',
} as const

export const seniorityLabels: Record<string, string> = {
  internship: 'Estágio',
  junior: 'Júnior',
  mid_level: 'Pleno',
  senior: 'Sênior',
}
