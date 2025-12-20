CREATE TABLE diner.orders (
    id_order UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    xid_client UUID REFERENCES diner.client (id_client) ON DELETE CASCADE NOT NULL,
    xid_payment UUID REFERENCES diner.payment (id_payment) ON DELETE CASCADE,
    total_price NUMERIC(10,2) NOT NULL,
    resume_string TEXT NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL

    CHECK (status IN ('cart', 'finished'))

);


insert into diner.orders (id_order, xid_client, xid_payment, total_price, resume_string, status, created_at)
values  ('f4a985a1-23bc-43f2-8780-7a7ea9c054c4', '7a79adde-991d-4004-8b7b-846eca204e29', '56007c8d-002c-4f87-837d-e7405c30918d', 44.30, 'X-Salada
Versão Simples
Valor: 19.9

Complemento 1: 
Refrigerante Lata
Valor: 6

Complemento 2: 
Molho Verde
Valor: 2.5

Complemento 3: 
Batata Frita
Versão 300g
Valor: 15.9', 'finished', '2025-12-14 03:54:04.395000'),
        ('c0c85f3a-bcc8-40db-a1a6-cedaf1ca4661', '7a79adde-991d-4004-8b7b-846eca204e29', NULL, 2.50, 'Molho de Alho
Valor: 2.5', 'cart', '2025-12-14 03:54:24.894000'),
        ('a30cfbeb-0e53-4bbe-b748-93c89b5450d9', '7a79adde-991d-4004-8b7b-846eca204e29', '56007c8d-002c-4f87-837d-e7405c30918d', 20.00, 'Torresmo Crocante
Versão 700g
Valor: 17.5

Complemento 1: 
Molho Verde
Valor: 2.5', 'finished', '2025-12-14 03:54:21.435000'),
        ('4093a5cb-6f10-44f9-a10e-670eebafcf39', '7a79adde-991d-4004-8b7b-846eca204e29', NULL, 3.50, 'Molho de Bacon
Valor: 3.5', 'cart', '2025-12-14 03:54:26.735000'),
        ('6fc02ea6-f9f1-4e4b-a66c-6a51928e835a', '7a79adde-991d-4004-8b7b-846eca204e29', NULL, 36.80, 'X-Bacon
Versão Média
Valor: 14.9

Complemento 1: 
Refrigerante Lata
Valor: 6

Complemento 2: 
Molho de Alho
Valor: 0

Complemento 3: 
Batata Frita
Versão 300g
Valor: 15.9', 'cart', '2025-12-15 03:11:53.484000'),
        ('8f37c275-8cc8-4ce6-bae6-80d7f67ab8aa', '7a79adde-991d-4004-8b7b-846eca204e29', NULL, 56.30, 'Wrap de Frango
Versão Proteína Extra
Valor: 26.9

Complemento 1: 
Coca-Cola
Valor: 6

Complemento 2: 
Molho de Bacon
Valor: 3.5

Complemento 3: 
Salada Veggie
Versão Especial
Valor: 19.9', 'cart', '2025-12-15 03:12:02.288000'),
        ('e928fa50-6910-4e3a-857e-276e3a2a2f0c', '7a79adde-991d-4004-8b7b-846eca204e29', '56007c8d-002c-4f87-837d-e7405c30918d', 12.00, 'Refrigerante Lata
Versão 600ml
Valor: 12', 'finished', '2025-12-15 04:46:36.394000'),
        ('28324d37-78fc-4fea-ab37-53a180073240', '7a79adde-991d-4004-8b7b-846eca204e29', NULL, 7.50, 'Sorvete Triplo
Versão 500ml
Valor: 7.5', 'cart', '2025-12-15 05:05:06.597000'),
        ('5504d394-22ca-4a3b-a1c8-7f623a05ddd3', '7a79adde-991d-4004-8b7b-846eca204e29', '56007c8d-002c-4f87-837d-e7405c30918d', 8.50, 'Pudim Tradicional
Valor: 8.5', 'finished', '2025-12-15 05:05:22.838000'),
        ('cd5132a3-5431-44a3-9758-20ff2fd9c439', '7a79adde-991d-4004-8b7b-846eca204e29', NULL, 3.00, 'Molho Chipotle
Valor: 3', 'cart', '2025-12-15 05:05:25.807000');