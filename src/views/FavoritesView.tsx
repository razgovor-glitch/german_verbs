import { useMemo, useState } from 'react'
import { vocabById } from '../data/vocabulary'
import { verbById } from '../data/verbs'
import { Badge, Card, Empty, Example, Section, SpeakButton, Stat } from '../components/ui'
import { progressStore, useProgress } from '../lib/progress'
import { navigate } from '../lib/router'
import { conjugationTable } from '../lib/conjugate'
import DrillRunner from '../components/DrillRunner'
import type { DrillItem } from '../types'
import { generate } from '../lib/drills'

export default function FavoritesView() {
  const state = useProgress()
  const [run, setRun] = useState<DrillItem[] | null>(null)
  const [tab, setTab] = useState<'words' | 'verbs'>('words')

  const favWords = useMemo(() => state.favorites.map((id) => vocabById.get(id)).filter(Boolean), [state.favorites])
  const favVerbs = useMemo(() => state.favorites.map((id) => verbById.get(id)).filter(Boolean), [state.favorites])

  const favIds = state.favorites
  const launch = (kind: string) => {
    const items = generate(kind, { count: 12 }).filter((i) => {
      const bare = i.id.split(':')[1]
      return favIds.includes(bare)
    })
    if (items.length === 0) return
    setRun(items)
  }

  if (run) {
    return <DrillRunner items={run} title="Избранное" onExit={() => setRun(null)} />
  }

  return (
    <div className="fade-in">
      <Card accent className="section">
        <h1 style={{ fontSize: 24 }}>Избранное</h1>
        <p className="small muted" style={{ maxWidth: 620 }}>
          Слова и глаголы, которые вы отметили звёздочкой. Отмечайте то, что даётся тяжело или кажется особенно
          полезным — так удобно собрать личный список для повторения.
        </p>
        <div className="grid grid--3" style={{ marginTop: 14 }}>
          <Stat label="Слов в избранном" value={favWords.length} />
          <Stat label="Глаголов в избранном" value={favVerbs.length} />
          <Stat label="Всего" value={state.favorites.length} />
        </div>
        {state.favorites.length > 0 && (
          <div className="row row--wrap" style={{ gap: 8, marginTop: 14 }}>
            <button className="btn btn--primary" onClick={() => launch('de-ru-choice')}>
              Упражнение по избранному
            </button>
            <button className="btn" onClick={() => navigate('/trainer')}>
              ▶ Учить в тренажёре
            </button>
          </div>
        )}
      </Card>

      {state.favorites.length === 0 ? (
        <Empty
          icon="★"
          title="Пока ничего не отмечено"
          desc="Откройте «Лексику» или «Глаголы» и нажмите звёздочку на карточке — она появится здесь."
        />
      ) : (
        <>
          <div className="tabs">
            <button className={`tab ${tab === 'words' ? 'tab--active' : ''}`} onClick={() => setTab('words')}>
              Слова ({favWords.length})
            </button>
            <button className={`tab ${tab === 'verbs' ? 'tab--active' : ''}`} onClick={() => setTab('verbs')}>
              Глаголы ({favVerbs.length})
            </button>
          </div>

          {tab === 'words' && (
            <Section title="Слова">
              <div className="grid grid--2">
                {favWords.map((w) => (
                  <div key={w!.id} className="wordcard">
                    <div className="row row--between" style={{ alignItems: 'flex-start' }}>
                      <div>
                        <div className="wordcard__de">
                          {w!.article && <span className={`art-${w!.article}`}>{w!.article} </span>}
                          {w!.de}
                        </div>
                        <div className="wordcard__ru">{w!.ru}</div>
                      </div>
                      <div className="row" style={{ gap: 2 }}>
                        <SpeakButton text={w!.de} small />
                        <button
                          className="btn btn--icon btn--ghost"
                          style={{ color: '#d6337a' }}
                          onClick={() => progressStore.toggleFavorite(w!.id)}
                          title="Убрать из избранного"
                        >
                          ★
                        </button>
                      </div>
                    </div>
                    <div className="wordcard__example">
                      <div className="wordcard__example-de">{w!.example.de}</div>
                      <div className="muted">{w!.example.ru}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {tab === 'verbs' && (
            <Section title="Глаголы">
              <div className="grid grid--2">
                {favVerbs.map((v) => {
                  const t = conjugationTable(v!)
                  return (
                    <Card key={v!.id}>
                      <div className="row row--between" style={{ alignItems: 'flex-start' }}>
                        <div>
                          <div className="row" style={{ gap: 6 }}>
                            <span style={{ fontWeight: 650, fontSize: 17 }}>{v!.inf}</span>
                            <SpeakButton text={v!.inf} small />
                          </div>
                          <div className="small muted">{v!.ru}</div>
                        </div>
                        <button
                          className="btn btn--icon btn--ghost"
                          style={{ color: '#d6337a' }}
                          onClick={() => progressStore.toggleFavorite(v!.id)}
                        >
                          ★
                        </button>
                      </div>
                      <div className="row row--wrap" style={{ gap: 6, margin: '8px 0' }}>
                        <Badge tone="primary">ich {t[0].praesens}</Badge>
                        <Badge>er {t[2].praesens}</Badge>
                        <Badge tone="warn">{v!.aux} {v!.partizip2}</Badge>
                      </div>
                      {v!.examples[0] && <Example de={v!.examples[0].de} ru={v!.examples[0].ru} />}
                    </Card>
                  )
                })}
              </div>
            </Section>
          )}
        </>
      )}
    </div>
  )
}
