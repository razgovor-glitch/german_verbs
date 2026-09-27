import { useMemo } from 'react'
import { decks, vocabulary, totalVocab } from '../data/vocabulary'
import { verbs } from '../data/verbs'
import { grammarTopics } from '../data/grammar'
import { alphabet } from '../data/alphabet'
import { phoneticRules } from '../data/phonetics'
import { computeStreak, computeTotals, levelFromXp, useProgress } from '../lib/progress'
import { deckStats } from '../lib/srs'
import { navigate } from '../lib/router'
import { Bar, Card, Section, Stat, Badge } from '../components/ui'
import { todayISO } from '../lib/text'

export default function Dashboard() {
  const state = useProgress()
  const totals = useMemo(() => computeTotals(state), [state])
  const streak = useMemo(() => computeStreak(state), [state])
  const lvl = useMemo(() => levelFromXp(totals.xp), [totals.xp])

  const allIds = useMemo(() => vocabulary.map((v) => v.id), [])
  const vocabStats = useMemo(() => deckStats(allIds, state), [allIds, state])
  const verbStats = useMemo(() => deckStats(verbs.map((v) => v.id), state), [state])

  const dueVocab = useMemo(
    () => allIds.filter((id) => state.cards[id] && state.cards[id].due <= todayISO()).length,
    [allIds, state],
  )
  const dueVerbs = useMemo(
    () => verbs.filter((v) => state.cards[v.id] && state.cards[v.id].due <= todayISO()).length,
    [state],
  )
  const totalDue = dueVocab + dueVerbs

  const goalPct = Math.min(1, totals.today.reviews / state.settings.dailyGoal)

  const modules = [
    {
      icon: '🔤',
      title: 'Алфавит',
      desc: `${alphabet.length} букв и знаков, звук и произношение`,
      route: '/alphabet',
      meta: `${alphabet.length}`,
    },
    {
      icon: '🗣',
      title: 'Фонетика',
      desc: `${phoneticRules.length} правил чтения с примерами`,
      route: '/phonetik',
      meta: `${phoneticRules.length}`,
    },
    {
      icon: '📚',
      title: 'Лексика',
      desc: `${totalVocab} слов в ${decks.length} тематических колодах`,
      route: '/wortschatz',
      meta: `${Math.round(vocabStats.progress * 100)}%`,
    },
    {
      icon: '⚡',
      title: 'Глаголы',
      desc: `${verbs.length} глаголов: Präsens, Präteritum, Perfekt, примеры`,
      route: '/verben',
      meta: `${Math.round(verbStats.progress * 100)}%`,
    },
    {
      icon: '📐',
      title: 'Грамматика',
      desc: `${grammarTopics.length} тем с таблицами и ловушками`,
      route: '/grammatik',
      meta: `${state.grammarRead.length}/${grammarTopics.length}`,
    },
    {
      icon: '🎯',
      title: 'Упражнения',
      desc: '10 типов заданий: перевод, набор, падежи, порядок слов',
      route: '/uebungen',
      meta: '10',
    },
  ]

  return (
    <div className="fade-in">
      <Card accent className="section">
        <div className="row row--between row--wrap" style={{ alignItems: 'flex-start', gap: 20 }}>
          <div style={{ flex: '1 1 320px' }}>
            <div className="row" style={{ gap: 8, marginBottom: 8 }}>
              <Badge tone="primary">Уровень {lvl.level} · {lvl.title}</Badge>
              {streak.current > 0 && <Badge tone="warn">🔥 {streak.current} дн. подряд</Badge>}
            </div>
            <h1 style={{ fontSize: 27, marginBottom: 6 }}>Немецкий с нуля — по-русски</h1>
            <p className="small muted" style={{ marginBottom: 14, maxWidth: 560 }}>
              Лексика, фонетика, грамматика и основные глаголы в контексте. Тренажёр сам планирует повторения:
              слово возвращается ровно тогда, когда вы почти его забыли.
            </p>
            <div className="row row--wrap" style={{ gap: 8 }}>
              <button className="btn btn--primary btn--lg" onClick={() => navigate('/trainer')}>
                ▶ Учить сейчас{totalDue > 0 ? ` (${totalDue})` : ''}
              </button>
              <button className="btn btn--lg" onClick={() => navigate('/uebungen')}>
                Упражнения
              </button>
              <button className="btn btn--lg btn--ghost" onClick={() => navigate('/grammatik', { topic: 'lernen-strategie' })}>
                С чего начать
              </button>
            </div>
          </div>

          <div style={{ flex: '0 1 260px', minWidth: 230 }}>
            <div className="card" style={{ background: 'rgba(255,255,255,0.72)' }}>
              <div className="row row--between" style={{ marginBottom: 6 }}>
                <span className="small" style={{ fontWeight: 650 }}>
                  Цель на сегодня
                </span>
                <span className="small muted">
                  {totals.today.reviews} / {state.settings.dailyGoal}
                </span>
              </div>
              <Bar value={goalPct} tone={goalPct >= 1 ? 'ok' : 'primary'} large />
              <div className="tiny muted" style={{ marginTop: 6 }}>
                {goalPct >= 1 ? '✓ Цель выполнена — отличная работа' : `Осталось ${state.settings.dailyGoal - totals.today.reviews} повторений`}
              </div>
              <div className="divider" style={{ margin: '12px 0' }} />
              <div className="row row--between small">
                <span className="muted">Опыт</span>
                <span style={{ fontWeight: 650 }}>{totals.xp} XP</span>
              </div>
              <div className="bar" style={{ marginTop: 6 }}>
                <div className="bar__fill" style={{ width: `${Math.min(100, (lvl.into / lvl.need) * 100)}%` }} />
              </div>
              <div className="tiny muted" style={{ marginTop: 4 }}>
                до уровня {lvl.level + 1}: {lvl.need - lvl.into} XP
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid--4 section">
        <Stat label="Слов изучено" value={vocabStats.mastered + vocabStats.review} unit={`/ ${totalVocab}`} hint={`${vocabStats.mastered} освоено прочно`} />
        <Stat label="К повторению" value={totalDue} hint={totalDue ? 'готово к работе' : 'всё повторено'} />
        <Stat label="Точность" value={totals.accuracy} unit="%" hint={`${totals.reviews} ответов всего`} />
        <Stat label="Дней занятий" value={totals.daysActive} hint={`лучшая серия: ${streak.best}`} />
      </div>

      <Section title="Модули" desc="Шесть разделов, которые закрывают весь базовый уровень A1">
        <div className="grid grid--auto">
          {modules.map((m) => (
            <button
              key={m.route}
              className="card"
              style={{ textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6 }}
              onClick={() => navigate(m.route)}
            >
              <div className="row row--between">
                <span style={{ fontSize: 22 }}>{m.icon}</span>
                <Badge>{m.meta}</Badge>
              </div>
              <div className="card__title">{m.title}</div>
              <div className="card__sub">{m.desc}</div>
            </button>
          ))}
        </div>
      </Section>

      <Section
        title="Прогресс по лексике"
        desc="Нажмите на колоду, чтобы учить слова именно этой темы"
        action={
          <button className="btn btn--sm" onClick={() => navigate('/wortschatz')}>
            Все колоды →
          </button>
        }
      >
        <div className="grid grid--3">
          {decks.slice(0, 6).map((d) => {
            const ids = vocabulary.filter((v) => v.deck === d.id).map((v) => v.id)
            const st = deckStats(ids, state)
            return (
              <button
                key={d.id}
                className="card"
                style={{ textAlign: 'left', cursor: 'pointer' }}
                onClick={() => navigate('/wortschatz', { deck: d.id })}
              >
                <div className="row" style={{ gap: 9, marginBottom: 8 }}>
                  <span style={{ fontSize: 19 }}>{d.icon}</span>
                  <div style={{ minWidth: 0 }}>
                    <div className="card__title" style={{ fontSize: 14 }}>
                      {d.titleRu}
                    </div>
                    <div className="tiny muted">
                      {st.mastered + st.review} / {st.total} слов
                    </div>
                  </div>
                </div>
                <Bar value={st.progress} tone={st.progress >= 0.8 ? 'ok' : 'primary'} />
              </button>
            )
          })}
        </div>
      </Section>

      <Section title="Как устроен тренажёр" desc="Четыре шага, которые дают результат">
        <div className="grid grid--4">
          {[
            { n: '1', t: 'Читайте вслух', d: 'Начните с алфавита и правил чтения. 10 минут в день — и артикуляция встанет на место.' },
            { n: '2', t: 'Учите слова с артиклем', d: 'der Tisch, die Lampe, das Buch. Артикль — часть слова, а не отдельная деталь.' },
            { n: '3', t: 'Глаголы в контексте', d: 'Не заучивайте формы в отрыве: каждая форма идёт с живым предложением.' },
            { n: '4', t: 'Повторяйте по интервалам', d: 'Тренажёр подберёт, что показать сегодня. Просто нажимайте «Учить».' },
          ].map((s) => (
            <div key={s.n} className="card">
              <div className="row" style={{ gap: 9, marginBottom: 6 }}>
                <span
                  className="badge badge--primary"
                  style={{ width: 22, height: 22, justifyContent: 'center', padding: 0 }}
                >
                  {s.n}
                </span>
                <span className="card__title" style={{ margin: 0, fontSize: 14 }}>
                  {s.t}
                </span>
              </div>
              <div className="card__sub">{s.d}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
