import { useEffect, useState, useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { ClientDataKey, ClientDataContext } from '../../hooks/client-data'
import FormSection from '../form-section'
import { FormSectionContext } from '../form-section-context'

export const VINSectionContext: FormSectionContext = {
  component: VINSection,
  key: 'vin',
  mutates: [ClientDataKey.VIN]
}

export default function VINSection() {
  const { register, formState: { errors }, trigger, getValues } = useFormContext()
  const { data, setValue } = useContext(ClientDataContext)

  const [vinError, setVinError] = useState('')
  const [showErrors, setShowErrors] = useState(false)
  const [vinSubmitted, setVinSubmitted] = useState(false)

  const handleGoNext = async () => {
    await trigger(ClientDataKey.VIN)

    fetch('/api/vin?' + new URLSearchParams({
      vin:getValues(ClientDataKey.VIN)
    }))
      .then(response => response.json())
      .then(rdata => {
        //console.log(rdata)
        switch (rdata.status) {
        case 'valid':
          setVinError('')
          setShowErrors(false)
          setValue(ClientDataKey.VIN, getValues(ClientDataKey.VIN))
          setVinSubmitted(true)
          break
        case 'invalid':
          setShowErrors(true)
          setValue(ClientDataKey.VIN,null)
          setVinError( data.LANGUAGE === 'en' ? 'Your VIN is not valid. Please contact your authorized Chevrolet Bolt Dealer.'
            : 'Votre NIV n’est pas valide. Veuillez communiquer avec votre concessionnaire Chevrolet Bolt autorisé.')
          break
        case 'public':
          setShowErrors(true)
          setValue(ClientDataKey.VIN,null)
          setVinError( data.LANGUAGE ==='en' ? 'There was an error with the VIN provided. Please contact your authorized Chevrolet Bolt Dealer.'
            :'Une erreur est survenue concernant le NIV. Veuillez communiquer avec votre concessionnaire Chevrolet Bolt autorisé.')
          break
        }
      })
      .catch(rerror => {
        console.error(rerror)
      })
  }

  useEffect(() => {
    if (!errors[ClientDataKey.VIN] && !showErrors) {
      setVinError('')
    }

    switch (errors[ClientDataKey.VIN]?.type) {
    case 'required':
      setVinError(data.LANGUAGE ==='en' ? 'VIN is required' : 'NIV est requise')
      break
    case 'mixLength':
    case 'maxLength':
      setVinError(data.LANGUAGE ==='en' ? 'VIN is invalid' : 'NIV est invalide')
      break
    }
  })

  return (
    <FormSection
      title={data.LANGUAGE ==='en' ? 'VIN' : 'NIV'}
      goNext={ vinSubmitted? null: handleGoNext}
    >
      <p className="text-2xl mb-7">
        {data.LANGUAGE ==='en' ? 'Provide your VIN' : 'Veuillez fournir votre numéro d’identification de véhicule'}
      </p>
      <div
        aria-invalid={errors[ClientDataKey.VIN] ? 'true' : 'false'}
        className="std-input-container"
      >
        <div className="sm:w-6/12 w-full">
          <label className="std-label">{data.LANGUAGE ==='en' ? 'VIN' : 'NIV'}*</label>
          <input
            type="text"
            className="std-text-field input-full-4"
            defaultValue={data[ClientDataKey.VIN]}
            {...register(ClientDataKey.VIN, {
              minLength: 17,
              maxLength: 17,
              required: true

            })}
            readOnly={ !data.VIN ? false:true}

          />
          <span>
            {showErrors && vinError}
          </span>
        </div>
      </div>
    </FormSection>
  )
}
