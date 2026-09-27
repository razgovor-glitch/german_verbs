/** Обёртка над Web Speech API: озвучка немецкого текста. */

export interface VoiceInfo {
  uri: string
  name: string
  lang: string
}

let cachedVoices: SpeechSynthesisVoice[] = []

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!speechSupported()) return Promise.resolve([])
  const existing = window.speechSynthesis.getVoices()
  if (existing.length > 0) {
    cachedVoices = existing
    return Promise.resolve(existing)
  }
  return new Promise((resolve) => {
    let settled = false
    const done = () => {
      if (settled) return
      settled = true
      cachedVoices = window.speechSynthesis.getVoices()
      resolve(cachedVoices)
    }
    window.speechSynthesis.addEventListener('voiceschanged', done, { once: true })
    setTimeout(done, 1200)
  })
}

export function getCachedVoices(): SpeechSynthesisVoice[] {
  if (cachedVoices.length === 0 && speechSupported()) {
    cachedVoices = window.speechSynthesis.getVoices()
  }
  return cachedVoices
}

/** Немецкие голоса, отсортированные: сначала de-DE, потом остальные de-*. */
export function germanVoices(): SpeechSynthesisVoice[] {
  const all = getCachedVoices()
  const de = all.filter((v) => v.lang.toLowerCase().startsWith('de'))
  return de.sort((a, b) => {
    const aDe = a.lang.toLowerCase() === 'de-de' ? 0 : 1
    const bDe = b.lang.toLowerCase() === 'de-de' ? 0 : 1
    if (aDe !== bDe) return aDe - bDe
    return a.name.localeCompare(b.name)
  })
}

export function listVoices(): VoiceInfo[] {
  return getCachedVoices().map((v) => ({ uri: v.voiceURI, name: v.name, lang: v.lang }))
}

export interface SpeakOptions {
  voiceURI?: string | null
  rate?: number
  pitch?: number
}

let currentUtterance: SpeechSynthesisUtterance | null = null

export function speak(text: string, opts: SpeakOptions = {}): void {
  if (!speechSupported() || !text.trim()) return
  const synth = window.speechSynthesis
  try {
    synth.cancel()
  } catch {
    /* noop */
  }

  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'de-DE'
  u.rate = opts.rate ?? 0.9
  u.pitch = opts.pitch ?? 1

  const voices = getCachedVoices()
  const chosen =
    (opts.voiceURI && voices.find((v) => v.voiceURI === opts.voiceURI)) ||
    germanVoices()[0] ||
    voices.find((v) => v.lang.toLowerCase().startsWith('de')) ||
    null
  if (chosen) {
    u.voice = chosen
    u.lang = chosen.lang
  }

  currentUtterance = u
  synth.speak(u)
}

export function stopSpeaking(): void {
  if (!speechSupported()) return
  try {
    window.speechSynthesis.cancel()
  } catch {
    /* noop */
  }
  currentUtterance = null
}

export function isSpeaking(): boolean {
  if (!speechSupported()) return false
  return window.speechSynthesis.speaking
}

export { currentUtterance }
