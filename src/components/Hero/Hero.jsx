import styles from './Hero.module.css'
import { useLang } from '../../context/LangContext'

const WA_NUMBER = '51933658163'
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, necesito un técnico. ¿Me pueden ayudar?')}`

const WaIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const servicios = [
  { nombre: 'Electricidad', icon: '/assets/images/Electricidad.png' },
  { nombre: 'Gasfitería',   icon: '/assets/images/gasfiteria.png' },
  { nombre: 'Pintura',      icon: '/assets/images/pintura.png' },
  { nombre: 'Carpintería',  icon: '/assets/images/carpinteria.png' },
  { nombre: 'Cerrajería',   icon: '/assets/images/cerrajeria.png' },
  { nombre: 'Pisos',        icon: '/assets/images/Pisos.png' },
  {
    nombre: 'Acabados',
    icon: <><polygon points="12 2 2 7 12 12 22 7 12 2" fill="currentColor" stroke="none" /><polyline points="2 17 12 22 22 17" strokeWidth="2.5" /><polyline points="2 12 12 17 22 12" strokeWidth="2.5" /></>,
  },
  { nombre: 'Mantenimiento', icon: '/assets/images/mantenimiento.png' },
]

export default function Hero() {
  const { t } = useLang()

  return (
    <section className={styles.hero} id="hero">
      <div className="container">
        <div className={styles.heroGrid}>

          <div className={styles.heroContenido}>
            <div className={styles.heroBadge}>
              {t.hero.badge}
            </div>

            <h1 className={styles.heroTitulo}>
              {t.hero.title1} <span className={styles.heroVerificadosHighlight}>{t.hero.titleHL}</span><br />{t.hero.title2}
            </h1>

            <p className={styles.heroSubtitulo}>
              {t.hero.sub1} <strong>{t.hero.subStrong}</strong>{t.hero.sub2}
            </p>

            <div className={styles.heroCtas}>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroBtnPrimary}
                style={{ background: '#fff', borderColor: '#fff', color: '#f97316' }}
                aria-label="Contactar por WhatsApp"
              >
                <WaIcon size={20} />
                Solicita un Técnico por WhatsApp
              </a>
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.heroRight}>
              <div className={styles.heroImgWrap}>
                <div className={styles.heroImgCard} />
                <img
                  src={`${import.meta.env.BASE_URL}assets/images/hero1.png`}
                  alt="Técnicos verificados SolucionaPe"
                  className={styles.heroImg}
                />
              </div>
            </div>
          </div>

        </div>

        <div className={styles.heroCatGrid}>
          {servicios.map(({ nombre, icon }) => (
            <a
              key={nombre}
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola, necesito un técnico de ${nombre}. ¿Me pueden ayudar?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroCatBtn}
            >
              <div className={styles.heroCatBtnIcon}>
                {typeof icon === 'string' ? (
                  <img src={icon.startsWith('/') ? `${import.meta.env.BASE_URL}${icon.substring(1)}` : icon} alt={nombre} className={styles.heroCatIconImg} />
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                    {icon}
                  </svg>
                )}
              </div>
              <span>{t.hero.cats[nombre]}</span>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
