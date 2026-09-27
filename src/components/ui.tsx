import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Gender } from '../types'
import { inlineMd } from '../lib/text'
import { useProgress, progressStore } from '../lib/progress'
import { speak } from '../lib/speech'

/* ------------------------- Базовые блоки ------------------------- */

export function Card({
  children,
  className = '',
  flush = false,
  accent = false,
}: {
  children: ReactNode
  className?: string
  flush?: boolean
  accent?: boolean
}) {
  return (
    <div className={`card ${flush ? 'card--flush' : ''} ${accent ? 'card--accent' : ''} ${className}`}>{children}</div>
  )
}

export function Section({
  title,
  desc,
  children,
  action,
}: {
  title: string
  desc?: string
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <section className="section">
      <div className="section__head">
        <div>
          <h2 className="section__title">{title}</h2>
          {desc && <div className="section__desc">{desc}</div>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

export function Stat({
  label,
  value,
  unit,
  hint,
}: {
  label: string
  value: ReactNode
  unit?: string
  hint?: string
}) {
  return (
    <div className="stat">
      <div className="stat__label">{label}</div>
      <div className="stat__value">
        {value}
        {unit && <span className="stat__unit">{unit}</span>}
      </div>
      {hint && <div className="stat__hint">{hint}</div>}
    </div>
  )
}

export function Bar({ value, tone = 'primary', large = false }: { value: number; tone?: 'primary' | 'ok' | 'warn'; large?: boolean }) {
  const pct = Math.max(0, Math.min(1, value)) * 100
  const cls = tone === 'ok' ? 'bar__fill bar__fill--ok' : tone === 'warn' ? 'bar__fill bar__fill--warn' : 'bar__fill'
  return (
    <div className={`bar ${large ? 'bar--lg' : ''}`}>
      <div className={cls} style={{ width: `${pct}%` }} />
    </div>
  )
}

export function Badge({ children, tone = 'default' }: { children: ReactNode; tone?: string }) {
  return <span className={`badge ${tone !== 'default' ? `badge--${tone}` : ''}`}>{children}</span>
}

export function GenderBadge({ article }: { article: Gender }) {
  const ru = article === 'der' ? 'м' : article === 'die' ? 'ж' : 'ср'
  return <span className={`badge badge--${article}`}>{article} · {ru}</span>
}

export function Example({ de, ru, note }: { de: string; ru: string; note?: string }) {
  return (
    <div className="example">
      <div className="row" style={{ gap: 8 }}>
        <div className="example__de">{de}</div>
        <SpeakButton text={de} small />
      </div>
      <div className="example__ru">{ru}</div>
      {note && <div className="tiny muted" style={{ marginTop: 4 }}>{note}</div>}
    </div>
  )
}

export function Md({ text, className = '' }: { text: string; className?: string }) {
  return <p className={className} dangerouslySetInnerHTML={{ __html: inlineMd(text) }} />
}

export function Pitfall({ children }: { children: ReactNode }) {
  return (
    <div className="pitfall">
      <strong>⚠ Ловушка: </strong>
      {children}
    </div>
  )
}

export function Tip({ children }: { children: ReactNode }) {
  return (
    <div className="tip">
      <strong>💡 Совет: </strong>
      {children}
    </div>
  )
}

export function Empty({
  icon = '📭',
  title,
  hint,
  desc,
}: {
  icon?: string
  title: string
  hint?: string
  desc?: string
}) {
  const text = hint ?? desc
  return (
    <div className="empty">
      <div className="empty__icon">{icon}</div>
      <div style={{ fontWeight: 600, color: 'var(--text-2)' }}>{title}</div>
      {text && <div className="small" style={{ marginTop: 4, maxWidth: 460, marginInline: 'auto' }}>{text}</div>}
    </div>
  )
}

/* ------------------------- Озвучка ------------------------- */

export function SpeakButton({ text, small = false, label }: { text: string; small?: boolean; label?: string }) {
  const state = useProgress()
  const [active, setActive] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [])

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    speak(text, { voiceURI: state.settings.voiceURI, rate: state.settings.rate })
    setActive(true)
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setActive(false), 900)
  }

  return (
    <button
      className={`btn btn--icon ${small ? 'btn--ghost' : ''}`}
      onClick={onClick}
      title="Прослушать (немецкое произношение)"
      aria-label="Прослушать"
      style={active ? { borderColor: 'var(--primary)', color: 'var(--primary)' } : undefined}
    >
      {active ? '🔈' : '🔊'}
      {label ? <span style={{ fontSize: 13, fontWeight: 500 }}>{label}</span> : null}
    </button>
  )
}

/* ------------------------- Клавиатура умлаутов ------------------------- */

const UMLAUT_KEYS = ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü', 'é']

export function UmlautBar({ onInsert }: { onInsert: (ch: string) => void }) {
  return (
    <div className="umlaut-bar">
      {UMLAUT_KEYS.map((ch) => (
        <button key={ch} type="button" className="umlaut-key" onClick={() => onInsert(ch)} tabIndex={-1}>
          {ch}
        </button>
      ))}
    </div>
  )
}

/* ------------------------- Таблица грамматики ------------------------- */

export function GrammarTable({ caption, head, rows }: { caption?: string; head: string[]; rows: string[][] }) {
  return (
    <div className="tablewrap" style={{ marginBottom: 12 }}>
      {caption && <div className="gtable__caption">{caption}</div>}
      <table className="gtable">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} dangerouslySetInnerHTML={{ __html: inlineMd(c) }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------- Тост ------------------------- */

let toastSetter: ((msg: string) => void) | null = null
export function toast(msg: string) {
  toastSetter?.(msg)
}

export function ToastHost() {
  const [msg, setMsg] = useState<string | null>(null)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    toastSetter = (m: string) => {
      setMsg(m)
      if (timer.current) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setMsg(null), 2200)
    }
    return () => {
      toastSetter = null
    }
  }, [])

  if (!msg) return null
  return <div className="toast">{msg}</div>
}

/* ------------------------- Избранное ------------------------- */

export function FavButton({ id }: { id: string }) {
  const state = useProgress()
  const isFav = state.favorites.includes(id)
  return (
    <button
      className="btn btn--icon btn--ghost"
      title={isFav ? 'Убрать из избранного' : 'В избранное'}
      onClick={(e) => {
        e.stopPropagation()
        progressStore.toggleFavorite(id)
      }}
      style={isFav ? { color: '#d6337a' } : undefined}
    >
      {isFav ? '★' : '☆'}
    </button>
  )
}

/* ------------------------- Склонение артикля по цвету ------------------------- */

export function ArticleWord({ article, word, plural }: { article?: Gender; word: string; plural?: string }) {
  return (
    <span>
      {article && <span className={`art-${article}`} style={{ fontWeight: 700 }}>{article} </span>}
      <span>{word}</span>
      {plural && <span className="muted small">, {plural}</span>}
    </span>
  )
}
