CREATE TABLE diner.foods_categories (
    id_foods_categories UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(35) NOT NULL UNIQUE,
    position_menu INTEGER NOT NULL UNIQUE,
    position_addons INTEGER NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

