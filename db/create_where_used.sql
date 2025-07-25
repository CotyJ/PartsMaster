DROP TABLE if exists where_used;

CREATE TABLE where_used (
  id SERIAL UNIQUE NOT NULL PRIMARY KEY,
  bom_model TEXT,
  parent_assembly TEXT,
  assembly_name TEXT,
  reference_designator TEXT,
  part_number TEXT,
  part_description TEXT,
  grouping_model TEXT
);

\copy where_used FROM 'C:\Users\Falco\Documents\GitHub\JavaScript\PartsMaster\data\processed\where_used.csv' DELIMITER ',' CSV HEADER;
