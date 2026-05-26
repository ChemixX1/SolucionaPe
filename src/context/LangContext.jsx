import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../translations'

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState('es')

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const toggle = () => setLang(l => l === 'es' ? 'en' : 'es')

  return (
    <LangContext.Provider value={{ lang, toggle, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
