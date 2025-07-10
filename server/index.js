const express = require('express')
const app = express()
const db = require('../db');
require('dotenv').config()
const PORT = process.env.PORT || 9999
var cors = require('cors')

app.use(cors())
app.use(express.json())

// When making a build
// app.use(express.static(path.join(__dirname, '../public')));

// All parts for initial load
app.get('/search_parts/all', async (req,res) => {
  try {
    const results = await db.query(`SELECT * FROM parts WHERE part_name != 'DNS' ORDER BY part_number limit 100`)
    res.json(results.rows);
  } catch (err) {
    console.log(err);

  }

})

// Search
app.get('/search_parts', async (req, res) => {
  console.log('Searching...');

  try {
  const { q } = req.query;
  const results = await db.query(`
    SELECT * FROM parts
    WHERE part_number ILIKE $1
    OR part_description ILIKE $1
    ORDER BY part_number
    LIMIT 20
    `, [`%${q}%`]);

    console.log(`Searching for ${q}`);
    res.json(results.rows);

  } catch (err) {
    console.error("ERROR");
    res.status(500).json({ error: 'Server error...'});
  }
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
