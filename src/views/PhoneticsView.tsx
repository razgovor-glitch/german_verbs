import { useState } from 'react'
import { minimalPairs, phoneticRules } from '../data/phonetics'
import { Badge, Card, GrammarTable, Section, SpeakButton, Tip } from '../components/ui'
import { navigate } from '../lib/router'

export default function PhoneticsView() {
  const [open, setOpen] = useState<string | null>('ch')
  const [level, setLevel] = useState<'all' | 'A1' | 'A1+'>('all')

  const list = phoneticRules.filter((r) => level === 'all' || r.level === level)

  return (
    <div className="fade-in">
      <Card accent className="section">
        <h1 style={{ fontSize: 24 }}>Правила чтения и произношение</h1>
        <p className="small muted" style={{ maxWidth: 660 }}>
          Немецкое чтение подчиняется правилам гораздо строже английского: однажды выучив сочетания, вы сможете
          прочитать любое незнакомое слово. Ниже — {phoneticRules.length} правил, которые закрывают почти всё.
          Нажимайте 🔊 и повторяйте вслух.
        </p>
        <div className="row row--wrap" style={{ gap: 8, marginTop: 12 }}>
          {(['all', 'A1', 'A1+'] as const).map((l) => (
            <button key={l} className={`chip ${level === l ? 'chip--active' : ''}`} onClick={() => setLevel(l)}>
              {l === 'all' ? 'Все правила' : `Уровень ${l}`}
            </button>
          ))}
          <button className="btn btn--sm btn--ghost" onClick={() => navigate('/alphabet')}>
            ← Алфавит
          </button>
        </div>
      </Card>

      <div className="col" style={{ gap: 12, marginBottom: 30 }}>
        {list.map((rule) => {
          const isOpen = open === rule.id
          return (
            <div key={rule.id} className="rule-card">
              <button
                onClick={() => setOpen(isOpen ? null : rule.id)}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 12,
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  textAlign: 'left',
                  flexWrap: 'wrap',
                }}
              >
                <span className="rule-card__pattern">{rule.pattern}</span>
                <span className="mono small muted">[{rule.ipa}]</span>
                <Badge tone="primary">≈ {rule.ru}</Badge>
                <Badge>{rule.level}</Badge>
                <span style={{ marginLeft: 'auto', color: 'var(--text-3)', fontSize: 13 }}>{isOpen ? '▲' : '▼'}</span>
              </button>

              {isOpen && (
                <div className="fade-in" style={{ marginTop: 12 }}>
                  <p className="small" style={{ marginBottom: 12 }}>{rule.rule}</p>
                  <div className="grid grid--2" style={{ gap: 8 }}>
                    {rule.examples.map((ex) => (
                      <div key={ex.de} className="example" style={{ marginBottom: 0 }}>
                        <div className="row" style={{ gap: 8 }}>
                          <span className="example__de">{ex.de}</span>
                          <SpeakButton text={ex.de} small />
                        </div>
                        <div className="example__ru">{ex.ru}</div>
                      </div>
                    ))}
                  </div>
                  {rule.pitfall && (
                    <div className="pitfall" style={{ marginTop: 12, marginBottom: 0 }}>
                      <strong>Типичная ошибка: </strong>
                      {rule.pitfall}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <Section title="Минимальные пары" desc="Слова, которые различаются одним звуком. Читайте вслух — это лучшая тренировка слуха.">
        <GrammarTable
          head={['Слово A', 'Слово B', 'В чём разница']}
          rows={minimalPairs.map((p) => [p.a, p.b, p.note])}
        />
      </Section>

      <Section title="Четыре звука, которые выдают акцент">
        <div className="grid grid--2">
          <Card>
            <div className="card__title">1. ich-Laut [ç] — мягкое «хь»</div>
            <p className="small muted">
              После e, i, ä, ö, ü и согласных. Язык поднят к твёрдому нёбу, как будто вы готовитесь сказать «и», а
              выходит «хь».
            </p>
            <div className="row row--wrap" style={{ gap: 6 }}>
              {['ich', 'mich', 'Milch', 'Mädchen', 'Kirche'].map((w) => (
                <span key={w} className="row" style={{ gap: 4 }}>
                  <span className="small" style={{ fontWeight: 600 }}>{w}</span>
                  <SpeakButton text={w} small />
                </span>
              ))}
            </div>
          </Card>
          <Card>
            <div className="card__title">2. ach-Laut [x] — гортанное «х»</div>
            <p className="small muted">
              После a, o, u, au. Звук идёт глубоко из горла, как в русском «хорошо», но глубже и с меньшим трением.
            </p>
            <div className="row row--wrap" style={{ gap: 6 }}>
              {['Nacht', 'Buch', 'noch', 'auch', 'machen'].map((w) => (
                <span key={w} className="row" style={{ gap: 4 }}>
                  <span className="small" style={{ fontWeight: 600 }}>{w}</span>
                  <SpeakButton text={w} small />
                </span>
              ))}
            </div>
          </Card>
          <Card>
            <div className="card__title">3. Uvulares r [ʁ] — картавое</div>
            <p className="small muted">
              Русское раскатистое «ррр» — главный маркер акцента. Немецкое r образуется в горле, язык лежит
              расслабленно. В конце слога r вообще превращается в «а».
            </p>
            <div className="row row--wrap" style={{ gap: 6 }}>
              {['Rot', 'der', 'Uhr', 'Arbeit', 'Wasser'].map((w) => (
                <span key={w} className="row" style={{ gap: 4 }}>
                  <span className="small" style={{ fontWeight: 600 }}>{w}</span>
                  <SpeakButton text={w} small />
                </span>
              ))}
            </div>
          </Card>
          <Card>
            <div className="card__title">4. Твёрдый приступ (Knacklaut)</div>
            <p className="small muted">
              Слова и предлоги перед гласной не сливаются: der Apfel звучит как «дэа |апфэль» с лёгким толчком.
              Именно это делает немецкую речь «рубленой» на слух.
            </p>
            <div className="row row--wrap" style={{ gap: 6 }}>
              {['der Apfel', 'ein Ei', 'am Abend', 'zu Hause'].map((w) => (
                <span key={w} className="row" style={{ gap: 4 }}>
                  <span className="small" style={{ fontWeight: 600 }}>{w}</span>
                  <SpeakButton text={w} small />
                </span>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section title="Практический порядок работы">
        <div className="col" style={{ gap: 8 }}>
          <Tip>
            <strong>Шаг 1.</strong> Прочитайте вслух весь алфавит, называя буквы по-немецки: a, be, ce, de… Это база
            для диктовки по буквам (нужна, когда диктуете фамилию или адрес).
          </Tip>
          <Tip>
            <strong>Шаг 2.</strong> Отработайте ch, sch, sp/st, ei, ie, eu, z — это 80% всех трудностей чтения.
          </Tip>
          <Tip>
            <strong>Шаг 3.</strong> Тренируйте долготу гласных на парах: Stadt/Staat, offen/Ofen, Bett/Beet.
          </Tip>
          <Tip>
            <strong>Шаг 4.</strong> Слушайте примеры к словам из раздела «Лексика» и повторяйте вслух — так звук
            связывается со смыслом напрямую, без русского посредника.
          </Tip>
        </div>
      </Section>
    </div>
  )
}
