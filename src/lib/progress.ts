import { useSyncExternalStore } from 'react'
import type { DayStat, ProgressState } from '../types'
import { schedule, type Grade } from './srs'
import { todayISO } from './text'

const KEY = 'deutsch-trainer-progress-v1'

export function emptyState(): ProgressState {
  return {
    version: 1,
    cards: {},
    days: {},
    grammarRead: [],
    favorites: [],
    settings: {
      dailyGoal: 30,
      voiceURI: null,
      rate: 0.9,
      showIpa: true,
      theme: 'light',
    },
  }
}

function load(): ProgressState {
  if (typeof localStorage === 'undefined') return emptyState()
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    const base = emptyState()
    return {
      ...base,
      ...parsed,
      cards: parsed.cards ?? {},
      days: parsed.days ?? {},
      grammarRead: parsed.grammarRead ?? [],
      favorites: parsed.favorites ?? [],
      settings: { ...base.settings, ...(parsed.settings ?? {}) },
    }
  } catch {
    return emptyState()
  }
}

class ProgressStore {
  private state: ProgressState = load()
  private listeners = new Set<() => void>()

  subscribe = (fn: () => void): (() => void) => {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  getSnapshot = (): ProgressState => this.state

  private emit() {
    this.listeners.forEach((fn) => fn())
  }

  private persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(this.state))
    } catch {
      /* хранилище может быть недоступно — молча игнорируем */
    }
  }

  private commit(next: ProgressState) {
    this.state = next
    this.persist()
    this.emit()
  }

  /** Обновляет статистику за сегодня. */
  private withToday(patch: Partial<DayStat>): Record<string, DayStat> {
    const date = todayISO()
    const prev: DayStat = this.state.days[date] ?? { date, reviews: 0, correct: 0, xp: 0, seconds: 0 }
    const merged: DayStat = {
      date,
      reviews: prev.reviews + (patch.reviews ?? 0),
      correct: prev.correct + (patch.correct ?? 0),
      xp: prev.xp + (patch.xp ?? 0),
      seconds: prev.seconds + (patch.seconds ?? 0),
    }
    return { ...this.state.days, [date]: merged }
  }

  /** Оценка карточки в SRS + начисление XP. */
  gradeCard(id: string, grade: Grade, xp = 10): void {
    const card = this.state.cards[id] ?? { streak: 0, ease: 2.5, interval: 0, due: todayISO(), seen: 0, correct: 0 }
    const next = schedule(card, grade)
    next.last = todayISO()
    this.commit({
      ...this.state,
      cards: { ...this.state.cards, [id]: next },
      days: this.withToday({
        reviews: 1,
        correct: grade > 0 ? 1 : 0,
        xp: grade > 0 ? xp : Math.round(xp / 3),
      }),
    })
  }

  /** Регистрирует ответ в упражнении (без SRS). */
  recordAnswer(correct: boolean, xp = 5): void {
    this.commit({
      ...this.state,
      days: this.withToday({ reviews: 1, correct: correct ? 1 : 0, xp: correct ? xp : 0 }),
    })
  }

  addSeconds(seconds: number): void {
    if (seconds <= 0) return
    this.commit({ ...this.state, days: this.withToday({ seconds }) })
  }

  markGrammarRead(id: string): void {
    if (this.state.grammarRead.includes(id)) return
    this.commit({
      ...this.state,
      grammarRead: [...this.state.grammarRead, id],
      days: this.withToday({ xp: 5 }),
    })
  }

  toggleFavorite(id: string): void {
    const has = this.state.favorites.includes(id)
    this.commit({
      ...this.state,
      favorites: has ? this.state.favorites.filter((f) => f !== id) : [...this.state.favorites, id],
    })
  }

  updateSettings(patch: Partial<ProgressState['settings']>): void {
    this.commit({ ...this.state, settings: { ...this.state.settings, ...patch } })
  }

  resetAll(): void {
    this.commit(emptyState())
  }

  /** Сбросить только прогресс лексики/глаголов, сохранив настройки. */
  resetCards(): void {
    this.commit({ ...this.state, cards: {}, days: {} })
  }
}

export const progressStore = new ProgressStore()

export function useProgress(): ProgressState {
  return useSyncExternalStore(progressStore.subscribe, progressStore.getSnapshot, progressStore.getSnapshot)
}

/* -------------------- Производные показатели -------------------- */

export interface StreakInfo {
  current: number
  best: number
  activeToday: boolean
}

export function computeStreak(state: ProgressState): StreakInfo {
  const dates = Object.values(state.days)
    .filter((d) => d.reviews > 0)
    .map((d) => d.date)
    .sort()
  const set = new Set(dates)
  const today = todayISO()
  const yesterday = (() => {
    const d = new Date()
    d.setDate(d.getDate() - 1)
    return todayISO(d)
  })()

  let current = 0
  if (set.has(today) || set.has(yesterday)) {
    const cursor = new Date(set.has(today) ? today : yesterday)
    while (set.has(todayISO(cursor))) {
      current++
      cursor.setDate(cursor.getDate() - 1)
    }
  }

  let best = 0
  let run = 0
  let prev: string | null = null
  for (const d of dates) {
    if (prev) {
      const pd = new Date(prev)
      pd.setDate(pd.getDate() + 1)
      run = todayISO(pd) === d ? run + 1 : 1
    } else {
      run = 1
    }
    best = Math.max(best, run)
    prev = d
  }

  return { current, best, activeToday: set.has(today) }
}

export interface Totals {
  reviews: number
  correct: number
  xp: number
  seconds: number
  accuracy: number
  daysActive: number
  today: DayStat
}

export function computeTotals(state: ProgressState): Totals {
  let reviews = 0
  let correct = 0
  let xp = 0
  let seconds = 0
  let daysActive = 0
  for (const d of Object.values(state.days)) {
    if (d.reviews === 0 && d.seconds === 0) continue
    reviews += d.reviews
    correct += d.correct
    xp += d.xp
    seconds += d.seconds
    daysActive++
  }
  const today = state.days[todayISO()] ?? { date: todayISO(), reviews: 0, correct: 0, xp: 0, seconds: 0 }
  return {
    reviews,
    correct,
    xp,
    seconds,
    accuracy: reviews ? Math.round((correct / reviews) * 100) : 0,
    daysActive,
    today,
  }
}

/** Уровень и прогресс до следующего уровня. */
export function levelFromXp(xp: number): { level: number; into: number; need: number; title: string } {
  const titles = ['Anfänger', 'Einsteiger', 'Lernender', 'Fortgeschritten', 'Könner', 'Profi']
  let level = 1
  let need = 100
  let remaining = xp
  while (remaining >= need) {
    remaining -= need
    level++
    need = Math.round(need * 1.35)
  }
  return {
    level,
    into: remaining,
    need,
    title: titles[Math.min(titles.length - 1, Math.floor((level - 1) / 2))],
  }
}
