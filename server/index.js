/* eslint-disable no-undef */
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(
  '565535016155-s2ot677uvn5cvfbfor99ukvtaijtjgng.apps.googleusercontent.com'
)

app.use(bodyParser.json())
app.use(cors())

const path = require('path')

app.use(express.static(path.join(__dirname, '../dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(4001, () => {
  console.log(`Server is ready at http://localhost:${4001}`)
})
