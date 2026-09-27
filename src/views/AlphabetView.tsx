import { useMemo, useState } from 'react'
import { alphabet, letterGroups } from '../data/alphabet'
import type { LetterEntry } from '../types'
import { Badge, Card, Section, SpeakButton, Tip } from '../components/ui'
import { navigate } from '../lib/router'
import { shuffle } from '../lib/text'
import { speak } from '../lib/speech'
import { progressStore } from '../lib/progress'

export default function AlphabetView() {
  const [active, setActive] = useState<LetterEntry | null>(null)
  const [quizOn, setQuizOn] = useState(false)
  const [round, setRound] = useState(0)
  const [target, setTarget] = useState<LetterEntry>(() => alphabet[0])
  const [options, setOptions] = useState<LetterEntry[]>([])
  const [answered, setAnswered] = useState<string | null>(null)

  const startQuiz = () => {
    setQuizOn(true)
    newRound()
  }

  const newRound = () => {
    const pool = shuffle(alphabet).slice(0, 4)
    const t = pool[Math.floor(Math.random() * pool.length)]
    setTarget(t)
    setOptions(pool)
    setAnswered(null)
    setRound((r) => r + 1)
    setTimeout(() => speak(t.upper, { rate: 0.8 }), 350)
  }

  const answer = (letter: string) => {
    if (answered) return
    setAnswered(letter)
    progressStore.recordAnswer(letter === target.upper, 5)
    setTimeout(() => newRound(), 1100)
  }

  const total = useMemo(() => alphabet.length, [])

  return (
    <div className="fade-in">
      <Card accent className="section">
        <h1 style={{ fontSize: 24 }}>Немецкий алфавит</h1>
        <p className="small muted" style={{ maxWidth: 640, marginBottom: 12 }}>
          {total} знаков: 26 базовых букв, три умлаута (ä, ö, ü) и «эсцет» (ß). Нажмите на любую букву, чтобы увидеть
          её звук, пример и типичную ошибку русскоязычных.
        </p>
        <div className="row row--wrap" style={{ gap: 8 }}>
          <button className="btn btn--primary" onClick={startQuiz}>
            🎧 Тренировка на слух
          </button>
          <button className="btn" onClick={() => navigate('/phonetik')}>
            Правила чтения →
          </button>
        </div>
      </Card>

      {quizOn && (
        <Section title="Тренировка: какая это буква?" desc={`Раунд ${round} · слушайте название буквы и выбирайте`}>
          <Card>
            <div className="row" style={{ gap: 10, marginBottom: 14 }}>
              <button
                className="btn btn--primary"
                onClick={() => speak(target.upper, { rate: 0.75 })}
              >
                🔊 Прослушать ещё раз
              </button>
              <button className="btn btn--ghost btn--sm" onClick={() => setQuizOn(false)}>
                Закрыть
              </button>
            </div>
            <div className="grid grid--4">
              {options.map((o) => {
                const isCorrect = o.upper === target.upper
                const state = answered ? (isCorrect ? 'ok' : o.upper === answered ? 'err' : '') : ''
                return (
                  <button
                    key={o.upper}
                    className="letter-tile"
                    style={
                      state === 'ok'
                        ? { borderColor: 'var(--ok)', background: 'var(--ok-soft)' }
                        : state === 'err'
                          ? { borderColor: 'var(--err)', background: 'var(--err-soft)' }
                          : undefined
                    }
                    onClick={() => answer(o.upper)}
                  >
                    <span className="letter-tile__big">{o.upper}{o.lower !== o.upper ? o.lower : ''}</span>
                    <span className="letter-tile__ru">{o.ru.split(' ')[0]}</span>
                  </button>
                )
              })}
            </div>
            {answered && (
              <div className={`feedback ${answered === target.upper ? 'feedback--ok' : 'feedback--err'} fade-in`} style={{ marginTop: 14 }}>
                <div className="feedback__title">
                  {answered === target.upper ? '✓ Верно' : `✗ Это была буква ${target.upper}`}
                </div>
                <div className="small">
                  {target.upper}{target.lower !== target.upper ? target.lower : ''} — {target.ru} · пример: {target.example} ({target.exampleRu})
                </div>
              </div>
            )}
          </Card>
        </Section>
      )}

      {letterGroups.map((g) => (
        <Section key={g.id} title={g.title} desc={g.desc}>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: 10 }}>
            {g.letters.map((l) => (
              <button
                key={l.upper}
                className={`letter-tile ${active?.upper === l.upper ? 'letter-tile--active' : ''}`}
                onClick={() => setActive(l)}
              >
                <span className="letter-tile__big">{l.upper}</span>
                <span className="letter-tile__small">{l.lower}</span>
                <span className="letter-tile__ru">{l.ru.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </Section>
      ))}

      {active && (
        <Card className="fade-in section" accent>
          <div className="row row--between row--wrap" style={{ alignItems: 'flex-start' }}>
            <div className="row" style={{ gap: 16 }}>
              <div
                style={{
                  fontSize: 54,
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  minWidth: 70,
                  textAlign: 'center',
                }}
              >
                {active.upper}
                {active.lower !== active.upper && <span style={{ fontSize: 30, color: 'var(--text-3)' }}>{active.lower}</span>}
              </div>
              <div>
                <div className="row" style={{ gap: 8, marginBottom: 4 }}>
                  <span className="mono small">[{active.ipa}]</span>
                  <Badge tone="primary">звучит как: {active.ru}</Badge>
                  <Badge>название буквы: {active.name}</Badge>
                </div>
                <div className="row" style={{ gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 17, fontWeight: 600 }}>
                    {active.example}
                  </span>
                  <span className="muted small">— {active.exampleRu}</span>
                  <SpeakButton text={active.example} small />
                </div>
                {active.hint && <p className="small" style={{ marginBottom: 0, maxWidth: 520 }}>{active.hint}</p>}
              </div>
            </div>
            <button className="btn btn--sm btn--ghost" onClick={() => setActive(null)}>
              Закрыть
            </button>
          </div>
        </Card>
      )}

      <Section title="Что запомнить сразу">
        <div className="grid grid--2">
          <Tip>
            Немецкие гласные бывают <strong>долгими и краткими</strong>, и это меняет смысл слова: Stadt (город) и
            Staat (государство). Русский язык такого различия не делает — тренируйте долготу отдельно.
          </Tip>
          <Tip>
            <strong>z</strong> читается как «ц» (Zeit = «цайт»), <strong>w</strong> — как «в» (Wasser = «васер»),
            <strong> v</strong> — как «ф» (Vater = «фатер»), <strong>j</strong> — как «й» (Jahr = «йаа»).
          </Tip>
        </div>
      </Section>
    </div>
  )
}
