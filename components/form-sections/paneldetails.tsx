import { useContext, useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { ClientDataKey, ClientDataContext } from '../../hooks/client-data'
import FormSection from '../form-section'
import { FormSectionContext } from '../form-section-context'
import { setPageName } from '../analytics'

export const PanelDetailsContext: FormSectionContext = {
  component: PanelDetails,
  key: 'panel-details',
  mutates: [
    ClientDataKey.PANEL_COUNT,
    ClientDataKey.PANEL_LOCATION_ALT
  ]
}

export default function PanelDetails() {
  useEffect(() => {setPageName('eletrical-panel-info')}) // for adobe analytics

  const { register } = useFormContext()
  const { data, setData } = useContext(ClientDataContext)

  const [panelCount, setPanelCount] = useState(data.PANEL_COUNT)
  const [panelLocation, setPanelLocation] = useState(data.PANEL_LOCATION_ALT)

  const [customPanelLocation, setCustomPanelLocation] = useState('')

  const handleNext = () => {
    setData({
      PANEL_COUNT: panelCount,
      PANEL_LOCATION_ALT: panelLocation === 'other' ? customPanelLocation : panelLocation
    })
  }
  const showNext =
    (panelCount !== '' && panelLocation !== '') &&
    (!data.PANEL_COUNT || !data.PANEL_LOCATION_ALT) &&
    (panelLocation !== 'other' || (panelLocation === 'other' && customPanelLocation.length > 0))

  return (
    <FormSection
      title={data.LANGUAGE ==='en' ? 'Electrical Panel Details' : 'Détails du panneau électrique'}
      nextButtonDTM="eletrical panel info"
      goNext={ showNext ? handleNext : null }
    >
      <div>
        <p className="text-2xl mb-7">
          {data.LANGUAGE === 'en' ? 'How many electrical panels do you have?' :'Combien de panneaux électriques avez-vous?'}
        </p>
        <div className="std-input-container">
          <div className="sm:w-6/12 w-full relative">
            <select
              {...register(ClientDataKey.PANEL_COUNT)}
              defaultValue={data.PANEL_COUNT ? data.PANEL_COUNT : ''}
              onChange={(e) => setPanelCount(e.target.value)}
              className="std-select input-full-4 stat-dropdown"
              data-dtm="eletrical panel info"
            >
              <option value="" disabled hidden>{data.LANGUAGE === 'en' ? 'Choose one...': 'Choisissez...' }</option>
              <option value="one">{data.LANGUAGE ==='en' ? 'One' :'Un'}</option>
              <option value="two">{data.LANGUAGE ==='en' ? 'Two' :'Deux'}</option>
              <option value="idk">{data.LANGUAGE ==='en' ? 'I don\'t know' :'Je ne sais pas'}</option>
            </select>
            <span className="std-select-arrow" aria-hidden="true">^</span>
          </div>
        </div>
        <p className="text-2xl my-7">
          {data.LANGUAGE === 'en' ? 'Where is your main electrical panel located?' : 'Où se trouve votre panneau électrique principal?'}
        </p>

        <div className="std-input-container">
          <div className="sm:w-6/12 w-full relative">
            <select
              {...register(ClientDataKey.PANEL_LOCATION_ALT)}
              defaultValue={data.PANEL_LOCATION_ALT ? data.PANEL_LOCATION_ALT : ''}
              onChange={(e) => setPanelLocation(e.target.value)}
              className="std-select input-full-4 stat-dropdown"
              data-dtm="eletrical panel info"
            >
              <option value="" disabled hidden>{data.LANGUAGE === 'en' ? 'Choose one...': 'Choisissez...' }</option>
              <option value="garage">{data.LANGUAGE ==='en' ? 'Inside my garage':'Dans mon garage'}</option>
              <option value="home">{data.LANGUAGE ==='en' ? 'Inside my home':'Chez moi'}</option>
              <option value="outside">{data.LANGUAGE ==='en' ? 'On an outside wall':'Sur un mur à l’extérieur'}</option>
              <option value="basement">{data.LANGUAGE ==='en' ? 'In the basement':'Au sous-sol'}</option>
              <option value="idk">{data.LANGUAGE ==='en' ? 'I don\'t know' :'Je ne sais pas'}</option>
              <option value="other">{data.LANGUAGE ==='en' ? 'Other':'Autre'}</option>
            </select>
            <span className="std-select-arrow" aria-hidden="true">^</span>
          </div>
          <div className={`${panelLocation !== 'other' ? 'hidden' : ''} sm:w-6/12 w-full relative`}>
            <label className="std-label">{data.LANGUAGE === 'en' ? 'Electrical Panel Location*' : 'Location panneau principal'}</label>
            <input
              type="text"
              className="std-text-field input-full-4 stat-input-field"
              data-dtm="eletrical panel info"
              onChange={(e) => setCustomPanelLocation(e.target.value)}
              required
            />
          </div>
        </div>
        {/* <textarea
          className="border-grey-mid border"
          {...register(ClientDataKey.ADDITIONAL_INFO_FOR_INSTALL, { maxLength: 500 })}
          defaultValue={data.ADDITIONAL_INFO_FOR_INSTALL ? data.ADDITIONAL_INFO_FOR_INSTALL : ''}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />*/}
      </div>
    </FormSection>
  )
}
