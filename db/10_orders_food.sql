CREATE TABLE diner.orders_food (
    id_order_food      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    xid_order          UUID NOT NULL REFERENCES diner.orders (id_order) ON DELETE CASCADE NOT NULL,
    food_id            UUID NOT NULL,
    food_version_id    UUID,
    price              NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL

);



insert into diner.orders_food (id_order_food, xid_order, food_id, food_version_id, price, created_at)
values  ('18dbb032-9068-4ea7-802a-d8870ef754e4', 'f4a985a1-23bc-43f2-8780-7a7ea9c054c4', 'abbfa861-2b5d-455d-b904-f441487f5091', 'a7e822aa-e00d-4029-a060-17d6c9794ad9', 19.90, '2025-12-14 03:54:04.436000'),
        ('21c9f546-1c97-449a-ada1-9f39c4479f96', 'a30cfbeb-0e53-4bbe-b748-93c89b5450d9', '31bfb9e8-2f66-4712-a90e-ffb0fdcae226', '4c937479-8d5b-4f32-9bc6-f803ac0e3c90', 17.50, '2025-12-14 03:54:21.454000'),
        ('c2857fa6-db05-4139-a607-183b6b8d38fd', 'c0c85f3a-bcc8-40db-a1a6-cedaf1ca4661', 'a956f62e-e0ec-4e94-a71c-48dce5ecdb23', null, 2.50, '2025-12-14 03:54:24.911000'),
        ('82f9e7e0-e63b-40d7-9280-9cd3c3d2d22a', '4093a5cb-6f10-44f9-a10e-670eebafcf39', '55c20be6-a8b7-4e3f-8129-ba6238dbd1ea', null, 3.50, '2025-12-14 03:54:26.750000'),
        ('eb14570d-3f09-4f8d-b711-a559cb08d5ca', '6fc02ea6-f9f1-4e4b-a66c-6a51928e835a', '6357d744-1ced-40bb-83fd-1ed66af04226', 'b8aefa22-dd74-4b20-a002-df56123b9717', 14.90, '2025-12-15 03:11:53.529000'),
        ('876b3923-a02d-4909-9083-f39b2c198e8a', '8f37c275-8cc8-4ce6-bae6-80d7f67ab8aa', '102ebd48-d62e-47b2-8a7e-92eabdea0a1d', '86619861-8872-44a1-b94c-36927f958e15', 26.90, '2025-12-15 03:12:02.307000'),
        ('1fa2cbe8-8896-4a63-a5a7-553ea86e637f', 'e928fa50-6910-4e3a-857e-276e3a2a2f0c', 'aebeac60-5d2f-4b7d-9dfe-7a5e6364cfd8', '2d868cc2-56a6-42b3-a829-551b76085008', 12.00, '2025-12-15 04:46:36.431000'),
        ('72f59161-b7d0-4c3c-84d6-230ec6c30f36', '28324d37-78fc-4fea-ab37-53a180073240', '7b10ca9d-b39b-4519-ba54-b49ac362874b', '0a53fc3c-c380-47f0-b310-03ce1ce83e46', 7.50, '2025-12-15 05:05:06.619000'),
        ('a3757d07-2e6c-4055-9745-873c2a229b32', '5504d394-22ca-4a3b-a1c8-7f623a05ddd3', 'db94cf9c-c54a-452e-95f0-28959cea0ee8', null, 8.50, '2025-12-15 05:05:22.854000'),
        ('1aa3cf06-6801-4b99-a77a-2cf1010a561c', 'cd5132a3-5431-44a3-9758-20ff2fd9c439', '50d88775-5c3c-4e06-affc-eb05691ecdbe', null, 3.00, '2025-12-15 05:05:25.821000');