import http from 'https'
import querystring from 'querystring'

const form = querystring.stringify({ name: 'hello', attribute: 1 })

const options = {
  hostname: 'dev.shintech.ninja',
  port: 8001,
  path: '/api/index',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(form)
  }
}

var callback = function (response) {
  var str = ''
  response.setEncoding('utf8')
  response.on('data', function (chunk) {
    str += chunk
  })

  response.on('end', function () {
    console.log(str)
  })
}

var req = http.request(options, callback)
req.write(form)
req.end()
