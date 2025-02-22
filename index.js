import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.send('About page')
})

app.get('/contact', (req, res) => {
  res.send('Contact page')
})

const port = 3000
app.listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`)
})
