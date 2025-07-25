DROP TABLE if exists production_models;

CREATE TABLE production_models (
  id SERIAL PRIMARY KEY,
  model TEXT,
  in_production BOOLEAN
);

\copy production_models FROM 'C:\Users\Falco\Documents\GitHub\JavaScript\PartsMaster\data\processed\production_models.csv' DELIMITER ',' CSV HEADER;
