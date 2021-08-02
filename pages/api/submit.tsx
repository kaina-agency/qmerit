import type { NextApiRequest, NextApiResponse } from 'next'
import Client from 'ssh2-sftp-client'
import * as shortid from 'shortid'
import * as jsonexport from 'jsonexport/dist'

import fetch from 'node-fetch'
import https from 'https'


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const json = JSON.parse(req.body)
  const csv = await jsonexport(json)
  const date = new Date()
  const SFTPClient = new Client()
  const uniqueID = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}-${shortid.generate()}`

  const dateS = date.toISOString().replace('-', '').split('T')[0].replace('-', '')

  SFTPClient.connect({
    host: process.env.QMERIT_FTP,
    port: process.env.QMERIT_PORT,
    username: process.env.QMERIT_USER,
    password: process.env.QMERIT_PASS
  }).then(() => {
    SFTPClient.put(Buffer.from(csv), `./Uploads/${uniqueID}.csv`).then(() => {
      res.status(200).json({ status: 'ok' })
    })
  }).catch(err => {
    console.log(err, 'catch error')
    res.status(200).json({ status: 'error' })
  })


  const XML_TEST =
    `<Request xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <InputData>
      <InputDataItem>
        <IntentCode>FIRST_NAME_AND_INITIAL</IntentCode>
        <SequenceNumber>1</SequenceNumber>
        <DataValue>${json.FIRST_NAME}</DataValue>
      </InputDataItem>
      <InputDataItem>
        <IntentCode>INTERNET_ADDRESS</IntentCode>
        <SequenceNumber>1</SequenceNumber>
        <DataValue>${json.EMAIL}</DataValue>
      </InputDataItem>
      <InputDataItem>
        <IntentCode>EMAIL_VERSION</IntentCode>
        <SequenceNumber>1</SequenceNumber>
        <DataValue>Z314188</DataValue>
      </InputDataItem>
      <InputDataItem>
        <IntentCode>LANGUAGE_CODE</IntentCode>
        <SequenceNumber>1</SequenceNumber>
        <DataValue>${json.LANGUAGE === 'en' ? 'EN' : 'FR'}</DataValue>
      </InputDataItem>
      <InputDataItem>
        <IntentCode>COMPONENT_RECEIVED_DATE</IntentCode>
        <SequenceNumber>1</SequenceNumber>
        <DataValue>${dateS}</DataValue>
      </InputDataItem>
      <InputDataItem>
        <IntentCode>VENDOR_UNIQUE_NBR</IntentCode>
        <SequenceNumber>1</SequenceNumber>
        <DataValue>${uniqueID}</DataValue>
      </InputDataItem>
    </InputData>
  </Request>`

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  })
  fetch('https://gmca.cm2solutions.net/services/gmca/p', {
    agent: httpsAgent
    , method: 'post'
    , headers: {
      'Accept': 'application/xml'
      , 'Authorization': 'Basic cW1lcml0LXA6dDVzI2g1U2RZODdKQ0tq'
      , 'RequestID': `${uniqueID}`
    }
    , body: XML_TEST
  })
    .then(res => res.text())
    .then(body => console.log(body))

}