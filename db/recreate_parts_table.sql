-- Run to reset parts table
DROP TABLE if exists parts;

CREATE TABLE parts (
	id SERIAL PRIMARY KEY,
	user_name TEXT,
	part_number TEXT UNIQUE NOT NULL,
	part_description TEXT,
	dchapman_ok BOOLEAN,
	dkrich_ok BOOLEAN,
	date_added TIMESTAMP,
	std_cost NUMERIC(10,2),
	part_name TEXT,
	part_value TEXT,
	part_pwr TEXT,
	part_volt TEXT,
	part_tol TEXT,
	part_type TEXT,
	part_lead TEXT,
	part_package TEXT,
	part_basic TEXT,
	part_special TEXT,
	symbol_library_path1 TEXT,
	symbol_library_ref1 TEXT,
	symbol_library_ref2 TEXT,
	symbol_library_ref3 TEXT,
	footprint_path1 TEXT,
	footprint_ref1 TEXT,
	footprint_ref2 TEXT,
	drawing_no TEXT,
	supplier_1 TEXT,
	supplier_1_part_no TEXT,
	mfg TEXT,
	mfg_part_no TEXT,
	mfg_datasheet TEXT,
	mfg_2 TEXT,
	mfg_2_part_no TEXT,
	mfg_2_datasheet TEXT,
	mfg_3 TEXT,
	mfg_3_part_no TEXT,
	mfg_3_datasheet TEXT,
	lead_time_periods NUMERIC(10,2),
	moq NUMERIC(10,2),
	elytone_part_number TEXT,
	elytone_cost NUMERIC(10,2),
	kanban_reorder_qty TEXT,
	rohs_category TEXT,
	uom TEXT,
	note TEXT,
	cost_class TEXT,
	supplier_part_number1 TEXT,
	supplier_1_EXTRA TEXT
);

-- Import query command
\copy parts FROM 'C:\Users\Falco\Documents\GitHub\JavaScript\PartsMaster\data\processed\parts.csv' DELIMITER ',' CSV HEADER;
