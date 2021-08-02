import { PropsWithChildren, useContext } from 'react'
import { ClientDataContext } from '../hooks/client-data'
import styles from './form-section.module.css'

interface FormSectionProps {
  title: string,
  finale?:boolean,
  label?:string,
  goNext?: () => void
}

export default function FormSection({ title, goNext, finale = false,label = null, children }: PropsWithChildren<FormSectionProps>) {
  const { data } = useContext(ClientDataContext)
  let nextButtonElement = <input
    className={styles.nextBtn + ' rounded-full uppercase text-white'}
    onClick={() => goNext()}
    type="button"
    value={data.LANGUAGE === 'en' ? (label ? label :'Next') : (label ? label : 'Suivant')}
  />
  if (!goNext) {
    nextButtonElement = <span></span>
  }

  const numberFinale = (finale) ? ' ' + styles.numberFinale: ''
  const numberLineFinale = (finale) ? ' ' + styles.lineFinale: ''

  return (
    <div className={styles.container + ' mb-10' + ' '}>
      <div className={styles.number + numberFinale + ' rounded-full h-12 w-12 text-white font-louis font-bold text-lg bg-blue relative justify-self-center'} />
      <div className={styles.line + numberLineFinale + ' bg-grey-line w-0.5 mt-6 items-stretch justify-self-center'}></div>
      <div className={styles.title + ' font-bold'}>
        {title}
      </div>
      <div className={styles.questions}>
        {children}
      </div>
      <div className={styles.buttons + ' mt-6'}>
        {nextButtonElement}
      </div>
    </div>
  )
}
