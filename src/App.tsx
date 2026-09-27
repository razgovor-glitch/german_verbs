import { useEffect, useMemo, useState } from 'react'
import { navigate, useRoute } from './lib/router'
import { computeStreak, computeTotals, levelFromXp, useProgress } from './lib/progress'
import { Bar, Badge, ToastHost } from './components/ui'
import { loadVoices } from './lib/speech'
import { todayISO } from './lib/text'
import { vocabulary } from './data/vocabulary'
import { verbs } from './data/verbs'

import Dashboard from './views/Dashboard'
import AlphabetView from './views/AlphabetView'
import PhoneticsView from './views/PhoneticsView'
import VocabularyView from './views/VocabularyView'
import VerbsView from './views/VerbsView'
import GrammarView from './views/GrammarView'
import ExercisesView from './views/ExercisesView'
import TrainerView from './views/TrainerView'
import FavoritesView from './views/FavoritesView'
import ProgressView from './views/ProgressView'
import SettingsView from './views/SettingsView'

interface NavDef {
  path: string
  icon: string
  label: string
  group: string
  title: string
}

const NAV: NavDef[] = [
  { path: '/', icon: '🏠', label: 'Главная', group: 'Начало', title: 'Обзор' },
  { path: '/trainer', icon: '▶', label: 'Тренажёр', group: 'Начало', title: 'Тренажёр повторений' },
  { path: '/alphabet', icon: '🔤', label: 'Алфавит', group: 'Материал', title: 'Алфавит' },
  { path: '/phonetik', icon: '🗣', label: 'Фонетика', group: 'Материал', title: 'Фонетика и правила чтения' },
  { path: '/wortschatz', icon: '📚', label: 'Лексика', group: 'Материал', title: 'Базовая лексика' },
  { path: '/verben', icon: '⚡', label: 'Глаголы', group: 'Материал', title: 'Глаголы в контексте' },
  { path: '/grammatik', icon: '📐', label: 'Грамматика', group: 'Материал', title: 'Грамматика' },
  { path: '/uebungen', icon: '🎯', label: 'Упражнения', group: 'Практика', title: 'Упражнения' },
  { path: '/favoriten', icon: '★', label: 'Избранное', group: 'Практика', title: 'Избранное' },
  { path: '/fortschritt', icon: '📈', label: 'Прогресс', group: 'Прочее', title: 'Мой прогресс' },
  { path: '/einstellungen', icon: '⚙', label: 'Настройки', group: 'Прочее', title: 'Настройки' },
]

const GROUP_ORDER = ['Начало', 'Материал', 'Практика', 'Прочее']

export default function App() {
  const route = useRoute()
  const state = useProgress()
  const [toastReady, setToastReady] = useState(false)

  useEffect(() => {
    loadVoices().finally(() => setToastReady(true))
  }, [])

  const totals = useMemo(() => computeTotals(state), [state])
  const streak = useMemo(() => computeStreak(state), [state])
  const lvl = useMemo(() => levelFromXp(totals.xp), [totals.xp])

  const dueCount = useMemo(() => {
    const today = todayISO()
    const all = [...vocabulary.map((v) => v.id), ...verbs.map((v) => v.id)]
    return all.filter((id) => state.cards[id] && state.cards[id].due <= today).length
  }, [state.cards])

  const path = route.path
  const deck = route.query.get('deck')
  const verb = route.query.get('verb')
  const topic = route.query.get('topic')

  const current =
    NAV.find((n) => n.path === path) ??
    (path === '/wortschatz' ? NAV.find((n) => n.path === '/wortschatz') : undefined) ??
    NAV[0]

  const grouped = GROUP_ORDER.map((g) => ({ group: g, items: NAV.filter((n) => n.group === g) }))

  const render = () => {
    switch (path) {
      case '/':
        return <Dashboard />
      case '/alphabet':
        return <AlphabetView />
      case '/phonetik':
        return <PhoneticsView />
      case '/wortschatz':
        return <VocabularyView deckId={deck} />
      case '/verben':
        return <VerbsView verbId={verb} />
      case '/grammatik':
        return <GrammarView topicId={topic} />
      case '/uebungen':
        return <ExercisesView />
      case '/trainer':
        return <TrainerView deckId={deck} verbId={verb} />
      case '/favoriten':
        return <FavoritesView />
      case '/fortschritt':
        return <ProgressView />
      case '/einstellungen':
        return <SettingsView />
      default:
        return <Dashboard />
    }
  }

  const goalPct = Math.min(1, totals.today.reviews / state.settings.dailyGoal)

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <div className="sidebar__title">
            <span>🌒</span>
            <span>Deutsch für Russen</span>
          </div>
          <div className="sidebar__sub">Тренажёр A1</div>
        </div>

        <nav className="sidebar__nav">
          {grouped.map((g) => (
            <div key={g.group}>
              <div className="sidebar__group">{g.group}</div>
              {g.items.map((n) => (
                <button
                  key={n.path}
                  className={`navitem ${current?.path === n.path && !deck && !verb && !topic ? 'navitem--active' : ''} ${
                    current?.path === n.path && (deck || verb || topic) ? 'navitem--active' : ''
                  }`}
                  onClick={() => navigate(n.path)}
                >
                  <span className="navitem__icon">{n.icon}</span>
                  <span>{n.label}</span>
                  {n.path === '/trainer' && dueCount > 0 && <span className="navitem__badge">{dueCount}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar__footer">
          <div className="row row--between small" style={{ marginBottom: 6 }}>
            <span style={{ fontWeight: 650 }}>Ур. {lvl.level} · {lvl.title}</span>
            <span className="muted tiny">{totals.xp} XP</span>
          </div>
          <Bar value={lvl.into / lvl.need} />
          <div className="divider" style={{ margin: '12px 0' }} />
          <div className="row row--between tiny muted" style={{ marginBottom: 4 }}>
            <span>Цель дня</span>
            <span>
              {totals.today.reviews} / {state.settings.dailyGoal}
            </span>
          </div>
          <Bar value={goalPct} tone={goalPct >= 1 ? 'ok' : 'primary'} />
          {streak.current > 0 && (
            <div className="tiny" style={{ marginTop: 8, color: 'var(--warn)', fontWeight: 600 }}>
              🔥 {streak.current} {streak.current === 1 ? 'день' : streak.current < 5 ? 'дня' : 'дней'} подряд
            </div>
          )}
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <div className="topbar__crumb">
              {deck
                ? 'Лексика · колода'
                : verb
                  ? 'Глаголы · карточка'
                  : topic
                    ? 'Грамматика · тема'
                    : 'Deutsch für Russen'}
            </div>
            <div className="topbar__title">{current?.title ?? 'Обзор'}</div>
          </div>
          <div className="topbar__spacer" />
          <div className="row row--wrap" style={{ gap: 8 }}>
            {streak.current > 0 && <Badge tone="warn">🔥 {streak.current}</Badge>}
            <Badge tone="primary">{totals.xp} XP</Badge>
            {dueCount > 0 && (
              <button className="btn btn--sm btn--primary" onClick={() => navigate('/trainer')}>
                К повтору: {dueCount}
              </button>
            )}
          </div>
        </header>

        <div className="content">{render()}</div>
      </main>

      {toastReady ? <ToastHost /> : null}
    </div>
  )
}
