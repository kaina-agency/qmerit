import { useContext, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ClientDataKey, ClientDataContext } from '../../hooks/client-data'
import FormSection from '../form-section'
import { FormSectionContext } from '../form-section-context'
import { setPageName } from '../analytics'

export const PropertyTypeContext: FormSectionContext = {
  component: PropertyType,
  key: 'property-type',
  mutates: [
    ClientDataKey.PROPERTY_TYPE,
    ClientDataKey.HAS_METER
  ]
}

export default function PropertyType() {
  useEffect(() => {setPageName('property-details')}) // for adobe analytics

  const { register } = useFormContext()
  const { data, setData, setValue } = useContext(ClientDataContext)
  const [ showNext, setShowNext ] = useState(false)
  const [ showMeterQuestion, setShowMeterQuestion ] = useState(false)
  const [ propertyType, setPropertyType ] = useState(data.PROPERTY_TYPE)
  const [ hasMeter, setHasMeter ] = useState<boolean | undefined>(data.HAS_METER)
  const [errorMsg, setErrorMsg] = useState('')
  const [showDetails, setShowDetails] = useState(false)

  const handleGoNext = async () => {
    setData({PROPERTY_TYPE: propertyType, HAS_METER:hasMeter})
  }

  const getErrorCopy = () => {

    const isBoltEV = (data.VEHICLE_MODEL && (data.VEHICLE_MODEL === 'ev' || data.VEHICLE_MODEL === 'euv')) || (data.VIN)

    if (isBoltEV) {
      return data.LANGUAGE === 'en' ? 'Based on your selection, you do not qualify for the Charged by Chevrolet Promotion. Talk to your authorized Chevrolet Bolt Dealer about Chevrolet’s Flo Public Charging Credit!'
        : 'Selon votre sélection, vous n’êtes pas admissible à la promotion d’installation à nos frais de Chevrolet. Parlez à votre concessionnaire Chevrolet Bolt autorisé de l’offre d’installation de bornes de recharge publique pour Chevrolet!'
    } else {
      return data.LANGUAGE == 'en' ? 'Based on your selection, you do not qualify for home installation at this time.'
        : "Selon votre sélection, vous n'êtes pas admissible à l'installation à domicile pour le moment."
    }
  }

  const handlePropChange = (e) => {
    setData({
      PROPERTY_TYPE: undefined
      ,GARAGE_TYPE: undefined
    })
    setPropertyType(e.target.value)
  }

  useEffect(() => {
    if (!propertyType) {
      setShowMeterQuestion(false)
      setShowNext(false)
    } else {
      switch (propertyType) {
      case 'apartment':
        setShowMeterQuestion(false)
        setShowNext(false)
        setErrorMsg(getErrorCopy())
        break
      case 'house':
        setErrorMsg('')
        setShowMeterQuestion(false)
        setHasMeter(true)
        setShowNext(true)
        break
      default:
        setShowMeterQuestion(true)
        if (hasMeter || hasMeter === undefined) {
          setErrorMsg('')
        } else {
          setErrorMsg(getErrorCopy())
        }
        if (hasMeter) {
          setShowNext(true)
        } else {
          setShowNext(false)
        }
      }
    }
  }, [propertyType, hasMeter, data.VEHICLE_MODEL])

  const meterQuestion = showMeterQuestion ?
    <div><p className="text-2xl my-7">{data.LANGUAGE ==='en' ? 'Do you have a dedicated meter?': 'Avez-vous un compteur dédié?'}</p>
      <p className="text-grey mini-button stat-button-link" data-dtm="property details" onClick={() => setShowDetails(!showDetails)}>{data.LANGUAGE ==='en' ? 'What’s this?' : 'De quoi s’agit-il?'}
        <span className={showDetails ? ' ': 'hidden'}>
          <br/>
          <br/>
          {data.LANGUAGE === 'en' ? 'A dedicated meter measures only the energy used by your home. A non-dedicated meter (like one in a duplex or condominium) measures the energy usage for you and your neighbour on the same device.'
            : 'Un compteur dédié mesure uniquement l’énergie consommée par votre maison. Un compteur non dédié (comme un dans un duplex ou une propriété condominiale) mesure la consommation d’énergie de votre maison et de celle de votre voisin sur le même appareil.'
          }
          <br/>
          <br/>
        </span>

      </p>
      <br />
      <div className="relative mr-2 inline-block">
        <input
          value="true"
          type="radio"
          id="dedicated-meter-true"
          name="dedicated-meter"
          className="std-radio stat-radio"
          data-dtm="property details"
          {...register(ClientDataKey.HAS_METER, { required: true })}
          onChange={() => { setHasMeter(true)  }}
          defaultChecked={hasMeter === true}
        />
        <span className={`${hasMeter === true ? '' : 'hidden'} std-radio-checkmark`} aria-hidden="true">✓</span>
      </div>
      <label htmlFor="dedicated-meter-true" className={hasMeter === true ? 'text-black' : 'text-grey-mid'}>{data.LANGUAGE === 'en' ? 'Yes' : 'Oui'}</label>
      <br />
      <br />
      <div className="relative mr-2 inline-block">
        <input
          value="false"
          type="radio"
          id="dedicated-meter-false"
          name="dedicated-meter"
          className="std-radio stat-radio"
          data-dtm="property details"
          {...register(ClientDataKey.HAS_METER, { required: true })}
          onChange={() => { setHasMeter(false); setValue(ClientDataKey.HAS_METER,false)  }}
          defaultChecked={hasMeter === false}
        />
        <span className={`${hasMeter === false ? '' : 'hidden'} std-radio-checkmark`} aria-hidden="true">✓</span>
      </div>
      <label htmlFor="dedicated-meter-false" className={hasMeter === false ? 'text-black' : 'text-grey-mid'}>{data.LANGUAGE === 'en' ? 'No' : 'Non'}</label>
    </div>

    : null

  return (
    <FormSection
      title={data.LANGUAGE === 'en' ? 'Property Detail': 'Détails de la propriété'}
      nextButtonDTM="property details"
      goNext={ showNext ? handleGoNext : null}
    >
      <div>
        <p className="text-2xl mb-7">
          {data.LANGUAGE === 'en' ? 'What type of property is this for?' : 'Type de propriété' }
        </p>
        <div className="std-input-container">
          <div className="sm:w-6/12 w-full relative">
            <select
              {...register(ClientDataKey.PROPERTY_TYPE)}
              defaultValue={data.PROPERTY_TYPE ? data.PROPERTY_TYPE : ''}
              onChange={(e) => handlePropChange(e) }
              className="std-select input-full-4 stat-dropdown"
              data-dtm="property details"
            >
              <option value="" disabled hidden>{data.LANGUAGE === 'en' ? 'Choose here':'Choisissez...'}</option>
              <option value="house">{data.LANGUAGE === 'en' ? 'House' : 'Maison'}</option>
              <option value="duplex">{data.LANGUAGE === 'en' ? 'Duplex' : 'Duplex'}</option>
              <option value="condo">{data.LANGUAGE === 'en' ? 'Condo' : 'Copropriété'}</option>
              <option value="townhouse">{data.LANGUAGE === 'en' ? 'Townhouse' : 'Maison en rangée'}</option>
              <option value="apartment">{data.LANGUAGE === 'en' ? 'Apartment' : 'Appartement'}</option>
            </select>
            <span className="std-select-arrow" aria-hidden="true">^</span>

            <br/>
          </div>
        </div>
        {meterQuestion}
        <br/>
        <p>{errorMsg}</p>
      </div>

    </FormSection>
  )
}
