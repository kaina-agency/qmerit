import FormSection from '../form-section'
import { useContext, useEffect } from 'react'
import { ClientDataContext } from '../../hooks/client-data'
import { FormSectionContext } from '../form-section-context'
import { setAnalytics, satelliteTrack } from '../analytics'

export const ConfirmationContext: FormSectionContext = {
  component: Confirmation,
  key: 'confirmation',
  mutates: []
}

export default function Confirmation({ path }: { path: 'path1' | 'path2'}) {
  useEffect(() => {
    setAnalytics('thank-you')
    satelliteTrack('thank-you')
  })
  
  const { data } = useContext(ClientDataContext)

  const confirmationMessage = (path === 'path1' || (path === 'path2' && data.VEHICLE_MODEL && data.VEHICLE_MODEL === 'ev' || data.VEHICLE_MODEL === 'euv')) ?
    <div>
      <p className="text-2xl mb-7">
        {data.LANGUAGE === 'en' ?  'Thank you for your application for the Charged by Chevrolet Promotion!' : 'Merci, de votre demande de la promotion Recharge de Chevrolet a été soumise avec succès!' }
        <br/>
        <br/>
        <span className="text-grey">
          {data.LANGUAGE === 'en' ?  'In the next few days, you’ll receive an email from BMEV (powered by Qmerit) with details on your promotion and  home charging outlet installation.'
            :'Au cours des prochains jours, vous recevrez un courriel de BMEV (offert par Qmerit) indiquant tous les détails sur votre installation de prise de recharge à domicile.'}
        </span>
      </p>
    </div>
    :<div>
      <p className="text-2xl mb-7">
        {data.LANGUAGE === 'en' ?  'Thank you for your submission!' : 'Merci de votre soumission!' }
        <br/>
        <br/>
        <span className="text-grey">
          {data.LANGUAGE === 'en' ?  'In the next few days, you’ll receive an email BMEV (powered by Qmerit) with details on your home charging outlet installation.'
            :'Au cours des prochains jours, vous recevrez un courriel de BMEV (offert par Qmerit) indiquant tous les détails sur votre installation de prise de recharge.'}
        </span>
      </p>
    </div>

  return (
    <FormSection finale={true}
      title={data.LANGUAGE ==='en' ? 'Confirmation'  : 'Votre requête a été envoyée.'}
      goNext={null}
    >
      {confirmationMessage}
    </FormSection>
  )
}
