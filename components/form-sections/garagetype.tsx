import { useContext, useEffect, useState } from 'react'
import { ClientDataKey, ClientDataContext } from '../../hooks/client-data'
import FormSection from '../form-section'
import { FormSectionContext } from '../form-section-context'
import { setAnalytics } from '../analytics'

export const GarageTypeContext: FormSectionContext = {
  component: GarageType,
  key: 'garage-type',
  mutates: [
    ClientDataKey.GARAGE_TYPE,
    ClientDataKey.INTENDS_INSTALL,
    ClientDataKey.ACCEPTS_CREDIT
  ]
}

export default function GarageType() {
  useEffect(() => {setAnalytics('garage-type')})

  const { data, setData } = useContext(ClientDataContext)
  const [errorMsg, setErrorMessage ] = useState('')
  const [creditErrorMsg, setCreditErrorMsg ] = useState('')
  const [showCreditQuestion, setShowCreditQuestion ] = useState(false)
  const [garageType, setGarageType ] = useState(data.GARAGE_TYPE)
  const [intendsInstall, setIntendsInstall ] = useState(data.INTENDS_INSTALL)
  const [accepts1kCredit, setAccepts1kCredit] = useState(data.ACCEPTS_CREDIT)

  const handleNext = async () => {
    setData({
      GARAGE_TYPE: garageType,
      INTENDS_INSTALL: intendsInstall,
      ACCEPTS_CREDIT: accepts1kCredit
    })
  }

  const doShowInstall = () => garageType === 'detached'

  useEffect(() => {
    setData({
      GARAGE_TYPE: undefined,
      INTENDS_INSTALL: undefined,
      ACCEPTS_CREDIT: undefined
    })
  },[garageType])

  useEffect(() => {
    if ((intendsInstall && garageType === 'detached') || garageType === 'attached' || garageType === undefined) {
      setErrorMessage('')
      setShowCreditQuestion(false)
      return
    }

    if (intendsInstall === undefined) {
      setErrorMessage('')
      setShowCreditQuestion(false)
      return
    }

    const omitDeal = data.REJECTS_CHEVY_OFFER
    if (omitDeal) {
      setErrorMessage(
        data.LANGUAGE === 'en' ? 'Based on your selection, you do not qualify for home installation at this time.' : ''
      )
      setAccepts1kCredit(false)
      setShowCreditQuestion(false)
      return
    }

    if (garageType !== undefined) {
      setErrorMessage(
        data.LANGUAGE ==='en' ? 'You do not qualify for the Charged by Chevrolet Promotion. However, GM would like to cover up to $1,500 (inclusive of permit fee) of your home charging outlet installation. Would you like to continue?'
          : "Vous n?????tes pas admissible ?? la promotion d???installation Recharge par Chevrolet. Cependant, GM aimerait couvrir jusqu????? 1 500 $ de l'installation de la prise ?? domicile (frais de permis compris). Voulez-vous continuer?"
      )
      setShowCreditQuestion(true)
    }

  }, [intendsInstall, garageType, data.REJECTS_CHEVY_OFFER])

  const installQuestion = doShowInstall() ?
    <div>
      <p className="text-2xl my-7">{data.LANGUAGE ==='en' ? 'Do you intend to install your 240-volt outlet on the exterior of your house (so that you can charge from your driveway?)'
        :'Pr??voyez-vous d???installer votre prise de courant de 240??V ?? l???ext??rieur de votre maison (pour pouvoir effectuer la recharge ?? partir de votre entr??e de garage?)'}
      </p>

      <div className="relative mr-2 inline-block">
        <input value="true" type="radio" id="240v-true" className="std-radio stat-radio"
          data-dtm="garage type"
          onChange={() => setIntendsInstall(true)}
          checked={intendsInstall === true}
          required
        />
        <span className={`${intendsInstall === true ? '' : 'hidden'} std-radio-checkmark`} aria-hidden="true">???</span>
      </div>
      <label htmlFor="240v-true" className={intendsInstall === true ? 'text-black' : 'text-grey-mid'}>{data.LANGUAGE ==='en' ? 'Yes' :'Oui'}</label>
      <br />
      <br />
      <div className="relative mr-2 inline-block">
        <input value="false" type="radio" id="240v-false" className="std-radio stat-radio"
          data-dtm="garage type"
          onChange={() => setIntendsInstall(false)}
          checked={intendsInstall === false}
          required
        />
        <span className={`${intendsInstall === false  ? '' : 'hidden'} std-radio-checkmark`} aria-hidden="true">???</span>
      </div>
      <label htmlFor="240v-false" className={intendsInstall === false ? 'text-black' : 'text-grey-mid'}>{data.LANGUAGE ==='en' ? 'No' : 'Non'}</label>
    </div>
    : null

  const creditQuestion = !showCreditQuestion ? null : <div>
    <div className="relative mr-2 inline-block">
      <input value="true" type="radio" id="credit-true" className="std-radio stat-radio"
        data-dtm="garage type"
        onChange={() => {
          setAccepts1kCredit(true)
          setCreditErrorMsg('')
        }}
        checked={accepts1kCredit === true}
        required
      />
      <span className={`${accepts1kCredit === true ? '' : 'hidden'} std-radio-checkmark`} aria-hidden="true">???</span>
    </div>
    <label htmlFor="credit-true" className={accepts1kCredit === true ? 'text-black' : 'text-grey-mid'}>{data.LANGUAGE ==='en' ? 'Yes' : 'Oui'}</label>
    <br />
    <br />
    <div className="relative mr-2 inline-block">
      <input  value="false" type="radio"  id="credit-false" className="std-radio stat-radio"
        data-dtm="garage type"
        onChange={() => {
          setCreditErrorMsg(
            data.LANGUAGE === 'en' ? 'Talk to your authorized Chevrolet Bolt Dealer about Chevrolet???s Flo Public Charging Credit!'
              :'Parlez ?? votre concessionnaire Chevrolet Bolt autoris?? de l???offre d???installation ?? nos frais Chevrolet!'
          )
          setAccepts1kCredit(false)
        }}
        checked={accepts1kCredit === false}
        required
      />
      <span className={`${accepts1kCredit === false  ? '' : 'hidden'} std-radio-checkmark`} aria-hidden="true">???</span>
    </div>
    <label htmlFor="credit-false" className={accepts1kCredit === false ? 'text-black' : 'text-grey-mid'}>{data.LANGUAGE ==='en' ? 'No' : 'Non'}</label>
    <p>
      <br/>
      {creditErrorMsg}
    </p>
  </div>

  return (
    <FormSection
      title={data.LANGUAGE === 'en' ? 'Garage Type' : 'Type de garage' }
      nextButtonDTM="garage type"
      goNext={ (garageType == 'attached' || intendsInstall) || (accepts1kCredit) ? handleNext : null}
      //goNext={  accepts1kCredit ? handleNext : null}
    >
      <div>
        <p className="text-2xl mb-7">
          {data.LANGUAGE === 'en' ? 'Is your garage attached or detached/no garage?' :'Votre garage est-il attach?? ou d??tach??/pas de garage?'}
        </p>
        <div className="flex w-full flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div>
            <label htmlFor="attached-radio">
              <img src="/Attached.svg" alt="Attached garage example" />
            </label>
            <br />
            <div className="relative mr-2 inline-block">
              <input value="attached" type="radio" id="attached-radio"  className="std-radio stat-radio"
                data-dtm="garage type"
                onChange={() => setGarageType('attached')}
                checked={garageType === 'attached'}
                required
              />
              <span className={`${garageType === 'attached' ? '' : 'hidden'} std-radio-checkmark`} aria-hidden="true">???</span>
            </div>
            <label htmlFor="attached-radio" className={garageType === 'attached' ? 'text-black' : 'text-grey-mid'}>{data.LANGUAGE ==='en' ? 'Attached':'Attach??'}</label>
          </div>
          <br />
          <div>
            <label htmlFor="detached-radio">
              <img src="/Detached.svg" alt="Detached garage example" />
            </label>
            <br />
            <div className="relative mr-2 inline-block">
              <input value="detached" type="radio" id="detached-radio" className="std-radio stat-radio"
                data-dtm="garage type"
                onChange={() => setGarageType('detached')}
                checked={garageType === 'detached'}
                required
              />
              <span className={`${garageType === 'detached' ? '' : 'hidden'} std-radio-checkmark`} aria-hidden="true">???</span>
            </div>
            <label htmlFor="detached-radio" className={garageType === 'detached' ? 'text-black' : 'text-grey-mid'}>{data.LANGUAGE ==='en' ? 'Detached/no garage':'D??tach??/ pas de garage'}</label>
          </div>
        </div>
        {installQuestion}
        {}
        <p>
          <br/>
          {errorMsg}
        </p>
        <br/>
        {creditQuestion}
      </div>
    </FormSection>
  )
}
