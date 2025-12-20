CREATE TABLE diner.extra_ingredients (
    id_extra_ingredient UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(30) UNIQUE NOT NULL,
    description TEXT,
    img VARCHAR(35) DEFAULT 'logos/logo' NOT NULL,
    price DECIMAL(6, 2) NOT NULL,
    promotion DECIMAL(7, 2),
    qty_max INTEGER NOT NULL,
    stock BOOLEAN DEFAULT TRUE NOT NULL,
    sale BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);


INSERT INTO diner.extra_ingredients ("id_extra_ingredient", "name", "description", "img", "price", "promotion", "qty_max", "stock", "sale") VALUES
    ('1eb4eb9c-d340-4c94-9a74-b933370cea93', 'Picles', NULL, 'logos/logo', 3.00, NULL, 2, TRUE, TRUE),
    ('05686e2d-64a2-46a3-8b78-99989a77841f', 'Cebola caramelizada', NULL, 'logos/logo', 4.00, NULL, 3, TRUE, TRUE),
    ('3ccf02e4-e21b-4ea4-ae43-06931891e828', 'Bacon', NULL, 'logos/logo', 4.00, NULL, 5, TRUE, TRUE),
    ('f90888f1-cc50-48ea-8a44-f70803465aaa', 'Pimenta (Jalapeño)', NULL, 'logos/logo', 3.50, NULL, 2, TRUE, TRUE),
    ('44036739-a2c9-47af-8cd3-0cd4f0683e66', 'Molho especial', NULL, 'logos/logo', 3.50, NULL, 3, TRUE, TRUE),
    ('4b6b852e-51f7-49ea-8c42-59867004b86f', 'Alface', NULL, 'logos/logo', 3.00, NULL, 4, TRUE, TRUE),
    ('9de4496a-be07-4f9c-a0fd-68e45c7c9e19', 'Cebola roxa crua', NULL, 'logos/logo', 3.00, NULL, 3, TRUE, TRUE),
    ('4cb1d3f1-1a32-4b8e-878b-d7fea6fe05dd', 'Onion rings', NULL, 'logos/logo', 6.50, NULL, 3, TRUE, TRUE),
    ('c22873c6-7c5c-444b-a73c-09ced539e2bd', 'Ovo frito', NULL, 'logos/logo', 2.00, NULL, 2, TRUE, TRUE),
    ('daad538f-623d-418c-8c61-ecefd9dcc0a4', 'Queijo (Cheddar)', NULL, 'logos/logo', 3.00, NULL, 4, TRUE, TRUE),
    ('ac46a891-aa35-45ea-aeb3-957a8f329353', 'Tomate', NULL, 'logos/logo', 3.00, NULL, 3, TRUE, TRUE),
    ('519f55ed-1159-47fa-a528-ff2d6c0c8084', 'Queijo (Prato)', NULL, 'logos/logo', 3.00, NULL, 4, TRUE, TRUE),
    ('cd95a4a6-5c3f-48b6-a91d-011a1ac3ebe5', 'Queijo (Suíço)', NULL, 'logos/logo', 3.50, NULL, 4, TRUE, TRUE),
    ('0742fb82-dfef-4202-8376-631db2f9a5c7', 'Catupiry', NULL, 'logos/logo', 6.00, NULL, 3, TRUE, TRUE),
    ('553ca9db-d09c-4263-a2e7-0794757b281e', 'Molho barbecue', NULL, 'logos/logo', 2.50, NULL, 3, TRUE, TRUE),
    ('f1818220-1bb3-44c1-978b-5b7d7c60416d', 'Cogumelo shimeji', NULL, 'logos/logo', 7.00, NULL, 3, TRUE, TRUE),
    ('88e73986-3149-4af1-aeed-95aa4efab936', 'Pimenta (Dedo-de-moça)', NULL, 'logos/logo', 3.50, NULL, 4, TRUE, TRUE),
    ('ad5157d1-230d-48d9-8a29-07705112224f', 'Queijo (Gorgonzola)', NULL, 'logos/logo', 9.00, NULL, 4, TRUE, TRUE);
