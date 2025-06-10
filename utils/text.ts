import { format } from 'date-fns'

export function formatDate(date: Date | string) {
  return format(new Date(date), 'MM / yyyy')
}

export function capitalize(word: string): string {
  if (!word) return word
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}
