CREATE TABLE diner.foods (
    id_food UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    xid_categorie UUID REFERENCES diner.foods_categories(id_foods_categories) ON DELETE CASCADE NOT NULL,
    name VARCHAR(30) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    img VARCHAR(35) DEFAULT 'logos/logo' NOT NULL,
    price DECIMAL(6, 2) NOT NULL,
    promotion DECIMAL(7, 2),
    stock BOOLEAN DEFAULT TRUE NOT NULL,
    sale BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);