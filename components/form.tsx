import { createRef, useEffect, useState, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { ClientDataContext, ClientDataKey, useClientData } from '../hooks/client-data'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import WelcomeSection from './form-sections/welcome'
import Terms from './form-sections/terms'
import VINSection from './form-sections/vin'
import ContactInfoSection from './form-sections/contact-info'
import RentOrOwn from './form-sections/rentorown'
import HomeownerApproval from './form-sections/homeownerapproval'
import PropertyType from './form-sections/propertytype'
import GarageType from './form-sections/garagetype'
import PanelLocation from './form-sections/panellocation'
import VehicleModel from './form-sections/vehiclemodel'
import ChargingUnitOrOutlet from './form-sections/chargingoroutlet'
import UnitType from './form-sections/unittype'
import InstallLocation from './form-sections/installlocation'
import PanelDetails from './form-sections/paneldetails'
import PanelImages from './form-sections/panelimages'
import BreakerSize from './form-sections/breakersize'
import Confirmation from './form-sections/confirmation'

import { TermsContext } from './form-sections/terms'
import { VINSectionContext } from './form-sections/vin'
import { RentOrOwnContext } from './form-sections/rentorown'
import { HomeownerApprovalContext } from './form-sections/homeownerapproval'
import { PropertyTypeContext } from './form-sections/propertytype'
import { GarageTypeContext } from './form-sections/garagetype'
import { PanelLocationContext } from './form-sections/panellocation'
import { VehicleModelContext } from './form-sections/vehiclemodel'
import { ChargingUnitOrOutletContext } from './form-sections/chargingoroutlet'
import { UnitTypeContext } from './form-sections/unittype'
import { InstallLocationContext } from './form-sections/installlocation'
import { PanelDetailsContext } from './form-sections/paneldetails'
import { PanelImagesContext } from './form-sections/panelimages'
import { BreakerSizeContext } from './form-sections/breakersize'

export default function Form({ path, lang }: { path: 'path1' | 'path2', lang: 'en' | 'fr' }) {
  const formMethods = useForm({
    mode: 'onChange'
  })
  const { data, setData, setValue, clearData } = useClientData(lang)
  const previousData = useRef(data)

  const [sectionsToDisplay, setSectionsToDisplay] = useState([])
  const [isWelcomed, setIsWelcomed] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const handleWelcomeNext = () => setIsWelcomed(true)
  const handleComplete = () => setHasSubmitted(true)
  const formRef = createRef<HTMLFormElement>()
  const hasComplete = useRef(false)
  const isSubmitting = useRef(false)

  const onSubmit = () => {
    hasComplete.current = true
  }
  useEffect(() => {
    if (!hasComplete.current || isSubmitting.current) return
    isSubmitting.current = true
    fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(rdata => {
        if (rdata.status == 'ok') {
          handleComplete()
          clearData()
        }
        if (rdata.status == 'error') {
          console.error('error response from /api/submit')
        }
      })
      .catch(rerror => {
        console.error(rerror)
      })
  }, [data, hasComplete])

  const onError = errors => console.log(errors)
  const path1 = (path === 'path1')


  const dataMutations = [
    TermsContext.mutates,
    VINSectionContext.mutates,
    // ContactInfoSectionContext.mutates,
    VehicleModelContext.mutates,
    RentOrOwnContext.mutates,
    HomeownerApprovalContext.mutates,
    PropertyTypeContext.mutates,
    GarageTypeContext.mutates,
    PanelLocationContext.mutates,
    ChargingUnitOrOutletContext.mutates,
    UnitTypeContext.mutates,
    InstallLocationContext.mutates,
    PanelDetailsContext.mutates,
    PanelImagesContext.mutates,
    BreakerSizeContext.mutates
  ]

  useEffect(() => {
    const changedKey = Object.entries(data).find(([k, v]) => previousData.current[k] !== v)?.[0] as ClientDataKey
    if (changedKey) {
      const changedKeyIndex = dataMutations.findIndex(keyGroup => keyGroup.includes(changedKey)) + 1
      if (changedKeyIndex !== 0) {
        const dataToFlush = dataMutations.slice(changedKeyIndex).flat()
        setData(dataToFlush.reduce((acc, k) => ({ ...acc, [k]: undefined }), {}))
      }
    }
    previousData.current = data
  }, [data])

  useEffect(() => {
    const all = [
      { c: <WelcomeSection goNext={ isWelcomed ? null: handleWelcomeNext} path={path}/>, key: 'welcome',doShow: () => true }
      ,{ c: <Terms path={path} />, key: 'terms', doShow: () => isWelcomed }
      ,{ c: <VINSection />, key: 'vin', doShow: () => data.TERMS && path1 }
      ,{ c: <ContactInfoSection />, key: 'contact-info', doShow: () => (data.TERMS && data.VIN) || (!path1 && data.TERMS) }
      ,{ c: <VehicleModel />, key: 'vehicle-model', doShow: () => !path1 && data.POSTAL_CODE}
      ,{ c: <RentOrOwn />, key: 'rent-or-own', doShow: () =>  (path1 && data.POSTAL_CODE) || (data.POSTAL_CODE && data.VEHICLE_MODEL) }
      ,{ c: <HomeownerApproval />, key: 'homeowner-approval', doShow: () => data.RENT_OR_OWN }
      ,{ c: <PropertyType />, key: 'property-type', doShow: () => data.OWNER_APPROVAL }
      ,{ c: <PropertyType />, key: 'property-type', doShow: () => data.OWNER_APPROVAL }
      ,{ c: <GarageType />, key: 'garage-type', doShow: () => data.PROPERTY_TYPE && data.HAS_METER }
      ,{ c: <PanelLocation />, key: 'panel-location', doShow: () => (data.GARAGE_TYPE == 'attached') || (data.INTENDS_INSTALL == true) || (data.ACCEPTS_CREDIT == true)}
      ,{ c: <ChargingUnitOrOutlet />, key: 'charging-or-outlet', doShow: () => !path1 && (data.CHARGING_CAPABILITY == 'same' || data.GARAGE_SIZE) }
      ,{ c: <UnitType />, key: 'unit-type', doShow:() => data.CHARGE_TYPE == 'unit' && !path1 }
      ,{ c: <InstallLocation />, key: 'install-location', doShow:() => (data.CHARGE_TYPE == 'outlet' || data.BRAND_NAME || data.NEED_PURCHASING_HELP ) || (path1 && data.CHARGING_CAPABILITY == 'same' || data.GARAGE_SIZE) }
      ,{c: <PanelDetails />, key:'panel-details', doShow: () => data.CHARGING_LOCATION_IMAGE_URL }
      ,{c: <PanelImages />, key:'panel-images', doShow : () => data.PANEL_COUNT && data.PANEL_LOCATION_ALT}
      ,{c: <BreakerSize forceNext={!hasSubmitted} onComplete={onSubmit} />, key:'breaker-size', doShow: () => data.PANEL_LOCATION_IMAGE_URL && data.PANEL_OPEN_IMAGE_URL}
    ]

    const arr = []
    for (const component of all) {
      if (!component.doShow()) continue
      arr.push({ c: component.c, key: component.key})
    }
    if (hasSubmitted) {
      arr.length = 0
      arr.push({c: <Confirmation path={path}/>, key:'confirmation'})
    }
    setSectionsToDisplay(arr)
  },[isWelcomed, hasSubmitted, data])


  useEffect(() => {
    const lastFormSection = formRef.current.firstElementChild.lastElementChild as HTMLElement
    scrollTo({
      left: 0,
      top: lastFormSection?.offsetTop,
      behavior: 'smooth'
    })
  })

  return (
    <ClientDataContext.Provider value={{ data, setData, setValue, clearData }}>
      <FormProvider {...formMethods}>
        <form ref={formRef} onSubmit={formMethods.handleSubmit(onSubmit, onError)}>
          <TransitionGroup exit={false}>
            {sectionsToDisplay.map(({ c, key }) => (
              <CSSTransition
                key={key}
                timeout={500}
                classNames="form-transition"
              >
                {c}
              </CSSTransition>
            ))}
          </TransitionGroup>
        </form>
      </FormProvider>
    </ClientDataContext.Provider>
  )
}
