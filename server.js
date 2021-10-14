import http from 'http'
import fs from 'fs'
import path from 'path'

const server = http.createServer(async (req, res) => {

  console.log(req.url)
  const url = req.url
  switch (url) {
    case '/': fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
      if (err) throw err
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.end(data)
    })
      break
    case '/contacts': fs.readFile(path.join(__dirname, 'public', 'contacts.html'), (err, data) => {
      if (err) throw err
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.end(data)
    })
      break
    case '/favicon.ico': res.end()
      break
    default: fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data) => {
      if (err) throw err
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.end(data)
    })
  }
})

server.listen(3000, () => {
  console.log('Server is listening on localhost:3000')
})
