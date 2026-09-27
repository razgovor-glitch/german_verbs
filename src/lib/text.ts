/** Утилиты для текста: нормализация ввода, транслитерация умлаутов, перемешивание. */

/** Приводит ввод к сравнимому виду: нижний регистр, ё→е, схлопывание пробелов, удаление пунктуации. */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/ё/g, 'е')
    .replace(/[.,!?;:„“"«»()\-–—]/g, '')
    .replace(/\s+/g, ' ')
}

/**
 * Варианты ответа с учётом «латинских» замен умлаутов.
 * Немецкая раскладка недоступна → человек пишет ae/oe/ue/ss. Это должно засчитываться.
 */
export function umlautVariants(word: string): string[] {
  const map: [RegExp, string][] = [
    [/ä/g, 'ae'],
    [/ö/g, 'oe'],
    [/ü/g, 'ue'],
    [/ß/g, 'ss'],
    [/Ä/g, 'Ae'],
    [/Ö/g, 'Oe'],
    [/Ü/g, 'Ue'],
  ]
  const out = new Set<string>()
  out.add(word)
  // Поочерёдно применяем каждую замену отдельно и все вместе
  let all = word
  for (const [re, rep] of map) all = all.replace(re, rep)
  out.add(all)
  for (const [re, rep] of map) out.add(word.replace(re, rep))
  // Иногда пишут s вместо ss
  out.add(word.replace(/ß/g, 's'))
  return [...out]
}

/** Проверка ответа набора текста: строгое сравнение с учётом вариантов. */
export function checkTyping(input: string, answer: string, alt: string[] = []): boolean {
  const candidates = new Set<string>()
  for (const v of [answer, ...alt]) {
    for (const variant of umlautVariants(v)) candidates.add(normalize(variant))
  }
  return candidates.has(normalize(input))
}

/** Перемешивание (Fisher–Yates), не мутирует исходный массив. */
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pickRandom<T>(arr: readonly T[], n: number): T[] {
  return shuffle(arr).slice(0, n)
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/** Мини-разметка: **жирный**, `код`, *курсив* → HTML. */
export function inlineMd(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/(^|\s)\*(?!\s)(.+?)\*/g, '$1<em>$2</em>')
}

export function todayISO(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function addDaysISO(days: number, from = new Date()): string {
  const d = new Date(from)
  d.setDate(d.getDate() + days)
  return todayISO(d)
}

export function formatSeconds(total: number): string {
  const m = Math.floor(total / 60)
  const s = total % 60
  if (m === 0) return `${s} с`
  return `${m} мин ${s} с`
}
