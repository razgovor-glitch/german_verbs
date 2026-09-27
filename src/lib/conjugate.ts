import type { Forms6, VerbEntry } from '../types'

/**
 * Построение всех форм глагола.
 * Для слабых глаголов формы выводятся из основы, для сильных берутся явные массивы.
 */

/** Нужно ли вставочное -e- перед окончанием (основа на -t, -d, -fn, -gn, -chn, -tm…). */
function needsE(stem: string): boolean {
  if (/(t|d)$/.test(stem)) return true
  if (/(ffn|chn|ckn|tm|dm|gn|fn)$/.test(stem)) return true
  if (/[^aeiouäöülrmnh](m|n)$/.test(stem)) return true
  return false
}

export function praesensForms(v: VerbEntry): Forms6 {
  if (v.praesens) return v.praesens
  const stem = v.stem ?? v.inf.replace(/en$/, '').replace(/n$/, '')
  const e = needsE(stem) ? 'e' : ''
  const sEnding = /(s|ß|z|x)$/.test(stem) ? 't' : `${e}st`
  return [
    `${stem}${e}`,
    `${stem}${sEnding}`,
    `${stem}${e}t`,
    `${stem}en`,
    `${stem}${e}t`,
    `${stem}en`,
  ]
}

export function praeteritumForms(v: VerbEntry): Forms6 | null {
  if (v.praeteritum) return v.praeteritum
  if (!v.stem && !v.praeteritumStem) return null
  const stem = v.praeteritumStem ?? v.stem!
  const e = needsE(stem) ? 'e' : ''
  return [
    `${stem}te`,
    `${stem}te${e}st`,
    `${stem}te`,
    `${stem}ten`,
    `${stem}te${e}t`,
    `${stem}ten`,
  ]
}

export const personLabels = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'] as const
export type PersonIndex = 0 | 1 | 2 | 3 | 4 | 5

/** Собирает полный Partizip II с учётом отделяемой приставки. */
export function partizip2WithPrefix(v: VerbEntry): string {
  return v.partizip2
}

/** Инфинитив с отделяемой приставкой в конце, например «stehe … auf». */
export function splitSeparable(v: VerbEntry, form: string): { head: string; tail: string } {
  if (!v.separable) return { head: form, tail: '' }
  const prefix = v.separable
  if (form.startsWith(`${prefix} `)) {
    return { head: form.slice(prefix.length + 1), tail: prefix }
  }
  return { head: form, tail: '' }
}

/** Правильные формы Perfekt для всех лиц: «habe gemacht», «bin gegangen». */
export function perfektForms(v: VerbEntry): Forms6 {
  const aux = v.aux === 'sein'
    ? ['bin', 'bist', 'ist', 'sind', 'seid', 'sind']
    : ['habe', 'hast', 'hat', 'haben', 'habt', 'haben']
  return aux.map((a) => `${a} ${v.partizip2}`) as Forms6
}

/** Проверяет, есть ли у глагола в презенсе смена корневой гласной. */
export function hasVowelChange(v: VerbEntry): boolean {
  if (!v.praesens) return false
  const stem = v.inf.replace(/(en|n)$/, '')
  return !v.praesens[1].startsWith(stem) || !v.praesens[2].startsWith(stem)
}

export interface ConjugationRow {
  label: string
  praesens: string
  praeteritum: string
  perfekt: string
}

export function conjugationTable(v: VerbEntry): ConjugationRow[] {
  const pr = praesensForms(v)
  const pa = praeteritumForms(v)
  const pf = perfektForms(v)
  return personLabels.map((label, i) => ({
    label,
    praesens: pr[i],
    praeteritum: pa ? pa[i] : '—',
    perfekt: pf[i],
  }))
}
