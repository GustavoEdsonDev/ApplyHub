import { statusLabels, workModeLabels, seniorityLabels } from '@/lib/constants'

export function getStatusLabel(status: string): string {
  return statusLabels[status] || status
}

export function getWorkModeLabel(workMode: string): string {
  return workModeLabels[workMode] || workMode
}

export function getSeniorityLabel(seniority: string): string {
  return seniorityLabels[seniority] || seniority
}
