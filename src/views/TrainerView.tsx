import { useEffect, useMemo, useRef, useState } from 'react'
import { vocabulary } from '../data/vocabulary'
import { verbs } from '../data/verbs'
import type { SrsCard } from '../types'
import { Badge, Bar, Card, Example, Empty, Section, SpeakButton, Stat } from '../components/ui'
import { GRADE_LABELS, cardState, STATE_LABELS, deckStats, type Grade } from '../lib/srs'
import { progressStore, useProgress } from '../lib/progress'
import { navigate } from '../lib/router'
import { conjugationTable, praesensForms } from '../lib/conjugate'
import { speak } from '../lib/speech'
import { todayISO } from '../lib/text'

interface Item {
  id: string
  kind: 'vocab' | 'verb'
  front: string
  back: string
  hint?: string
  extra?: { de: string; ru: string }[]
  speakText: string
  posLabel?: string
}

const SESSION_LIMIT = 20

export default function TrainerView({ deckId, verbId }: { deckId: string | null; verbId: string | null }) {
  const state = useProgress()
  const [direction, setDirection] = useState<'de-ru' | 'ru-de'>('de-ru')
  const [queue, setQueue] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [session, setSession] = useState<{ id: string; grade: Grade }[]>([])
  const [finished, setFinished] = useState(false)
  const [built, setBuilt] = useState(false)
  const startedAt = useRef(Date.now())

  /* ------------ Все доступные элементы ------------ */
  const pool = useMemo<Item[]>(() => {
    const out: Item[] = []
    if (!verbId) {
      const words = deckId ? vocabulary.filter((v) => v.deck === deckId) : vocabulary
      for (const v of words) {
        out.push({
          id: v.id,
          kind: 'vocab',
          front: v.article ? `${v.article} ${v.de}` : v.de,
          back: v.ru,
          hint: v.plural ? `мн. ч.: ${v.plural}` : undefined,
          extra: [v.example],
          speakText: v.de,
          posLabel: v.ipa,
        })
      }
    }
    const vs = verbId ? verbs.filter((v) => v.id === verbId) : deckId ? [] : verbs
    for (const v of vs) {
      const table = conjugationTable(v)
      out.push({
        id: v.id,
        kind: 'verb',
        front: v.inf,
        back: v.ru,
        hint: `3-е лицо: ${praesensForms(v)[2]} · Perfekt: ${v.aux} ${v.partizip2}`,
        extra: v.examples.slice(0, 2),
        speakText: v.inf,
        posLabel: `Präteritum: ${table[2].praeteritum}`,
      })
    }
    return out
  }, [deckId, verbId])

  const byId = useMemo(() => new Map(pool.map((p) => [p.id, p])), [pool])

  /* ------------ Формирование очереди ------------ */
  const buildQueue = () => {
    const today = todayISO()
    const due: string[] = []
    const fresh: string[] = []
    for (const it of pool) {
      const card = state.cards[it.id]
      if (!card || card.seen === 0) fresh.push(it.id)
      else if (card.due <= today) due.push(it.id)
    }
    // Сначала просроченные, затем новые — до лимита сессии
    const ordered = [...due, ...fresh].slice(0, SESSION_LIMIT)
    setQueue(ordered)
    setIndex(0)
    setFlipped(false)
    setSession([])
    setFinished(false)
    setBuilt(true)
    startedAt.current = Date.now()
  }

  useEffect(() => {
    if (!built) buildQueue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return () => {
      const seconds = Math.round((Date.now() - startedAt.current) / 1000)
      progressStore.addSeconds(seconds)
    }
  }, [])

  const currentId = queue[index]
  const current = currentId ? byId.get(currentId) : undefined
  const card: SrsCard | undefined = currentId ? state.cards[currentId] : undefined

  useEffect(() => {
    if (current && direction === 'de-ru') {
      setTimeout(() => speak(current.speakText, { rate: 0.85 }), 200)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, direction])

  const grade = (g: Grade) => {
    if (!currentId) return
    progressStore.gradeCard(currentId, g, g > 0 ? 12 : 4)
    setSession((s) => [...s, { id: currentId, grade: g }])
    if (index + 1 >= queue.length) {
      setFinished(true)
    } else {
      setIndex(index + 1)
      setFlipped(false)
    }
  }

  /* ------------ Экран завершения ------------ */
  if (finished) {
    const good = session.filter((s) => s.grade >= 2).length
    const hard = session.filter((s) => s.grade === 1).length
    const again = session.filter((s) => s.grade === 0).length
    const seconds = Math.round((Date.now() - startedAt.current) / 1000)
    return (
      <div className="trainer fade-in">
        <Card>
          <div className="center" style={{ padding: '10px 0' }}>
            <div style={{ fontSize: 44 }}>{again === 0 ? '🎉' : '📈'}</div>
            <h2 style={{ margin: '10px 0 4px' }}>Сессия завершена</h2>
            <div className="muted small">
              {session.length} карточек · {Math.max(1, Math.round(seconds / 60))} мин
            </div>
          </div>
          <div className="grid grid--3" style={{ marginTop: 18 }}>
            <Stat label="Хорошо / легко" value={good} />
            <Stat label="Трудно" value={hard} />
            <Stat label="Забыл" value={again} hint="вернутся завтра" />
          </div>
          <div className="row row--wrap" style={{ marginTop: 20, gap: 10 }}>
            <button className="btn btn--primary btn--lg" onClick={buildQueue}>
              Ещё сессию
            </button>
            <button className="btn btn--lg" onClick={() => navigate('/fortschritt')}>
              Мой прогресс
            </button>
            <button className="btn btn--lg btn--ghost" onClick={() => navigate('/')}>
              На главную
            </button>
          </div>
        </Card>
      </div>
    )
  }

  /* ------------ Пустая очередь ------------ */
  if (built && queue.length === 0) {
    const ids = pool.map((p) => p.id)
    const st = deckStats(ids, state)
    return (
      <div className="trainer fade-in">
        <Card>
          <Empty
            icon="✅"
            title="На сегодня всё повторено"
            hint="Все карточки этого набора имеют дату повторения в будущем. Возвращайтесь завтра или займитесь грамматикой."
          />
          <div className="grid grid--3" style={{ marginTop: 10 }}>
            <Stat label="Освоено" value={st.mastered} unit={`/ ${st.total}`} />
            <Stat label="На повторении" value={st.review} />
            <Stat label="Точность" value={st.accuracy} unit="%" />
          </div>
          <div className="row row--wrap" style={{ marginTop: 18, gap: 10 }}>
            <button className="btn btn--primary" onClick={() => navigate('/uebungen')}>
              К упражнениям
            </button>
            <button
              className="btn"
              onClick={() => {
                setBuilt(false)
                setTimeout(buildQueue, 0)
              }}
            >
              Повторить всё подряд
            </button>
          </div>
        </Card>
      </div>
    )
  }

  if (!current) return null

  const front = direction === 'de-ru' ? current.front : current.back
  const back = direction === 'de-ru' ? current.back : current.front
  const cs = cardState(card)

  return (
    <div className="trainer fade-in">
      <div className="row row--between" style={{ marginBottom: 10 }}>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn--sm btn--ghost" onClick={() => navigate(deckId ? '/wortschatz' : verbId ? '/verben' : '/')}>
            ← Выйти
          </button>
          <Badge tone="primary">{index + 1} / {queue.length}</Badge>
          <Badge tone={cs === 'mastered' ? 'ok' : cs === 'new' ? 'primary' : 'default'}>{STATE_LABELS[cs]}</Badge>
        </div>
        <button
          className="btn btn--sm btn--ghost"
          onClick={() => setDirection((d) => (d === 'de-ru' ? 'ru-de' : 'de-ru'))}
          title="Сменить направление"
        >
          {direction === 'de-ru' ? 'DE → RU' : 'RU → DE'} ⇄
        </button>
      </div>
      <Bar value={index / queue.length} large />

      <div
        className="flashcard"
        style={{ marginTop: 16 }}
        onClick={() => {
          if (!flipped) {
            setFlipped(true)
            if (direction === 'ru-de') speak(current.speakText, { rate: 0.85 })
          }
        }}
      >
        <div className="flashcard__hint">{direction === 'de-ru' ? 'немецкий' : 'русский'}</div>
        <div className="flashcard__front">{front}</div>
        {current.posLabel && direction === 'de-ru' && <div className="tiny mono muted">{current.posLabel}</div>}

        {!flipped && <div className="flashcard__reveal">нажмите на карточку, чтобы увидеть перевод</div>}

        {flipped && (
          <div className="fade-in" style={{ marginTop: 8 }}>
            <div className="divider" style={{ width: 180, margin: '12px auto' }} />
            <div className="flashcard__back">{back}</div>
            {current.hint && <div className="small muted" style={{ marginTop: 8 }}>{current.hint}</div>}
            <div className="row" style={{ justifyContent: 'center', marginTop: 10 }}>
              <SpeakButton text={current.speakText} label="Прослушать" />
            </div>
          </div>
        )}
      </div>

      {flipped && current.extra && current.extra.length > 0 && (
        <div className="fade-in" style={{ marginTop: 16 }}>
          {current.extra.map((ex, i) => (
            <Example key={i} de={ex.de} ru={ex.ru} />
          ))}
        </div>
      )}

      {flipped ? (
        <div className="grid grid--4" style={{ marginTop: 16 }}>
          {GRADE_LABELS.map((g) => (
            <button
              key={g.grade}
              className={`btn ${g.grade === 2 ? 'btn--primary' : g.grade === 3 ? 'btn--ok' : ''}`}
              onClick={() => grade(g.grade)}
              title={g.hint}
            >
              {g.label}
            </button>
          ))}
        </div>
      ) : (
        <button className="btn btn--primary btn--lg" style={{ width: '100%', marginTop: 16 }} onClick={() => setFlipped(true)}>
          Показать ответ
        </button>
      )}

      <Section title="Подсказка по оценкам">
        <div className="grid grid--4">
          {GRADE_LABELS.map((g) => (
            <div key={g.grade} className="card" style={{ padding: 12 }}>
              <div className="card__title" style={{ fontSize: 13 }}>{g.label}</div>
              <div className="card__sub">{g.hint}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
