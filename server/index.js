const express = require('express');
const app = express();
const db = require('../db');
require('dotenv').config();
const PORT = process.env.PORT || 9999;
var cors = require('cors');

app.use(cors());
app.use(express.json());

// When making a build
// app.use(express.static(path.join(__dirname, '../public')));

// All parts for initial load
app.get('/search_parts/all', async (req, res) => {
  try {
    const results = await db.query(
      `SELECT * FROM parts WHERE part_name != 'DNS' ORDER BY part_number limit 100`
    );
    res.json(results.rows);
  } catch (err) {
    console.log(err);
  }
});

// Search
app.get('/search_parts', async (req, res) => {
  try {
    const { q } = req.query;
    const results = await db.query(
      `
        SELECT
          id,
          user_name as "Created by",
          part_number,
          part_description,
          dchapman_ok AS "Darrel OK?",
          dkrich_ok AS "Dave Krich OK?",
          TO_CHAR(date_added, 'YYYY-MM-DD') AS "Date added",
          std_cost AS "Standard Cost",
          part_name AS "Part Name",
          part_value AS "Part Value",
          part_pwr AS "Part Power",
          part_volt AS "Part Voltage",
          part_tol AS "Part Tolerance",
          part_type AS "Part Type",
          part_lead AS "Part Lead",
          part_package AS "Part Package",
          part_basic AS "Part Basic",
          part_special AS "Part Special",
          symbol_library_path1 AS "Symbol Library Path 1",
          symbol_library_ref1 AS "Symbol Library Ref 1",
          symbol_library_ref2 AS "Symbol Library Ref 2",
          symbol_library_ref3 AS "Symbol Library Ref 3",
          footprint_path1 AS "Footprint Path 1",
          footprint_ref1 AS "Footprint Ref 1",
          footprint_ref2 AS "Footprint Ref 2",
          drawing_no AS "Drawing Number",
          supplier_1 AS "Supplier",
          supplier_1_part_no AS "Supplier Part No",
          mfg AS "Manufacturer",
          mfg_part_no AS "Manufacturer 1 Part No",
          mfg_datasheet AS "Manufacturer 1 Datasheet",
          mfg_2 AS "Manufacturer 2",
          mfg_2_part_no AS "Manufacturer 2 Part No",
          mfg_2_datasheet AS "Manufacturer 2 Datasheet",
          mfg_3 AS "Manufacturer 3",
          mfg_3_part_no AS "Manufacturer 3 Part No",
          mfg_3_datasheet AS "Manufacturer 3 Datasheet",
          lead_time_periods AS "Lead Time Periods",
          moq AS "Minimum Order",
          elytone_part_number AS "Elytone Part Number",
          elytone_cost AS "Elytone Cost",
          kanban_reorder_qty AS "Kanban Reorder Qty",
          rohs_category AS "RoHS Category",
          uom AS "Unit of Measure",
          note AS "Note",
          cost_class AS "Cost Class",
          supplier_part_number1 AS "Supplier Part Number 1",
          supplier_1_EXTRA
        FROM parts
        WHERE part_number ILIKE $1
          OR part_description ILIKE $1
        ORDER BY part_number
        LIMIT 100;

    `,
      [`%${q}%`]
    );
    res.json(results.rows);
  } catch (err) {
    console.error('ERROR');
    res.status(500).json({ error: 'Server error...' });
  }
});

// Get Where Used
app.get('/search_where_used', async (req, res) => {
  try {
    const { q } = req.query;
    const results = await db.query(
      `SELECT bom_model FROM where_used WHERE part_number = $1 GROUP BY bom_model`,
      [`${q}`]
    );
    res.json(results.rows);
  } catch (error) {
    console.error('ERROR');
    res.status(500).json({ error: 'Server error...' });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
