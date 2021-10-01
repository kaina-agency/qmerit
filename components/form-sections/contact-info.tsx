import { useEffect, useState, useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { ClientDataKey, ClientDataContext } from '../../hooks/client-data'
import FormSection from '../form-section'
import { FormSectionContext } from '../form-section-context'
import { setPageName } from '../analytics'

export const ContactInfoSectionContext: FormSectionContext = {
  component: ContactInfoSection,
  key: 'contact-info',
  mutates: [
    ClientDataKey.FIRST_NAME,
    ClientDataKey.LAST_NAME,
    ClientDataKey.EMAIL,
    ClientDataKey.PHONE,
    ClientDataKey.ADDRESS,
    ClientDataKey.ADDRESS2,
    ClientDataKey.CITY,
    ClientDataKey.PROVINCE,
    ClientDataKey.POSTAL_CODE,
    ClientDataKey.RESIDENCE_TYPE
  ]
}

export default function ContactInfoSection() {
  useEffect(() => {setPageName('contact-info')}) // for adobe analytics

  const { register, formState: { errors }, trigger, getValues } = useFormContext()
  const { data, setData, setValue } = useContext(ClientDataContext)

  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [postalError, setPostalError] = useState('')
  const [provinceError, setProvinceError] = useState('')
  const [showErrors, setShowErrors] = useState(false)
  const [contactComplete, setContactComplete] = useState(false)

  const handleNext = async () => {
    const isValid = await trigger([ClientDataKey.FIRST_NAME
      , ClientDataKey.LAST_NAME
      , ClientDataKey.EMAIL
      , ClientDataKey.PHONE
      , ClientDataKey.ADDRESS
      , ClientDataKey.CITY
      , ClientDataKey.PROVINCE
      , ClientDataKey.POSTAL_CODE
      , ClientDataKey.RESIDENCE_TYPE
    ])
    if (isValid) {
      setData(getValues())
      setContactComplete(true)
    } else {
      setShowErrors(true)
    }
  }

  useEffect(() => {
    if (!errors[ClientDataKey.EMAIL]) {
      setEmailError('')
    } else {
      if (errors[ClientDataKey.EMAIL]?.type === 'required') {
        setEmailError(data.LANGUAGE === 'en' ? 'Email is required' : '')
      } else {
        setEmailError(data.LANGUAGE === 'en' ? 'Invalid Email' : '')
      }
    }

    if (!errors[ClientDataKey.PHONE]) {
      setPhoneError('')
    } else {
      if (errors[ClientDataKey.PHONE]?.type === 'required') {
        setPhoneError(data.LANGUAGE === 'en' ? 'Phone number is required' : '')
      } else {
        setPhoneError(data.LANGUAGE === 'en' ? 'Invalid Phone Number' : '')
      }
    }

    if (!errors[ClientDataKey.PROVINCE]) {
      setProvinceError('')
    } else {
      if (errors[ClientDataKey.PROVINCE]?.type === 'required') {
        setProvinceError(data.LANGUAGE === 'en' ? 'Province is required' : '')
      } else {
        setProvinceError(data.LANGUAGE === 'en' ? 'Invalid Province' : '')
      }
    }

    if (!errors[ClientDataKey.POSTAL_CODE]) {
      setPostalError('')
    } else {
      if (errors[ClientDataKey.POSTAL_CODE]?.type === 'required') {
        setPostalError(data.LANGUAGE === 'en' ? 'Postal code is required' : '')
      } else {
        setPostalError(data.LANGUAGE === 'en' ? 'Invalid Postal Code' : '')
      }
    }
  }, [errors])

  const privacyStatement = data.LANGUAGE ==='en' ?
    <>By clicking Next, the information you provide or upload into this EV Install Form, including your name, address, phone number, email address, and photos will be shared with Qmerit. Qmerit will use this information to facilitate the match to a qualified electrician in your area who for purposes of installing a 240-volt charging outlet at your home. All information shared with Qmerit and Qmerit’s services will be subject to the <a href="https://qmerit.com/terms-of-use"  target="_blank" rel="noreferrer" className="stat-text-link" data-dtm="contact info:terms"><u>Qmerit Terms of Service</u></a> and the <a href="https://qmerit.com/privacy-policy" target="_blank" rel="noreferrer" className="stat-text-link" data-dtm="contact info:terms"><u>Qmerit Privacy Statement.</u></a></>
    :<>En cliquant sur suivant, les renseignements que vous fournissez ou téléversez dans le formulaire d’installation pour VE y compris votre nom, adresse, numéro de téléphone, courriel et photo seront partagés avec Qmerit. Qmerit utilisera ces renseignements pour faciliter la recherche d’un électricien qualifié dans votre région qui pourra installer une prise de recharge de 240 volt. Toutes les informations partagées avec Qmerit et les services Qmerit sont sujettes <a href="https://qmerit.com/terms-of-use#french"  target="_blank" rel="noreferrer" className="stat-text-link" data-dtm="contact info:terms"><u>aux modalités</u></a> et à <a href="https://qmerit.com/privacy-policy/#french" target="_blank" rel="noreferrer" className="stat-text-link" data-dtm="contact info:terms"><u>l’énoncé de confidentialité de Qmerit.</u> </a></>

  return (
    <FormSection
      title={data.LANGUAGE ==='en' ? 'Contact Information' : 'Coordonnées'}
      nextButtonDTM="contact info"
      goNext={ contactComplete ? null : handleNext}
    >
      <div className="flex flex-col space-y-1">
        <p className="text-2xl">
          {data.LANGUAGE === 'en' ? 'Please enter your Information' : 'Veuillez fournir vos coordonnées'}
        </p>
        <p className="font-louis font-bold uppercase text-grey">
          {data.LANGUAGE === 'en' ? ' Installation Address' : 'Adresse de l’emplacement'}
        </p>
      </div>
      <div className="flex flex-wrap std-input-container mt-4">
        <div className="sm:w-6/12 w-full" aria-invalid={errors[ClientDataKey.FIRST_NAME]  ? 'true' : 'false'}>
          <label className="std-label">{data.LANGUAGE ==='en' ? 'First Name':'Prénom'}*</label>
          <input
            type="text"
            className="std-text-field input-full-4 stat-input-field"
            data-dtm="contact info"
            defaultValue={data.FIRST_NAME}
            {...register(ClientDataKey.FIRST_NAME, {
              required: true,
              maxLength: 80
            })}
          />
          <span>
            {showErrors && errors[ClientDataKey.FIRST_NAME] && (data.LANGUAGE ==='en' ? 'First name required' :'')}
          </span>
        </div>
        <div className="sm:w-6/12 w-full" aria-invalid={errors[ClientDataKey.LAST_NAME]  ? 'true' : 'false'}>
          <label className="std-label">{data.LANGUAGE ==='en' ? 'Last Name':'Nom de famille'}*</label>
          <input
            type="text"
            className="std-text-field input-full-4 stat-input-field"
            data-dtm="contact info"
            defaultValue={data.LAST_NAME}
            {...register(ClientDataKey.LAST_NAME, {
              required: true,
              maxLength: 100
            })}
          />
          <span>
            {showErrors && errors[ClientDataKey.LAST_NAME] && (data.LANGUAGE ==='en' ? 'Last name is required' :'')}
          </span>
        </div>
        <div className="sm:w-6/12 w-full"  aria-invalid={errors[ClientDataKey.EMAIL]  ? 'true' : 'false'}>
          <label className="std-label">{data.LANGUAGE ==='en' ? 'E-mail Address': 'Adresse électronique'}*</label>
          <input
            type="email"
            className="std-text-field input-full-4 stat-input-field"
            data-dtm="contact info"
            defaultValue={data.EMAIL}
            {...register(ClientDataKey.EMAIL, {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
            })}
          />
          <span>
            {showErrors && emailError}
          </span>
        </div>
        <div className="sm:w-6/12 w-full"  aria-invalid={errors[ClientDataKey.PHONE]  ? 'true' : 'false'}>
          <label className="std-label">{data.LANGUAGE ==='en' ? 'Phone Number':'Numéro de téléphone'}*</label>
          <input
            type="text"
            className="std-text-field input-full-4 stat-input-field"
            data-dtm="contact info"
            defaultValue={data.PHONE}
            {...register(ClientDataKey.PHONE, {
              required: true,
              pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
            })}
          />
          <span>
            {showErrors && phoneError}
          </span>
        </div>
        <div className="sm:w-6/12 w-full" aria-invalid={errors[ClientDataKey.ADDRESS]  ? 'true' : 'false'}>
          <label className="std-label">{data.LANGUAGE === 'en' ? 'Address 1':'Ligne d’adresse 1'}*</label>
          <input
            type="text"
            className="std-text-field input-full-4 stat-input-field"
            data-dtm="contact info"
            defaultValue={data.ADDRESS}
            {...register(ClientDataKey.ADDRESS, {
              required: true,
              maxLength: 80
            })}
          />
          <span>
            {showErrors && errors[ClientDataKey.ADDRESS] && (data.LANGUAGE ==='en' ? 'Address is required' : '')}
          </span>
        </div>
        <div className="sm:w-6/12 w-full">
          <label className="std-label">{data.LANGUAGE === 'en' ? 'Address 2':'Ligne d’adresse 2'}</label>
          <input
            type="text"
            className="std-text-field input-full-4 stat-input-field"
            data-dtm="contact info"
            defaultValue={data.ADDRESS2}
            {...register(ClientDataKey.ADDRESS2, {
              required: false,
              maxLength: 100
            })}
          />
        </div>
        <div className="sm:w-6/12 w-full" aria-invalid={errors[ClientDataKey.CITY]  ? 'true' : 'false'}>
          <label className="std-label">{data.LANGUAGE ==='en' ? 'City':'Ville'}*</label>
          <input
            type="text"
            className="std-text-field input-full-4 stat-input-field"
            data-dtm="contact info"
            defaultValue={data.CITY}
            {...register(ClientDataKey.CITY, {
              required: true,
              maxLength: 80
            })}
          />
          <span>
            {showErrors && errors[ClientDataKey.CITY] && (data.LANGUAGE ==='en' ? 'City name is required' : '')}
          </span>
        </div>
        <div className="sm:w-6/12 w-full" aria-invalid={errors[ClientDataKey.PROVINCE]  ? 'true' : 'false'}>
          <label className="std-label">Province*</label>
          <input
            type="text"
            className="std-text-field input-full-4 stat-input-field"
            data-dtm="contact info"
            defaultValue={data.PROVINCE}
            {...register(ClientDataKey.PROVINCE, {
              required: true,
              maxLength: 80
            })}
          />
          <span>
            {showErrors && provinceError}
          </span>
        </div>
        <div className="sm:w-6/12 w-full" aria-invalid={errors[ClientDataKey.POSTAL_CODE]  ? 'true' : 'false'}>
          <label className="std-label">{data.LANGUAGE ==='en' ? 'Postal Code' : 'Code postal'}*</label>
          <input
            type="text"
            className="std-text-field input-full-4 stat-input-field"
            data-dtm="contact info"
            defaultValue={data.POSTAL_CODE}
            {...register(ClientDataKey.POSTAL_CODE, {
              required: true,
              maxLength: 7,
              pattern: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
            })}
          />
        </div>
      </div>
      <br />

      <div>
        <p className="text-2xl">
          {data.LANGUAGE ==='en'? 'Is this a primary or secondary residence?' :'S’agit-il d’une résidence principale ou secondaire'}
        </p>
        <br />
        <div className="relative mr-2 inline-block">
          <input
            value="primary"
            type="radio"
            id="residence-primary"
            className="std-radio stat-radio"
            data-dtm="contact info"
            {...register(ClientDataKey.RESIDENCE_TYPE,{required:true})}
            onChange={ e => {
              setValue(ClientDataKey.RESIDENCE_TYPE,e.target.value)
            }
            }
            defaultChecked={data.RESIDENCE_TYPE == 'primary'}
          />
          <span className={`${data.RESIDENCE_TYPE === 'primary' ? '' : 'hidden'} std-radio-checkmark`} aria-hidden="true">✓</span>
        </div>
        <label htmlFor="residence-primary" className={data.RESIDENCE_TYPE === 'primary' ? 'text-black' : 'text-grey-mid'}>{data.LANGUAGE ==='en'? 'Primary':'Principal'}</label>
        <br />
        <br />
        <div className="relative mr-2 inline-block">
          <input
            value="secondary"
            type="radio"
            id="residence-secondary"
            className="std-radio stat-radio"
            data-dtm="contact info"
            {...register(ClientDataKey.RESIDENCE_TYPE,{required:true})}
            onChange={ e => {
              setValue(ClientDataKey.RESIDENCE_TYPE,e.target.value)
            }
            }
            defaultChecked={ data.RESIDENCE_TYPE == 'secondary' }
          />
          <span className={`${data.RESIDENCE_TYPE === 'secondary' ? '' : 'hidden'} std-radio-checkmark`} aria-hidden="true">✓</span>
        </div>
        <label htmlFor="residence-secondary" className={data.RESIDENCE_TYPE === 'secondary' ? 'text-black' : 'text-grey-mid'}>{data.LANGUAGE ==='en'? 'Secondary':'Secondaire'}</label>
      </div>
      <br/>
      <p className="text-grey">
        {privacyStatement}
      </p>
      <br/>
      <span>
        {showErrors && postalError}
      </span>
    </FormSection>
  )
}
