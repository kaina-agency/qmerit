import { useState, useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { ClientDataKey, ClientDataContext } from '../../hooks/client-data'
import FormSection from '../form-section'
import { FormSectionContext } from '../form-section-context'

export const UnitTypeContext: FormSectionContext = {
  component: UnitType,
  key: 'unit-type',
  mutates: [
    ClientDataKey.BRAND_NAME,
    ClientDataKey.NEED_PURCHASING_HELP
  ]
}

export default function UnitType() {
  const { register, trigger,formState: { errors} , getValues } = useFormContext()
  const { data, setData } = useContext(ClientDataContext)
  const [brandError, setBrandError] = useState('')
  const [ownsUnit, setOwnsUnit] = useState(data.NEED_PURCHASING_HELP !== undefined ? !data.NEED_PURCHASING_HELP : undefined)
  const [showNext, setShowNext] = useState(false)

  const handleOwnershipChange = async (e) => {
    setOwnsUnit( e.target.value == 'True' )
    setShowNext(true)
  }

  const handleGoNext = async () => {
    const isValid = await trigger([ClientDataKey.BRAND_NAME])
    if (!isValid && ownsUnit) {
      setBrandError(data.LANGUAGE ==='en' ? 'You must provide a brand name' : 'Marque et le modèle est requis')
    } else {
      setBrandError('')
      setData({
        BRAND_NAME: getValues(ClientDataKey.BRAND_NAME),
        NEED_PURCHASING_HELP: !ownsUnit
      })
    }
  }

  const unitBrand = ownsUnit &&
    <div className="mt-4 std-input-container">
      <div className="sm:w-6/12 w-full" aria-invalid={errors[ClientDataKey.BRAND_NAME]  ? 'true' : 'false'}>
        <label className="std-label">{data.LANGUAGE ==='en' ? 'Insert brand and model here':'Insérer la marque et le modèle ici'}*</label>
        <input type="text" className="std-text-field input-full-4 stat-input-field" data-dtm="charging unit info" defaultValue={data.BRAND_NAME}
          { ...register(ClientDataKey.BRAND_NAME, { required: true, maxLength: 80 }) }
        />
        <span>
          {brandError}
        </span>
      </div>
    </div>

  return (
    <FormSection
      title={data.LANGUAGE ==='en' ? 'Charging Unit' :'Unité de charge'}
      nextButtonDTM="charging unit info"
      goNext={showNext ? handleGoNext:null}
    >
      <div>
        <p className="text-2xl mb-7">
          {data.LANGUAGE ==='en' ? 'Have you purchased a charging unit?'
            :'Avez-vous acheté une unité de charge?'}
        </p>
        <div>
          <div className="relative mr-2 inline-block">
            <input value="True" type="radio" id="purchased-charger-true" className="std-radio stat-radio"
              data-dtm="charging unit info"
              {...register(ClientDataKey.OWNS_UNIT,{required:true})}
              onChange={(e) => handleOwnershipChange(e)}
              defaultChecked={data.NEED_PURCHASING_HELP === false}
            />
            <span className={`${ownsUnit === true ? '' : 'hidden'} std-radio-checkmark`} aria-hidden="true">✓</span>
          </div>
          <label htmlFor="purchased-charger-true" className={ownsUnit === true ? 'text-black' : 'text-grey-mid'}>{data.LANGUAGE ==='en' ? 'Yes, I have purchased a charging unit':'Oui, j\'ai acheté une unité de charge'}</label>
          <br />
          <br />
          <div className="relative mr-2 inline-block">
            <input value="False" type="radio" id="purchased-charger-false" className="std-radio stat-radio"
              data-dtm="charging unit info"
              {...register(ClientDataKey.OWNS_UNIT,{required:true})}
              onChange={(e) => handleOwnershipChange(e)}
              defaultChecked={data.NEED_PURCHASING_HELP === true}
            />
            <span className={`${ownsUnit === false ? '' : 'hidden'} std-radio-checkmark`} aria-hidden="true">✓</span>
          </div>
          <label htmlFor="purchased-charger-false" className={ownsUnit === false ? 'text-black' : 'text-grey-mid'}>{data.LANGUAGE ==='en' ? 'No, I will need Qmerit to assist me with purchasing a charging unit':'Non, j\'aurai besoin de Qmerit pour m’aider à acheter une unité de charge'}</label>
          <span>{unitBrand}</span>
        </div>
        <span>
          {}
        </span>
      </div>
    </FormSection>
  )
}
