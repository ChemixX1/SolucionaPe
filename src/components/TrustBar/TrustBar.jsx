import styles from './TrustBar.module.css'
import { useLang } from '../../context/LangContext'

export default function TrustBar() {
  const { t } = useLang()
  const stats = t.trustBar.stats

  return (
    <div className={styles.trustBar}>
      <div className="container">
        <div className={styles.trustBarGrid}>
          {stats.map(({ num, label }, i) => (
            <div key={i} className={styles.trustBarItem}>
              <span className={styles.trustBarNum}>{num}</span>
              <span className={styles.trustBarLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
