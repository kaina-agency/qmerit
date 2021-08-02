import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import csv from 'csv-parser'


export default (req: NextApiRequest, res: NextApiResponse) => {
  let validVin = false
  const vinToQuery = req.query.vin
  fs.createReadStream('./dealer_form_fields_sharepoint.csv')
    .pipe(csv())
    .on('data', (row) => {
      //console.log(row['VIN / NIV'], row[`Customer's Charging Selection / Sélection de recharge du client`])
      if (row['VIN / NIV'] == vinToQuery) {
        if ( row['Customer\'s Charging Selection / Sélection de recharge du client'].toLowerCase().indexOf('home') > -1) {
          validVin = true
          res.status(200).json({ status: 'valid' })
        }
        if ( row['Customer\'s Charging Selection / Sélection de recharge du client'].toLowerCase().indexOf('public') > -1) {
          validVin = true
          res.status(200).json({ status: 'public' })
        }
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed')
      if (!validVin)res.status(200).json({ status: 'invalid' })
    })
}
