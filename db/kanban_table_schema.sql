DROP TABLE if exists kanban_cards;

CREATE TABLE kanban_cards (
  id SERIAL PRIMARY KEY UNIQUE NOT NULL,
  part_number TEXT UNIQUE NOT NULL,
  date_added DATE DEFAULT DATE(CURRENT_TIMESTAMP)
);

-- Fake data to populate - // FIXME:  doesn't work with new fake data
-- INSERT INTO kanban_cards (part_number)
-- VALUES ('12201-4322' );

-- INSERT INTO kanban_cards (part_number)
-- VALUES ('43205-2304' );

-- INSERT INTO kanban_cards (part_number)
-- VALUES ('98100-5801' );

-- INSERT INTO kanban_cards (part_number)
-- VALUES ('64614-1825' );
