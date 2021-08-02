import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import path from 'path'
import aws from 'aws-sdk'

aws.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey:  process.env.AWS_SECRET_KEY
})

// disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const form = new IncomingForm({
    uploadDir: './public/userimages',
    keepExtensions: true
  })

  form.parse(req, async (err, fields, files) => {
    const uploadPath = await uploadFile((files.file as any).path)
    res.status(200).json({ url: uploadPath  })
  })
}

const CLOUDFRONT_URL =  process.env.AWS_CLOUDFRONT_URL
const BUCKET_NAME = process.env.AWS_BUCKET
const s3 = new aws.S3()


const uploadFile = async (fileName) => {
  return new Promise( resolve => {
    const fileContent = fs.readFileSync(fileName)

    console.log(fileName)

    const params = {
      Bucket: BUCKET_NAME,
      Key: path.basename(fileName),
      Body: fileContent
    }
    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
      if (err) {
        console.log(err)
        throw err
      }
      resolve(CLOUDFRONT_URL + data.Key)
    })
  })
}
