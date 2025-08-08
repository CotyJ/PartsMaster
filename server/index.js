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

// Search
app.get('/parts', async (req, res) => {
  try {
    const { part_number } = req.query;
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
      [`%${part_number}%`]
    );
    res.json(results.rows);
  } catch (err) {
    console.error('ERROR');
    res.status(500).json({ error: 'Server error...' });
  }
});

// Get kanban list
app.get('/kanban', async (req, res) => {
  try {
    const results = await db.query(`
      SELECT
        kanban_cards.id,
        parts.part_number,
        parts.part_description,
        TO_CHAR(kanban_cards.date_added, 'YYYY-MM-DD') AS date_added
      FROM kanban_cards
      JOIN
        parts ON kanban_cards.part_number = parts.part_number
      ORDER BY
        date_added DESC
      `);
    res.json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error...' });
  }
});

// add kanban card
app.put('/kanban/:part_number', async (req, res) => {
  try {
    const { part_number } = req.params;
    const results = await db.query(
      `
      INSERT INTO
        kanban_cards
        (part_number)
      VALUES
        ($1)
      `,
      [`${part_number}`]
    );
    res.json(results.rows);
  } catch (err) {
    if (err.code === '23505') {
      res.status(409).json({ error: 'Part number already exists' });
    } else {
      console.log(err);
      res.status(500).json({ error: 'Server error...' });
    }
  }
});

// Delete kanban card (check in)
app.delete('/kanban/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const results = await db.query(
      `
      DELETE
      FROM
        kanban_cards
      WHERE
        id=$1
      RETURNING *
      `,
      [id]
    );
    res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error...' });
  }
});

// Get Where Used
app.get('/where_used', async (req, res) => {
  try {
    const { part_number } = req.query;
    const results = await db.query(
      `SELECT bom_model FROM where_used WHERE part_number = $1 GROUP BY bom_model`,
      [`${part_number}`]
    );
    res.json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error...' });
  }
});

// Get inventory
app.get('/inventory', async (req, res) => {
  try {
    const results = await db.query(
      `SELECT
        overstock_locations.id,
        parts.part_number,
        parts.part_description,
        overstock_locations.os_location
      FROM
        overstock_locations
      JOIN
        parts ON overstock_locations.part_number = parts.part_number
      ORDER BY
        part_number ASC
      `
    );
    res.json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error...' });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
