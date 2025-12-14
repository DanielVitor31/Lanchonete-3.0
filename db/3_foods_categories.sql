CREATE TABLE diner.foods_categories (
    id_foods_categories UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(35) NOT NULL UNIQUE
    position_menu INTEGER NOT NULL UNIQUE
    position_addons INTEGER NOT NULL UNIQUE
);


TRUNCATE diner.foods_categories;
INSERT INTO diner.foods_categories (id_foods_categories, name, position_menu, position_addons) VALUES
('f72b8586-5a7b-4b9e-9e31-0c2ea1b36448', 'Lanches', 1, 6),
('884f9d6b-8fd8-4ae0-bb25-c16f26186b9f', 'Pizzas', 2, 7),
('789bea65-c6b1-4c25-ad74-f7fe485dae99', 'Porções', 3, 1),
('66c4c918-ac03-49ef-aba5-84a05ee16799', 'Hot Dog', 4, 8);
('b4460fae-46b0-45d9-a58e-c313895b1799', 'Sorvetes', 5, 5),
('afb1a4a3-00f1-454c-9aac-8b091e269a74', 'Bebidas', 6, 3),
('18a6ad4f-9dca-4353-bc2e-dd43c0e31916', 'Sobremesas', 7, 4),
('fb48376a-2748-4223-92eb-40cfae91d069', 'Molhos', 8, 2);
