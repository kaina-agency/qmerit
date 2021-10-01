import { useContext, useState, useEffect } from 'react'
import { ClientDataKey, ClientDataContext } from '../../hooks/client-data'
import FormSection from '../form-section'
import { FormSectionContext } from '../form-section-context'
import { setPageName } from '../analytics'

export const InstallLocationContext: FormSectionContext = {
  component: InstallLocation,
  key: 'location',
  mutates: [ClientDataKey.CHARGING_LOCATION_IMAGE_URL]
}

export default function InstallLocation() {
  useEffect(() => {setPageName('location')}) // for adobe analytics

  const { data, setValue } = useContext(ClientDataContext)
  const [imageSelected, setImageSelected] = useState(false)
  const [imageURL, setUserImageURL] = useState(data.CHARGING_LOCATION_IMAGE_URL)

  const handleNext = () => {
    if (imageURL)  {
      setValue(ClientDataKey.CHARGING_LOCATION_IMAGE_URL, imageURL)
    }
  }

  const onFileSelect = (e) => {
    setImageSelected(true)

    //Upload to the server
    const data = new FormData()
    data.append('file', e.target.files[0])
    fetch('/api/imageupload', {
      method: 'POST',
      body: data
    })
      .then(response => response.json())
      .then(reata => {
        console.log(reata.url)
        setUserImageURL(reata.url)
      })
      .catch(rerror => {
        console.error(rerror)
      })
    //console.log(e.target.files[0])
  }

  return (
    <FormSection
      title={data.LANGUAGE === 'en' ? 'Upload Image – Charging Outlet Installation Location'  : 'Téléverser l’image – emplacement de l’installation de la prise recharge'}
      nextButtonDTM="location"
      goNext={imageSelected ? handleNext:null}
    >
      <div>
        <p className="text-2xl mb-7">
          {data.LANGUAGE === 'en'? 'Please take a photo of the entire area where you would like the home charging outlet installed. Step back about 10 to 20 feet from preferred installation spot.'
            :'Veuillez prendre une photo de l’endroit où vous souhaitez installer la prise de recharge à domicile. Éloignez-vous d’environ 10 à 20 pi (3,04 à 6,09 m) du lieu d’installation préféré.'}{}
        </p>
        <label
          htmlFor="location-image-upload"
          className="std-button"
        >
          {data.LANGUAGE === 'en' ? 'Add Image' :'AJOUTER IMAGE'}
        </label>
        <input
          className="opacity-0 stat-button-link"
          data-dtm="upload:outlet location"
          type="file"
          name="picture"
          accept="image/*"
          id="location-image-upload"
          onChange={onFileSelect}
          onClick={e => e.currentTarget.value = null }
        />
        {imageURL && <img className="max-w-full max-h-96" src={imageURL} />}
        <span>
          {/*  {showErrors} */}
        </span>
      </div>
    </FormSection>
  )
}
