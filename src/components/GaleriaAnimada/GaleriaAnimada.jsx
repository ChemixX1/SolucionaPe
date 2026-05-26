import { useState, useEffect } from 'react'
import styles from './GaleriaAnimada.module.css'
import { useInView } from '../../hooks/useInView'
import { useLang } from '../../context/LangContext'

const CELLS = [
  { area: 'a', img1: '/assets/images/grid%201200.png',  img2: '/assets/images/grid1%201200.png',  offset: '0s',   wide: true },
  { area: 'b', img1: '/assets/images/1%20600x600.png', img2: '/assets/images/2%20600x600.png', offset: '2.4s', square: true },
  { area: 'c', img1: '/assets/images/5.png',  img2: '/assets/images/6.png',  offset: '1.2s', tall: true },
  { area: 'd', img1: '/assets/images/3%20600x600.png', img2: '/assets/images/4%20600x600.png', offset: '3.6s', square: true },
  { area: 'e', img1: '/assets/images/grid2%201200.png', img2: '/assets/images/grrid%201200.png', offset: '0.8s', wide: true },
]

const REVIEWS = [
  { nombre: 'María González Ríos',   servicio: 'Gasfitería · Miraflores',  texto: 'El técnico llegó en menos de una hora. Reparó la tubería sin ensuciar nada. Totalmente recomendado.' },
  { nombre: 'Carlos Ramírez Chávez', servicio: 'Electricidad · San Isidro', texto: 'Profesional, puntual y con precios justos. Ya lo tengo guardado para la próxima emergencia.' },
  { nombre: 'Lucía Torres Mendoza',  servicio: 'Carpintería · Surco',       texto: 'Me instaló las puertas perfectas. Trabajo impecable y muy ordenado. Definitivamente volvería a contratar.' },
  { nombre: 'Jorge Morales Vega',    servicio: 'Pintura · Pueblo Libre',    texto: 'Pintaron todo el departamento en un día. Acabado profesional al mejor precio. Muy satisfecho.' },
  { nombre: 'Ana Vargas Solis',      servicio: 'Cerrajería · Barranco',     texto: 'Emergencia a las 10 pm y llegaron en 20 minutos. Me salvaron la noche. Excelente servicio.' },
]

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
)

export default function GaleriaAnimada() {
  const [ref, inView] = useInView()
  const { t } = useLang()
  const tg = t.galeria
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(i => (i + 1) % REVIEWS.length)
    }, 4500)
    return () => clearInterval(id)
  }, [])

  const review = REVIEWS[current]

  return (
    <section ref={ref} className={styles.galeria}>
      <div className="container">

        <div className={`${styles.galeriaHeader} reveal ${inView ? 'visible' : ''}`}>
          <h2 className={styles.titulo}>¡{tg.title}!</h2>
        </div>

        <div className={`${styles.galeriaGrid} reveal ${inView ? 'visible' : ''}`}>
          {CELLS.map(({ area, img1, img2, offset, tall, wide, square }) => (
            <div
              key={area}
              className={`${styles.cell} ${tall ? styles.cellTall : ''} ${wide ? styles.cellWide : ''} ${square ? styles.cellSquare : ''}`}
              style={{ gridArea: area }}
            >
              <img src={img1} alt="" aria-hidden="true" className={styles.imgA} style={{ animationDelay: offset }} />
              <img src={img2} alt="" aria-hidden="true" className={styles.imgB} style={{ animationDelay: offset }} />
              <div className={styles.cellOverlay} />
            </div>
          ))}
        </div>

        <div className={`${styles.reviewWrap} reveal ${inView ? 'visible' : ''}`}>
          <div key={current} className={styles.reviewCard}>
            <p className={styles.reviewTexto}>"{review.texto}"</p>
            <div className={styles.reviewAuthor}>
              <div className={styles.reviewAvatar}>{review.nombre[0]}</div>
              <div className={styles.reviewInfo}>
                <div className={styles.reviewNameRow}>
                  <span className={styles.reviewNombre}>{review.nombre}</span>
                  <div className={styles.reviewStars}>
                    {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                  </div>
                </div>
                <span className={styles.reviewMeta}>{review.servicio}</span>
              </div>
            </div>
          </div>
          <div className={styles.reviewDots}>
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
