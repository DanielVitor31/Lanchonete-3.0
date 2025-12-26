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

INSERT INTO diner.client (id_client, cpf, email, phone, address_1) VALUES
('7a79adde-991d-4004-8b7b-846eca204e29', '111.222.333-98', 'exemplo@gmail.com', '(35) 99925-9999', 'Rua Exemplo Teste 1'),
('74d38bad-8e98-47d7-a832-1fea0e8d860c', '131.242.353-46', 'exemplo25@gmail.com', '(35) 77925-9999', 'Rua Exemplo Teste 7'),
('2c294cbc-5f75-48f6-b209-e301b4587ef4', '431.232.113-11', 'eXemplo54@gmail.com', '(55) 74425-9559', 'Rua Exemplo Teste 5');


