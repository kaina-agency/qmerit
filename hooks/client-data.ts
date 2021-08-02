import { useState, useEffect, createContext } from 'react'

const CLIENT_DATA = 'CLIENT_DATA_V22'

export const ClientDataContext = createContext<ReturnType<typeof useClientData>>(null)

export enum ClientDataKey {
  TERMS = 'TERMS',
  INFORMATION_ACKNOWLEDGEMENT = 'INFORMATION_ACKNOWLEDGEMENT',
  VIN = 'VIN',
  FIRST_NAME = 'FIRST_NAME',
  LAST_NAME = 'LAST_NAME',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  ADDRESS = 'ADDRESS',
  ADDRESS2 = 'ADDRESS2',
  CITY = 'CITY',
  PROVINCE = 'PROVINCE',
  POSTAL_CODE = 'POSTAL_CODE',
  RENT_OR_OWN = 'RENT_OR_OWN',
  OWNER_APPROVAL = 'OWNER_APPROVAL',
  PROPERTY_TYPE = 'PROPERTY_TYPE',
  HAS_METER = 'HAS_METER',
  GARAGE_TYPE = 'GARAGE_TYPE',
  INTENDS_INSTALL = 'INTENDS_INSTALL',
  PANEL_LOCATION = 'PANEL_LOCATION',
  CHARGING_CAPABILITY = 'CHARGING_CAPABILITY',
  GARAGE_SIZE = 'GARAGE_SIZE',
  CHARGE_TYPE = 'CHARGE_TYPE',
  OWNS_UNIT = 'OWNS_UNIT',
  BRAND_NAME= 'BRAND_NAME',
  NEED_PURCHASING_HELP = 'NEED_PURCHASING_HELP',
  CHARGING_LOCATION_IMAGE_URL = 'CHARGING_LOCATION_IMAGE_URL',
  PANEL_COUNT = 'PANEL_COUNT',
  PANEL_LOCATION_ALT = 'PANEL_LOCATION_ALT',
  PANEL_LOCATION_IMAGE_URL = 'PANEL_LOCATION_IMAGE_URL',
  PANEL_OPEN_IMAGE_URL = 'PANEL_OPEN_IMAGE_URL',
  BREAKER_SIZE = 'BREAKER_SIZE',
  ADDITIONAL_INFO_FOR_INSTALL = 'ADDITIONAL_INFO_FOR_INSTALL',
  HAS_SUBMITTED = 'HAS_SUBMITTED',
  RESIDENCE_TYPE = 'RESIDENCE_TYPE',
  ACCEPTS_CREDIT = 'ACCEPTS_CREDIT',
  VEHICLE_MODEL = 'VEHICLE_MODEL',
  REJECTS_CHEVY_OFFER = 'REJECTS_CHEVY_OFFER',
  LANGUAGE = 'LANGUAGE'
}

export type ClientData = Partial<{
  [ClientDataKey.TERMS]: boolean,
  [ClientDataKey.INFORMATION_ACKNOWLEDGEMENT]: boolean,
  [ClientDataKey.VIN]: string,
  [ClientDataKey.FIRST_NAME]: string,
  [ClientDataKey.LAST_NAME]: string,
  [ClientDataKey.EMAIL]: string,
  [ClientDataKey.PHONE]: string,
  [ClientDataKey.ADDRESS]: string,
  [ClientDataKey.ADDRESS2]: string,
  [ClientDataKey.CITY]: string,
  [ClientDataKey.PROVINCE]: string,
  [ClientDataKey.POSTAL_CODE]: string,
  [ClientDataKey.RENT_OR_OWN]: string,
  [ClientDataKey.OWNER_APPROVAL]: boolean
  [ClientDataKey.HAS_METER]: boolean
  [ClientDataKey.INTENDS_INSTALL]: boolean
  [ClientDataKey.GARAGE_TYPE]: string
  [ClientDataKey.PROPERTY_TYPE]: string
  [ClientDataKey.PANEL_LOCATION]: string
  [ClientDataKey.CHARGING_CAPABILITY]: string
  [ClientDataKey.GARAGE_SIZE]: string
  [ClientDataKey.CHARGE_TYPE]: string
  [ClientDataKey.OWNS_UNIT]: boolean
  [ClientDataKey.BRAND_NAME]: string
  [ClientDataKey.NEED_PURCHASING_HELP]: boolean
  [ClientDataKey.CHARGING_LOCATION_IMAGE_URL]: string
  [ClientDataKey.PANEL_COUNT]: string
  [ClientDataKey.PANEL_LOCATION_ALT]: string
  [ClientDataKey.PANEL_LOCATION_IMAGE_URL]: string
  [ClientDataKey.PANEL_OPEN_IMAGE_URL]: string
  [ClientDataKey.BREAKER_SIZE]: string
  [ClientDataKey.ADDITIONAL_INFO_FOR_INSTALL]: string
  [ClientDataKey.HAS_SUBMITTED]: boolean
  [ClientDataKey.ACCEPTS_CREDIT]: boolean
  [ClientDataKey.RESIDENCE_TYPE]: string
  [ClientDataKey.VEHICLE_MODEL]: string
  [ClientDataKey.REJECTS_CHEVY_OFFER]: boolean
  [ClientDataKey.LANGUAGE]: string


}>

export function useClientData(lang:string) {
  const cache = (() => {
    try {
      const cacheStr = window.localStorage.getItem(CLIENT_DATA)
      if (cacheStr) {

        return JSON.parse(cacheStr)
      } else {
        return null
      }
    } catch (e) {
      console.warn('Failed to parse cache.')
    }
  })()

  const [data, _setData] = useState<ClientData>(cache ?? {} )


  useEffect(() => {
    window.localStorage.setItem(CLIENT_DATA, JSON.stringify(data))
  }, [data])

  const setValue = <K extends ClientDataKey, P extends ClientData[K]>(key: K, payload: P) => {
    _setData({ ...data, [key]: payload })
  }

  if (data.LANGUAGE != lang) {
    setValue(ClientDataKey.LANGUAGE, lang)
  }

  const setData = (payload: ClientData) => {
    _setData({ ...data, ...payload })
  }

  const clearData = () => {
    window.localStorage.removeItem(CLIENT_DATA)
  }

  return { data, setValue, setData, clearData }
}
