import { useEffect, useState, useRef } from 'react'
import styles from './EresTecnicoPage.module.css'
import { useLang } from '../context/LangContext'
import Header from '../components/Header/Header'

function FileList({ files, onRemove, label }) {
  if (!files.length) return null
  return (
    <ul className={styles.fileList}>
      {files.map((f, i) => (
        <li key={i} className={styles.fileItem}>
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M9 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V5L9 1z" stroke="currentColor" strokeWidth="1.2" />
            <path d="M9 1v4h4" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span>{f.name}</span>
          <button type="button" onClick={() => onRemove(i)} aria-label={label}>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 4l8 8M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  )
}

const specialtyServicesES = [
  { name: 'Electricidad', icon: '/assets/images/Electricidad.png' },
  { name: 'Gasfitería', icon: '/assets/images/gasfiteria.png' },
  { name: 'Pintura', icon: '/assets/images/pintura.png' },
  { name: 'Carpintería', icon: '/assets/images/carpinteria.png' },
  { name: 'Cerrajería', icon: '/assets/images/cerrajeria.png' },
  { name: 'Pisos y acabados', icon: '/assets/images/Pisos.png' },
  { name: 'Mantenimiento', icon: '/assets/images/mantenimiento.png' },
]

const specialtyServicesEN = [
  { name: 'Electrical', icon: '/assets/images/Electricidad.png' },
  { name: 'Plumbing', icon: '/assets/images/gasfiteria.png' },
  { name: 'Painting', icon: '/assets/images/pintura.png' },
  { name: 'Carpentry', icon: '/assets/images/carpinteria.png' },
  { name: 'Locksmith', icon: '/assets/images/cerrajeria.png' },
  { name: 'Flooring & Finishes', icon: '/assets/images/Pisos.png' },
  { name: 'Maintenance', icon: '/assets/images/mantenimiento.png' },
]

export default function EresTecnicoPage() {
  const { t, lang } = useLang()
  const te = t.eresTecnico
  const isEs = lang === 'es'
  const specialties = isEs ? specialtyServicesES : specialtyServicesEN

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState('')
  const [specialtyOpen, setSpecialtyOpen] = useState(false)
  const [antecedentesFiles, setAntecedentesFiles] = useState([])
  const [certificadoLaboralFiles, setCertificadoLaboralFiles] = useState([])
  const [reciboLuzFiles, setReciboLuzFiles] = useState([])
  const [certificacionesFiles, setCertificacionesFiles] = useState([])
  const specialtyRef = useRef(null)

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    idType: '',
    dni: '',
    speciality: [],
    nationality: '',
    docType: '',
    districts: '',
    experience: '',
    acceptTerms: false,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (specialtyRef.current && !specialtyRef.current.contains(e.target)) {
        setSpecialtyOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => {
      const next = { ...prev, [name]: type === 'checkbox' ? checked : value }
      if (name === 'nationality' && value !== 'Extranjera') next.docType = ''
      return next
    })
    if (formError) setFormError('')
  }

  const toggleSpecialty = (name) => {
    setFormData(prev => ({
      ...prev,
      speciality: prev.speciality.includes(name)
        ? prev.speciality.filter(item => item !== name)
        : [...prev.speciality, name],
    }))
    if (formError) setFormError('')
  }

  const makeFileHandlers = (setter) => ({
    onChange: (e) => {
      setter(prev => [...prev, ...Array.from(e.target.files)])
      e.target.value = ''
    },
    onRemove: (index) => setter(prev => prev.filter((_, i) => i !== index)),
  })

  const antecedentes = makeFileHandlers(setAntecedentesFiles)
  const certificadoLaboral = makeFileHandlers(setCertificadoLaboralFiles)
  const reciboLuz = makeFileHandlers(setReciboLuzFiles)
  const certificaciones = makeFileHandlers(setCertificacionesFiles)

  const handleSubmit = (e) => {
    e.preventDefault()
    const { fullName, phone, idType, dni, speciality, nationality, districts, experience, acceptTerms } = formData

    if (!fullName.trim() || !phone.trim() || !idType || !dni.trim() || !speciality.length || !nationality || !districts.trim() || !experience) {
      setFormError(te.form.errorFill)
      return
    }

    if (!acceptTerms) {
      setFormError(te.form.errorLegal)
      return
    }

    if (phone.replace(/\D/g, '').length !== 9) {
      setFormError(te.form.errorPhone)
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setFormSubmitted(true)
    }, 700)
  }

  const selectedSpecialties = specialties.filter(s => formData.speciality.includes(s.name))

  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.applyHero} id="postula">

          <div className={styles.storyPanel}>
            <div className={styles.story}>
              <h1 className={styles.title}>{te.title}</h1>
              <p className={styles.subtitle}>{te.desc}</p>

              <div className={styles.mediaFrame}>
                <img
                  src="/assets/images/1 postula.png"
                  alt={isEs ? 'Técnico verificado de SolucionaPe' : 'Verified SolucionaPe technician'}
                  className={styles.heroImage}
                />
              </div>
            </div>
          </div>

          <div className={styles.formPanel}>
            <div className={styles.formCard}>
              {!formSubmitted ? (
                <>
                  <div className={styles.formHeader}>
                    <h2>{te.form.title}</h2>
                    <p>{te.form.subtitle}</p>
                  </div>

                  <form onSubmit={handleSubmit} className={styles.form}>
                    {formError && <div className={styles.formError}>{formError}</div>}

                    <div className={styles.formRow}>
                      <label className={styles.formGroup}>
                        <span>{te.form.fullName} <em>*</em></span>
                        <input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder={te.form.fullNamePlh}
                          autoComplete="name"
                        />
                      </label>

                      <label className={styles.formGroup}>
                        <span>{te.form.phone} <em>*</em></span>
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={te.form.phonePlh}
                          maxLength="9"
                          inputMode="numeric"
                          autoComplete="tel"
                        />
                      </label>
                    </div>

                    <div className={styles.formGroup} ref={specialtyRef}>
                      <span>{te.form.speciality} <em>*</em></span>
                      <div className={styles.dropdownWrapper}>
                        <button
                          type="button"
                          className={`${styles.dropdownTrigger} ${specialtyOpen ? styles.dropdownTriggerOpen : ''}`}
                          onClick={() => setSpecialtyOpen(o => !o)}
                          aria-expanded={specialtyOpen}
                          aria-haspopup="listbox"
                        >
                          {selectedSpecialties.length ? (
                            <span className={styles.dropdownValue}>
                              <span className={styles.dropdownIcon}>
                                <img src={selectedSpecialties[0].icon} alt="" aria-hidden="true" />
                              </span>
                              <span className={styles.dropdownValueText}>
                                {selectedSpecialties.map(({ name }) => name).join(', ')}
                              </span>
                              <span className={styles.dropdownCount}>{selectedSpecialties.length}</span>
                            </span>
                          ) : (
                            <span className={styles.dropdownPlaceholder}>{te.form.specialitySelect}</span>
                          )}
                          <svg
                            className={`${styles.dropdownChevron} ${specialtyOpen ? styles.dropdownChevronOpen : ''}`}
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>

                        {specialtyOpen && (
                          <div className={styles.dropdownMenu} role="listbox" aria-multiselectable="true">
                            {specialties.map(({ name, icon }) => {
                              const isSelected = formData.speciality.includes(name)
                              return (
                                <button
                                  type="button"
                                  role="option"
                                  aria-selected={isSelected}
                                  key={name}
                                  className={`${styles.dropdownItem} ${isSelected ? styles.dropdownItemActive : ''}`}
                                  onClick={() => toggleSpecialty(name)}
                                >
                                  <span className={styles.dropdownIcon}>
                                    <img src={icon} alt="" aria-hidden="true" />
                                  </span>
                                  {name}
                                  {isSelected && (
                                    <svg className={styles.dropdownCheck} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  )}
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <span>{te.form.nationality} <em>*</em></span>
                        <select
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleInputChange}
                          className={styles.selectInput}
                        >
                          <option value="">{te.form.nationalitySelect}</option>
                          <option value="Peruana">{isEs ? 'Peruana' : 'Peruvian'}</option>
                          <option value="Extranjera">{isEs ? 'Extranjera' : 'Foreign'}</option>
                        </select>
                      </div>

                      {formData.nationality === 'Extranjera' ? (
                        <div className={styles.formGroup}>
                          <span>{te.form.docType}</span>
                          <select
                            name="docType"
                            value={formData.docType}
                            onChange={handleInputChange}
                            className={styles.selectInput}
                          >
                            <option value="">{te.form.docTypeSelect}</option>
                            <option value="Pasaporte">{isEs ? 'Pasaporte' : 'Passport'}</option>
                            <option value="Carné de Extranjería">{isEs ? 'Carné de Extranjería' : 'Alien Card (CE)'}</option>
                            <option value="PTP">PTP</option>
                            <option value="Permiso de trabajo">{isEs ? 'Permiso de trabajo' : 'Work permit'}</option>
                          </select>
                        </div>
                      ) : <div />}
                    </div>

                    <div className={styles.formGroup}>
                      <span>{te.form.idType} <em>*</em></span>
                      <select
                        name="idType"
                        value={formData.idType}
                        onChange={handleInputChange}
                        className={styles.selectInput}
                      >
                        <option value="">{te.form.idTypeSelect}</option>
                        <option value="DNI">DNI</option>
                        <option value="Carnet de extranjería">Carnet de extranjería</option>
                      </select>
                    </div>

                    <label className={styles.formGroup}>
                      <span>{te.form.dni} <em>*</em></span>
                      <input
                        name="dni"
                        value={formData.dni}
                        onChange={handleInputChange}
                        placeholder={te.form.dniPlh}
                        inputMode="numeric"
                        maxLength="12"
                      />
                    </label>

                    <label className={styles.formGroup}>
                      <span>{te.form.districts} <em>*</em></span>
                      <input
                        name="districts"
                        value={formData.districts}
                        onChange={handleInputChange}
                        placeholder={te.form.districtsPlh}
                      />
                    </label>

                    <div className={styles.formGroup}>
                      <span>{te.form.experience} <em>*</em></span>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className={styles.selectInput}
                      >
                        <option value="">{te.form.experienceSelect}</option>
                        {te.form.experienceOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.docsSection}>
                      <p className={styles.docsSectionTitle}>{te.form.docsLabel}</p>

                      <div className={styles.formGroup}>
                        <span>{te.form.antecedentesLabel}</span>
                        <div className={styles.uploadArea}>
                          <input
                            type="file"
                            id="antecedentesUpload"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={antecedentes.onChange}
                            className={styles.uploadInput}
                          />
                          <label htmlFor="antecedentesUpload" className={styles.uploadLabel}>
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M12 15V3m0 0L8 7m4-4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M3 16v3a2 2 0 002 2h14a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <strong>{te.form.docsBtn}</strong>
                            <span>{te.form.docsHint}</span>
                          </label>
                          <FileList files={antecedentesFiles} onRemove={antecedentes.onRemove} label={isEs ? 'Quitar' : 'Remove'} />
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <span>{te.form.certificadoLaboralLabel}</span>
                        <div className={styles.uploadArea}>
                          <input
                            type="file"
                            id="certificadoLaboralUpload"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={certificadoLaboral.onChange}
                            className={styles.uploadInput}
                          />
                          <label htmlFor="certificadoLaboralUpload" className={styles.uploadLabel}>
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M12 15V3m0 0L8 7m4-4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M3 16v3a2 2 0 002 2h14a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <strong>{te.form.docsBtn}</strong>
                            <span>{te.form.docsHint}</span>
                          </label>
                          <FileList files={certificadoLaboralFiles} onRemove={certificadoLaboral.onRemove} label={isEs ? 'Quitar' : 'Remove'} />
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <span>{te.form.reciboLuzLabel}</span>
                        <div className={styles.uploadArea}>
                          <input
                            type="file"
                            id="reciboLuzUpload"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={reciboLuz.onChange}
                            className={styles.uploadInput}
                          />
                          <label htmlFor="reciboLuzUpload" className={styles.uploadLabel}>
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M12 15V3m0 0L8 7m4-4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M3 16v3a2 2 0 002 2h14a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <strong>{te.form.docsBtn}</strong>
                            <span>{te.form.docsHint}</span>
                          </label>
                          <FileList files={reciboLuzFiles} onRemove={reciboLuz.onRemove} label={isEs ? 'Quitar' : 'Remove'} />
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <span>{te.form.certificacionesLabel}</span>
                        <div className={styles.uploadArea}>
                          <input
                            type="file"
                            id="certificacionesUpload"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={certificaciones.onChange}
                            className={styles.uploadInput}
                          />
                          <label htmlFor="certificacionesUpload" className={styles.uploadLabel}>
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M12 15V3m0 0L8 7m4-4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M3 16v3a2 2 0 002 2h14a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <strong>{te.form.docsBtn}</strong>
                            <span>{te.form.docsHint}</span>
                          </label>
                          <FileList files={certificacionesFiles} onRemove={certificaciones.onRemove} label={isEs ? 'Quitar' : 'Remove'} />
                        </div>
                      </div>

                      <p className={styles.docsNote}>{te.form.docsNote}</p>
                    </div>

                    <label className={styles.legalCheck}>
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                      />
                      <span>{te.form.legalCheck}</span>
                    </label>

                    <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                      {isSubmitting ? te.form.btnSubmitting : te.form.btnSubmit}
                    </button>
                  </form>
                </>
              ) : (
                <div className={styles.successCard}>
                  <div className={styles.successIcon}>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2>{te.form.successTitle}</h2>
                  <p>{te.form.successDesc}</p>
                  <a href="tel:+51933658163" className={styles.confirmButton}>
                    {te.form.btnConfirm}
                  </a>
                </div>
              )}
            </div>
          </div>

        </section>
      </main>
    </>
  )
}
