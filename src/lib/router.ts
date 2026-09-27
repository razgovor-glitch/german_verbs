import { useCallback, useEffect, useState } from 'react'

export interface Route {
  path: string
  query: URLSearchParams
}

function parseHash(): Route {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  const [path, qs] = raw.split('?')
  return { path: path || '/', query: new URLSearchParams(qs ?? '') }
}

export function navigate(path: string, params?: Record<string, string | undefined>): void {
  const qs = params
    ? new URLSearchParams(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== '') as [string, string][],
      ).toString()
    : ''
  const next = `#${path}${qs ? `?${qs}` : ''}`
  if (window.location.hash === next) return
  window.location.hash = next
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash())

  useEffect(() => {
    const onChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', onChange)
    if (!window.location.hash) window.location.hash = '#/'
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

export function useQueryParam(key: string): string | null {
  const route = useRoute()
  return route.query.get(key)
}

/** Скроллит наверх при смене маршрута. */
export function useScrollTopOnNav(dep: string): void {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [dep])
}

export function useHashBack(): () => void {
  return useCallback(() => window.history.back(), [])
}
