const express = require('express')
const session = require('express-session')
const router = require('./router')
const app = express()

app.use(session({
  secret: 'cnodejs',
  resave: false,
  saveUninitialized: true
}))

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use('/api', router)

app.listen(3000, () => {
  console.log('server start at port 3000')
})
