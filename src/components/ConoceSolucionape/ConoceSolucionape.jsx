import styles from './ConoceSolucionape.module.css'
import { useInView } from '../../hooks/useInView'
import { useLang } from '../../context/LangContext'

const WA_URL = `https://wa.me/51933658163?text=${encodeURIComponent('Hola, necesito un técnico. ¿Me pueden ayudar?')}`

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function ConoceSolucionape() {
  const [ref, inView] = useInView()
  const { t } = useLang()
  const tc = t.conoce
  return (
    <section ref={ref} className={styles.conoce} id="conoce-solucionape-desktop">
      <div className="container">

        <div className={styles.conoceStage}>
          <div className={`${styles.conoceVisual} reveal-left ${inView ? 'visible' : ''}`}>
            <div className={styles.visualFrame}>
              <img
                src={`${import.meta.env.BASE_URL}assets/images/why-solucionape-premium.png`}
                alt={tc.imageAlt}
                className={styles.conoceImg}
                loading="lazy"
              />
            </div>

            <div className={`${styles.floatNote} ${styles.floatNoteTop}`}>
              <strong>{tc.floatTopValue}</strong>
              <span>{tc.floatTopLabel}</span>
            </div>

            <div className={`${styles.floatNote} ${styles.floatNoteBottom}`}>
              <span className={styles.floatDot} />
              <span>{tc.photoBadge}</span>
            </div>
          </div>

          <div className={`${styles.conoceContent} reveal-right ${inView ? 'visible' : ''}`}>
            <h2 className={styles.conoceTitulo}>
              {tc.title.split('SolucionaPe')[0]}
              <span className={styles.brandName}>Soluciona<span className={styles.brandPe}>Pe</span></span>
              {tc.title.split('SolucionaPe')[1]}
            </h2>
            <p className={styles.conoceDesc}>{tc.desc}</p>

            <div className={styles.proofRow}>
              {tc.proofs.map(({ value, label }) => (
                <div key={label} className={styles.proofItem}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className={styles.benefitStack}>
              {tc.features.map(({ titulo, desc }, i) => (
                <article key={titulo} className={styles.benefitItem}>
                  <span className={`${styles.benefitIndex} ${i === 0 ? styles.webBenefitIcon : ''} ${i === 1 ? styles.securityBenefitIcon : ''} ${i === 2 ? styles.optionsBenefitIcon : ''} ${i === 3 ? styles.warrantyBenefitIcon : ''}`}>
                    {i === 0 ? (
                      <WaIcon />
                    ) : i === 1 ? (
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 21s7-3.5 7-9V5.5L12 3 5 5.5V12c0 5.5 7 9 7 9Z" fill="currentColor" opacity="0.18" />
                        <path d="M12 21s7-3.5 7-9V5.5L12 3 5 5.5V12c0 5.5 7 9 7 9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : i === 2 ? (
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <rect x="4" y="5" width="16" height="14" rx="3" fill="currentColor" opacity="0.16" />
                        <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                        <path d="m15 15 1.5 1.5L20 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : i === 3 ? (
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M7 4h10a2 2 0 0 1 2 2v14l-3-2-4 2-4-2-3 2V6a2 2 0 0 1 2-2Z" fill="currentColor" opacity="0.16" />
                        <path d="M7 4h10a2 2 0 0 1 2 2v14l-3-2-4 2-4-2-3 2V6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                        <path d="m9 11 2 2 4-4" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      `0${i + 1}`
                    )}
                  </span>
                  <div>
                    <h3 className={styles.benefitTitle}>{titulo}</h3>
                    <p className={styles.benefitDesc}>{desc}</p>
                  </div>
                </article>
              ))}
            </div>

            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={styles.conoceCta} style={{ background: '#25d366', borderColor: '#25d366', color: '#fff' }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {tc.cta}
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
