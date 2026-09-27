import type { ProgressState, SrsCard } from '../types'
import { addDaysISO, todayISO } from './text'

/**
 * Планировщик повторений на основе упрощённого SM-2.
 * Оценки: 0 — снова (забыл), 1 — трудно, 2 — хорошо, 3 — легко.
 */
export type Grade = 0 | 1 | 2 | 3

export const GRADE_LABELS: { grade: Grade; label: string; hint: string }[] = [
  { grade: 0, label: 'Забыл', hint: 'показать снова через минуту' },
  { grade: 1, label: 'Трудно', hint: 'интервал вырастет медленно' },
  { grade: 2, label: 'Хорошо', hint: 'обычный интервал' },
  { grade: 3, label: 'Легко', hint: 'интервал вырастет быстрее' },
]

export function newCard(): SrsCard {
  return { streak: 0, ease: 2.5, interval: 0, due: todayISO(), seen: 0, correct: 0 }
}

/** Сколько дней добавляется при первом успешном ответе по интервалу. */
const STEPS = [0, 1, 2, 4, 7, 14, 30, 60, 120]

export function schedule(card: SrsCard, grade: Grade): SrsCard {
  const next: SrsCard = { ...card }
  next.seen = card.seen + 1

  if (grade === 0) {
    next.streak = 0
    next.interval = 0
    next.ease = Math.max(1.3, card.ease - 0.2)
    next.due = todayISO()
    return next
  }

  next.streak = card.streak + 1
  next.correct = card.correct + 1

  if (grade === 1) next.ease = Math.max(1.3, card.ease - 0.15)
  if (grade === 3) next.ease = Math.min(3.2, card.ease + 0.12)

  const step = Math.min(next.streak, STEPS.length - 1)
  let days: number
  if (next.streak <= 3) {
    days = STEPS[step]
  } else {
    days = Math.max(1, Math.round(card.interval * next.ease))
  }
  if (grade === 1) days = Math.max(1, Math.round(days * 0.6))
  if (grade === 3) days = Math.max(1, Math.round(days * 1.3))

  next.interval = days
  next.due = addDaysISO(days)
  return next
}

export function isDue(card: SrsCard, date = todayISO()): boolean {
  return card.due <= date
}

export type CardState = 'new' | 'learning' | 'review' | 'mastered'

export function cardState(card: SrsCard | undefined): CardState {
  if (!card || card.seen === 0) return 'new'
  if (card.interval >= 30) return 'mastered'
  if (card.interval >= 1) return 'review'
  return 'learning'
}

export const STATE_LABELS: Record<CardState, string> = {
  new: 'новое',
  learning: 'учится',
  review: 'на повторении',
  mastered: 'освоено',
}

/** Точность ответов в процентах. */
export function accuracy(card: SrsCard | undefined): number {
  if (!card || card.seen === 0) return 0
  return Math.round((card.correct / card.seen) * 100)
}

export interface DeckStats {
  total: number
  newCount: number
  learning: number
  review: number
  mastered: number
  due: number
  accuracy: number
  /** Прогресс 0..1 */
  progress: number
}

export function deckStats(ids: string[], state: ProgressState): DeckStats {
  let nw = 0
  let learning = 0
  let review = 0
  let mastered = 0
  let due = 0
  let correct = 0
  let seen = 0
  const today = todayISO()

  for (const id of ids) {
    const card = state.cards[id]
    const st = cardState(card)
    if (st === 'new') nw++
    if (st === 'learning') learning++
    if (st === 'review') review++
    if (st === 'mastered') mastered++
    if (card && card.due <= today) due++
    if (card) {
      correct += card.correct
      seen += card.seen
    }
  }

  const total = ids.length || 1
  // Прогресс: освоенное весит 1, на повторении — 0.6, учится — 0.3
  const progress = (mastered + review * 0.6 + learning * 0.3) / total

  return {
    total: ids.length,
    newCount: nw,
    learning,
    review,
    mastered,
    due,
    accuracy: seen ? Math.round((correct / seen) * 100) : 0,
    progress: Math.min(1, progress),
  }
}
