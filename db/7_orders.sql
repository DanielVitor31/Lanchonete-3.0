CREATE TABLE diner.orders (
    id_order UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    xid_client UUID REFERENCES diner.client (id_client) ON DELETE CASCADE NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    resume_string TEXT NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);