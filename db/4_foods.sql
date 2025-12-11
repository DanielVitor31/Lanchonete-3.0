CREATE TABLE diner.foods (
    id_food UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    xid_categorie UUID REFERENCES diner.foods_categories(id_foods_categories) ON DELETE CASCADE NOT NULL,
    name VARCHAR(30) NOT NULL,
    description TEXT NOT NULL,
    img VARCHAR(35) DEFAULT 'logos/logo' NOT NULL,
    price DECIMAL(6, 2) NOT NULL,
    promotion DECIMAL(7, 2),
    stock BOOLEAN DEFAULT TRUE NOT NULL,
    sale BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO diner.foods (id_food, name, description, img, xid_categorie, price, promotion, stock, sale) VALUES
-- Lanches
('abbfa861-2b5d-455d-b904-f441487f5091', 'Burger Classic', 'Hambúrguer simples com queijo e molho especial.', 'lanches/lanche1', 'f72b8586-5a7b-4b9e-9e31-0c2ea1b36448', 19.90, 20.0, TRUE, TRUE),
('2162a6aa-d5cc-463d-98e5-8a6b7b579359', 'Burger Duplo Supreme', 'Hambúrguer duplo com queijo, bacon e molho especial.', 'lanches/lanche2', 'f72b8586-5a7b-4b9e-9e31-0c2ea1b36448', 29.90, 15.0, TRUE, TRUE),
('e9a827a8-a6ef-4916-8b83-4168720a0327', 'Sanduíche de Frango Crocante', 'Pão macio com frango empanado crocante, alface e maionese.', 'lanches/lanche2', 'f72b8586-5a7b-4b9e-9e31-0c2ea1b36448', 22.90, 10.0, TRUE, TRUE),
('102ebd48-d62e-47b2-8a7e-92eabdea0a1d', 'Wrap de Frango', 'Tortilha recheada com frango grelhado e salada.', 'lanches/lanche3', 'f72b8586-5a7b-4b9e-9e31-0c2ea1b36448', 18.90, 5.0, TRUE, TRUE),
('174ba785-a68d-47e6-a89f-a5986d1bef5d', 'Cheddar Melt Smash', 'Burger prensado com bastante cheddar cremoso e cebola caramelizada.', 'lanches/lanche4', 'f72b8586-5a7b-4b9e-9e31-0c2ea1b36448', 24.90, 12.0, TRUE, TRUE),
('6357d744-1ced-40bb-83fd-1ed66af04226', 'Crispy Bacon Ranch', 'Hambúrguer com bacon crocante, molho ranch e queijo derretido.', 'lanches/lanche5', 'f72b8586-5a7b-4b9e-9e31-0c2ea1b36448', 26.90, 8.0, TRUE, TRUE),

-- Porções
('29282015-dd36-4967-846f-b44218122c4f', 'Batata Frita', 'Batata frita crocante, servida bem dourada.', 'porcoes/batatafrita', '789bea65-c6b1-4c25-ad74-f7fe485dae99', 12.50, NULL, TRUE, TRUE),
('1dd09eeb-38f3-4394-99d4-6438cc16cc1d', 'Frango Frito Crocante', 'Tiras ou pedaços de frango empanados e fritos até ficarem crocantes.', 'porcoes/frangofrito', '789bea65-c6b1-4c25-ad74-f7fe485dae99', 24.90, 10.0, TRUE, TRUE),
('421fa2b1-15fb-42ef-aa93-256cb24fe5ff', 'Porção de Mariscos', 'Mix de frutos do mar empanados e fritos, acompanhado de molho.', 'porcoes/mariscos', '789bea65-c6b1-4c25-ad74-f7fe485dae99', 32.00, NULL, TRUE, TRUE),
('6b71a096-3905-4008-a8cd-1835353cbd70', 'Onion Rings', 'Anéis de cebola empanados, crocantes e dourados.', 'porcoes/onionrings', '789bea65-c6b1-4c25-ad74-f7fe485dae99', 10.90, 15.0, TRUE, TRUE),
('31bfb9e8-2f66-4712-a90e-ffb0fdcae226', 'Torresmo Crocante', 'Cubinhos de barriga suína fritos até estourarem, super crocantes.', 'porcoes/torremos', '789bea65-c6b1-4c25-ad74-f7fe485dae99', 18.90, NULL, TRUE, TRUE),

-- Sorvetes
('7b10ca9d-b39b-4519-ba54-b49ac362874b', 'Sorvete Triplo', 'Três bolas de sorvete à escolha.', 'sorvetes/milkshake', 'b4460fae-46b0-45d9-a58e-c313895b1799', 15.00, 20.0, TRUE, TRUE),
('a1909875-c9c5-4e45-b3b9-9c4ac8e24642', 'Milkshake de Chocolate', 'Milkshake cremoso de chocolate.', 'sorvetes/sorvetetriplo', 'b4460fae-46b0-45d9-a58e-c313895b1799', 14.50, 10.0, TRUE, TRUE),

-- Bebidas
('119dc1a1-9c0e-43e0-8cfb-a4d97464b33a', 'Chá Gelado de Limão', 'Chá gelado refrescante sabor limão.', DEFAULT, 'afb1a4a3-00f1-454c-9aac-8b091e269a74', 7.50, NULL, TRUE, TRUE),
('34fc299d-9833-40c8-8b4f-7079f3d7e4fb', 'Suco Natural de Laranja', 'Suco natural feito na hora.', DEFAULT, 'afb1a4a3-00f1-454c-9aac-8b091e269a74', 8.50, NULL, TRUE, TRUE),
('aebeac60-5d2f-4b7d-9dfe-7a5e6364cfd8', 'Refrigerante Lata', 'Refrigerante gelado em lata.', DEFAULT, 'afb1a4a3-00f1-454c-9aac-8b091e269a74', 6.00, NULL, TRUE, TRUE),

-- Sobremesas
('76dfe17f-cfc7-4b4d-936f-6bbfa3c6c1e8', 'Brownie Deluxe', 'Brownie com sorvete de creme e calda quente.', DEFAULT, '18a6ad4f-9dca-4353-bc2e-dd43c0e31916', 18.00, 30.0, TRUE, TRUE),
('0c0e06fa-37c8-483b-80e7-a5f68929db8f', 'Cookie Gigante', 'Cookie grande com gotas de chocolate.', DEFAULT, '18a6ad4f-9dca-4353-bc2e-dd43c0e31916', 9.00, 25.0, TRUE, TRUE),
('8e257901-a2fd-4272-9c79-a785b9f4e4b5', 'Salada Veggie', 'Salada leve com mix de vegetais frescos.', DEFAULT, '18a6ad4f-9dca-4353-bc2e-dd43c0e31916', 16.00, NULL, TRUE, TRUE),

-- Pizzas
('24a70c89-1aef-4ab7-b49d-77f589cc419d', 'Pizza Mini Pepperoni', 'Mini pizza com pepperoni e queijo mussarela.', DEFAULT, '884f9d6b-8fd8-4ae0-bb25-c16f26186b9f', 17.90, NULL, TRUE, TRUE),

-- Hot Dog
('dcba36ac-ff19-4693-ba47-7afe26d091de', 'Hot Dog Especial', 'Cachorro-quente com molho da casa.', DEFAULT, '66c4c918-ac03-49ef-aba5-84a05ee16799', 11.00, NULL, TRUE, TRUE);


