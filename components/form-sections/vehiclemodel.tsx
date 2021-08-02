import {useContext, useEffect, useState } from 'react'
import {useFormContext} from 'react-hook-form'
import { ClientDataKey, ClientDataContext } from '../../hooks/client-data'
import FormSection from '../form-section'
import { FormSectionContext } from '../form-section-context'

export const VehicleModelContext: FormSectionContext = {
  component: VehicleModel,
  key: 'vehicle-model',
  mutates: [
    ClientDataKey.VEHICLE_MODEL,
    ClientDataKey.REJECTS_CHEVY_OFFER
  ]
}

export default function VehicleModel() {
  const { register } = useFormContext()
  const { data, setData } = useContext(ClientDataContext)
  const [ vehicleModel, setVehicleModel ] = useState(data.VEHICLE_MODEL)
  const [ acceptsOffer, setAcceptsOffer ] = useState(data.REJECTS_CHEVY_OFFER)
  const [ showNext, setShowNext ] = useState(false)

  const goNext = () => {
    setData({
      VEHICLE_MODEL:vehicleModel,
      REJECTS_CHEVY_OFFER:!acceptsOffer
    })
  }

  useEffect(() => {
    if (vehicleModel) {
      setShowNext(true)
    }
  }, [acceptsOffer])

  useEffect(() => {
    if (vehicleModel === 'other') {
      setShowNext(false)
    }
    if (vehicleModel !== 'euv' && vehicleModel !== 'ev' && vehicleModel !=='other' && vehicleModel) {
      setShowNext(true)
      setAcceptsOffer(false)
    }
  }, [vehicleModel])

  return (
    <FormSection
      title={data.LANGUAGE =='en' ? 'Vehicle Model Year' : 'Année modèle du véhicule'}
      goNext={showNext ?  goNext : null}
    >
      <div className="flex flex-col space-y-1">
        <span className="text-2xl">
          {data.LANGUAGE =='en' ? 'What vehicle are you planning on charging at home?' : 'Quel véhicule envisagez-vous de charger à la maison?'}
        </span>
        <div>
          <br />
          <div className="relative mr-2 inline-block">
            <input value="ev" type="radio" id="model-ev" className="std-radio"
              {...register(ClientDataKey.VEHICLE_MODEL,{required:true})}
              onChange={ e => setVehicleModel(e.target.value) }
              defaultChecked={vehicleModel == 'ev'}
            />
            <span className={`${vehicleModel === 'ev' ? '' : 'hidden'} std-radio-checkmark`} aria-hidden="true">✓</span>
          </div>
          <label htmlFor="model-ev" className={vehicleModel === 'ev' ? 'text-black' : 'text-grey-mid'}>{data.LANGUAGE === 'en' ?  '2022 BOLT EV' : 'BOLT EV 2022'}</label>
          <br />
          <br />
          <div className="relative mr-2 inline-block">
            <input value="euv" type="radio" id="model-euv"  className="std-radio"
              {...register(ClientDataKey.VEHICLE_MODEL,{required:true})}
              onChange={ e => setVehicleModel(e.target.value) }
              defaultChecked={ vehicleModel == 'euv' }
            />
            <span className={`${vehicleModel === 'euv' ? '' : 'hidden'} std-radio-checkmark`} aria-hidden="true">✓</span>
          </div>
          <label htmlFor="model-euv" className={vehicleModel === 'euv' ? 'text-black' : 'text-grey-mid'}>{data.LANGUAGE === 'en' ?  '2022 BOLT EUV' : 'BOLT EUV 2022'}</label>

          <br />
          <br />
          <div className="relative mr-2 inline-block">
            <input value="other" type="radio" id="model-other"  className="std-radio"
              {...register(ClientDataKey.VEHICLE_MODEL,{required:true})}
              onChange={ e => setVehicleModel(e.target.value) }
              defaultChecked={ (vehicleModel !== 'euv' && vehicleModel !== 'ev' && vehicleModel) ? true : false  }
            />
            <span className={`${vehicleModel !== 'euv' && vehicleModel !== 'ev'  ? '' : 'hidden'} std-radio-checkmark`} aria-hidden="true">✓</span>
          </div>
          <label htmlFor="model-other" className={vehicleModel !== 'euv' && vehicleModel !== 'ev' && vehicleModel ? 'text-black' : 'text-grey-mid'}>{data.LANGUAGE === 'en' ?  'Other...' : 'Autre...'}</label>
          <div className={`${ (vehicleModel !== 'euv' && vehicleModel !== 'ev' && vehicleModel) ? '' : 'hidden'} sm:w-6/12 w-full relative`}>
            <label className="std-label">Vehicle Model*</label>
            <input
              type="text"
              className="std-text-field input-full-4"
              onChange={ e => {
                const val = e.target.value === '' ? 'other' : e.target.value
                setVehicleModel(val)
              }}
              required
            />
          </div>
        </div>

        <div className={vehicleModel === 'euv' || vehicleModel == 'ev' ? '' : 'hidden'} >
          <br/><br/>
          <span className="text-2xl">
            {data.LANGUAGE ==='en' ?
              'Congratulations on your 2022 Bolt! To take advantage of the Charged by Chevrolet Promotion, reach out to your authorized Chevrolet Bolt dealer. If you will not be using the Chevrolet Promotion, please continue.'
              :'Félicitations pour l’achat de votre Bolt 2022! Pour profiter de la promotion Recharge de Chervrolet, communiquez avec votre concessionnaire autorisé de Chevrolet Bolt. Si vous n’utilisez pas la promotion de Chevrolet, veuillez continuer.'}
          </span>
          <div>
            <br />
            <div className="relative mr-2 inline-block">
              <input value="accepts" type="radio" id="offer-accept" className="std-radio"
                {...register(ClientDataKey.REJECTS_CHEVY_OFFER,{required:true})}
                onChange={ () => setAcceptsOffer(true) }
                defaultChecked={ data.REJECTS_CHEVY_OFFER === false }
              />
              <span className={`${acceptsOffer === true ? '' : 'hidden'} std-radio-checkmark`} aria-hidden="true">✓</span>
            </div>
            <label htmlFor="offer-accept" className={acceptsOffer === true ? 'text-black' : 'text-grey-mid'}>{data.LANGUAGE ==='en' ? 'Yes, use Promotion' : 'Oui, j’utiliserai la promotion'}</label>
            <br />
            <br />
            <div className="relative mr-2 inline-block">
              <input value="rejects" type="radio" id="offer-reject"  className="std-radio"
                {...register(ClientDataKey.REJECTS_CHEVY_OFFER,{required:true})}
                onChange={ () => {
                  setShowNext(true)
                  setAcceptsOffer(false)
                }}
                defaultChecked={ data.REJECTS_CHEVY_OFFER === true }
              />
              <span className={`${acceptsOffer === false && showNext ? '' : ''} std-radio-checkmark`} aria-hidden="true">✓</span>
            </div>
            <label htmlFor="offer-reject" className={acceptsOffer === false && showNext ? 'text-black' : 'text-grey-mid'}>{data.LANGUAGE ==='en' ? 'I will not use the Chevrolet Promotion' : 'Je n\'utiliserai pas la promotion de Chevrolet'}</label>
          </div>
        </div>


      </div>


    </FormSection>
  )
}
