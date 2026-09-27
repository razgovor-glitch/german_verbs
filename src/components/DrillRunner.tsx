import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChoiceItem, DrillItem, OrderItem, TypingItem } from '../types'
import { checkTyping, normalize, shuffle } from '../lib/text'
import { progressStore } from '../lib/progress'
import { Bar, Card, Example, SpeakButton, UmlautBar, toast } from './ui'
import { speak } from '../lib/speech'

interface Props {
  items: DrillItem[]
  title: string
  onExit: () => void
  /** Показывать ли кнопку прослушивания для prompt (для аудирования — иначе) */
  autoplay?: boolean
}

interface Result {
  id: string
  correct: boolean
  given: string
}

export default function DrillRunner({ items, title, onExit, autoplay = false }: Props) {
  const [index, setIndex] = useState(0)
  const [results, setResults] = useState<Result[]>([])
  const [answered, setAnswered] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)
  const [given, setGiven] = useState('')
  const [typed, setTyped] = useState('')
  const [placed, setPlaced] = useState<number[]>([])
  const [done, setDone] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const startedAt = useRef(Date.now())

  const item = items[index]
  const total = items.length

  /* ---------------- Перемешанные слова для порядка ---------------- */
  const orderWords = useMemo(() => {
    if (!item || item.kind !== 'order') return [] as string[]
    return item.words
  }, [item])

  useEffect(() => {
    setAnswered(false)
    setLastCorrect(false)
    setGiven('')
    setTyped('')
    setPlaced([])
    if (item && item.kind === 'typing') {
      setTimeout(() => inputRef.current?.focus(), 60)
    }
    if (item && item.kind === 'choice' && item.speak && autoplay) {
      setTimeout(() => speak(item.speak!, { rate: 0.85 }), 250)
    }
  }, [index, item, autoplay])

  useEffect(() => {
    return () => {
      const seconds = Math.round((Date.now() - startedAt.current) / 1000)
      progressStore.addSeconds(seconds)
    }
  }, [])

  if (!item) return null

  /* ---------------- Завершение ---------------- */
  if (done) {
    const correct = results.filter((r) => r.correct).length
    const pct = total ? Math.round((correct / total) * 100) : 0
    return (
      <div className="trainer fade-in">
        <Card>
          <div className="center" style={{ padding: '14px 0' }}>
            <div style={{ fontSize: 42 }}>{pct >= 90 ? '🏆' : pct >= 70 ? '👍' : pct >= 50 ? '💪' : '🔁'}</div>
            <h2 style={{ margin: '10px 0 4px' }}>
              {correct} из {total} верно
            </h2>
            <div className="muted small" style={{ marginBottom: 16 }}>
              Точность {pct}% · +{results.filter((r) => r.correct).length * 5} XP
            </div>
            <Bar value={total ? correct / total : 0} tone={pct >= 70 ? 'ok' : 'warn'} large />
          </div>

          {results.some((r) => !r.correct) && (
            <div style={{ marginTop: 20 }}>
              <div className="section__title" style={{ fontSize: 15, marginBottom: 8 }}>
                Разобрать ошибки
              </div>
              {results
                .filter((r) => !r.correct)
                .map((r) => {
                  const it = items.find((x) => x.id === r.id)
                  if (!it) return null
                  const correctAnswer = it.kind === 'order' ? it.answer : it.answer
                  const prompt = it.kind === 'order' ? it.prompt : it.prompt
                  return (
                    <div key={r.id} className="feedback feedback--err" style={{ marginBottom: 8 }}>
                      <div className="feedback__title">{prompt}</div>
                      <div className="small">
                        Ваш ответ: <s>{r.given || '—'}</s> · Верно: <strong>{correctAnswer}</strong>
                      </div>
                      {it.kind !== 'order' && it.explanation && (
                        <div className="tiny muted" style={{ marginTop: 3 }}>{it.explanation}</div>
                      )}
                    </div>
                  )
                })}
            </div>
          )}

          <div className="row" style={{ marginTop: 20, gap: 10 }}>
            <button className="btn btn--primary btn--lg" onClick={onExit}>
              Готово
            </button>
            <button
              className="btn btn--lg"
              onClick={() => {
                setResults([])
                setIndex(0)
                setDone(false)
                startedAt.current = Date.now()
              }}
            >
              Пройти заново
            </button>
          </div>
        </Card>
      </div>
    )
  }

  /* ---------------- Ответ ---------------- */
  const commit = (isCorrect: boolean, givenValue: string, xp = 5) => {
    setAnswered(true)
    setLastCorrect(isCorrect)
    setGiven(givenValue)
    setResults((prev) => [...prev, { id: item.id, correct: isCorrect, given: givenValue }])
    progressStore.recordAnswer(isCorrect, xp)
  }

  const next = () => {
    if (index + 1 >= total) setDone(true)
    else setIndex(index + 1)
  }

  const handleChoice = (option: string) => {
    if (answered) return
    const it = item as ChoiceItem
    const ok = normalize(option) === normalize(it.answer)
    commit(ok, option)
    if (it.speak) speak(it.speak, { rate: 0.85 })
  }

  const handleTyping = () => {
    if (answered) return
    const it = item as TypingItem
    const ok = checkTyping(typed, it.answer, it.altAnswers ?? [])
    commit(ok, typed.trim() || '—')
  }

  const handleOrder = () => {
    if (answered) return
    const it = item as OrderItem
    const built = placed.map((i) => orderWords[i]).join(' ')
    const ok = normalize(built) === normalize(it.answer.replace(/[.!?]$/, ''))
    commit(ok, built)
  }

  const progressValue = index / total

  return (
    <div className="trainer fade-in">
      <div className="row row--between" style={{ marginBottom: 12 }}>
        <div className="row" style={{ gap: 10 }}>
          <button className="btn btn--sm btn--ghost" onClick={onExit}>
            ← Выйти
          </button>
          <span className="small muted">{title}</span>
        </div>
        <span className="small muted">
          {index + 1} / {total}
        </span>
      </div>
      <Bar value={progressValue} large />

      <Card className="fade-in" key={item.id}>
        {/* ---------------- Условие ---------------- */}
        <div style={{ marginBottom: 18 }}>
          {item.kind === 'choice' && (
            <>
              <div className="row" style={{ gap: 10, alignItems: 'center' }}>
                <div
                  style={{
                    fontSize: item.prompt === '🔊' ? 30 : 22,
                    fontWeight: 650,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                  }}
                >
                  {item.prompt}
                </div>
                {item.speak && <SpeakButton text={item.speak} />}
              </div>
              {item.promptHint && <div className="small muted" style={{ marginTop: 4 }}>{item.promptHint}</div>}
            </>
          )}

          {item.kind === 'typing' && (
            <>
              <div className="row" style={{ gap: 10, alignItems: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 650, letterSpacing: '-0.01em' }}>{item.prompt}</div>
                {item.speak && answered && <SpeakButton text={item.speak} />}
              </div>
              {item.promptHint && <div className="small muted" style={{ marginTop: 4 }}>{item.promptHint}</div>}
            </>
          )}

          {item.kind === 'order' && (
            <>
              <div className="row" style={{ gap: 10, alignItems: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>{item.prompt}</div>
              </div>
              {item.promptHint && <div className="small muted" style={{ marginTop: 4 }}>{item.promptHint}</div>}
            </>
          )}
        </div>

        {/* ---------------- Варианты ---------------- */}
        {item.kind === 'choice' && (
          <div className="col" style={{ gap: 8 }}>
            {item.options.map((opt, i) => {
              const isAnswer = normalize(opt) === normalize(item.answer)
              let cls = 'option'
              if (answered && isAnswer) cls += ' option--correct'
              else if (answered && normalize(opt) === normalize(given)) cls += ' option--wrong'
              return (
                <button key={opt} className={cls} onClick={() => handleChoice(opt)} disabled={answered}>
                  <span className="option__key">{i + 1}</span>
                  <span>{opt}</span>
                </button>
              )
            })}
          </div>
        )}

        {item.kind === 'typing' && (
          <div className="col" style={{ gap: 10 }}>
            <input
              ref={inputRef}
              className={`typing-input ${
                answered ? (lastCorrect ? 'typing-input--correct' : 'typing-input--wrong') : ''
              }`}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (answered) next()
                  else handleTyping()
                }
              }}
              placeholder="Напишите по-немецки…"
              disabled={answered}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            {!answered && <UmlautBar onInsert={(ch) => setTyped((t) => t + ch)} />}
            {!answered && (
              <div className="row" style={{ gap: 8 }}>
                <button className="btn btn--primary" onClick={handleTyping} disabled={!typed.trim()}>
                  Проверить
                </button>
                <button className="btn btn--ghost btn--sm" onClick={() => setTyped(typed + 'ß')} style={{ display: 'none' }}>
                  ß
                </button>
                <span className="tiny muted">Enter — проверить · можно писать ae, oe, ue, ss вместо умлаутов</span>
              </div>
            )}
          </div>
        )}

        {item.kind === 'order' && (
          <div className="col" style={{ gap: 12 }}>
            <div className="order-bank">
              {placed.map((wi, pos) => (
                <button
                  key={`p-${wi}-${pos}`}
                  className="order-tile order-tile--placed"
                  onClick={() => {
                    if (answered) return
                    setPlaced(placed.filter((_, p) => p !== pos))
                  }}
                  disabled={answered}
                >
                  {orderWords[wi]}
                </button>
              ))}
              {placed.length === 0 && <span className="small muted" style={{ padding: '6px 4px' }}>Нажимайте слова ниже…</span>}
            </div>
            <div className="order-bank" style={{ borderStyle: 'solid', background: 'var(--surface)' }}>
              {orderWords.map((w, wi) =>
                placed.includes(wi) ? null : (
                  <button
                    key={`w-${wi}`}
                    className="order-tile"
                    onClick={() => {
                      if (answered) return
                      setPlaced([...placed, wi])
                    }}
                    disabled={answered}
                  >
                    {w}
                  </button>
                ),
              )}
            </div>
            {!answered && (
              <div className="row" style={{ gap: 8 }}>
                <button className="btn btn--primary" onClick={handleOrder} disabled={placed.length === 0}>
                  Проверить
                </button>
                <button className="btn btn--ghost btn--sm" onClick={() => setPlaced([])} disabled={placed.length === 0}>
                  Очистить
                </button>
              </div>
            )}
          </div>
        )}

        {/* ---------------- Обратная связь ---------------- */}
        {answered && (
          <div className="fade-in" style={{ marginTop: 16 }}>
            <div className={`feedback ${lastCorrect ? 'feedback--ok' : 'feedback--err'}`}>
              <div className="feedback__title">{lastCorrect ? '✓ Верно' : '✗ Ошибка'}</div>
              {!lastCorrect && (
                <div className="small">
                  Правильный ответ: <strong>{item.kind === 'order' ? item.answer : item.answer}</strong>
                </div>
              )}
              {item.kind !== 'order' && item.explanation && (
                <div className="small" style={{ marginTop: 3 }}>{item.explanation}</div>
              )}
              {item.kind === 'order' && item.explanation && (
                <div className="small" style={{ marginTop: 3 }}>{item.explanation}</div>
              )}
            </div>
            <div className="row" style={{ marginTop: 12, gap: 8 }}>
              <button className="btn btn--primary" onClick={next} autoFocus>
                {index + 1 >= total ? 'Завершить' : 'Дальше →'}
              </button>
              {item.kind === 'choice' && item.speak && <SpeakButton text={item.speak} label="Прослушать" />}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

/** Утилита: показать короткий пример-подсказку в конце упражнения. */
export function DrillExample({ de, ru }: { de: string; ru: string }) {
  return <Example de={de} ru={ru} />
}

export { shuffle, toast }
