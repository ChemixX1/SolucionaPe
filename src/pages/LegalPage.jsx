import { useEffect } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { useLang } from '../context/LangContext'
import styles from './LegalPage.module.css'

export default function LegalPage({ type }) {
  const { t } = useLang()
  const content = t.legal[type] || t.legal.terms
  const alternateHref = type === 'privacy' ? '/terminos' : '/privacidad'
  const alternateLabel = type === 'privacy' ? t.footer.terminos : t.footer.privacidad

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [type])

  return (
    <>
      <Header />
      <main className={styles.legalPage}>
        <section className={styles.hero}>
          <div className="container">
            <span className={styles.badge}>{content.badge}</span>
            <h1>{content.title}</h1>
            <p>{content.intro}</p>
            <div className={styles.meta}>
              <span>{content.updated}</span>
              <a href={alternateHref}>{alternateLabel}</a>
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <div className="container">
            <div className={styles.sections}>
              {content.sections.map((section, index) => (
                <article className={styles.section} key={section.title}>
                  <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h2>{section.title}</h2>
                    <p>{section.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
