import { useEffect } from 'react'
import Header from '../components/Header/Header'
import FAQ from '../components/FAQ/FAQ'
import Footer from '../components/Footer/Footer'

export default function FAQPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header />
      <main>
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
