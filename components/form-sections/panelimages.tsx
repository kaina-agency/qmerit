import { useContext, useState, useEffect } from 'react'
import { ClientDataKey, ClientDataContext } from '../../hooks/client-data'
import FormSection from '../form-section'
import { FormSectionContext } from '../form-section-context'
import { setAnalytics } from '../analytics'

export const PanelImagesContext: FormSectionContext = {
  component: PanelImages,
  key: 'panel-images',
  mutates: [
    ClientDataKey.PANEL_LOCATION_IMAGE_URL,
    ClientDataKey.PANEL_OPEN_IMAGE_URL
  ]
}

export default function PanelImages() {
  useEffect(() => {setAnalytics('upload-electrical-panel')})

  const { data, setData } = useContext(ClientDataContext)

  const [panelLocationImageURL, setPanelLocationImageURL] = useState(data.PANEL_LOCATION_IMAGE_URL)

  const [openPanelImageURL, setOpenPanelImageURL] = useState(data.PANEL_OPEN_IMAGE_URL)

  const handleNext = () => {
    setData({
      PANEL_LOCATION_IMAGE_URL: panelLocationImageURL,
      PANEL_OPEN_IMAGE_URL: openPanelImageURL
    })
  }

  const onLocationFileSelect = (e) => {
    //Upload to the server
    const data = new FormData()
    data.append('file', e.target.files[0])
    fetch('/api/imageupload', {
      method: 'POST',
      body: data
    })
      .then(response => response.json())
      .then(reata => {
        setPanelLocationImageURL(reata.url)
      })
      .catch(rerror => {
        console.error(rerror)
      })
  }

  const onOpenPanelFileSelect = (e) => {
    console.log(e.target.files[0])
    //Upload to the server
    const data = new FormData()
    data.append('file', e.target.files[0])
    fetch('/api/imageupload', {
      method: 'POST',
      body: data
    })
      .then(response => response.json())
      .then(reata => {
        setOpenPanelImageURL(reata.url)
      })
      .catch(rerror => {
        console.error(rerror)
      })
  }

  const panelImage = panelLocationImageURL ? <img className="max-w-full max-h-96" src={panelLocationImageURL} /> : null
  const panelOpenImage = openPanelImageURL ? <img className="max-w-full max-h-96" src={openPanelImageURL} /> : null
  const secondImage = panelLocationImageURL ?

    <div>
      <p className="text-2xl mb-7">
        {data.LANGUAGE === 'en' ? 'Now, open the panel door and take a picture of your electrical panel. Make sure the photo is not blurry, so we can read the labels on the panel. Please capture the whole panel so the installer can see the main breaker and all the panel slots.'
          :'Ouvrez maintenant la porte du panneau et prenez une photo de votre panneau électrique. Assurez-vous que la photo n’est pas floue, afin que nous puissions lire les étiquettes sur le panneau. Veuillez prendre une photo de tout le panneau pour permettre à l’installateur de voir le disjoncteur principal et toutes les fentes du panneau.'}
      </p>
      <label
        htmlFor="panel-door-image-upload"
        className="std-button"
      >
        {data.LANGUAGE === 'en' ? 'Add Image' : 'AJOUTER IMAGE'}
      </label>
      <input
        className="opacity-0 stat-button-link"
        data-dtm="upload: detailed electrical panel"
        type="file"
        name="picture"
        accept="image/*"
        id="panel-door-image-upload"
        onChange={onOpenPanelFileSelect}
        onClick={e => e.currentTarget.value = null }
      />
      {panelOpenImage}
    </div>

    : null

  //const showNext = (panelLocationImageURL && !data.PANEL_LOCATION_IMAGE_URL) && (openPanelImageURL && !data.PANEL_OPEN_IMAGE_URL)
  const showNext = (panelLocationImageURL  && openPanelImageURL ) &&
                    (!data.PANEL_LOCATION_IMAGE_URL || !data.PANEL_OPEN_IMAGE_URL)


  return (
    <FormSection
      title={data.LANGUAGE === 'en' ? 'Upload Images – Electrical Panel' : 'Téléverser des images – panneau électrique'}
      nextButtonDTM="upload:electrical panel"
      goNext={ showNext ?  handleNext: null }
    >
      <div>
        <p className="text-2xl mb-7">
          {data.LANGUAGE === 'en' ? 'Please take a photo of your main electrical panel from 15 – 20 feet back to show its location.'
            :'Veuillez prendre une photo de votre panneau électrique principal à une distance de15 à 20 pi (4,57 à 6,09 m) pour montrer son emplacement.'}
        </p>
        <label
          htmlFor="panel-image-upload"
          className="std-button"
        >
          {data.LANGUAGE === 'en' ? 'Add Image' : 'AJOUTER IMAGE'}
        </label>
        <input  className="opacity-0 stat-button-link"
          data-dtm="upload: electrical panel"
          type="file"
          name="picture"
          accept="image/*"
          id="panel-image-upload"
          onChange={onLocationFileSelect}
          onClick={e => e.currentTarget.value = null }
        />
        {panelImage}
      </div>
      <br/>
      {secondImage}
    </FormSection>
  )
}
