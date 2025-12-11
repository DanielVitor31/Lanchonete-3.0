DROP TABLE diner.orders_food_addon;
CREATE TABLE diner.orders_food_addon (
    id_order_food_addon     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    xid_order               UUID NOT NULL REFERENCES diner.orders (id_order),
    xid_foods_addons_items  UUID NOT NULL,
    price                   NUMERIC(10,2) NOT NULL,
    created_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);





