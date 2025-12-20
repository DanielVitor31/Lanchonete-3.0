CREATE EXTENSION IF NOT EXISTS pgcrypto; -- Habilitar "pgcrypto" para pode usar UUID
DROP SCHEMA IF EXISTS diner CASCADE;
CREATE SCHEMA diner;


CREATE TABLE diner.client (
    id_client     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cpf          VARCHAR(14) UNIQUE NOT NULL ,
    email        VARCHAR(35) UNIQUE,
    phone        VARCHAR(26) UNIQUE ,
    address_1    VARCHAR(60) NOT NULL,
    address_2    VARCHAR(60),
    complement   VARCHAR(70),
    observation  VARCHAR(60),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,

    CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

