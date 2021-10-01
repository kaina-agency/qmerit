import { useState, useContext, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { ClientDataKey, ClientDataContext } from '../../hooks/client-data'
import FormSection from '../form-section'
import { FormSectionContext } from '../form-section-context'
import { setAnalytics } from '../analytics'

export const HomeownerApprovalContext: FormSectionContext = {
  component: HomeownerApproval,
  key: 'homeowner-approval',
  mutates: [ClientDataKey.OWNER_APPROVAL]
}

export default function HomeownerApproval() {
  useEffect(() => {setAnalytics('owner-approval')})

  const { register, trigger } = useFormContext()
  const { data, setValue } = useContext(ClientDataContext)
  const [approvalError, setApprovalError] = useState('')
  const [hasApproval, setHasApproval] = useState(data.OWNER_APPROVAL)

  const handleGoNext = async() => {
    const isValid = await trigger(ClientDataKey.OWNER_APPROVAL)

    if (isValid) {
      setValue(ClientDataKey.OWNER_APPROVAL, true)
    }
  }

  const handleApprovalChange = (approval) => setHasApproval(approval)

  useEffect(() => {
    if (hasApproval === undefined || hasApproval) {
      setApprovalError('')
    } else {

      const omitDeal = (data.REJECTS_CHEVY_OFFER === true)

      if (omitDeal) {
        setApprovalError( data.LANGUAGE === 'en' ? 'Please return to this site once you have approval.' : 'Veuillez retourner sur ce site une fois que vous avez obtenu l’approbation')
      } else {
        setApprovalError( data.LANGUAGE === 'en' ?
          'Please return to this site once you have approval. No longer interested in home charging outlet installation? Talk to your authorized Chevrolet Bolt Dealer about the Charged by Chevrolet Promotion.'
          : 'Veuillez retourner sur ce site une fois que vous aurez obtenu l’approbation. Vous n’êtes plus intéressé par l’installation d’un dispositif de chargement à domicile? Parlez à votre concessionnaire Chevrolet Bolt autorisé de l’offre d’installation de bornes de recharge publique pour Chevrolet.'
        )
      }

    }

  }, [hasApproval, data.VEHICLE_MODEL, data.LANGUAGE, data.REJECTS_CHEVY_OFFER])

  const copy = data.RENT_OR_OWN == 'own' ?
    data.LANGUAGE === 'en' ? 'Do you need to get permission from your Homeowner Association (HOA), co-op, or any other third-party approvals? If your charging station is being installed inside your garage, then you won\'t likely need approval; but if installed outside, you likely will.':
      'Avez-vous besoin de la permission de votre association des propriétaires résidentiels (HOA), de votre copropriétaire, de votre propriétaire ou de tout autre tierce partie? Si votre borne de recharge est installée dans votre garage, vous n’aurez probablement pas besoin d’une approbation; mais si elle est installée à l’extérieur, vous en aurez probablement besoin.' :
    data.LANGUAGE === 'en' ? 'Have you received permission from your Homeowner Association (HOA), residence manager, Co-op, landlord or any other necessary third-party approvals to install the charging outlet? Since you are renting, you will likely need approval to install your charging outlet. If you have not done so already; please reach out to your point of contact to get approval.':
      'Avez-vous reçu la permission de votre association des propriétaires résidentiels (HOA), de votre directeur de résidence, de votre copropriétaire, de votre propriétaire ou de tout autre tierce partie pour installer la prise de recharge? Puisque vous louez votre véhicule, vous devrez probablement obtenir l’approbation pour l’installation de votre prise de recharge. Si vous ne l’avez pas encore fait, veuillez communiquer avec votre personne-ressource pour obtenir son approbation.'
  //let nextVisible = false;

  return (
    <FormSection
      title={data.LANGUAGE ==='en' ? 'Owner Approval' : 'Approbation'}
      nextButtonDTM="owner approval"
      goNext={ hasApproval && !data.OWNER_APPROVAL ? handleGoNext:null}
    >
      <div>
        <p className="text-grey">
          {copy}
        </p>
        <br />
        <div>
          <div className="relative mr-2 inline-block">
            <input
              value="True"
              type="radio"
              id="approval-true"
              className="std-radio stat-radio"
              data-dtm="owner approval"
              {...register(ClientDataKey.OWNER_APPROVAL,{required:true})}
              onChange={ () => handleApprovalChange(true)}
              defaultChecked={data.OWNER_APPROVAL === true}
            />
            <span className={`${hasApproval === true ? '' : 'hidden'} std-radio-checkmark`} aria-hidden="true">✓</span>
          </div>
          <label htmlFor="approval-true" className={hasApproval === true ? 'text-black' : 'text-grey-mid'}>
            {data.LANGUAGE == 'en' ? 'I already have approval, or I do not need approval'
              :'J’ai déjà obtenu l’approbation ou je n’ai pas besoin de l’approbation'}
          </label>
          <br />
          <br />
          <div className="relative mr-2 inline-block">
            <input
              value="False"
              type="radio"
              id="approval-false"
              className="std-radio stat-radio"
              data-dtm="owner approval"
              {...register(ClientDataKey.OWNER_APPROVAL,{required:true})}
              onChange={ () => { setValue(ClientDataKey.OWNER_APPROVAL, false); handleApprovalChange(false)  } }
              defaultChecked={data.OWNER_APPROVAL === false}
            />
            <span className={`${hasApproval === false ? '' : 'hidden'} std-radio-checkmark`} aria-hidden="true">✓</span>
          </div>
          <label htmlFor="approval-false" className={hasApproval === false ? 'text-black' : 'text-grey-mid'}>
            {data.LANGUAGE == 'en' ? 'I do not have approval yet'
              :'Je n’ai pas encore obtenu d’approbation'}
          </label>
        </div>
        <span>
          <br/>
          {approvalError}
        </span>
      </div>
    </FormSection>
  )
}
