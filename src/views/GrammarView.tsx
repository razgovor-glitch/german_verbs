import { useEffect, useMemo, useState } from 'react'
import { grammarTopics } from '../data/grammar'
import type { DrillItem, DrillKind } from '../types'
import { Badge, Bar, Card, Example, GrammarTable, Md, Pitfall, Section, SpeakButton, Tip } from '../components/ui'
import { navigate } from '../lib/router'
import { progressStore, useProgress } from '../lib/progress'
import { generate } from '../lib/drills'
import DrillRunner from '../components/DrillRunner'

const DRILL_TITLES: Record<string, string> = {
  article: 'Артикль: der / die / das',
  'de-ru-choice': 'DE → RU: понимание',
  'ru-de-choice': 'RU → DE: перевод',
  'typing-de': 'Набор на клавиатуре',
  plural: 'Множественное число',
  conjugation: 'Спряжение глаголов',
  perfekt: 'Perfekt: Partizip II',
  listening: 'Аудирование',
  'sentence-order': 'Порядок слов',
  'case-choice': 'Падежи: правильная форма',
}

export default function GrammarView({ topicId }: { topicId: string | null }) {
  const state = useProgress()
  const [drill, setDrill] = useState<{ items: DrillItem[]; title: string } | null>(null)
  const topic = grammarTopics.find((t) => t.id === topicId) ?? null

  useEffect(() => {
    if (topic) progressStore.markGrammarRead(topic.id)
  }, [topic])

  const groups = useMemo(() => {
    const a1 = grammarTopics.filter((t) => t.level === 'A1')
    const a1plus = grammarTopics.filter((t) => t.level === 'A1+')
    return [
      { id: 'A1', title: 'Уровень A1 — база', desc: 'Без этого не построить ни одного предложения', topics: a1 },
      { id: 'A1+', title: 'Уровень A1+ — расширение', desc: 'То, что отличает «говорю по шаблону» от «говорю свободно»', topics: a1plus },
    ]
  }, [])

  if (drill) {
    return <DrillRunner items={drill.items} title={drill.title} onExit={() => setDrill(null)} />
  }

  if (topic) {
    const launch = (kind: DrillKind) => {
      const items = generate(kind, { count: 10 })
      if (!items.length) return
      setDrill({ items, title: DRILL_TITLES[kind] ?? 'Упражнение' })
    }

    return (
      <div className="fade-in">
        <div className="row row--wrap" style={{ marginBottom: 14, gap: 8 }}>
          <button className="btn btn--sm btn--ghost" onClick={() => navigate('/grammatik')}>
            ← Вся грамматика
          </button>
          <span className="small muted">
            Тема {grammarTopics.findIndex((t) => t.id === topic.id) + 1} из {grammarTopics.length}
          </span>
        </div>

        <Card accent className="section">
          <div className="row row--wrap" style={{ gap: 8, marginBottom: 6 }}>
            <Badge tone="primary">{topic.level}</Badge>
            <Badge>{topic.title}</Badge>
            {state.grammarRead.includes(topic.id) && <Badge tone="ok">прочитано</Badge>}
          </div>
          <h1 style={{ fontSize: 25, marginBottom: 8 }}>{topic.titleRu}</h1>
          <p className="small" style={{ maxWidth: 700, marginBottom: 14 }}>{topic.summary}</p>
          {topic.drills && topic.drills.length > 0 && (
            <div className="row row--wrap" style={{ gap: 8 }}>
              <span className="small muted" style={{ alignSelf: 'center' }}>Отработать:</span>
              {topic.drills.map((d) => (
                <button key={d} className="btn btn--sm btn--primary" onClick={() => launch(d)}>
                  {DRILL_TITLES[d] ?? d}
                </button>
              ))}
            </div>
          )}
        </Card>

        {topic.sections.map((s, i) => (
          <Section key={i} title={s.heading}>
            {s.body?.map((b, j) => (
              <Md key={j} text={b} className="small" />
            ))}
            {s.table && <GrammarTable caption={s.table.caption} head={s.table.head} rows={s.table.rows} />}
            {s.examples && (
              <div style={{ marginTop: s.table ? 12 : 0 }}>
                {s.examples.map((ex, k) => (
                  <Example key={k} de={ex.de} ru={ex.ru} note={ex.note} />
                ))}
              </div>
            )}
          </Section>
        ))}

        {topic.pitfalls && topic.pitfalls.length > 0 && (
          <Section title="Ловушки для русскоязычных">
            {topic.pitfalls.map((p, i) => (
              <Pitfall key={i}>{p}</Pitfall>
            ))}
          </Section>
        )}

        {topic.tips && topic.tips.length > 0 && (
          <Section title="Как запомнить">
            {topic.tips.map((t, i) => (
              <Tip key={i}>{t}</Tip>
            ))}
          </Section>
        )}

        <div className="row" style={{ gap: 10, marginTop: 24 }}>
          {(() => {
            const idx = grammarTopics.findIndex((t) => t.id === topic.id)
            const prev = grammarTopics[idx - 1]
            const next = grammarTopics[idx + 1]
            return (
              <>
                {prev && (
                  <button className="btn" onClick={() => navigate('/grammatik', { topic: prev.id })}>
                    ← {prev.titleRu}
                  </button>
                )}
                {next && (
                  <button
                    className="btn btn--primary"
                    style={{ marginLeft: 'auto' }}
                    onClick={() => navigate('/grammatik', { topic: next.id })}
                  >
                    {next.titleRu} →
                  </button>
                )}
              </>
            )
          })()}
        </div>
      </div>
    )
  }

  /* ---------------- Список тем ---------------- */
  const readCount = state.grammarRead.length

  return (
    <div className="fade-in">
      <Card accent className="section">
        <h1 style={{ fontSize: 24 }}>Грамматика A1 — {grammarTopics.length} тем</h1>
        <p className="small muted" style={{ maxWidth: 660 }}>
          Немецкая грамматика логичнее русской, но с другими правилами. Здесь только то, что реально нужно на A1:
          артикли, падежи, порядок слов, времена. Каждая тема — объяснение, таблица, примеры и раздел с типичными
          ошибками русскоязычных.
        </p>
        <div className="row" style={{ gap: 14, marginTop: 14, alignItems: 'center' }}>
          <div style={{ flex: 1, maxWidth: 320 }}>
            <div className="row row--between tiny muted" style={{ marginBottom: 4 }}>
              <span>Прочитано тем</span>
              <span>{readCount} / {grammarTopics.length}</span>
            </div>
            <Bar value={readCount / grammarTopics.length} tone={readCount === grammarTopics.length ? 'ok' : 'primary'} />
          </div>
        </div>
      </Card>

      {groups.map((g) => (
        <Section key={g.id} title={g.title} desc={g.desc}>
          <div className="grid grid--2">
            {g.topics.map((t) => {
              const read = state.grammarRead.includes(t.id)
              return (
                <button
                  key={t.id}
                  className="card"
                  style={{ textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6 }}
                  onClick={() => navigate('/grammatik', { topic: t.id })}
                >
                  <div className="row row--between" style={{ alignItems: 'flex-start' }}>
                    <div className="card__title" style={{ marginBottom: 0 }}>{t.titleRu}</div>
                    {read ? <Badge tone="ok">✓</Badge> : <Badge>{t.level}</Badge>}
                  </div>
                  <div className="card__sub">{t.summary}</div>
                  <div className="row row--wrap tiny muted" style={{ marginTop: 2, gap: 8 }}>
                    <span>{t.sections.length} разделов</span>
                    {t.pitfalls && <span>⚠ {t.pitfalls.length} ловушек</span>}
                    {t.drills && <span>🎯 {t.drills.length} упражнений</span>}
                  </div>
                </button>
              )
            })}
          </div>
        </Section>
      ))}

      <Section title="Обязательный минимум первого месяца">
        <Card>
          <p className="small">
            Если не знаете, с чего начать, пройдите эти пять тем по порядку — они дают 80% практической пользы:
          </p>
          <ol className="small" style={{ paddingLeft: 20, margin: 0 }}>
            <li>
              <a onClick={() => navigate('/grammatik', { topic: 'artikel-genus' })}>Артикль и род</a> — без этого нельзя
              сказать ни одного правильного предложения.
            </li>
            <li>
              <a onClick={() => navigate('/grammatik', { topic: 'praesens-regelmaessig' })}>Правильные глаголы в Präsens</a> —
              схема, по которой спрягается большинство глаголов.
            </li>
            <li>
              <a onClick={() => navigate('/grammatik', { topic: 'wortstellung' })}>Порядок слов</a> — глагол всегда на
              втором месте.
            </li>
            <li>
              <a onClick={() => navigate('/grammatik', { topic: 'akkusativ' })}>Akkusativ</a> — прямой объект, меняется
              только мужской род.
            </li>
            <li>
              <a onClick={() => navigate('/grammatik', { topic: 'perfekt' })}>Perfekt</a> — главное прошедшее время
              разговорной речи.
            </li>
          </ol>
          <div className="row" style={{ marginTop: 12, gap: 8 }}>
            <button className="btn btn--sm" onClick={() => navigate('/grammatik', { topic: 'lernen-strategie' })}>
              Полная стратегия обучения →
            </button>
            <SpeakButton text="Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte." label="Пример" />
          </div>
        </Card>
      </Section>
    </div>
  )
}
