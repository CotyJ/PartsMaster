const express = require('express')
const app = express()
const port = 3000


// Main request
app.get('/', (req, res) => {
  console.log("Home page");
})

// Get all parts


// Get one part
app.get('/parts/:part_number', (req, res) => {
  console.log("Get one part");
})

// Filter all parts?


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
