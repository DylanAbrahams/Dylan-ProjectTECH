const express = require('express')
const app = express()
const port = 3000

/* Middleware */
app.set('view engine', 'ejs')
app.use(express.static('static'))


/* Routes */
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/register', (req, res) => {
  res.send('Registreer Account')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})