CREATE TABLE diner.orders_food_addon (
    id_order_food_addon     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    xid_order_food          UUID REFERENCES diner.orders_food (id_order_food) ON DELETE CASCADE NOT NULL,
    foods_addons_id         UUID NOT NULL,
    price                   NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);


insert into diner.orders_food_addon (id_order_food_addon, xid_order_food, foods_addons_id, price, created_at)
values  ('12b3b08e-0160-4e52-9afa-79ee87977cb6', '18dbb032-9068-4ea7-802a-d8870ef754e4', 'addefbe2-a45d-4b35-905c-c0395fbad8ca', 6.00, '2025-12-14 03:54:04.472000'),
        ('00f5bfeb-18b9-4922-bbd3-ced60e2f3c66', '18dbb032-9068-4ea7-802a-d8870ef754e4', '66e0f288-e555-418a-9c79-54fcb0546b85', 2.50, '2025-12-14 03:54:04.472000'),
        ('37e992a4-38a3-45d2-9af9-8c129464b02a', '18dbb032-9068-4ea7-802a-d8870ef754e4', 'a3e3040d-082a-4960-8738-32b7317d5583', 15.90, '2025-12-14 03:54:04.472000'),
        ('1bcf1123-6ba1-4ba8-bf53-47e2fb55be90', '21c9f546-1c97-449a-ada1-9f39c4479f96', '3077c962-ced8-487e-ae3d-1846e28e5627', 2.50, '2025-12-14 03:54:21.471000'),
        ('00c44366-db1a-498f-a0ee-f038a1b95320', 'eb14570d-3f09-4f8d-b711-a559cb08d5ca', '20991408-8289-42a2-b805-07f69d872650', 6.00, '2025-12-15 03:11:53.553000'),
        ('4387d80f-f50a-43da-a6fa-06c3993264c3', 'eb14570d-3f09-4f8d-b711-a559cb08d5ca', '094e8a4b-a0ed-4f5e-8837-2e9309c4d1e1', 0.00, '2025-12-15 03:11:53.553000'),
        ('b5955caa-fc84-4337-b965-04b337925147', 'eb14570d-3f09-4f8d-b711-a559cb08d5ca', '8ef15b7e-ed1d-4525-ac67-fa629eef8038', 15.90, '2025-12-15 03:11:53.553000'),
        ('a1d0e7f6-2c70-4906-bca3-aba3d6aab190', '876b3923-a02d-4909-9083-f39b2c198e8a', '9677dc7c-a97d-4b86-9b84-3b7584b6d9f8', 6.00, '2025-12-15 03:12:02.324000'),
        ('77e185f1-3fb9-4ad4-94a3-38e962ed2b85', '876b3923-a02d-4909-9083-f39b2c198e8a', '8e415ff9-c8f4-4e2b-9529-3f7c9b530850', 3.50, '2025-12-15 03:12:02.324000'),
        ('99c27d25-237d-48ee-9e1b-3e3b27a099e7', '876b3923-a02d-4909-9083-f39b2c198e8a', '48f20e70-4d5c-45a6-9c7c-c4a3c86ca20b', 19.90, '2025-12-15 03:12:02.324000');


