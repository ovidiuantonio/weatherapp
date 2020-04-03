
projectData = {};


const bodyParser = require('body-parser')
const express = require('express')

const app = express()

/* Middleware */


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


const cors = require('cors')
app.use(cors())

app.use(express.static('website'));



const server = app.listen(3000, () => {
  console.log('server is listening on port:', 3000)
})

app.get('/all', (req, res) => {
  res.send(JSON.stringify(projectData))
})

app.post('/', (req, res) => {
  projectData.temp = req.body.temperature
  projectData.date = req.body.date
  projectData.user = req.body.userresponse
  res.end()
})