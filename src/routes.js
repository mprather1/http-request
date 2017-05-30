import express from 'express'

export default function getRouter (options) {
  const router = express.Router()

// Models

  router.route('/index')
  .get(function (req, res) {
    console.log('route')
    res.status(200)
    .json({
      'test': 'test'
    })
  })
  .post(function (req, res) {
    console.log(req.body)
    res.status(200)
    .json({
      response: req.body
    })
  })

  return router
}
