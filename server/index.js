const express = require('express')
const app = express()
const PORT = process.env.PORT || 9999
const db = require('../db');



// Main request
app.get('/', (req, res) => {
  console.log("Home page");
})

// Get all parts


// Get one part
app.get('/parts/:part_number', async (req, res) => {
  // something like...
  // await db.query(`SELECT * FROM parts WHERE part_number= $1`)
  console.log("Get one part");
})

// Filter all parts?


app.listen(PORT, () => {
  console.log(`Example app listening on port ${port}`)
})
