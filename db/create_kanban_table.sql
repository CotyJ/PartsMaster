DROP TABLE if exists kanban_cards;

CREATE TABLE kanban_cards (
  id SERIAL PRIMARY KEY UNIQUE NOT NULL,
  part_number UNIQUE NOT NULL,
  date_added TIMESTAMP
);
