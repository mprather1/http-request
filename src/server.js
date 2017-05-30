import express from 'express'
import getRouter from './routes'
import pkg from '../package.json'
import winston from 'winston-color'
import bodyParser from 'body-parser'
import config from './_config'
import morgan from 'morgan'
import fs from 'fs'

const options = {
  app: express(),
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development',
  logger: winston,
  packageName: pkg.name,
  config: config
}

const sslConfig = {
  key: fs.readFileSync('/home/mike/letsencrypt/live/dev.shintech.ninja/privkey.pem'),
  cert: fs.readFileSync('/home/mike/letsencrypt/live/dev.shintech.ninja/fullchain.pem')
}

const { app } = options
const router = getRouter(options)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const server = require('https').Server(sslConfig, app)

server.listen(8001)

server.on('listening', function () {
  console.log('listening')
})

server.on('request', function (req, res) {
  console.log(req.url)
})

app.use(morgan('dev'))

app.use('/api', router)
