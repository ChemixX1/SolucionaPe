import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from './context/LangContext'
import HomePage from './pages/HomePage'
import FAQPage from './pages/FAQPage'
import EresTecnicoPage from './pages/EresTecnicoPage'
import LegalPage from './pages/LegalPage'

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/eres-tecnico" element={<EresTecnicoPage />} />
          <Route path="/terminos" element={<LegalPage type="terms" />} />
          <Route path="/privacidad" element={<LegalPage type="privacy" />} />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  )
}
