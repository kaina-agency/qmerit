import { useContext } from 'react'
import {ClientDataContext} from '../../hooks/client-data'
import FormSection from '../form-section'
import { FormSectionContext } from '../form-section-context'

export const WelcomeSectionContext: FormSectionContext = {
  component: WelcomeSection,
  key: 'welcome',
  mutates: []
}

interface WelcomeSectionProps {
  goNext: () => void,
  path: string
}

export default function WelcomeSection({ goNext, path }: WelcomeSectionProps) {
  const { data } = useContext(ClientDataContext)

  const welcomeMessage = (path === 'path1') ?
    data.LANGUAGE == 'en' ?
      'Congratulations on the purchase of your 2022 Bolt! Let’s get started with your installation request.' :
      'Félicitations pour l’achat de votre Bolt 2022! Commençons par votre demande d’installation.'
    :
    data.LANGUAGE == 'en' ?
      'Let’s get started with your installation request.' :
      'Commençons par votre demande d’installation.'


  return (
    <FormSection
      title={data.LANGUAGE == 'en' ? 'Welcome': 'Bienvenue'}
      nextButtonDTM="welcome:installation request"
      goNext={goNext}
    >
      <div className="flex flex-col space-y-1">
        <span className="text-2xl">
          {welcomeMessage}
        </span>
        <br />
        <span className="font-louis font-bold uppercase text-grey">
          {data.LANGUAGE === 'en' ? 'Before you start':'AVANT DE COMMENCER'}
        </span>
        <br />
        <p className="text-grey">
          {data.LANGUAGE === 'en' ?
            'As a part of this questionnaire, you will be asked to take pictures of your charging outlet installation location. We recommend completing this questionnaire on your mobile phone where you can take pictures directly from your camera.'
            : 'Dans le cadre de ce questionnaire, on vous demandera de prendre des photos de l’emplacement d’installation de votre borne de recharge. Nous vous recommandons de répondre à ce questionnaire en utilisant votre téléphone cellulaire à partir duquel vous pourrez directement prendre des photos.'
          }
        </p>
      </div>
    </FormSection>
  )
}
