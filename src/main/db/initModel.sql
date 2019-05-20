DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT                       -- SELECT list can stay empty for this
      FROM   pg_catalog.pg_roles
      WHERE  rolname = 'pmm') THEN

        CREATE ROLE pmm;
        ALTER ROLE pmm WITH LOGIN PASSWORD 'password' NOSUPERUSER NOCREATEDB NOCREATEROLE;

   END IF;
END
$do$;

DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT                       -- SELECT list can stay empty for this
      FROM   pg_database
      WHERE  datname = 'pmm') THEN

        CREATE DATABASE pmm OWNER pmm;

   END IF;
END
$do$;

REVOKE ALL ON DATABASE pmm FROM PUBLIC;
GRANT CONNECT ON DATABASE pmm TO pmm;
GRANT ALL ON DATABASE pmm TO pmm;

-- WITH THE ROLE pmm AND DB pmm 
-- WE CREATE A STRUCTURE OF DB

CREATE SCHEMA pmm;