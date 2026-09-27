import { useEffect, useState } from 'react'
import { Bar, Badge, Card, Section, SpeakButton, Stat } from '../components/ui'
import { computeTotals, progressStore, useProgress } from '../lib/progress'
import { germanVoices, loadVoices, speechSupported } from '../lib/speech'
import { speak } from '../lib/speech'
import { toast } from '../components/ui'

export default function SettingsView() {
  const state = useProgress()
  const totals = computeTotals(state)
  const [voices, setVoices] = useState<{ uri: string; name: string; lang: string }[]>([])
  const [confirmReset, setConfirmReset] = useState(false)
  const supported = speechSupported()

  useEffect(() => {
    loadVoices().then(() => {
      setVoices(germanVoices().map((v) => ({ uri: v.voiceURI, name: v.name, lang: v.lang })))
    })
  }, [])

  return (
    <div className="fade-in">
      <Card accent className="section">
        <h1 style={{ fontSize: 24 }}>Настройки</h1>
        <p className="small muted">Дневная цель, озвучка и управление прогрессом.</p>
      </Card>

      <Section title="Учебный режим">
        <Card>
          <div className="col" style={{ gap: 18 }}>
            <div>
              <div className="small" style={{ fontWeight: 650, marginBottom: 6 }}>
                Дневная цель — {state.settings.dailyGoal} повторений
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={state.settings.dailyGoal}
                onChange={(e) => progressStore.updateSettings({ dailyGoal: Number(e.target.value) })}
                style={{ width: '100%', maxWidth: 420, accentColor: 'var(--primary)' }}
              />
              <div className="row" style={{ gap: 8, marginTop: 8 }}>
                {[15, 30, 50, 80].map((n) => (
                  <button
                    key={n}
                    className={`chip ${state.settings.dailyGoal === n ? 'chip--active' : ''}`}
                    onClick={() => progressStore.updateSettings({ dailyGoal: n })}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="tiny muted" style={{ marginTop: 8 }}>
                Сегодня выполнено: {totals.today.reviews} из {state.settings.dailyGoal}
              </div>
              <div style={{ maxWidth: 420, marginTop: 6 }}>
                <Bar
                  value={Math.min(1, totals.today.reviews / state.settings.dailyGoal)}
                  tone={totals.today.reviews >= state.settings.dailyGoal ? 'ok' : 'primary'}
                />
              </div>
            </div>

            <div>
              <label className="row" style={{ gap: 8, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={state.settings.showIpa}
                  onChange={(e) => progressStore.updateSettings({ showIpa: e.target.checked })}
                  style={{ accentColor: 'var(--primary)' }}
                />
                <span className="small">Показывать транскрипцию IPA в словарных карточках</span>
              </label>
            </div>
          </div>
        </Card>
      </Section>

      <Section title="Произношение" desc="Тренажёр использует встроенный синтезатор речи браузера">
        <Card>
          {!supported ? (
            <div className="feedback feedback--err">
              <div className="feedback__title">Синтез речи недоступен</div>
              <div className="small">
                Ваш браузер не поддерживает Web Speech API. Попробуйте Chrome, Edge или Safari — в них озвучка работает.
              </div>
            </div>
          ) : (
            <div className="col" style={{ gap: 16 }}>
              <div>
                <div className="small" style={{ fontWeight: 650, marginBottom: 6 }}>
                  Немецкий голос {voices.length === 0 && <Badge tone="warn">не найдено</Badge>}
                </div>
                {voices.length === 0 ? (
                  <p className="small muted" style={{ marginBottom: 0 }}>
                    В системе не найдено немецких голосов. Озвучка всё равно будет работать — браузер применит
                    голос по умолчанию с настройкой языка de-DE. Для лучшего качества добавьте немецкий голос в
                    настройках системы: <em>Системные настройки → Универсальный доступ → Устная речь → Системный голос</em>.
                  </p>
                ) : (
                  <div className="col" style={{ gap: 6 }}>
                    <label className="row" style={{ gap: 8 }}>
                      <input
                        type="radio"
                        name="voice"
                        checked={state.settings.voiceURI === null}
                        onChange={() => progressStore.updateSettings({ voiceURI: null })}
                        style={{ accentColor: 'var(--primary)' }}
                      />
                      <span className="small">Автоматически (первый немецкий голос)</span>
                    </label>
                    {voices.map((v) => (
                      <label key={v.uri} className="row" style={{ gap: 8 }}>
                        <input
                          type="radio"
                          name="voice"
                          checked={state.settings.voiceURI === v.uri}
                          onChange={() => {
                            progressStore.updateSettings({ voiceURI: v.uri })
                            speak('Guten Tag! Ich spreche Deutsch.', { voiceURI: v.uri, rate: state.settings.rate })
                          }}
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        <span className="small">
                          {v.name} <span className="muted tiny">({v.lang})</span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="small" style={{ fontWeight: 650, marginBottom: 6 }}>
                  Скорость речи — {state.settings.rate.toFixed(2)}×
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={1.4}
                  step={0.05}
                  value={state.settings.rate}
                  onChange={(e) => progressStore.updateSettings({ rate: Number(e.target.value) })}
                  style={{ width: '100%', maxWidth: 420, accentColor: 'var(--primary)' }}
                />
                <div className="row" style={{ gap: 8, marginTop: 8 }}>
                  {[0.7, 0.8, 0.9, 1.0].map((r) => (
                    <button
                      key={r}
                      className={`chip ${Math.abs(state.settings.rate - r) < 0.01 ? 'chip--active' : ''}`}
                      onClick={() => progressStore.updateSettings({ rate: r })}
                    >
                      {r.toFixed(1)}×
                    </button>
                  ))}
                </div>
              </div>

              <div className="row" style={{ gap: 10 }}>
                <SpeakButton text="Guten Tag! Ich lerne Deutsch und das macht Spaß." label="Проверить звук" />
                <SpeakButton text="Ich möchte einen Kaffee mit Milch, bitte." label="Фраза в кафе" />
              </div>
            </div>
          )}
        </Card>
      </Section>

      <Section title="Статистика">
        <div className="grid grid--4">
          <Stat label="Всего ответов" value={totals.reviews} />
          <Stat label="Точность" value={totals.accuracy} unit="%" />
          <Stat label="Карточек в системе" value={Object.keys(state.cards).length} />
          <Stat label="Время занятий" value={Math.round(totals.seconds / 60)} unit="мин" />
        </div>
      </Section>

      <Section title="Данные" desc="Прогресс хранится только в этом браузере, на вашем устройстве">
        <Card>
          <p className="small muted">
            Ничего не отправляется на сервер. Прогресс живёт в localStorage браузера. Если очистить данные сайта —
            прогресс исчезнет.
          </p>
          <div className="row row--wrap" style={{ gap: 8 }}>
            <button
              className="btn btn--danger"
              onClick={() => {
                progressStore.resetCards()
                toast('Прогресс карточек сброшен')
              }}
            >
              Сбросить прогресс обучения
            </button>
            <button
              className="btn btn--danger"
              onClick={() => {
                if (!confirmReset) {
                  setConfirmReset(true)
                  toast('Нажмите ещё раз для полного сброса')
                  return
                }
                progressStore.resetAll()
                setConfirmReset(false)
                toast('Все данные удалены')
              }}
            >
              {confirmReset ? '⚠ Подтвердить полный сброс' : 'Сбросить всё, включая настройки'}
            </button>
          </div>
        </Card>
      </Section>
    </div>
  )
}
