-- Execute all sql files in /db

DO
$$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'parts_db') THEN
      CREATE DATABASE parts_db;
  END IF;
END
$$;

\c parts_db;

\i 'db/parts_table_schema.sql'
\i 'db/where_used_table_schema.sql'
\i 'db/inventory_table_schema.sql'
\i 'db/production_models_table_schema.sql'
\i 'db/orders_table_schema.sql'
\i 'db/kanban_table_schema.sql'
