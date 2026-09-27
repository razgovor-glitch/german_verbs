import { useMemo, useState } from 'react'
import { verbKindLabels, verbKindShort, verbs } from '../data/verbs'
import type { DrillItem, VerbKind } from '../types'
import { Badge, Bar, Card, Empty, Example, Section, SpeakButton, Stat, Tip } from '../components/ui'
import { conjugationTable, partizip2WithPrefix, praesensForms } from '../lib/conjugate'
import { navigate } from '../lib/router'
import { deckStats } from '../lib/srs'
import { useProgress } from '../lib/progress'
import { generate } from '../lib/drills'
import DrillRunner from '../components/DrillRunner'
import { normalize } from '../lib/text'

const KIND_TONE: Record<VerbKind, string> = {
  regular: 'default',
  irregular: 'err',
  mixed: 'warn',
  modal: 'primary',
  auxiliary: 'ok',
}

export default function VerbsView({ verbId }: { verbId: string | null }) {
  const state = useProgress()
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<'all' | VerbKind>('all')
  const [drill, setDrill] = useState<{ kind: string; items: DrillItem[]; title: string } | null>(null)

  const verb = verbs.find((v) => v.id === verbId) ?? null

  const filtered = useMemo(() => {
    const q = normalize(query)
    return verbs.filter((v) => {
      if (kind !== 'all' && v.kind !== kind) return false
      if (!q) return true
      return normalize(v.inf).includes(q) || normalize(v.ru).includes(q)
    })
  }, [query, kind])

  const stats = useMemo(() => deckStats(verbs.map((v) => v.id), state), [state])

  if (drill) {
    return <DrillRunner items={drill.items} title={drill.title} onExit={() => setDrill(null)} />
  }

  /* ---------------- Детальная карточка глагола ---------------- */
  if (verb) {
    const table = conjugationTable(verb)
    const p2 = partizip2WithPrefix(verb)
    const card = state.cards[verb.id]

    const launch = (k: string) => {
      const items = generate(k, { verbIds: [verb.id], count: 6 })
      if (!items.length) return
      setDrill({ kind: k, items, title: `${verb.inf} — ${k === 'perfekt' ? 'Perfekt' : 'спряжение'}` })
    }

    return (
      <div className="fade-in">
        <div className="row" style={{ marginBottom: 14 }}>
          <button className="btn btn--sm btn--ghost" onClick={() => navigate('/verben')}>
            ← Все глаголы
          </button>
        </div>

        <Card accent className="section">
          <div className="row row--between row--wrap" style={{ alignItems: 'flex-start', gap: 16 }}>
            <div style={{ flex: '1 1 340px' }}>
              <div className="row" style={{ gap: 10, alignItems: 'center', marginBottom: 4 }}>
                <h1 style={{ fontSize: 28, margin: 0, letterSpacing: '-0.02em' }}>{verb.inf}</h1>
                <SpeakButton text={verb.inf} />
              </div>
              <div className="muted" style={{ marginBottom: 10, fontSize: 15 }}>{verb.ru}</div>
              <div className="row row--wrap" style={{ gap: 6 }}>
                <Badge tone={KIND_TONE[verb.kind]}>{verbKindLabels[verb.kind]}</Badge>
                <Badge>Perfekt с {verb.aux}</Badge>
                <Badge>{verb.level}</Badge>
                {verb.separable && <Badge tone="warn">отделяемая приставка {verb.separable}-</Badge>}
                {card && card.interval >= 30 && <Badge tone="ok">освоено</Badge>}
              </div>
              {verb.gov && (
                <div className="row" style={{ marginTop: 10, gap: 6, alignItems: 'baseline' }}>
                  <span className="small" style={{ fontWeight: 650 }}>
                    Управление:
                  </span>
                  <span className="mono small">{verb.gov}</span>
                </div>
              )}
              <div className="row row--wrap" style={{ gap: 8, marginTop: 14 }}>
                <button className="btn btn--primary" onClick={() => navigate('/trainer', { verb: verb.id })}>
                  ▶ Учить
                </button>
                <button className="btn" onClick={() => launch('conjugation')}>
                  Спряжение
                </button>
                <button className="btn" onClick={() => launch('perfekt')}>
                  Partizip II
                </button>
                <button className="btn" onClick={() => launch('sentence-order')}>
                  Порядок слов
                </button>
              </div>
            </div>
            <div className="grid grid--2" style={{ flex: '0 1 300px', gap: 10 }}>
              <Stat label="3-е лицо" value={praesensForms(verb)[2]} />
              <Stat label="Partizip II" value={p2} />
              <Stat label="Точность" value={card && card.seen ? Math.round((card.correct / card.seen) * 100) : 0} unit="%" />
              <Stat label="Повторений" value={card?.seen ?? 0} />
            </div>
          </div>
        </Card>

        {verb.note && (
          <div className="section">
            <Tip>{verb.note}</Tip>
          </div>
        )}

        <Section title="Спряжение" desc="Все три времени сразу: Präsens · Präteritum · Perfekt">
          <div className="tablewrap">
            <table className="gtable">
              <thead>
                <tr>
                  <th>Лицо</th>
                  <th>Präsens (наст.)</th>
                  <th>Präteritum (прош.)</th>
                  <th>Perfekt (разг. прош.)</th>
                </tr>
              </thead>
              <tbody>
                {table.map((r) => (
                  <tr key={r.label}>
                    <td style={{ fontWeight: 650, color: 'var(--text-2)' }}>{r.label}</td>
                    <td style={{ fontWeight: 600 }}>{r.praesens}</td>
                    <td>{r.praeteritum}</td>
                    <td>{r.perfekt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="tablewrap" style={{ marginTop: 12 }}>
            <table className="gtable">
              <thead>
                <tr>
                  <th>Imperativ (du)</th>
                  <th>Imperativ (ihr)</th>
                  <th>Imperativ (Sie)</th>
                  <th>Partizip II</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>{verb.imperativ.du}</td>
                  <td style={{ fontWeight: 600 }}>{verb.imperativ.ihr}</td>
                  <td style={{ fontWeight: 600 }}>{verb.imperativ.sie}</td>
                  <td className="mono">{p2}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="В контексте" desc="Так глагол живёт в реальной речи">
          {verb.examples.map((ex, i) => (
            <Example key={i} de={ex.de} ru={ex.ru} />
          ))}
        </Section>

        <Section title="Быстрая справка по типу">
          <Card>
            <p className="small" style={{ marginBottom: 8 }}>
              <strong>{verbKindLabels[verb.kind]}.</strong>{' '}
              {verb.kind === 'regular' &&
                'Основа не меняется, претерит на -te, Partizip II на -t. Такие глаголы предсказуемы — выучите одну схему, и она сработает для сотен глаголов.'}
              {verb.kind === 'irregular' &&
                'Меняется корневая гласная, претерит и Partizip II нужно учить отдельно. Таких глаголов около 200, но они самые частотные — без них не обойтись.'}
              {verb.kind === 'mixed' &&
                'Смешанный тип: корневая гласная меняется, И добавляется -te. Запомните: bringen — brachte — gebracht, denken — dachte — gedacht.'}
              {verb.kind === 'modal' &&
                'Модальный глагол. В Präsens 1-е и 3-е лицо совпадают и не получают окончания. Смысловой инфинитив уходит в конец предложения.'}
              {verb.kind === 'auxiliary' &&
                'Вспомогательный глагол. Используется для построения времён и пассива — учите его формы раньше всех остальных.'}
            </p>
            {verb.separable && (
              <p className="small" style={{ marginBottom: 0 }}>
                <strong>Отделяемая приставка {verb.separable}-</strong> уходит в конец предложения:{' '}
                <span className="mono">Ich {praesensForms(verb)[0]} … {verb.separable}.</span> В Perfekt приставка
                «заходит внутрь»: <span className="mono">{p2}</span>.
              </p>
            )}
          </Card>
        </Section>
      </div>
    )
  }

  /* ---------------- Список глаголов ---------------- */
  return (
    <div className="fade-in">
      <Card accent className="section">
        <h1 style={{ fontSize: 24 }}>Основные глаголы — {verbs.length} штук</h1>
        <p className="small muted" style={{ maxWidth: 660 }}>
          Самые частотные немецкие глаголы с полным спряжением и живыми примерами. Глагол — это каркас языка: зная
          50 глаголов и порядок слов, вы уже можете объясниться. Обратите внимание на тип: сильные глаголы придётся
          заучить, слабые строятся по одной схеме.
        </p>
        <div className="grid grid--4" style={{ marginTop: 16 }}>
          <Stat label="Всего глаголов" value={verbs.length} />
          <Stat label="Освоено" value={stats.mastered} />
          <Stat label="К повтору" value={stats.due} hint={stats.due ? 'пора повторить' : 'всё актуально'} />
          <Stat label="Точность" value={stats.accuracy} unit="%" />
        </div>
      </Card>

      <Section title="Список">
        <div className="row row--wrap" style={{ gap: 8, marginBottom: 10 }}>
          <input
            className="typing-input"
            style={{ fontSize: 15, padding: '10px 14px', fontWeight: 400, maxWidth: 300 }}
            placeholder="Поиск: sprechen или говорить…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={`chip ${kind === 'all' ? 'chip--active' : ''}`} onClick={() => setKind('all')}>
            Все
          </button>
          {(['auxiliary', 'modal', 'regular', 'irregular', 'mixed'] as VerbKind[]).map((k) => (
            <button key={k} className={`chip ${kind === k ? 'chip--active' : ''}`} onClick={() => setKind(k)}>
              {verbKindShort[k]}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <Empty icon="🔍" title="Глаголы не найдены" />
        ) : (
          <div className="grid grid--3">
            {filtered.map((v) => {
              const c = state.cards[v.id]
              const st = c ? (c.interval >= 30 ? 'ok' : c.due <= new Date().toISOString().slice(0, 10) ? 'warn' : '') : ''
              return (
                <button
                  key={v.id}
                  className="card"
                  style={{ textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5 }}
                  onClick={() => navigate('/verben', { verb: v.id })}
                >
                  <div className="row row--between" style={{ alignItems: 'flex-start' }}>
                    <div style={{ minWidth: 0 }}>
                      <div className="row" style={{ gap: 6 }}>
                        <span style={{ fontWeight: 650, fontSize: 16 }}>{v.inf}</span>
                        <SpeakButton text={v.inf} small />
                      </div>
                      <div className="small muted">{v.ru}</div>
                    </div>
                    {st && <Badge tone={st}>{st === 'ok' ? '✓' : '↻'}</Badge>}
                  </div>
                  <div className="row row--wrap" style={{ gap: 5, marginTop: 2 }}>
                    <Badge tone={KIND_TONE[v.kind]}>{verbKindShort[v.kind]}</Badge>
                    {v.separable && <Badge tone="warn">отд.</Badge>}
                  </div>
                  <div className="tiny mono muted" style={{ marginTop: 3 }}>
                    {praesensForms(v)[2]} · {partizip2WithPrefix(v)}
                  </div>
                  {c && <Bar value={Math.min(1, c.interval / 30)} tone={c.interval >= 30 ? 'ok' : 'primary'} />}
                </button>
              )
            })}
          </div>
        )}
      </Section>
    </div>
  )
}
