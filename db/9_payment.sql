CREATE TABLE diner.payment (
    id_payment UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    xid_client UUID REFERENCES diner.client (id_client) ON DELETE CASCADE NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    type_price VARCHAR(30) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);



insert into diner.payment (id_payment, xid_client, total_price, type_price, payment_date)
values  ('56007c8d-002c-4f87-837d-e7405c30918d', '7a79adde-991d-4004-8b7b-846eca204e29', 84.80, 'pix', '2025-12-15 09:38:42.801205');