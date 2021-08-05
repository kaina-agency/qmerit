import FormSection from '../form-section'
import {useContext, useEffect, useState } from 'react'
import { ClientDataKey, ClientDataContext } from '../../hooks/client-data'
import { FormSectionContext } from '../form-section-context'

export const TermsContext: FormSectionContext = {
  component: Terms,
  key: 'terms',
  mutates: [
    ClientDataKey.TERMS,
    ClientDataKey.INFORMATION_ACKNOWLEDGEMENT
  ]
}


interface TermsProps {
  path: string
}


export default function Terms({path}: TermsProps) {

  const { data, setValue, setData } = useContext(ClientDataContext)
  const [ acceptsTerms, setAcceptsTerms ] = useState(data.TERMS ?? false)
  const [ infoAcknowledgement, setInfoAcknowledgement ] = useState(data.TERMS ?? false)

  const handleGoNext = async () => {
    setData({
      TERMS: true,
      INFORMATION_ACKNOWLEDGEMENT:true
    })
  }

  useEffect(() => {
    if (!acceptsTerms || !infoAcknowledgement) {
      if (data.TERMS)setValue(ClientDataKey.TERMS, false)
    }
    if (infoAcknowledgement === true && path ==='path2' ) {
      setAcceptsTerms(true)
    }
  })

  const showNext = (acceptsTerms && infoAcknowledgement) && !data.TERMS
  const acknowledgement = data.LANGUAGE === 'en' ? <>The personal information you provide in this EV Install Form will be received and handled by GM Canada and Qmerit Electrification Canada Ltd., each as a separate independent controller of the personal information, for the purposes of administering your participation in the Program and providing related products and services to you and as otherwise set out in their respective privacy statements or as permitted by applicable law.<br/><br/>You consent to the collection, use, disclosure and retention of your personal information by each of GM Canada and Qmerit Electrification Canada Ltd. in accordance with their respective privacy statements, which are available at <a className="stat-text-link" href="https://www.gm.ca/en/home/privacy-statement.html" target="_blank" rel="noreferrer"><u>https://www.gm.ca/en/home/privacy-statement.html</u></a> and <a className="stat-text-link" href="https://www.qmerit.com/privacy-policy/" target="_blank" rel="noreferrer"><u>https://www.qmerit.com/privacy-policy</u></a>.</>
    :<>Les renseignements personnels que vous fournissez dans le cadre de l'offre promotionnelle d'installation de prise de recharge à domicile par GM Canada et Qmerit Electrification Canada Ltd., toutes deux entités sont indépendantes et contrôlent les renseignements de manière indépendant, aux fins de l'administration de votre participation à la promotion et pour vous fournir des produits et des services connexes conformément à leurs déclarations de confidentialité respectives ou dans la mesure permise par les lois qui s'appliquent.<br/><br/>En fournissant vos renseignements personnels, vous consentez à la collecte, à l'utilisation, à la communication et à la conservation de vos renseignements personnels par GM Canada et par Qmerit Electrification Canada Ltd., conformément à leurs déclarations de confidentialité respectives qui sont disponibles au :  <a className="stat-text-link" href="https://www.gm.ca/fr/home/privacy-statement.html" target="_blank" rel="noreferrer"><u>https://www.gm.ca/fr/home/privacy-statement.html </u></a> et <a className="stat-text-link" href="https://qmerit.com/privacy-policy/#french" target="_blank" rel="noreferer noreferrer"><u>https://qmerit.com/privacy-policy/#french</u></a>.</>

  return (
    <FormSection
      title={ data.LANGUAGE  == 'en' ? 'Terms' : 'Modalités'}
      nextButtonDTM="terms"
      goNext={ showNext ? handleGoNext : null}
    >
      <div className="flex flex-col space-y-2">
        <span className={path ==='path2' ? 'hidden':'text-2xl'}>
          {data.LANGUAGE ==='en' ? 'Terms and Conditions' : 'Modalités'}
        </span>
        <br className={path ==='path2' ? 'hidden':''} />
        <p className={path ==='path2' ? 'hidden':'text-grey'}>
          {data.LANGUAGE == 'en' ? <>The Charged by Chevrolet Promotion is available to you as a part of your purchase or lease of a new 2022 Bolt EV or 2022 Bolt EUV from a participating Chevrolet dealer. Subject to the definitions, qualifications, limitations, and requirements set forth in these <a className="stat-text-link" href="https://www.chevroletchargingoffer.ca/home_install_terms.pdf" target="_blank" rel="noreferrer"><u>Terms and Conditions</u></a>, you may qualify to receive a home charging outlet installed at no additional cost to you, or an alternative charging promotion of your choice.</>
            : <>La promotion Recharge par Chevrolet vous est offerte dans le cadre de votre achat ou location d’un véhicule Bolt EV 2022 ou Bolt EUV 2022 d’un concessionnaire Chevrolet. Sujet aux définitions, qualifications, limitations et exigences <a className="stat-text-link" href="https://www.offrerechargechevrolet.ca/modalites_installation_domicile.pdf" target="_blank" rel="noreferrer"><u>selon les modalités</u></a>,, vous pourriez vous qualifier pour obtenir une prise de recharge à domicile et l’installation sans frais supplémentaires ou une autre promotion de votre choix.</>
          }
        </p>
        <div className={path ==='path2' ? 'hidden':''}>
          <div className="relative mr-2 inline-block">
            <input
              className={`${acceptsTerms ? 'bg-blue border-none' : 'bg-white border-grey-mid'} appearance-none border-2 rounded-lg h-6 w-6 align-middle block stat-checkbox`}
              name="terms"
              type="checkbox"
              id="accept-terms"
              checked={acceptsTerms}
              onChange={ (e) => setAcceptsTerms(e.target.checked)}
            />
            <span className={`${acceptsTerms ? '' : 'hidden'} std-checkmark`} aria-hidden="true">✓</span>
          </div>
          <label htmlFor="accept-terms" className={`${acceptsTerms ? 'text-black' : 'text-grey-mid'} align-top`}>{data.LANGUAGE === 'en' ? 'Accept': 'J\'accepte' }</label>
        </div>
        <br />
        <span className="text-2xl">
          {data.LANGUAGE =='en' ? 'Personal Information Consent' : 'Consentement aux enseignements personnels'}
        </span>
        <br />
        <p className="text-grey">
          {acknowledgement}
        </p>
        <div>
          <div className="relative mr-2 inline-block">
            <input
              className={`${infoAcknowledgement ? 'bg-blue border-none' : 'bg-white border-grey-mid'} appearance-none border-2 rounded-lg h-6 w-6 align-middle block stat-checkbox`}
              name="ack"
              type="checkbox"
              id="accept-ack"
              checked={infoAcknowledgement}
              onChange={ (e) => setInfoAcknowledgement(e.target.checked)}
            />
            <span className={`${infoAcknowledgement ? '' : 'hidden'} std-checkmark`} aria-hidden="true">✓</span>
          </div>
          <label htmlFor="accept-ack" className={`${infoAcknowledgement ? 'text-black' : 'text-grey-mid'} align-top`}>{data.LANGUAGE === 'en' ? 'Accept': 'J\'accepte' }</label>
        </div>
      </div>
    </FormSection>
  )
}
