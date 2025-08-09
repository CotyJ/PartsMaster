DROP TABLE if exists overstock_locations;

CREATE TABLE overstock_locations (
  id SERIAL PRIMARY KEY,
  part_number TEXT NOT NULL,
  os_location TEXT NOT NULL
);

-- Import query command
\copy overstock_locations FROM 'C:\Users\Falco\Documents\GitHub\JavaScript\PartsMaster\data\overstock_locations.csv' DELIMITER ',' CSV HEADER;
