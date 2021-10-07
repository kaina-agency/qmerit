import { useContext, useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { ClientDataKey, ClientDataContext } from '../../hooks/client-data'
import FormSection from '../form-section'
import { FormSectionContext } from '../form-section-context'
import { setAnalytics } from '../analytics'

export const PanelLocationContext: FormSectionContext = {
  component: PanelLocation,
  key: 'panel-location',
  mutates: [
    ClientDataKey.PANEL_LOCATION,
    ClientDataKey.GARAGE_SIZE,
    ClientDataKey.CHARGING_CAPABILITY
  ]
}

export default function PanelLocation() {
  useEffect(() => {setAnalytics('electrical-panel-location')})

  const { register, reset } = useFormContext()
  const { data, setData } = useContext(ClientDataContext)

  const [panelLocation, setPanelLocation] = useState(data.PANEL_LOCATION)
  const [chargingCapability, setChargingCapability] = useState(data.CHARGING_CAPABILITY)
  const [garageSize, setGarageSize] = useState(data.GARAGE_SIZE)

  const handleNext = () => {
    setData({
      PANEL_LOCATION: panelLocation,
      GARAGE_SIZE: garageSize,
      CHARGING_CAPABILITY:chargingCapability
    })
  }

  useEffect(() => {
    reset({
      [ClientDataKey.PANEL_LOCATION]: panelLocation ?? '',
      [ClientDataKey.GARAGE_SIZE]: garageSize ?? '',
      [ClientDataKey.CHARGING_CAPABILITY]: chargingCapability ?? ''
    })
  }, [])

  return (
    <FormSection
      title={data.LANGUAGE === 'en' ? 'Electrical Panel Location' :'Emplacement du panneau électrique'}
      nextButtonDTM="location"
      goNext={ (chargingCapability && garageSize && panelLocation ) ? handleNext: null }
    >
      <div>
        <p className="text-2xl mb-7">
          {data.LANGUAGE ==='en' ? 'Is your main electrical panel in the garage, basement, or opposite side of the house?'
            :'Votre panneau électrique principal se trouve-t-il dans le garage, au sous-sol ou du côté opposé de la maison?'}
        </p>

        <div className="std-input-container">
          <div className="sm:w-6/12 w-full relative">
            <select
              {...register(ClientDataKey.PANEL_LOCATION)}
              onChange={(e) => setPanelLocation(e.target.value)}
              className="std-select input-full-4 stat-dropdown"
              data-dtm="electrical panel location"
            >
              <option value="" disabled hidden>{data.LANGUAGE === 'en' ? 'Choose one...': 'Choisissez...' }</option>
              <option value="garage">Garage</option>
              <option value="basement">{data.LANGUAGE ==='en'? 'Basement':'Sous-sol'}</option>
              <option value="opposite">{data.LANGUAGE ==='en' ? 'Opposite side of the house':'Côté opposé de la maison'}</option>
            </select>
            <span className="std-select-arrow" aria-hidden="true">^</span>
          </div>
        </div>
        <p className="text-2xl my-7">
          {data.LANGUAGE ==='en' ? 'Will the outlet be installed on the same wall as the main electrical panel or a different wall?'
            :'La prise sera-t-elle installée sur le même mur que le panneau électrique principal ou sur un autre mur?'}
        </p>
        <div className="std-input-container">
          <div className="sm:w-6/12 w-full relative">
            <select
              {...register(ClientDataKey.CHARGING_CAPABILITY)}
              onChange={(e) => setChargingCapability(e.target.value)}
              className="std-select input-full-4 stat-dropdown"
              data-dtm="electrical panel location"
            >
              <option value="" disabled hidden>{data.LANGUAGE === 'en' ? 'Choose one...' : 'Choisissez...'}</option>
              <option value="same">{data.LANGUAGE ==='en' ? 'Same' : 'Le même mur'}</option>
              <option value="different">{data.LANGUAGE ==='en' ? 'Different':'Sur un autre mur'}</option>
            </select>
            <span className="std-select-arrow" aria-hidden="true">^</span>
          </div>
        </div>
        <span>

          <p className="text-2xl my-7">
            {data.LANGUAGE === 'en' ? 'Do you have a 1, 2 or 3 or 4+ car garage?' : 'Avez-vous un garage pour 1, 2,3 ou 4 voitures?'}
          </p>
          <div className="std-input-container">
            <div className="sm:w-6/12 w-full relative">
              <select
                {...register(ClientDataKey.GARAGE_SIZE)}
                onChange={(e) => setGarageSize(e.target.value)}
                className="std-select input-full-4 stat-dropdown"
                data-dtm="electrical panel location"
              >
                <option value="" disabled hidden>{data.LANGUAGE === 'en' ? 'Choose one...' : 'Choisissez...'}</option>
                <option value="1">1 {data.LANGUAGE ==='en' ? 'Car' :'voiture'}</option>
                <option value="2">2 {data.LANGUAGE ==='en' ? 'Car' :'voitures'}</option>
                <option value="3">3 {data.LANGUAGE ==='en' ? 'Car' :'voitures'}</option>
                <option value="4">4 {data.LANGUAGE ==='en' ? 'Car+' :'voitures+'}</option>
              </select>
              <span className="std-select-arrow" aria-hidden="true">^</span>
            </div>
          </div>
        </span>
        <span>
          {/*  {showErrors} */}
        </span>
      </div>
    </FormSection>
  )
}
