import { useMemo, useState } from 'react'
import { decks, vocabulary } from '../data/vocabulary'
import { verbs } from '../data/verbs'
import type { DrillItem, DrillKind } from '../types'
import { Badge, Card, Empty, Section, Stat } from '../components/ui'
import { generate } from '../lib/drills'
import { computeTotals, useProgress } from '../lib/progress'
import DrillRunner from '../components/DrillRunner'
import { todayISO } from '../lib/text'

interface DrillDef {
  id: DrillKind
  icon: string
  title: string
  desc: string
  focus: string
}

const DRILLS: DrillDef[] = [
  {
    id: 'de-ru-choice',
    icon: '🔄',
    title: 'DE → RU',
    desc: 'Видите немецкое слово — выбираете русский перевод',
    focus: 'понимание на слух и с листа',
  },
  {
    id: 'ru-de-choice',
    icon: '🔁',
    title: 'RU → DE',
    desc: 'Видите русское слово — выбираете немецкое с артиклем',
    focus: 'активный словарный запас',
  },
  {
    id: 'typing-de',
    icon: '⌨️',
    title: 'Набор на клавиатуре',
    desc: 'Пишете слово по-немецки сами. Можно вводить ae/oe/ue/ss',
    focus: 'орфография и умлауты',
  },
  {
    id: 'article',
    icon: '🎨',
    title: 'der / die / das',
    desc: 'Определяете род существительного',
    focus: 'артикли — главная боль русскоязычных',
  },
  {
    id: 'plural',
    icon: '👥',
    title: 'Множественное число',
    desc: 'Выбираете правильную форму множественного числа',
    focus: 'пять моделей плюрализации',
  },
  {
    id: 'conjugation',
    icon: '⚡',
    title: 'Спряжение глаголов',
    desc: 'Выбираете правильную форму для конкретного лица',
    focus: 'Präsens и смена корневой гласной',
  },
  {
    id: 'perfekt',
    icon: '⏪',
    title: 'Perfekt: Partizip II',
    desc: 'Вспоминаете правильную форму причастия прошедшего времени',
    focus: 'главное прошедшее время',
  },
  {
    id: 'case-choice',
    icon: '📐',
    title: 'Падежи',
    desc: 'Выбираете правильную форму артикля в предложении',
    focus: 'Akkusativ, Dativ, Genitiv',
  },
  {
    id: 'listening',
    icon: '🎧',
    title: 'Аудирование',
    desc: 'Слушаете слово и выбираете перевод. Наушники приветствуются',
    focus: 'связь звука и смысла',
  },
  {
    id: 'sentence-order',
    icon: '🧩',
    title: 'Порядок слов',
    desc: 'Собираете предложение из перемешанных слов',
    focus: 'глагол на втором месте, рамка',
  },
]

export default function ExercisesView() {
  const state = useProgress()
  const totals = useMemo(() => computeTotals(state), [state])
  const [scope, setScope] = useState<'all' | 'verbs' | 'deck'>('all')
  const [deckId, setDeckId] = useState<string>(decks[0].id)
  const [count, setCount] = useState(10)
  const [run, setRun] = useState<{ items: DrillItem[]; title: string; def: DrillDef } | null>(null)

  const dueCount = useMemo(() => {
    const today = todayISO()
    const all = [...vocabulary.map((v) => v.id), ...verbs.map((v) => v.id)]
    return all.filter((id) => state.cards[id] && state.cards[id].due <= today).length
  }, [state])

  const start = (def: DrillDef, overrideCount?: number) => {
    const n = overrideCount ?? count
    const opts =
      scope === 'verbs'
        ? { verbIds: verbs.map((v) => v.id), count: n }
        : scope === 'deck'
          ? { decks: [deckId], count: n }
          : { count: n }
    let items = generate(def.id, opts)
    // Для упражнений, требующих глаголов, при пустом наборе берём общий пул
    if (items.length === 0) items = generate(def.id, { count: n })
    if (items.length === 0) return
    setRun({ items, title: def.title, def })
  }

  const startSmart = () => {
    // Смешанная сессия: по одному заданию каждого типа + добор
    const mixed: DrillItem[] = []
    const pick: DrillKind[] = ['de-ru-choice', 'ru-de-choice', 'article', 'conjugation', 'perfekt', 'case-choice', 'listening', 'sentence-order']
    for (const k of pick) {
      const part = generate(k, { count: 2 })
      mixed.push(...part)
    }
    if (mixed.length === 0) return
    setRun({
      items: mixed.slice(0, count),
      title: 'Смешанная сессия',
      def: { id: 'de-ru-choice', icon: '🎲', title: 'Смешанная сессия', desc: '', focus: '' },
    })
  }

  if (run) {
    return (
      <DrillRunner
        items={run.items}
        title={run.title}
        onExit={() => setRun(null)}
        autoplay={run.def.id === 'listening'}
      />
    )
  }

  return (
    <div className="fade-in">
      <Card accent className="section">
        <h1 style={{ fontSize: 24 }}>Упражнения</h1>
        <p className="small muted" style={{ maxWidth: 660 }}>
          Десять типов заданий — от узнавания слова до построения предложения. Прогресс идёт в общую статистику и
          влияет на планировщик повторений. Умлауты можно вводить как ae, oe, ue — это засчитывается как верный ответ.
        </p>
        <div className="grid grid--4" style={{ marginTop: 16 }}>
          <Stat label="Всего ответов" value={totals.reviews} />
          <Stat label="Точность" value={totals.accuracy} unit="%" />
          <Stat label="К повтору" value={dueCount} hint={dueCount ? 'есть просроченные' : 'всё актуально'} />
          <Stat label="Опыт" value={totals.xp} unit="XP" />
        </div>
      </Card>

      <Section title="Настройки сессии">
        <Card>
          <div className="col" style={{ gap: 14 }}>
            <div>
              <div className="small" style={{ fontWeight: 650, marginBottom: 6 }}>Материал</div>
              <div className="row row--wrap" style={{ gap: 8 }}>
                <button className={`chip ${scope === 'all' ? 'chip--active' : ''}`} onClick={() => setScope('all')}>
                  Всё вместе
                </button>
                <button className={`chip ${scope === 'deck' ? 'chip--active' : ''}`} onClick={() => setScope('deck')}>
                  Одна тема
                </button>
                <button className={`chip ${scope === 'verbs' ? 'chip--active' : ''}`} onClick={() => setScope('verbs')}>
                  Только глаголы
                </button>
              </div>
              {scope === 'deck' && (
                <div className="row row--wrap" style={{ gap: 6, marginTop: 10 }}>
                  {decks.map((d) => (
                    <button
                      key={d.id}
                      className={`chip ${deckId === d.id ? 'chip--active' : ''}`}
                      onClick={() => setDeckId(d.id)}
                    >
                      {d.icon} {d.titleRu}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <div className="small" style={{ fontWeight: 650, marginBottom: 6 }}>Количество заданий</div>
              <div className="row" style={{ gap: 8 }}>
                {[5, 10, 15, 20].map((n) => (
                  <button key={n} className={`chip ${count === n ? 'chip--active' : ''}`} onClick={() => setCount(n)}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div className="row row--wrap" style={{ gap: 8 }}>
              <button className="btn btn--primary btn--lg" onClick={startSmart}>
                🎲 Смешанная сессия ({count} заданий)
              </button>
            </div>
          </div>
        </Card>
      </Section>

      <Section title="Типы упражнений" desc="Выберите конкретный навык, который хотите прокачать">
        <div className="grid grid--2">
          {DRILLS.map((d) => (
            <button
              key={d.id}
              className="card"
              style={{ textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6 }}
              onClick={() => start(d)}
            >
              <div className="row row--between">
                <span style={{ fontSize: 22 }}>{d.icon}</span>
                <Badge tone="primary">начать →</Badge>
              </div>
              <div className="card__title">{d.title}</div>
              <div className="card__sub">{d.desc}</div>
              <div className="tiny muted" style={{ marginTop: 2 }}>Тренирует: {d.focus}</div>
            </button>
          ))}
        </div>
      </Section>

      {totals.reviews === 0 && (
        <Section title="Совет">
          <Empty
            icon="💡"
            title="Начните со смешанной сессии"
            desc="Она покажет все типы заданий понемногу — так вы быстро поймёте, что даётся легче, а что требует внимания."
          />
        </Section>
      )}
    </div>
  )
}
