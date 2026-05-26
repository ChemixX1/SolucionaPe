import { useEffect } from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import TrustBar from '../components/TrustBar/TrustBar'
import ComoSolicitar from '../components/ComoSolicitar/ComoSolicitar'
import ConoceSolucionape from '../components/ConoceSolucionape/ConoceSolucionape'
import GaleriaAnimada from '../components/GaleriaAnimada/GaleriaAnimada'
import Footer from '../components/Footer/Footer'
import FloatingButton from '../components/FloatingButton/FloatingButton'

export default function HomePage() {
  useEffect(() => {
    const targetId = window.location.hash.replace('#', '')
    if (!targetId) {
      window.scrollTo(0, 0)
      return
    }

    window.setTimeout(() => {
      const el = document.getElementById(targetId)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }, [])

  return (
    <>
      <Header />
      <main id="contenido-principal">
        <Hero />
        <TrustBar />
        <GaleriaAnimada />
        <ComoSolicitar />
        <ConoceSolucionape />
      </main>
      <Footer />
      <FloatingButton />
    </>
  )
}
