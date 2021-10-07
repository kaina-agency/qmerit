import { useContext, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ClientDataKey, ClientDataContext } from '../../hooks/client-data'
import FormSection from '../form-section'
import { FormSectionContext } from '../form-section-context'
import { setAnalytics } from '../analytics'

export const BreakerSizeContext: FormSectionContext<BreakerSizeProps> = {
  component: BreakerSize,
  key: 'breaker-size',
  mutates: [ClientDataKey.BREAKER_SIZE, ClientDataKey.ADDITIONAL_INFO_FOR_INSTALL]
}

interface BreakerSizeProps {
  forceNext: boolean,
  onComplete: () => void
}

export default function BreakerSize({forceNext, onComplete}: BreakerSizeProps) {
  useEffect(() => {setAnalytics('additional-details')})

  const { register, reset } = useFormContext()
  const { data,  setData} = useContext(ClientDataContext)
  const [breakerSize, setBreakerSize] = useState(data.BREAKER_SIZE)
  const [additionalInfo, setAdditionalInfo] = useState(data.ADDITIONAL_INFO_FOR_INSTALL)

  const [customBreakerSize, setCustomBreakerSize] = useState('')
  const allowComplete = useRef(false)
  const hasComplete = useRef(false)

  useEffect(() => {
    reset({
      [ClientDataKey.BREAKER_SIZE]: breakerSize ?? '',
      [ClientDataKey.ADDITIONAL_INFO_FOR_INSTALL]: additionalInfo ?? '',
    })
  }, [])

  const handleGoNext = () => {
    allowComplete.current = true
    setData({
      BREAKER_SIZE: breakerSize === 'other' ? customBreakerSize : breakerSize,
      ADDITIONAL_INFO_FOR_INSTALL:additionalInfo
    })
  }

  useEffect(() => {
    if (hasComplete.current || !allowComplete.current) return
    onComplete()

    hasComplete.current = true
  }, [data.BREAKER_SIZE, data.ADDITIONAL_INFO_FOR_INSTALL])

  const showNext =
    (breakerSize && forceNext) &&
    (breakerSize !== 'other' || (breakerSize === 'other' && customBreakerSize.length > 0))

  return (
    <FormSection
      title={data.LANGUAGE === 'en' ? 'Additional Details' :'Détails supplémentaires'}
      nextButtonDTM="additional details"
      goNext={ showNext ? handleGoNext : null}
      label={data.LANGUAGE ==='en' ? 'Submit' : 'Soumettre'}
    >
      <div>
        <p className="text-2xl mb-7">
          {data.LANGUAGE ==='en' ? 'What is the size of your main electrical breaker?' :'Quelle est la taille de votre disjoncteur principal?'}
        </p>

        <div className="std-input-container">
          <div className="sm:w-6/12 w-full relative">
            <select
              {...register(ClientDataKey.BREAKER_SIZE)}
              onChange={(e) => setBreakerSize(e.target.value)}
              className="std-select input-full-4 stat-dropdown"
              data-dtm="additional details"
            >
              <option value="" disabled hidden>{data.LANGUAGE === 'en' ? 'Choose here':'Choisissez...'}</option>
              <option value="60">{data.LANGUAGE === 'en' ? '60 amps':'60 A '}</option>
              <option value="100">{data.LANGUAGE === 'en' ? '100 amps' :'100 A'}</option>
              <option value="125">{data.LANGUAGE === 'en' ? '125 amps' :'125 A'}</option>
              <option value="150">{data.LANGUAGE === 'en' ? '150 amps' :'150 A'}</option>
              <option value="200">{data.LANGUAGE === 'en' ? '200 amps' :'200 A'}</option>
              <option value="idk">{data.LANGUAGE === 'en' ? 'I don\'t know' :'Je ne sais pas'}</option>
              <option value="other">{data.LANGUAGE === 'en' ? 'Other' :'Autre'}</option>
            </select>
            <span className="std-select-arrow" aria-hidden="true">^</span>
          </div>
          <div className={`${breakerSize !== 'other' ? 'hidden' : ''} sm:w-6/12 w-full relative`}>
            <label className="std-label">{data.LANGUAGE === 'en' ? 'Breaker Size' : 'Taille de disjoncteur'}*</label>
            <input
              type="text"
              className="std-text-field input-full-4 stat-input-field"
              data-dtm="additional details"
              onChange={(e) => setCustomBreakerSize(e.target.value)}
              required
            />
          </div>
        </div>
        <br/>
        <p className="text-2xl mb-7">
          {data.LANGUAGE == 'en' ? 'Is there anything else you think your installer should know?' :'Y a-t-il un autre détail que votre installateur devrait savoir?'}
        </p>
        <textarea
          style={{ minWidth: '400px' }}
          className="border-grey-mid border resize stat-input-field"
          data-dtm="additional details"
          {...register(ClientDataKey.ADDITIONAL_INFO_FOR_INSTALL, { maxLength: 500 })}
          defaultValue={data.ADDITIONAL_INFO_FOR_INSTALL ? data.ADDITIONAL_INFO_FOR_INSTALL : ''}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
      </div>
    </FormSection>
  )
}
