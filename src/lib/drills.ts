import type { ChoiceItem, DrillItem, OrderItem, TypingItem, VocabEntry } from '../types'
import { vocabulary } from '../data/vocabulary'
import { verbs } from '../data/verbs'
import { conjugationTable, partizip2WithPrefix, praesensForms } from './conjugate'
import { pickRandom, shuffle } from './text'

export interface DrillScope {
  decks?: string[]
  verbIds?: string[]
  /** Сколько заданий сгенерировать */
  count: number
}

function poolVocab(scope: DrillScope): VocabEntry[] {
  const decks = scope.decks
  const list = decks && decks.length > 0 ? vocabulary.filter((v) => decks.includes(v.deck)) : vocabulary
  return list
}

function poolVerbs(scope: DrillScope) {
  const ids = scope.verbIds
  return ids && ids.length > 0 ? verbs.filter((v) => ids.includes(v.id)) : verbs
}

/** Уникальные неправильные варианты для отвлекающих ответов. */
function distractors<T>(correct: T, pool: T[], key: (t: T) => string, n = 3): T[] {
  const used = new Set([key(correct)])
  const out: T[] = []
  for (const candidate of shuffle(pool)) {
    const k = key(candidate)
    if (used.has(k)) continue
    used.add(k)
    out.push(candidate)
    if (out.length >= n) break
  }
  return out
}

function choiceItem(
  id: string,
  prompt: string,
  answer: string,
  wrong: string[],
  opts: { promptHint?: string; speak?: string; explanation?: string } = {},
): ChoiceItem {
  return {
    kind: 'choice',
    id,
    prompt,
    options: shuffle([answer, ...wrong]),
    answer,
    promptHint: opts.promptHint,
    speak: opts.speak,
    explanation: opts.explanation,
  }
}

/* ------------------------- Генераторы ------------------------- */

export function genDeRu(scope: DrillScope): DrillItem[] {
  const pool = poolVocab(scope)
  const items: DrillItem[] = []
  for (const v of pickRandom(pool, scope.count)) {
    const wrong = distractors(v, pool, (x) => x.ru).map((x) => x.ru)
    if (wrong.length < 3) continue
    items.push(
      choiceItem(`de-ru:${v.id}`, v.de, v.ru, wrong, {
        promptHint: v.pos === 'noun' && v.article ? `${v.article} ${v.de}` : undefined,
        speak: v.de,
        explanation: `${v.example.de} — ${v.example.ru}`,
      }),
    )
  }
  return items
}

export function genRuDe(scope: DrillScope): DrillItem[] {
  const pool = poolVocab(scope)
  const items: DrillItem[] = []
  for (const v of pickRandom(pool, scope.count)) {
    const wrong = distractors(v, pool, (x) => x.de).map((x) => (x.article ? `${x.article} ${x.de}` : x.de))
    if (wrong.length < 3) continue
    const answer = v.article ? `${v.article} ${v.de}` : v.de
    items.push(
      choiceItem(`ru-de:${v.id}`, v.ru, answer, wrong, {
        promptHint: v.pos === 'noun' ? 'выберите с правильным артиклем' : undefined,
        speak: answer,
        explanation: v.example.de + ' — ' + v.example.ru,
      }),
    )
  }
  return items
}

export function genTyping(scope: DrillScope): DrillItem[] {
  const pool = poolVocab(scope).filter((v) => v.de.length <= 22)
  const items: DrillItem[] = []
  for (const v of pickRandom(pool, scope.count)) {
    const answer = v.article ? `${v.article} ${v.de}` : v.de
    const alt: string[] = []
    if (v.article) alt.push(v.de)
    items.push({
      kind: 'typing',
      id: `typing:${v.id}`,
      prompt: v.ru,
      promptHint: v.pos === 'noun' ? `существительное с артиклем (${v.article})` : `часть речи: ${posRu(v.pos)}`,
      answer,
      altAnswers: alt,
      speak: answer,
      explanation: `${answer} — ${v.example.de} (${v.example.ru})`,
    } satisfies TypingItem)
  }
  return items
}

export function genArticle(scope: DrillScope): DrillItem[] {
  const pool = poolVocab(scope).filter((v) => v.pos === 'noun' && v.article)
  const items: DrillItem[] = []
  for (const v of pickRandom(pool, scope.count)) {
    items.push(
      choiceItem(`article:${v.id}`, `___ ${v.de}`, v.article!, ['der', 'die', 'das'].filter((a) => a !== v.article), {
        promptHint: `${v.ru}${v.plural ? ` · мн.: ${v.plural}` : ''}`,
        speak: `${v.article} ${v.de}`,
        explanation: `Правильно: ${v.article} ${v.de}${v.plural ? `, ${v.plural}` : ''}`,
      }),
    )
  }
  return items
}

export function genPlural(scope: DrillScope): DrillItem[] {
  const pool = poolVocab(scope).filter((v) => v.pos === 'noun' && v.plural && v.article)
  const items: DrillItem[] = []
  for (const v of pickRandom(pool, scope.count)) {
    const correctPlural = v.plural!.replace(/^die /, '')
    const candidates = pool
      .filter((x) => x.id !== v.id)
      .map((x) => x.plural!.replace(/^die /, ''))
    const wrong = distractors(correctPlural, candidates, (x) => x, 3)
    if (wrong.length < 3) continue
    items.push(
      choiceItem(`plural:${v.id}`, `${v.article} ${v.de} → ___`, correctPlural, wrong, {
        promptHint: v.ru,
        speak: v.plural,
        explanation: `Множественное число: ${v.plural}`,
      }),
    )
  }
  return items
}

const PERSON_LABELS = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie']
const PERSON_RU = ['я', 'ты', 'он/она', 'мы', 'вы (мн.)', 'они / Вы']

export function genConjugation(scope: DrillScope): DrillItem[] {
  const pool = poolVerbs(scope)
  const items: DrillItem[] = []
  for (const v of pickRandom(pool, scope.count)) {
    const forms = praesensForms(v)
    const idx = Math.floor(Math.random() * 6)
    const table = conjugationTable(v)
    const wrong = distractors(forms[idx], forms.filter((f) => f !== forms[idx]), (x) => x, 3)
    if (wrong.length < 3) continue
    items.push(
      choiceItem(
        `conj:${v.id}:${idx}`,
        `${v.inf} · ${PERSON_LABELS[idx]}`,
        forms[idx],
        wrong,
        {
          promptHint: `${v.ru} · ${PERSON_RU[idx]}`,
          speak: `${PERSON_LABELS[idx]} ${forms[idx]}`,
          explanation: `Präsens: ${table.map((r) => `${r.label} ${r.praesens}`).join(' · ')}`,
        },
      ),
    )
  }
  return items
}

export function genPerfekt(scope: DrillScope): DrillItem[] {
  const pool = poolVerbs(scope).filter((v) => v.partizip2 && v.partizip2 !== '—')
  const items: DrillItem[] = []
  for (const v of pickRandom(pool, scope.count)) {
    const correct = v.partizip2
    const others = pool.filter((x) => x.partizip2 !== correct).map((x) => x.partizip2)
    const wrong = distractors(correct, others, (x) => x, 3)
    if (wrong.length < 3) continue
    items.push(
      choiceItem(`perfekt:${v.id}`, `${v.inf} → Partizip II`, correct, wrong, {
        promptHint: `${v.ru} · Perfekt с ${v.aux}`,
        speak: `${v.aux} ${correct}`,
        explanation: `${v.aux} ${correct} — напр.: ${v.examples[0]?.de ?? ''}`,
      }),
    )
  }
  return items
}

export function genListening(scope: DrillScope): DrillItem[] {
  const pool = poolVocab(scope)
  const items: DrillItem[] = []
  for (const v of pickRandom(pool, scope.count)) {
    const wrong = distractors(v, pool, (x) => x.ru).map((x) => x.ru)
    if (wrong.length < 3) continue
    items.push({
      kind: 'choice',
      id: `listen:${v.id}`,
      prompt: '🔊',
      promptHint: 'Нажмите, чтобы прослушать, и выберите перевод',
      speak: v.de,
      options: shuffle([v.ru, ...wrong]),
      answer: v.ru,
      explanation: `${v.article ? v.article + ' ' : ''}${v.de} — ${v.ru}`,
    })
  }
  return items
}

export function genSentenceOrder(scope: DrillScope): DrillItem[] {
  const sentences = buildSentenceBank(scope)
  const items: DrillItem[] = []
  for (const s of pickRandom(sentences, scope.count)) {
    const words = s.de.replace(/[.!?]$/, '').split(/\s+/)
    if (words.length < 3 || words.length > 12) continue
    items.push({
      kind: 'order',
      id: `order:${s.id}`,
      prompt: s.ru,
      promptHint: 'Соберите немецкое предложение из слов',
      words: shuffle(words),
      answer: s.de,
      explanation: s.note,
    } satisfies OrderItem)
  }
  return items
}

export function genCaseChoice(scope: DrillScope): DrillItem[] {
  const bank = caseBank()
  const items: DrillItem[] = []
  for (const c of pickRandom(bank, scope.count)) {
    items.push(choiceItem(`case:${c.id}`, c.sentence, c.answer, c.wrong, { promptHint: c.hint, explanation: c.explanation }))
  }
  return items
}

/* ------------------------- Банки данных ------------------------- */

interface BankSentence {
  id: string
  de: string
  ru: string
  note?: string
}

function buildSentenceBank(scope: DrillScope): BankSentence[] {
  const out: BankSentence[] = []
  const vpool = poolVerbs(scope)
  for (const v of vpool) {
    v.examples.forEach((ex, i) => {
      const words = ex.de.replace(/[.!?]$/, '').split(/\s+/)
      if (words.length >= 3 && words.length <= 11) {
        out.push({
          id: `${v.id}-${i}`,
          de: ex.de,
          ru: ex.ru,
          note: `${v.inf} (${v.ru}) — ${v.note ?? 'порядок слов: спрягаемый глагол на 2-м месте'}`,
        })
      }
    })
  }
  const vpoolV = poolVocab(scope)
  for (const v of vpoolV) {
    const words = v.example.de.replace(/[.!?]$/, '').split(/\s+/)
    if (words.length >= 3 && words.length <= 9) {
      out.push({ id: `ex-${v.id}`, de: v.example.de, ru: v.example.ru })
    }
  }
  return out
}

interface CaseBankItem {
  id: string
  sentence: string
  answer: string
  wrong: string[]
  hint?: string
  explanation: string
}

function caseBank(): CaseBankItem[] {
  return [
    { id: 'c1', sentence: 'Ich sehe ___ Mann dort.', answer: 'den', wrong: ['der', 'dem', 'die'], hint: 'sehen + Akkusativ', explanation: 'Мужской род в Akkusativ: der → den.' },
    { id: 'c2', sentence: 'Ich helfe ___ Frau.', answer: 'der', wrong: ['die', 'den', 'das'], hint: 'helfen + Dativ', explanation: 'helfen требует Dativ. Женский род в Dativ: die → der.' },
    { id: 'c3', sentence: 'Das ist das Auto ___ Vaters.', answer: 'des', wrong: ['dem', 'der', 'den'], hint: 'принадлежность', explanation: 'Genitiv мужского рода: des Vaters.' },
    { id: 'c4', sentence: 'Ich fahre mit ___ Bus.', answer: 'dem', wrong: ['den', 'der', 'das'], hint: 'mit + Dativ', explanation: 'mit всегда с Dativ. Мужской род: dem Bus.' },
    { id: 'c5', sentence: 'Das Geschenk ist für ___ Schwester.', answer: 'meine', wrong: ['meiner', 'meinem', 'meinen'], hint: 'für + Akkusativ', explanation: 'für требует Akkusativ. Женский род: meine Schwester.' },
    { id: 'c6', sentence: 'Ich gehe in ___ Stadt.', answer: 'die', wrong: ['der', 'dem', 'den'], hint: 'Wohin? → Akkusativ', explanation: 'Направление (wohin) → Akkusativ. Женский род не меняется: die Stadt.' },
    { id: 'c7', sentence: 'Ich wohne in ___ Stadt.', answer: 'der', wrong: ['die', 'dem', 'den'], hint: 'Wo? → Dativ', explanation: 'Место (wo) → Dativ. Женский род: die → der Stadt.' },
    { id: 'c8', sentence: 'Ich danke ___ für die Hilfe.', answer: 'dir', wrong: ['dich', 'du', 'dein'], hint: 'danken + Dativ', explanation: 'danken требует Dativ: du → dir.' },
    { id: 'c9', sentence: 'Berlin gefällt ___ sehr.', answer: 'mir', wrong: ['mich', 'ich', 'mein'], hint: 'gefallen + Dativ', explanation: 'gefallen требует Dativ: ich → mir.' },
    { id: 'c10', sentence: 'Ich kaufe ___ Brot.', answer: 'das', wrong: ['dem', 'den', 'der'], hint: 'kaufen + Akkusativ', explanation: 'Средний род в Akkusativ не меняется: das Brot.' },
    { id: 'c11', sentence: 'Es gibt hier ___ Park.', answer: 'einen', wrong: ['ein', 'einem', 'einer'], hint: 'es gibt + Akkusativ', explanation: 'После es gibt — Akkusativ. Мужской род: einen Park.' },
    { id: 'c12', sentence: 'Wir sprechen über ___ Arbeit.', answer: 'die', wrong: ['der', 'dem', 'den'], hint: 'über + Akkusativ (о чём)', explanation: 'über в значении «о» требует Akkusativ. Женский род: die Arbeit.' },
    { id: 'c13', sentence: 'Die Katze ist unter ___ Tisch.', answer: 'dem', wrong: ['den', 'der', 'das'], hint: 'Wo? → Dativ', explanation: 'Место → Dativ. Мужской род: dem Tisch.' },
    { id: 'c14', sentence: 'Ich lege das Buch auf ___ Tisch.', answer: 'den', wrong: ['dem', 'der', 'das'], hint: 'Wohin? → Akkusativ', explanation: 'Направление → Akkusativ. Мужской род: den Tisch.' },
    { id: 'c15', sentence: 'Ich rufe ___ morgen an.', answer: 'dich', wrong: ['dir', 'du', 'dein'], hint: 'anrufen + Akkusativ', explanation: 'Исключение: anrufen требует Akkusativ, хотя по-русски «звоню тебе».' },
    { id: 'c16', sentence: 'Ich habe ___ Zeit.', answer: 'keine', wrong: ['kein', 'keinen', 'keiner'], hint: 'отрицание существительного', explanation: 'kein склоняется как ein. Женский род: keine Zeit.' },
    { id: 'c17', sentence: 'Ich habe ___ Bruder.', answer: 'einen', wrong: ['ein', 'einem', 'einer'], hint: 'haben + Akkusativ', explanation: 'Мужской род в Akkusativ: einen Bruder.' },
    { id: 'c18', sentence: 'Sie wohnt bei ___ Eltern.', answer: 'ihren', wrong: ['ihre', 'ihrer', 'ihrem'], hint: 'bei + Dativ, мн. число', explanation: 'bei + Dativ. Множественное число в Dativ: ihren Eltern (+ -n у существительного).' },
    { id: 'c19', sentence: 'Das Buch gehört ___ Kind.', answer: 'dem', wrong: ['das', 'den', 'der'], hint: 'gehören + Dativ', explanation: 'gehören требует Dativ. Средний род: dem Kind.' },
    { id: 'c20', sentence: 'Ich fahre nach ___ Schweiz.', answer: 'der', wrong: ['die', 'dem', 'den'], hint: 'страна с артиклем', explanation: 'Некоторые страны с артиклем: in die Schweiz (wohin) → nach der Schweiz (устар.) / in der Schweiz (wo). Здесь корректно in die Schweiz.' },
  ]
}

export function posRu(pos: string): string {
  const map: Record<string, string> = {
    noun: 'существительное',
    verb: 'глагол',
    adj: 'прилагательное',
    adv: 'наречие',
    phrase: 'выражение',
    num: 'числительное',
    pron: 'местоимение',
    prep: 'предлог',
    conj: 'союз',
    particle: 'частица',
  }
  return map[pos] ?? pos
}

export function generate(kind: string, scope: DrillScope): DrillItem[] {
  switch (kind) {
    case 'de-ru-choice':
      return genDeRu(scope)
    case 'ru-de-choice':
      return genRuDe(scope)
    case 'typing-de':
      return genTyping(scope)
    case 'article':
      return genArticle(scope)
    case 'plural':
      return genPlural(scope)
    case 'conjugation':
      return genConjugation(scope)
    case 'perfekt':
      return genPerfekt(scope)
    case 'listening':
      return genListening(scope)
    case 'sentence-order':
      return genSentenceOrder(scope)
    case 'case-choice':
      return genCaseChoice(scope)
    default:
      return genDeRu(scope)
  }
}

export { partizip2WithPrefix }
