import { useContext, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { ClientDataKey, ClientDataContext } from '../../hooks/client-data'
import FormSection from '../form-section'
import { FormSectionContext } from '../form-section-context'
import { setPageName } from '../analytics'

export const RentOrOwnContext: FormSectionContext = {
  component: RentOrOwn,
  key: 'rent-or-own',
  mutates: [ClientDataKey.RENT_OR_OWN]
}

export default function RentOrOwn() {
  useEffect(() => {setPageName('rent-or-own')}) // for adobe analytics

  const { register, trigger } = useFormContext()
  const { data, setValue } = useContext(ClientDataContext)

  const handleGoNext = async (e) => {
    const isValid = await trigger(ClientDataKey.RENT_OR_OWN)
    //console.log(getValues(ClientDataKey.RENT_OR_OWN), e)
    if (isValid) {
      setValue(ClientDataKey.RENT_OR_OWN, e.target.value)
    }
  }

  return (
    <FormSection
      title={data.LANGUAGE == 'en' ? 'Rent or Own' : 'Locataire ou propriétaire'}
      goNext={null}
    >
      <div>
        <p className="text-2xl mb-7">
          {data.LANGUAGE == 'en' ? 'Tell us a little bit about your situation. Do you rent or own your property?' :'Parlez-nous un peu de votre situation. Êtes-vous locataire ou propriété?'}
        </p>
        <div className="std-input-container">
          <div className="sm:w-6/12 w-full relative">
            <select
              {...register(ClientDataKey.RENT_OR_OWN)}
              defaultValue={data.RENT_OR_OWN ? data.RENT_OR_OWN : ''}
              onChange={(e) => handleGoNext(e)}
              className="std-select input-full-4 stat-dropdown"
              data-dtm="household type"
            >
              <option value="" disabled hidden>{data.LANGUAGE === 'en' ? 'Choose here' : 'Choisissez...' }</option>
              <option value="rent">{data.LANGUAGE === 'en' ?' Rent':'Locataire'}</option>
              <option value="own">{data.LANGUAGE === 'en' ? 'Own':'Propriété'}</option>
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
