const express = require('express')
const app = express()
const db = require('../db');
const PORT = process.env.PORT || 9999
var cors = require('cors')

app.use(cors())
app.use(express.json())

// When making a build
// app.use(express.static(path.join(__dirname, '../public')));


// Main Page
// app.get('/', (req,res) => {
//   console.log("Home Page");
//   res.status(200).json({a: 'success'})
// })


// Get all because fuck it
// app.get('/getall', async (req,res) => {
//   try {
//     const results = await db.query(`
//       SELECT * FROM parts
//       LIMIT 10
//       `)
//       res.json(results.rows);
//     } catch (err) {
//       console.log("error...");
//       res.status(500).json({error: "error..."})
//     }
// })

// Search
app.get('/search_parts', async (req, res) => {
  console.log('Searching...');

  try {
  const { q } = req.query;


  const results = await db.query(`
    SELECT * FROM parts
    WHERE part_number ILIKE $1
    ORDER BY part_number
    LIMIT 20
    `, [`%${q}%`]);

    console.log(`Searching for ${q}`);
    res.json(results.rows);

    // Catch
  } catch (err) {
    console.error("ERROR");
    res.status(500).json({ error: 'Server error...'});
  }
});


// Get all parts


// Get one part
app.get('/parts/:part_number', async (req, res) => {
  // something like...
  // await db.query(`SELECT * FROM parts WHERE part_number= $1`)
  console.log("Get one part");
})

// Filter all parts?


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
