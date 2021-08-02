/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */

// Dependencies
const fs = require('fs')
const http = require('http')
const https = require('https')
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express()

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.chevroletchargingoffer.ca/privkey.pem', 'utf8')
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.chevroletchargingoffer.ca/cert.pem', 'utf8')
const ca = fs.readFileSync('/etc/letsencrypt/live/www.chevroletchargingoffer.ca/chain.pem', 'utf8')

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
}

app.prepare().then(() => {
  server.all('*', (req, res) => {
    return handle(req, res)
  })
  http.createServer(server).listen(3000)
  https.createServer(credentials, server).listen(3001)
}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
