import { useMemo, useState } from 'react'
import { decks, fullForm, vocabulary } from '../data/vocabulary'
import type { VocabEntry } from '../types'
import { Bar, Badge, Card, Empty, FavButton, GenderBadge, Section, SpeakButton, Stat } from '../components/ui'
import { navigate } from '../lib/router'
import { deckStats } from '../lib/srs'
import { progressStore, useProgress } from '../lib/progress'
import { posRu } from '../lib/drills'
import DrillRunner from '../components/DrillRunner'
import { generate } from '../lib/drills'
import type { DrillItem } from '../types'
import { normalize } from '../lib/text'

export default function VocabularyView({ deckId }: { deckId: string | null }) {
  const state = useProgress()
  const [query, setQuery] = useState('')
  const [drill, setDrill] = useState<{ kind: string; items: DrillItem[]; title: string } | null>(null)
  const [favOnly, setFavOnly] = useState(false)

  const deck = decks.find((d) => d.id === deckId) ?? null

  const words = useMemo(() => {
    if (!deck) return []
    return vocabulary.filter((v) => v.deck === deck.id)
  }, [deck])

  const filtered = useMemo(() => {
    const q = normalize(query)
    return words.filter((w) => {
      if (favOnly && !state.favorites.includes(w.id)) return false
      if (!q) return true
      return normalize(w.de) .includes(q) || normalize(w.ru).includes(q)
    })
  }, [words, query, favOnly, state.favorites])

  /* ---------------- Список колод ---------------- */
  if (!deck) {
    return (
      <div className="fade-in">
        <Card accent className="section">
          <h1 style={{ fontSize: 24 }}>Базовая лексика — {vocabulary.length} слов</h1>
          <p className="small muted" style={{ maxWidth: 640 }}>
            Слова сгруппированы по темам, потому что так они запоминаются в 2–3 раза быстрее, чем алфавитным списком.
            Каждое слово идёт с артиклем, множественным числом и живым предложением — не учите голые переводы.
          </p>
        </Card>

        <div className="grid grid--auto">
          {decks.map((d) => {
            const ids = vocabulary.filter((v) => v.deck === d.id).map((v) => v.id)
            const st = deckStats(ids, state)
            return (
              <button
                key={d.id}
                className="card"
                style={{ textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 8 }}
                onClick={() => navigate('/wortschatz', { deck: d.id })}
              >
                <div className="row row--between">
                  <span style={{ fontSize: 24 }}>{d.icon}</span>
                  <Badge>{d.level}</Badge>
                </div>
                <div>
                  <div className="card__title">{d.titleRu}</div>
                  <div className="card__sub" style={{ marginBottom: 8 }}>{d.blurb}</div>
                </div>
                <div style={{ marginTop: 'auto' }}>
                  <div className="row row--between tiny muted" style={{ marginBottom: 4 }}>
                    <span>{st.total} слов</span>
                    <span>
                      {st.mastered + st.review} изучено · {st.newCount} новых
                    </span>
                  </div>
                  <Bar value={st.progress} tone={st.progress >= 0.8 ? 'ok' : 'primary'} />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  /* ---------------- Прогон упражнений по колоде ---------------- */
  if (drill) {
    return (
      <DrillRunner
        items={drill.items}
        title={drill.title}
        onExit={() => setDrill(null)}
        autoplay={drill.kind === 'listening'}
      />
    )
  }

  const ids = words.map((w) => w.id)
  const st = deckStats(ids, state)

  const launch = (kind: string, count = 10) => {
    const items = generate(kind, { decks: [deck.id], count })
    if (items.length === 0) return
    const titles: Record<string, string> = {
      'de-ru-choice': 'DE → RU: выбор перевода',
      'ru-de-choice': 'RU → DE: выбор слова',
      'typing-de': 'Набор на клавиатуре',
      article: 'Артикль: der / die / das',
      plural: 'Множественное число',
      listening: 'Аудирование',
      'sentence-order': 'Порядок слов',
    }
    setDrill({ kind, items, title: titles[kind] ?? 'Упражнение' })
  }

  return (
    <div className="fade-in">
      <div className="row" style={{ marginBottom: 14, gap: 8 }}>
        <button className="btn btn--sm btn--ghost" onClick={() => navigate('/wortschatz')}>
          ← Все колоды
        </button>
      </div>

      <Card accent className="section">
        <div className="row row--between row--wrap" style={{ alignItems: 'flex-start', gap: 16 }}>
          <div style={{ flex: '1 1 340px' }}>
            <div className="row" style={{ gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 28 }}>{deck.icon}</span>
              <h1 style={{ fontSize: 23, margin: 0 }}>{deck.titleRu}</h1>
            </div>
            <div className="muted small" style={{ marginBottom: 14 }}>{deck.title} · {deck.blurb}</div>
            <div className="row row--wrap" style={{ gap: 8 }}>
              <button className="btn btn--primary" onClick={() => navigate('/trainer', { deck: deck.id })}>
                ▶ Учить колоду ({st.newCount + st.due})
              </button>
              <button className="btn" onClick={() => launch('de-ru-choice')}>
                DE → RU
              </button>
              <button className="btn" onClick={() => launch('ru-de-choice')}>
                RU → DE
              </button>
              <button className="btn" onClick={() => launch('listening')}>
                🎧 Аудирование
              </button>
              <button className="btn" onClick={() => launch('typing-de')}>
                ⌨ Набор
              </button>
              {words.some((w) => w.pos === 'noun' && w.article) && (
                <button className="btn" onClick={() => launch('article')}>
                  der / die / das
                </button>
              )}
              {words.some((w) => w.plural) && (
                <button className="btn" onClick={() => launch('plural')}>
                  Множественное число
                </button>
              )}
            </div>
          </div>
          <div className="grid grid--2" style={{ flex: '0 1 300px', gap: 10 }}>
            <Stat label="Освоено" value={st.mastered} unit={`/ ${st.total}`} />
            <Stat label="Точность" value={st.accuracy} unit="%" />
            <Stat label="Новых" value={st.newCount} />
            <Stat label="К повтору" value={st.due} />
          </div>
        </div>
      </Card>

      <Section
        title={`Слова колоды (${filtered.length})`}
        action={
          <div className="row" style={{ gap: 8 }}>
            <button
              className={`chip ${favOnly ? 'chip--active' : ''}`}
              onClick={() => setFavOnly((v) => !v)}
            >
              ★ Избранное
            </button>
          </div>
        }
      >
        <div className="row" style={{ marginBottom: 12 }}>
          <input
            className="typing-input"
            style={{ fontSize: 15, padding: '10px 14px', fontWeight: 400 }}
            placeholder="Поиск по немецкому или русскому…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <Empty icon="🔍" title="Ничего не найдено" hint="Попробуйте другой запрос или отключите фильтр избранного" />
        ) : (
          <div className="grid grid--2">
            {filtered.map((w) => (
              <WordCard key={w.id} w={w} />
            ))}
          </div>
        )}
      </Section>
    </div>
  )
}

function WordCard({ w }: { w: VocabEntry }) {
  const state = useProgress()
  const card = state.cards[w.id]
  const isFav = state.favorites.includes(w.id)

  return (
    <div className="wordcard">
      <div className="wordcard__top">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="row" style={{ gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
            <span className="wordcard__de">
              {w.article && <span className={`art-${w.article}`}>{w.article} </span>}
              {w.de}
              {w.plural && w.plural.replace(/^die /, '') !== w.de && (
                <span className="muted small" style={{ fontWeight: 400 }}>, {w.plural.replace(/^die /, '')}</span>
              )}
            </span>
            {w.pos === 'noun' && w.article && <GenderBadge article={w.article} />}
            {card && card.interval >= 30 && <Badge tone="ok">освоено</Badge>}
            {card && card.due <= new Date().toISOString().slice(0, 10) && <Badge tone="warn">к повтору</Badge>}
          </div>
          <div className="wordcard__ru">{w.ru}</div>
          <div className="row" style={{ gap: 8, marginTop: 3 }}>
            {state.settings.showIpa && w.ipa && <span className="wordcard__ipa">{w.ipa}</span>}
            <span className="tiny muted">{posRu(w.pos)}</span>
          </div>
        </div>
        <div className="row" style={{ gap: 2 }}>
          <SpeakButton text={fullForm(w).replace(/,.*/, '')} small />
          <FavButton id={w.id} />
          <button
            className="btn btn--icon btn--ghost"
            title="Отметить как освоенное (интервал +7 дней)"
            onClick={() => progressStore.gradeCard(w.id, 2, 8)}
          >
            ✓
          </button>
        </div>
      </div>
      <div className="wordcard__example">
        <div className="row" style={{ gap: 8 }}>
          <span className="wordcard__example-de">{w.example.de}</span>
          <SpeakButton text={w.example.de} small />
        </div>
        <div className="muted">{w.example.ru}</div>
        {w.note && <div className="tiny" style={{ marginTop: 5, color: 'var(--warn)' }}>💡 {w.note}</div>}
      </div>
      {isFav && <div className="tiny" style={{ color: 'var(--die)', marginTop: 6 }}>★ в избранном</div>}
    </div>
  )
}
