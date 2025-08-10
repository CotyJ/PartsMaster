DROP TABLE if exists kanban_cards;

CREATE TABLE kanban_cards (
  id SERIAL PRIMARY KEY UNIQUE NOT NULL,
  part_number TEXT UNIQUE NOT NULL,
  date_added DATE DEFAULT DATE(CURRENT_TIMESTAMP)
);

-- INSERT INTO kanban_cards (part_number, date_added)
-- SELECT part_number,
--        (CURRENT_DATE - (random() * 30)::int)::date
-- FROM parts
-- ORDER BY random()
-- LIMIT 25;
