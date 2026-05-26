import { useState, useEffect } from 'react'
import { useInView } from '../../hooks/useInView'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import styles from './ComoSolicitar.module.css'
import { useLang } from '../../context/LangContext'

const WA_NUMBER = '51933658163'
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('¡Hola! Me gustaría solicitar un servicio, por favor.')}`

const WaIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const STEP_DURATION = 8200

const chatScreens = {
  1: [
    {
      src: '/assets/images/chat1.png',
      alt: 'Inicio, bienvenida y botón para solicitar servicio',
      scale: 1,
      offset: '0px',
    },
  ],
  2: [
    {
      src: '/assets/images/chat2%20part1.jpeg',
      alt: 'Datos personales del cuestionario',
      scale: 1.08,
      offset: '-72px',
    },
    {
      src: '/assets/images/chat2%20part2.jpeg',
      alt: 'Datos del servicio solicitado',
      scale: 1.08,
      offset: '-72px',
    },
  ],
  3: [
    {
      src: '/assets/images/chat3.png',
      alt: 'Confirmación de solicitud y código de servicio',
      scale: 1,
      offset: '0px',
    },
  ],
  4: [
    {
      src: '/assets/images/chat4.png',
      alt: 'Maestro disponible con calificaciones y opciones',
      scale: 1,
      offset: '0px',
    },
  ],
  5: [
    {
      src: '/assets/images/chat%205.jpeg',
      alt: 'Evaluaciones del maestro seleccionado',
      scale: 1.08,
      offset: '-72px',
    },
  ],
}

const stepIcons = [
  // 1: Mensaje inicial
  () => <WaIcon />,
  // 2: Cuestionario
  () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M9 3h6l1 2h3a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3z" />
      <path d="M8 10h8M8 14h5" />
      <path d="M15.5 18.5l3-3a1.4 1.4 0 0 1 2 2l-3 3-2.5.5z" />
    </svg>
  ),
  // 3: Código
  () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <rect x="4" y="9" width="16" height="11" rx="2" />
      <path d="M8 9V7a4 4 0 0 1 8 0v2" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M10 17h.01M14 17h.01" />
    </svg>
  ),
  // 4: Maestro
  () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M6 10a6 6 0 0 1 12 0" />
      <path d="M5 10h14" />
      <path d="M8 10V7M16 10V7" />
      <circle cx="12" cy="14" r="3" />
      <path d="M5 22a7 7 0 0 1 14 0" />
      <path d="M18.5 15.5l2 2 2.5-3" />
    </svg>
  ),
  // 5: Evaluaciones
  () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M21 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3z" />
      <path d="M12 7.5l1.1 2.2 2.4.4-1.7 1.7.4 2.4-2.2-1.1-2.2 1.1.4-2.4-1.7-1.7 2.4-.4z" />
    </svg>
  ),
]

/* Image-based WhatsApp preview for each step */
function StepPreview({ step }) {
  const screens = chatScreens[step] || chatScreens[1]
  const isAlternating = screens.length > 1

  return (
    <div className={`${styles.previewFrame} ${styles.previewFrameImage}`}>
      <div className={styles.screenShotStage}>
        {screens.map((screen) => (
          <img
            key={screen.src}
            src={screen.src}
            alt={screen.alt}
            className={`${styles.screenShot} ${isAlternating ? styles.screenShotAlternating : ''}`}
            style={{
              '--screen-scale': screen.scale,
              '--screen-offset': screen.offset,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function ComoSolicitar() {
  const [current, setCurrent] = useState(1)
  const [ref, inView] = useInView()
  const { t } = useLang()
  const tc = t.comoSolicitar
  const steps = tc.steps
  const total = steps.length

  useEffect(() => {
    const timer = setTimeout(
      () => setCurrent(c => (c < total ? c + 1 : 1)),
      STEP_DURATION
    )
    return () => clearTimeout(timer)
  }, [current, total])

  return (
    <section ref={ref} className={styles.comoSolicitar} id="como-solicitar">
      <div className={styles.decoGrid} />

      <div className="container">
        <h2 className={`${styles.comoSolicitarTitulo} reveal ${inView ? 'visible' : ''}`}>
          {tc.title}
        </h2>
        {/* ── DESKTOP ── */}
        <div className={styles.comoSolicitarDesktop}>

          <div className={styles.stepsColumn}>
            <h2 className={styles.desktopSectionTitle}>{tc.title}</h2>
            <div className={styles.comoSolicitarListaWrap}>
              <ul className={styles.comoSolicitarLista}>
                {steps.map(({ num, titulo, desc }) => (
                  <li
                    key={num}
                    className={`${styles.stepLi} ${num === 1 ? styles.stepLiWhatsapp : ''} ${current === num ? styles.active : ''}`}
                    onClick={() => setCurrent(num)}
                  >
                    <div className={styles.stepLiIconCol}>
                      <div className={`${styles.stepIconWrap} ${num === 1 ? styles.stepIconWhatsapp : ''}`}>
                        {stepIcons[num - 1]?.(current === num)}
                      </div>
                    </div>
                    <div className={styles.stepLiTexto}>
                      <h3>{titulo}</h3>
                      {current === num && <p className={styles.stepDesc}>{desc}</p>}
                    </div>
                    {current === num && (
                      <div key={`p${num}-${current}`} className={styles.stepProgress} />
                    )}
                    <div className={styles.netflixNumber}>{num}</div>
                  </li>
                ))}
              </ul>

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.solicitarCta}
                style={{ background: '#25d366', borderColor: '#25d366', color: '#fff' }}
              >
                <WaIcon />
                Solicita tu servicio por WhatsApp
              </a>
            </div>
          </div>

          {/* Web preview mockup */}
          <div className={styles.phoneFrame}>
            <div className={styles.phoneButtonLeft1} />
            <div className={styles.phoneButtonLeft2} />
            <div className={styles.phoneButtonRight} />

            {steps.map((_, i) => (
              <div
                key={i}
                className={`${styles.stepPanel} ${current === i + 1 ? styles.panelActive : ''}`}
              >
                <StepPreview step={i + 1} />
              </div>
            ))}

            <div className={styles.phoneBaseShadow} />
          </div>

          {/* Vertical controls */}
          <div className={styles.verticalControls}>
            <button
              className={styles.squareArrowBtn}
              onClick={() => setCurrent(c => (c > 1 ? c - 1 : total))}
              aria-label="Paso anterior"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowIcon}>
                <polyline points="18 15 12 9 6 15"/>
              </svg>
            </button>
            <button
              className={styles.squareArrowBtn}
              onClick={() => setCurrent(c => (c < total ? c + 1 : 1))}
              aria-label="Siguiente paso"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowIcon}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>

        </div>

        {/* ── MOBILE ── */}
        <div className={styles.comoSolicitarMobile}>
          <Swiper
            modules={[Pagination]}
            slidesPerView={1.08}
            spaceBetween={12}
            centeredSlides
            grabCursor
            pagination={{ el: `.${styles.mobilePag}`, clickable: true }}
            breakpoints={{ 480: { slidesPerView: 1.3 }, 640: { slidesPerView: 1.6 } }}
          >
            {steps.map(({ num, mobileLabel }) => (
              <SwiperSlide key={num} className={styles.mobileSlide}>
                <div className={styles.mobilePreviewWrap}>
                  <StepPreview step={num} />
                </div>
                <p className={styles.mobileLabel}>
                  <strong>{num}.</strong> {mobileLabel}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.mobilePag} />
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={styles.solicitarCtaMobile} style={{ background: '#25d366', borderColor: '#25d366', color: '#fff' }}>
              <WaIcon />
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
