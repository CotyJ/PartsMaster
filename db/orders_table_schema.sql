DROP TABLE if exists orders;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY UNIQUE NOT NULL,
  old_id INT,
  po_number INT NOT NULL,
  part_number TEXT NOT NULL,
  li_cost NUMERIC(10,5),
  li NUMERIC(10,2),
  due_date TIMESTAMP,
  order_qty NUMERIC(10,2),
  invoice TEXT,
  received_qty NUMERIC(10,2),
  received_date TIMESTAMP
);

-- COPY
\copy orders FROM 'C:\Users\Falco\Documents\GitHub\JavaScript\PartsMaster\data\orders_line_item.csv' DELIMITER ',' CSV HEADER;


-- Drop obsolete cols
ALTER TABLE orders
DROP COLUMN invoice;

ALTER TABLE orders
DROP COLUMN old_id;


-- Convert numerics to INTs
ALTER TABLE orders
ALTER COLUMN order_qty TYPE int;

ALTER TABLE orders
ALTER COLUMN received_qty TYPE int;

-- Add an is_overdue col for funsies
ALTER TABLE orders
ADD COLUMN is_overdue BOOLEAN;
UPDATE orders
SET is_overdue = received_date > due_date;
