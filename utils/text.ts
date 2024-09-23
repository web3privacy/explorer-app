import moment from 'moment'

export function formatDate(date: Date | string) {
  return moment(date).format('MM / YYYY')
}

export function capitalize(word: string): string {
  if (!word) return word
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}
