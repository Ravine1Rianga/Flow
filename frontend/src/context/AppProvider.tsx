import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Role } from '../types'

export type Lang = 'en' | 'sw'

export interface AuthUser {
  role: Role
  name: string
  factoryId: string
}

export interface ToastMessage {
  id: string
  text: string
}

interface AppCtx {
  lang: Lang
  setLang: (l: Lang) => void
  auth: AuthUser | null
  login: (u: AuthUser) => void
  logout: () => void
  searchOpen: boolean
  setSearchOpen: (v: boolean) => void
  toasts: ToastMessage[]
  pushToast: (text: string) => void
  dismissToast: (id: string) => void
  t: (en: string, sw: string) => string
}

const Ctx = createContext<AppCtx | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const [auth, setAuth] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem('chaiconnect_auth')
      return raw ? (JSON.parse(raw) as AuthUser) : null
    } catch {
      return null
    }
  })
  const [searchOpen, setSearchOpen] = useState(false)
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  useEffect(() => {
    if (auth) localStorage.setItem('chaiconnect_auth', JSON.stringify(auth))
    else localStorage.removeItem('chaiconnect_auth')
  }, [auth])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const login = useCallback((u: AuthUser) => setAuth(u), [])
  const logout = useCallback(() => setAuth(null), [])

  const pushToast = useCallback((text: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    setToasts((t) => [...t, { id, text }])
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 6000)
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const tr = useCallback(
    (en: string, sw: string) => (lang === 'sw' ? sw : en),
    [lang],
  )

  const value = useMemo<AppCtx>(
    () => ({
      lang,
      setLang,
      auth,
      login,
      logout,
      searchOpen,
      setSearchOpen,
      toasts,
      pushToast,
      dismissToast,
      t: tr,
    }),
    [auth, dismissToast, lang, login, logout, pushToast, searchOpen, toasts, tr],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp() {
  const x = useContext(Ctx)
  if (!x) throw new Error('useApp needs AppProvider')
  return x
}
