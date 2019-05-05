CREATE ROLE pmm;
ALTER ROLE pmm WITH LOGIN PASSWORD 'password' NOSUPERUSER NOCREATEDB NOCREATEROLE;
CREATE DATABASE pmm OWNER pmm;
REVOKE ALL ON DATABASE pmm FROM PUBLIC;
GRANT CONNECT ON DATABASE pmm TO pmm;
GRANT ALL ON DATABASE pmm TO pmm;
CREATE SCHEMA pmm;