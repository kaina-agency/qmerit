import { useContext, useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { ClientDataKey, ClientDataContext } from '../../hooks/client-data'
import FormSection from '../form-section'
import { FormSectionContext } from '../form-section-context'
import { setAnalytics } from '../analytics'

export const ChargingUnitOrOutletContext: FormSectionContext = {
  component: ChargingUnitOrOutlet,
  key: 'charging-or-outlet',
  mutates: [ClientDataKey.CHARGE_TYPE]
}

export default function ChargingUnitOrOutlet() {
  useEffect(() => {setAnalytics('charging-unit-info')})

  const { register } = useFormContext()
  const { data, setValue } = useContext(ClientDataContext)
  const [ chargeType, setChargeType ] = useState(data.CHARGE_TYPE)

  const handleNext = () => {
    setValue(ClientDataKey.CHARGE_TYPE, chargeType)
  }

  const handleChargeTypeChange = async (e) => {
    setChargeType(e.target.value)
  }

  return (
    <FormSection
      title={data.LANGUAGE === 'en' ? 'Charging Unit or Outlet' :'Unité ou prise de charge'}
      nextButtonDTM="charging unit info"
      goNext={ chargeType ? handleNext :null}
    >
      <div>
        <p className="text-2xl mb-7">
          {data.LANGUAGE === 'en' ? 'Would you like to have a charging outlet (240-volt outlet) or a charging unit installed?'
            :'Aimeriez-vous avoir une prise de charge (prise de 240 volts) ou une unité de charge? '}

        </p>

        <div className="std-input-container">
          <div className="sm:w-6/12 w-full relative">
            <select
              {...register(ClientDataKey.CHARGE_TYPE)}
              defaultValue={data.CHARGE_TYPE ? data.CHARGE_TYPE : ''}
              onChange={(e) => handleChargeTypeChange(e)}
              className="std-select input-full-4 stat-dropdown"
              data-dtm="charging unit info"
            >
              <option value="" disabled hidden>{data.LANGUAGE === 'en' ? 'Choose one...': 'Choisissez...' }</option>
              <option value="outlet">{data.LANGUAGE === 'en' ? 'Charging Outlet':'Prise de charge'}</option>
              <option value="unit">{data.LANGUAGE === 'en' ? 'Charging Unit':'Unité de charge'}</option>
            </select>
            <span className="std-select-arrow" aria-hidden="true">^</span>
          </div>
        </div>
        <span>
          {/*  {showErrors} */}
        </span>
      </div>
    </FormSection>
  )
}
