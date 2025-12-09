CREATE TABLE diner.orders_food (
    id_order_food      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    xid_order          UUID NOT NULL REFERENCES diner.orders (id_order) ON DELETE CASCADE NOT NULL,
    food_id            UUID NOT NULL,
    food_version_id    UUID,
    price              NUMERIC(10,2) NOT NULL,
    created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);