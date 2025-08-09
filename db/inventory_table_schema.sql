DROP TABLE if exists inventory;

CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  part_number TEXT NOT NULL,
  os_location TEXT NOT NULL
);

-- Import query command
\copy inventory FROM 'C:\Users\Falco\Documents\GitHub\JavaScript\PartsMaster\data\inventory.csv' DELIMITER ',' CSV HEADER;
