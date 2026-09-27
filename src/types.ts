/**
 * Общие типы приложения.
 * Всё содержимое курса описано здесь, чтобы данные были строго типизированы.
 */

export type Gender = 'der' | 'die' | 'das'
export type Pos =
  | 'noun'
  | 'verb'
  | 'adj'
  | 'adv'
  | 'phrase'
  | 'num'
  | 'pron'
  | 'prep'
  | 'conj'
  | 'particle'

export type Level = 'A1' | 'A1+' | 'A2'

/* ------------------------------------------------------------------ */
/* Фонетика / алфавит                                                  */
/* ------------------------------------------------------------------ */

export interface LetterEntry {
  /** Заглавная буква */
  upper: string
  /** Строчная буква */
  lower: string
  /** Название буквы по-немецки, напр. «beː» */
  name: string
  /** IPA-звук(и), которые буква обычно даёт */
  ipa: string
  /** Приближение русскими буквами */
  ru: string
  /** Пример-слово */
  example: string
  exampleRu: string
  /** Подсказка/ловушка для русскоязычного */
  hint?: string
  kind: 'vowel' | 'consonant' | 'special'
}

export interface PhoneticRule {
  id: string
  /** Графема/сочетание */
  pattern: string
  ipa: string
  /** Как звучит по-русски */
  ru: string
  /** Правило простыми словами */
  rule: string
  examples: { de: string; ru: string }[]
  /** Типичная ошибка русскоязычных */
  pitfall?: string
  level: Level
}

/* ------------------------------------------------------------------ */
/* Лексика                                                             */
/* ------------------------------------------------------------------ */

export interface VocabEntry {
  id: string
  /** Немецкое слово (без артикля) */
  de: string
  ru: string
  pos: Pos
  article?: Gender
  plural?: string
  ipa?: string
  /** Контекст: короткое предложение с переводом */
  example: { de: string; ru: string }
  deck: string
  level: Level
  /** Синонимы / антонимы / заметка */
  note?: string
}

export interface Deck {
  id: string
  title: string
  titleRu: string
  icon: string
  blurb: string
  level: Level
}

/* ------------------------------------------------------------------ */
/* Глаголы                                                             */
/* ------------------------------------------------------------------ */

export type VerbKind = 'regular' | 'irregular' | 'mixed' | 'modal' | 'auxiliary'

/** 6 форм: ich, du, er/sie/es, wir, ihr, sie/Sie */
export type Forms6 = [string, string, string, string, string, string]

export interface VerbEntry {
  id: string
  inf: string
  ru: string
  kind: VerbKind
  level: Level
  /** Основа инфинитива для регулярных глаголов (без -en/-n) */
  stem?: string
  /** Явные формы презенса, если есть изменение корневой гласной / неправильность */
  praesens?: Forms6
  /** Явные формы претерита (для сильных/неправильных) */
  praeteritum?: Forms6
  /** Основа претерита для слабых глаголов */
  praeteritumStem?: string
  partizip2: string
  aux: 'haben' | 'sein'
  imperativ: { du: string; ihr: string; sie: string }
  /** Управление: падеж / предлог */
  gov?: string
  /** Комментарий: смена гласной, отделяемая приставка и т. п. */
  note?: string
  /** Отделяемая приставка (для trennbare Verben) */
  separable?: string
  /** 2–3 предложения в контексте */
  examples: { de: string; ru: string }[]
}

/* ------------------------------------------------------------------ */
/* Грамматика                                                          */
/* ------------------------------------------------------------------ */

export interface GrammarTable {
  caption?: string
  head: string[]
  rows: string[][]
}

export interface GrammarSection {
  heading: string
  /** Абзацы; поддержка **жирного** и `кода` */
  body?: string[]
  table?: GrammarTable
  examples?: { de: string; ru: string; note?: string }[]
}

export interface GrammarTopic {
  id: string
  title: string
  titleRu: string
  level: Level
  summary: string
  sections: GrammarSection[]
  /** Ловушки для русскоязычных */
  pitfalls?: string[]
  /** Мнемоники / советы */
  tips?: string[]
  /** Связанные id упражнений */
  drills?: DrillKind[]
}

/* ------------------------------------------------------------------ */
/* Упражнения                                                          */
/* ------------------------------------------------------------------ */

export type DrillKind =
  | 'de-ru-choice'
  | 'ru-de-choice'
  | 'typing-de'
  | 'article'
  | 'plural'
  | 'conjugation'
  | 'perfekt'
  | 'listening'
  | 'sentence-order'
  | 'case-choice'

export interface DrillMeta {
  id: DrillKind
  title: string
  titleRu: string
  desc: string
  icon: string
}

export interface ChoiceItem {
  kind: 'choice'
  id: string
  prompt: string
  promptHint?: string
  /** Озвучиваемый немецкий текст */
  speak?: string
  options: string[]
  answer: string
  explanation?: string
}

export interface TypingItem {
  kind: 'typing'
  id: string
  prompt: string
  promptHint?: string
  answer: string
  /** Допустимые варианты (ae вместо ä и т. п.) */
  altAnswers?: string[]
  speak?: string
  explanation?: string
}

export interface OrderItem {
  kind: 'order'
  id: string
  prompt: string
  promptHint?: string
  words: string[]
  answer: string
  explanation?: string
}

export type DrillItem = ChoiceItem | TypingItem | OrderItem

/* ------------------------------------------------------------------ */
/* Прогресс / SRS                                                      */
/* ------------------------------------------------------------------ */

export interface SrsCard {
  /** Сколько раз подряд ответили верно */
  streak: number
  /** Коэффициент лёгкости (SM-2) */
  ease: number
  /** Интервал в днях */
  interval: number
  /** Дата следующего повторения, ISO yyyy-mm-dd */
  due: string
  /** Всего попыток */
  seen: number
  /** Всего верных */
  correct: number
  /** Последний раз, ISO */
  last?: string
}

export interface DayStat {
  /** ISO дата */
  date: string
  reviews: number
  correct: number
  xp: number
  seconds: number
}

export interface ProgressState {
  version: number
  cards: Record<string, SrsCard>
  days: Record<string, DayStat>
  /** Множество id пройденных грамматических тем */
  grammarRead: string[]
  /** Избранные слова */
  favorites: string[]
  settings: {
    dailyGoal: number
    voiceURI: string | null
    rate: number
    showIpa: boolean
    theme: 'light' | 'dark'
  }
}
