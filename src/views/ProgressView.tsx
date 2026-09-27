import { useMemo } from 'react'
import { decks, vocabulary, vocabById } from '../data/vocabulary'
import { verbById, verbs } from '../data/verbs'
import { grammarTopics } from '../data/grammar'
import { Bar, Badge, Card, Empty, Section, Stat } from '../components/ui'
import { accuracy, deckStats } from '../lib/srs'
import { computeStreak, computeTotals, levelFromXp, useProgress } from '../lib/progress'
import { navigate } from '../lib/router'
import { todayISO } from '../lib/text'

export default function ProgressView() {
  const state = useProgress()
  const totals = useMemo(() => computeTotals(state), [state])
  const streak = useMemo(() => computeStreak(state), [state])
  const lvl = useMemo(() => levelFromXp(totals.xp), [totals.xp])

  const last30 = useMemo(() => {
    const out: { date: string; reviews: number; xp: number }[] = []
    for (let i = 29; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const iso = todayISO(d)
      const day = state.days[iso]
      out.push({ date: iso, reviews: day?.reviews ?? 0, xp: day?.xp ?? 0 })
    }
    return out
  }, [state.days])

  const maxReviews = Math.max(10, ...last30.map((d) => d.reviews))

  const vocabStats = useMemo(() => deckStats(vocabulary.map((v) => v.id), state), [state])
  const verbStats = useMemo(() => deckStats(verbs.map((v) => v.id), state), [state])

  const hardest = useMemo(() => {
    return Object.entries(state.cards)
      .filter(([, c]) => c.seen >= 3 && c.correct / c.seen < 0.75)
      .map(([id, c]) => ({ id, card: c, acc: accuracy(c) }))
      .sort((a, b) => a.acc - b.acc)
      .slice(0, 12)
  }, [state.cards])

  const masteredList = useMemo(
    () => Object.entries(state.cards).filter(([, c]) => c.interval >= 30).length,
    [state.cards],
  )

  const activeDays = last30.filter((d) => d.reviews > 0).length

  return (
    <div className="fade-in">
      <Card accent className="section">
        <div className="row row--between row--wrap" style={{ alignItems: 'flex-start', gap: 18 }}>
          <div style={{ flex: '1 1 320px' }}>
            <div className="row" style={{ gap: 8, marginBottom: 6 }}>
              <Badge tone="primary">Уровень {lvl.level} · {lvl.title}</Badge>
              {streak.current > 0 && <Badge tone="warn">🔥 серия {streak.current}</Badge>}
            </div>
            <h1 style={{ fontSize: 24 }}>Мой прогресс</h1>
            <p className="small muted" style={{ marginBottom: 12 }}>
              Здесь видно, что уже закреплено, а что требует внимания. Тренажёр считает слово «освоенным», когда
              интервал повторения достиг 30 дней — это значит, что оно перешло в долговременную память.
            </p>
            <div className="row" style={{ gap: 10, alignItems: 'center', maxWidth: 340 }}>
              <span className="small" style={{ fontWeight: 650 }}>Ур. {lvl.level}</span>
              <div style={{ flex: 1 }}>
                <Bar value={lvl.into / lvl.need} />
              </div>
              <span className="tiny muted">{lvl.into}/{lvl.need}</span>
            </div>
          </div>
          <div className="grid grid--2" style={{ flex: '0 1 320px', gap: 10 }}>
            <Stat label="Всего опыта" value={totals.xp} unit="XP" />
            <Stat label="Ответов" value={totals.reviews} />
            <Stat label="Освоено прочно" value={masteredList} hint="интервал 30+ дней" />
            <Stat label="Дней занятий" value={totals.daysActive} hint={`лучшая серия: ${streak.best}`} />
          </div>
        </div>
      </Card>

      <Section title="Активность за 30 дней" desc={`${activeDays} активных дней из 30 · сегодня ${totals.today.reviews} повторений`}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 120 }}>
            {last30.map((d) => {
              const h = d.reviews === 0 ? 4 : Math.max(6, (d.reviews / maxReviews) * 110)
              const isToday = d.date === todayISO()
              const goalReached = d.reviews >= state.settings.dailyGoal
              return (
                <div
                  key={d.date}
                  title={`${d.date}: ${d.reviews} повторений, ${d.xp} XP`}
                  style={{
                    flex: 1,
                    height: h,
                    borderRadius: 4,
                    background: d.reviews === 0 ? 'var(--surface-3)' : goalReached ? 'var(--ok)' : 'var(--primary)',
                    opacity: d.reviews === 0 ? 0.7 : 1,
                    outline: isToday ? '2px solid var(--primary-dark)' : 'none',
                    outlineOffset: 1,
                  }}
                />
              )
            })}
          </div>
          <div className="row row--between tiny muted" style={{ marginTop: 8 }}>
            <span>30 дней назад</span>
            <span>
              <span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--ok)', borderRadius: 2, marginRight: 4 }} />
              цель достигнута
            </span>
            <span>сегодня</span>
          </div>
        </Card>
      </Section>

      <Section title="Прогресс по разделам">
        <div className="grid grid--3">
          <Card>
            <div className="card__title">Лексика</div>
            <div className="row row--between small muted" style={{ margin: '6px 0' }}>
              <span>{vocabStats.mastered + vocabStats.review} из {vocabStats.total}</span>
              <span>{Math.round(vocabStats.progress * 100)}%</span>
            </div>
            <Bar value={vocabStats.progress} tone={vocabStats.progress >= 0.8 ? 'ok' : 'primary'} large />
            <div className="grid grid--2" style={{ marginTop: 10, gap: 8 }}>
              <Stat label="Освоено" value={vocabStats.mastered} />
              <Stat label="Новых" value={vocabStats.newCount} />
            </div>
          </Card>
          <Card>
            <div className="card__title">Глаголы</div>
            <div className="row row--between small muted" style={{ margin: '6px 0' }}>
              <span>{verbStats.mastered + verbStats.review} из {verbStats.total}</span>
              <span>{Math.round(verbStats.progress * 100)}%</span>
            </div>
            <Bar value={verbStats.progress} tone={verbStats.progress >= 0.8 ? 'ok' : 'primary'} large />
            <div className="grid grid--2" style={{ marginTop: 10, gap: 8 }}>
              <Stat label="Освоено" value={verbStats.mastered} />
              <Stat label="Новых" value={verbStats.newCount} />
            </div>
          </Card>
          <Card>
            <div className="card__title">Грамматика</div>
            <div className="row row--between small muted" style={{ margin: '6px 0' }}>
              <span>{state.grammarRead.length} из {grammarTopics.length} тем</span>
              <span>{Math.round((state.grammarRead.length / grammarTopics.length) * 100)}%</span>
            </div>
            <Bar
              value={state.grammarRead.length / grammarTopics.length}
              tone={state.grammarRead.length === grammarTopics.length ? 'ok' : 'primary'}
              large
            />
            <div style={{ marginTop: 10 }}>
              <button className="btn btn--sm" onClick={() => navigate('/grammatik')}>
                Открыть грамматику →
              </button>
            </div>
          </Card>
        </div>
      </Section>

      <Section title="По колодам" desc="Что уже закреплено, а что стоит подтянуть">
        <div className="tablewrap">
          <table className="gtable">
            <thead>
              <tr>
                <th>Колода</th>
                <th>Слов</th>
                <th>Освоено</th>
                <th>На повторении</th>
                <th>Новых</th>
                <th>Точность</th>
                <th style={{ minWidth: 120 }}>Прогресс</th>
              </tr>
            </thead>
            <tbody>
              {decks.map((d) => {
                const ids = vocabulary.filter((v) => v.deck === d.id).map((v) => v.id)
                const st = deckStats(ids, state)
                return (
                  <tr key={d.id} style={{ cursor: 'pointer' }} onClick={() => navigate('/wortschatz', { deck: d.id })}>
                    <td>
                      <span style={{ marginRight: 6 }}>{d.icon}</span>
                      <strong>{d.titleRu}</strong>
                    </td>
                    <td>{st.total}</td>
                    <td>{st.mastered}</td>
                    <td>{st.review}</td>
                    <td>{st.newCount}</td>
                    <td>{st.accuracy}%</td>
                    <td>
                      <Bar value={st.progress} tone={st.progress >= 0.8 ? 'ok' : 'primary'} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Требуют внимания" desc="Слова и глаголы с точностью ниже 75% — их стоит повторить отдельно">
        {hardest.length === 0 ? (
          <Empty
            icon="✨"
            title="Проблемных карточек нет"
            desc="Либо вы только начинаете, либо всё идёт ровно. Продолжайте в том же духе."
          />
        ) : (
          <div className="grid grid--2">
            {hardest.map(({ id, card, acc }) => {
              const w = vocabById.get(id)
              const v = verbById.get(id)
              if (!w && !v) return null
              const de = w ? (w.article ? `${w.article} ${w.de}` : w.de) : v!.inf
              const ru = w ? w.ru : v!.ru
              const target = w ? { deck: w.deck } : { verb: v!.id }
              return (
                <button
                  key={id}
                  className="card"
                  style={{ textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: 10 }}
                  onClick={() => navigate(w ? '/wortschatz' : '/verben', target)}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 650 }}>{de}</div>
                    <div className="small muted">{ru}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <Badge tone={acc < 50 ? 'err' : 'warn'}>{acc}%</Badge>
                    <div className="tiny muted" style={{ marginTop: 3 }}>
                      {card.correct}/{card.seen}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </Section>

      <Section title="Рекомендация на сегодня">
        <Card>
          {(() => {
            const due = Object.values(state.cards).filter((c) => c.due <= todayISO()).length
            const newLeft = vocabulary.length + verbs.length - Object.keys(state.cards).length
            const lines: string[] = []
            if (due > 0) lines.push(`Повторить ${due} карточек — они уже готовы к повторению.`)
            if (newLeft > 0) lines.push(`Добавить ${Math.min(20, newLeft)} новых карточек, чтобы расширять словарь.`)
            if (state.grammarRead.length < grammarTopics.length)
              lines.push('Прочитать одну тему грамматики и сразу отработать её в упражнениях.')
            if (totals.today.reviews >= state.settings.dailyGoal) lines.push('Дневная цель выполнена — можно отдохнуть.')
            return (
              <ul className="small" style={{ margin: 0, paddingLeft: 20 }}>
                {lines.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            )
          })()}
          <div className="row row--wrap" style={{ marginTop: 12, gap: 8 }}>
            <button className="btn btn--primary" onClick={() => navigate('/trainer')}>
              ▶ Учить сейчас
            </button>
            <button className="btn" onClick={() => navigate('/uebungen')}>
              Упражнения
            </button>
          </div>
        </Card>
      </Section>
    </div>
  )
}
