const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { DATABASE_URL, PORT } = require('./constants')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(DATABASE_URL, err => {
  if (err) {
    console.log(err)
  }
  console.log('MongoDB started!')
})

const router = express.Router()

app.use(require('./routes'))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')
const Student = mongoose.model('Student', { name: String })
const bobby = new Student({ name: 'Bobby' })
bobby.save().then(() => console.log('ok'))


app.listen(PORT, function() {
  console.log(`App is running at port ${PORT}`)
})
