import { useState } from 'react'
import styles from './Footer.module.css'
import { useLang } from '../../context/LangContext'
import { Link } from 'react-router-dom'

const ChevronIcon = () => (
  <svg className={styles.footerChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const phoneIcon = <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
const mailIcon = <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>
const chatIcon = <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></>

export default function Footer() {
  const [openIdx, setOpenIdx] = useState(null)
  const { t } = useLang()
  const tf = t.footer

  const accordionItems = [
    {
      label: tf.llamanos,
      icon: phoneIcon,
      body: (
        <>
          <p>+51 933 658 163</p>
          <p>{tf.schedule}</p>
        </>
      ),
    },
    {
      label: tf.escribenos,
      icon: mailIcon,
      body: (
        <>
          <a href="mailto:hola@solucionape.pe">hola@solucionape.pe</a>
          <a href="tel:+51933658163">+51 933 658 163</a>
        </>
      ),
    },
    {
      label: tf.atencion,
      icon: chatIcon,
      body: (
        <>
          <Link to="/terminos">{tf.terminos}</Link>
          <Link to="/privacidad">{tf.privacidad}</Link>
          <a href="#" className={styles.footerLibroLink}>
            <img src={`${import.meta.env.BASE_URL}assets/images/libro-reclamaciones.png`} alt="Libro de reclamaciones" className={styles.footerLibro} />
          </a>
        </>
      ),
    },
  ]

  return (
    <footer className={styles.footer} id="footer-main" role="contentinfo">
      <div className="container">

        {/* ── MOBILE ACCORDION ── */}
        <div className={styles.footerMobile}>
          {accordionItems.map(({ label, icon, body }, i) => (
            <div
              key={label}
              className={`${styles.footerAccordionItem} ${openIdx === i ? styles.active : ''}`}
            >
              <button
                className={styles.footerAccordionHeader}
                onClick={() => setOpenIdx(prev => prev === i ? null : i)}
              >
                <div className={styles.footerAccordionHeaderLeft}>
                  <svg className={styles.footerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    {icon}
                  </svg>
                  <span>{label}</span>
                </div>
                <ChevronIcon />
              </button>
              <div className={styles.footerAccordionBody}>{body}</div>
            </div>
          ))}
        </div>

        {/* ── DESKTOP COLUMNS ── */}
        <div className={styles.footerDesktop}>
          <div className={styles.footerDesktopMarca}>
            <a href="/" aria-label="SolucionaPe" className={styles.footerLogo}>
              <span className={styles.footerLogoText}>
                Soluciona<span className={styles.footerLogoHighlight}>Pe</span>
              </span>
            </a>
            <p>{tf.desc}</p>
          </div>
          <div className={styles.footerDesktopCol}>
            <h4>{tf.llamanos}</h4>
            <p>+51 933 658 163</p>
            <p>{tf.desktopSchedule}</p>
            <p>{tf.emergencias}</p>
          </div>
          <div className={styles.footerDesktopCol}>
            <h4>{tf.escribenos}</h4>
            <a href="mailto:hola@solucionape.pe">hola@solucionape.pe</a>
            <a href="tel:+51933658163">+51 933 658 163</a>
          </div>
          <div className={styles.footerDesktopCol}>
            <h4>{tf.atencion}</h4>
            <Link to="/terminos">{tf.terminos}</Link>
            <Link to="/privacidad">{tf.privacidad}</Link>
            <a href="#" className={styles.footerLibroLink}>
              <img src={`${import.meta.env.BASE_URL}assets/images/libro-reclamaciones.png`} alt="Libro de reclamaciones" className={styles.footerLibro} />
            </a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>{tf.copyright}</p>
        </div>

      </div>
    </footer>
  )
}
