CREATE TABLE diner.foods_addons (
    id_foods_addons UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    xid_food_base UUID NOT NULL REFERENCES diner.foods(id_food) ON DELETE CASCADE NOT NULL,
    xid_food UUID NOT NULL REFERENCES diner.foods(id_food) ON DELETE CASCADE NOT NULL,
    xid_food_version UUID REFERENCES diner.foods_version(id_food_version) ON DELETE CASCADE,
    free BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO diner.foods_addons (xid_food_base, xid_food, xid_food_version, free) VALUES

-- Molhos Wrap de Frango
('102ebd48-d62e-47b2-8a7e-92eabdea0a1d', '55c20be6-a8b7-4e3f-8129-ba6238dbd1ea', null, false),
('102ebd48-d62e-47b2-8a7e-92eabdea0a1d', '147a2301-4baa-4cc1-810f-186d1ff19ef1', null, false),
('102ebd48-d62e-47b2-8a7e-92eabdea0a1d', 'a956f62e-e0ec-4e94-a71c-48dce5ecdb23', null, true),
('102ebd48-d62e-47b2-8a7e-92eabdea0a1d', '9cadee5e-5489-4724-92e4-f82721a4a865', null, false),
('102ebd48-d62e-47b2-8a7e-92eabdea0a1d', '50d88775-5c3c-4e06-affc-eb05691ecdbe', null, true),


--Bebidas Wrap de Frango
('102ebd48-d62e-47b2-8a7e-92eabdea0a1d', '4208b7cb-1148-4e27-8a60-8f99c40454b0', null, false),
('102ebd48-d62e-47b2-8a7e-92eabdea0a1d', '62b57b28-9acd-474e-91fa-fbe8a498402c', null, false),
('102ebd48-d62e-47b2-8a7e-92eabdea0a1d', '119dc1a1-9c0e-43e0-8cfb-a4d97464b33a', '96e61241-134a-4a2a-9e8b-8298bf1244a9', true),
('102ebd48-d62e-47b2-8a7e-92eabdea0a1d', 'aebeac60-5d2f-4b7d-9dfe-7a5e6364cfd8', null, false),
('102ebd48-d62e-47b2-8a7e-92eabdea0a1d', '2a3ee679-c333-4f67-8479-917d164bc9e7', null, false),


--Porcões Wrap de Frango
('102ebd48-d62e-47b2-8a7e-92eabdea0a1d', '29282015-dd36-4967-846f-b44218122c4f', '5b92449b-95c7-4c35-a05c-9593f610cd43', false),
('102ebd48-d62e-47b2-8a7e-92eabdea0a1d', '1dd09eeb-38f3-4394-99d4-6438cc16cc1d', null, false),
('102ebd48-d62e-47b2-8a7e-92eabdea0a1d', '31bfb9e8-2f66-4712-a90e-ffb0fdcae226', '4c937479-8d5b-4f32-9bc6-f803ac0e3c90', true),
('102ebd48-d62e-47b2-8a7e-92eabdea0a1d', '8e257901-a2fd-4272-9c79-a785b9f4e4b5', 'b24e187c-b510-4611-974a-5b6d0d26de4c', false),
('102ebd48-d62e-47b2-8a7e-92eabdea0a1d', '6b71a096-3905-4008-a8cd-1835353cbd70', '44188ef2-941b-4851-91ff-ee4a95407db4', false),
('102ebd48-d62e-47b2-8a7e-92eabdea0a1d', '421fa2b1-15fb-42ef-aa93-256cb24fe5ff', null, false),

-- Molhos X-salada
('abbfa861-2b5d-455d-b904-f441487f5091', '55c20be6-a8b7-4e3f-8129-ba6238dbd1ea', null, false),
('abbfa861-2b5d-455d-b904-f441487f5091', '147a2301-4baa-4cc1-810f-186d1ff19ef1', null, false),
('abbfa861-2b5d-455d-b904-f441487f5091', 'a956f62e-e0ec-4e94-a71c-48dce5ecdb23', null, true),
('abbfa861-2b5d-455d-b904-f441487f5091', '9cadee5e-5489-4724-92e4-f82721a4a865', null, false),
('abbfa861-2b5d-455d-b904-f441487f5091', '50d88775-5c3c-4e06-affc-eb05691ecdbe', null, true),


--Bebidas X-salada
('abbfa861-2b5d-455d-b904-f441487f5091', '4208b7cb-1148-4e27-8a60-8f99c40454b0', null, false),
('abbfa861-2b5d-455d-b904-f441487f5091', '62b57b28-9acd-474e-91fa-fbe8a498402c', null, false),
('abbfa861-2b5d-455d-b904-f441487f5091', '119dc1a1-9c0e-43e0-8cfb-a4d97464b33a', '96e61241-134a-4a2a-9e8b-8298bf1244a9', true),
('abbfa861-2b5d-455d-b904-f441487f5091', 'aebeac60-5d2f-4b7d-9dfe-7a5e6364cfd8', null, false),
('abbfa861-2b5d-455d-b904-f441487f5091', '2a3ee679-c333-4f67-8479-917d164bc9e7', null, false),


--Porcões X-salada
('abbfa861-2b5d-455d-b904-f441487f5091', '29282015-dd36-4967-846f-b44218122c4f', '5b92449b-95c7-4c35-a05c-9593f610cd43', false),
('abbfa861-2b5d-455d-b904-f441487f5091', '1dd09eeb-38f3-4394-99d4-6438cc16cc1d', null, false),
('abbfa861-2b5d-455d-b904-f441487f5091', '31bfb9e8-2f66-4712-a90e-ffb0fdcae226', '4c937479-8d5b-4f32-9bc6-f803ac0e3c90', true),
('abbfa861-2b5d-455d-b904-f441487f5091', '8e257901-a2fd-4272-9c79-a785b9f4e4b5', 'b24e187c-b510-4611-974a-5b6d0d26de4c', false),
('abbfa861-2b5d-455d-b904-f441487f5091', '6b71a096-3905-4008-a8cd-1835353cbd70', '44188ef2-941b-4851-91ff-ee4a95407db4', false),
('abbfa861-2b5d-455d-b904-f441487f5091', '421fa2b1-15fb-42ef-aa93-256cb24fe5ff', null, false),


-- Molhos X-Frango Crocante
('e9a827a8-a6ef-4916-8b83-4168720a0327', '55c20be6-a8b7-4e3f-8129-ba6238dbd1ea', null, false),
('e9a827a8-a6ef-4916-8b83-4168720a0327', '147a2301-4baa-4cc1-810f-186d1ff19ef1', null, false),
('e9a827a8-a6ef-4916-8b83-4168720a0327', 'a956f62e-e0ec-4e94-a71c-48dce5ecdb23', null, true),
('e9a827a8-a6ef-4916-8b83-4168720a0327', '9cadee5e-5489-4724-92e4-f82721a4a865', null, false),
('e9a827a8-a6ef-4916-8b83-4168720a0327', '50d88775-5c3c-4e06-affc-eb05691ecdbe', null, true),


--Bebidas X-Frango Crocante
('e9a827a8-a6ef-4916-8b83-4168720a0327', '4208b7cb-1148-4e27-8a60-8f99c40454b0', null, false),
('e9a827a8-a6ef-4916-8b83-4168720a0327', '62b57b28-9acd-474e-91fa-fbe8a498402c', null, false),
('e9a827a8-a6ef-4916-8b83-4168720a0327', '119dc1a1-9c0e-43e0-8cfb-a4d97464b33a', '96e61241-134a-4a2a-9e8b-8298bf1244a9', true),
('e9a827a8-a6ef-4916-8b83-4168720a0327', 'aebeac60-5d2f-4b7d-9dfe-7a5e6364cfd8', null, false),
('e9a827a8-a6ef-4916-8b83-4168720a0327', '2a3ee679-c333-4f67-8479-917d164bc9e7', null, false),


--Porcões X-Frango Crocante
('e9a827a8-a6ef-4916-8b83-4168720a0327', '29282015-dd36-4967-846f-b44218122c4f', '5b92449b-95c7-4c35-a05c-9593f610cd43', false),
('e9a827a8-a6ef-4916-8b83-4168720a0327', '1dd09eeb-38f3-4394-99d4-6438cc16cc1d', null, false),
('e9a827a8-a6ef-4916-8b83-4168720a0327', '31bfb9e8-2f66-4712-a90e-ffb0fdcae226', '4c937479-8d5b-4f32-9bc6-f803ac0e3c90', true),
('e9a827a8-a6ef-4916-8b83-4168720a0327', '8e257901-a2fd-4272-9c79-a785b9f4e4b5', 'b24e187c-b510-4611-974a-5b6d0d26de4c', false),
('e9a827a8-a6ef-4916-8b83-4168720a0327', '6b71a096-3905-4008-a8cd-1835353cbd70', '44188ef2-941b-4851-91ff-ee4a95407db4', false),
('e9a827a8-a6ef-4916-8b83-4168720a0327', '421fa2b1-15fb-42ef-aa93-256cb24fe5ff', null, false),

-- Molhos X-Cheddar
('174ba785-a68d-47e6-a89f-a5986d1bef5d', '55c20be6-a8b7-4e3f-8129-ba6238dbd1ea', null, false),
('174ba785-a68d-47e6-a89f-a5986d1bef5d', '147a2301-4baa-4cc1-810f-186d1ff19ef1', null, false),
('174ba785-a68d-47e6-a89f-a5986d1bef5d', 'a956f62e-e0ec-4e94-a71c-48dce5ecdb23', null, true),
('174ba785-a68d-47e6-a89f-a5986d1bef5d', '9cadee5e-5489-4724-92e4-f82721a4a865', null, false),
('174ba785-a68d-47e6-a89f-a5986d1bef5d', '50d88775-5c3c-4e06-affc-eb05691ecdbe', null, true),


--Bebidas X-Cheddar
('174ba785-a68d-47e6-a89f-a5986d1bef5d', '4208b7cb-1148-4e27-8a60-8f99c40454b0', null, false),
('174ba785-a68d-47e6-a89f-a5986d1bef5d', '62b57b28-9acd-474e-91fa-fbe8a498402c', null, false),
('174ba785-a68d-47e6-a89f-a5986d1bef5d', '119dc1a1-9c0e-43e0-8cfb-a4d97464b33a', '96e61241-134a-4a2a-9e8b-8298bf1244a9', true),
('174ba785-a68d-47e6-a89f-a5986d1bef5d', 'aebeac60-5d2f-4b7d-9dfe-7a5e6364cfd8', null, false),
('174ba785-a68d-47e6-a89f-a5986d1bef5d', '2a3ee679-c333-4f67-8479-917d164bc9e7', null, false),


--Porcões X-Cheddar
('174ba785-a68d-47e6-a89f-a5986d1bef5d', '29282015-dd36-4967-846f-b44218122c4f', '5b92449b-95c7-4c35-a05c-9593f610cd43', false),
('174ba785-a68d-47e6-a89f-a5986d1bef5d', '1dd09eeb-38f3-4394-99d4-6438cc16cc1d', null, false),
('174ba785-a68d-47e6-a89f-a5986d1bef5d', '31bfb9e8-2f66-4712-a90e-ffb0fdcae226', '4c937479-8d5b-4f32-9bc6-f803ac0e3c90', true),
('174ba785-a68d-47e6-a89f-a5986d1bef5d', '8e257901-a2fd-4272-9c79-a785b9f4e4b5', 'b24e187c-b510-4611-974a-5b6d0d26de4c', false),
('174ba785-a68d-47e6-a89f-a5986d1bef5d', '6b71a096-3905-4008-a8cd-1835353cbd70', '44188ef2-941b-4851-91ff-ee4a95407db4', false),
('174ba785-a68d-47e6-a89f-a5986d1bef5d', '421fa2b1-15fb-42ef-aa93-256cb24fe5ff', null, false),

-- Molhos X-Bacon
('6357d744-1ced-40bb-83fd-1ed66af04226', '55c20be6-a8b7-4e3f-8129-ba6238dbd1ea', null, false),
('6357d744-1ced-40bb-83fd-1ed66af04226', '147a2301-4baa-4cc1-810f-186d1ff19ef1', null, false),
('6357d744-1ced-40bb-83fd-1ed66af04226', 'a956f62e-e0ec-4e94-a71c-48dce5ecdb23', null, true),
('6357d744-1ced-40bb-83fd-1ed66af04226', '9cadee5e-5489-4724-92e4-f82721a4a865', null, false),
('6357d744-1ced-40bb-83fd-1ed66af04226', '50d88775-5c3c-4e06-affc-eb05691ecdbe', null, true),


--Bebidas X-Bacon
('6357d744-1ced-40bb-83fd-1ed66af04226', '4208b7cb-1148-4e27-8a60-8f99c40454b0', null, false),
('6357d744-1ced-40bb-83fd-1ed66af04226', '62b57b28-9acd-474e-91fa-fbe8a498402c', null, false),
('6357d744-1ced-40bb-83fd-1ed66af04226', '119dc1a1-9c0e-43e0-8cfb-a4d97464b33a', '96e61241-134a-4a2a-9e8b-8298bf1244a9', true),
('6357d744-1ced-40bb-83fd-1ed66af04226', 'aebeac60-5d2f-4b7d-9dfe-7a5e6364cfd8', null, false),
('6357d744-1ced-40bb-83fd-1ed66af04226', '2a3ee679-c333-4f67-8479-917d164bc9e7', null, false),


--Porcões X-Bacon
('6357d744-1ced-40bb-83fd-1ed66af04226', '29282015-dd36-4967-846f-b44218122c4f', '5b92449b-95c7-4c35-a05c-9593f610cd43', false),
('6357d744-1ced-40bb-83fd-1ed66af04226', '1dd09eeb-38f3-4394-99d4-6438cc16cc1d', null, false),
('6357d744-1ced-40bb-83fd-1ed66af04226', '31bfb9e8-2f66-4712-a90e-ffb0fdcae226', '4c937479-8d5b-4f32-9bc6-f803ac0e3c90', true),
('6357d744-1ced-40bb-83fd-1ed66af04226', '8e257901-a2fd-4272-9c79-a785b9f4e4b5', 'b24e187c-b510-4611-974a-5b6d0d26de4c', false),
('6357d744-1ced-40bb-83fd-1ed66af04226', '6b71a096-3905-4008-a8cd-1835353cbd70', '44188ef2-941b-4851-91ff-ee4a95407db4', false),
('6357d744-1ced-40bb-83fd-1ed66af04226', '421fa2b1-15fb-42ef-aa93-256cb24fe5ff', null, false),


-- Molhos Onion Rings
('6b71a096-3905-4008-a8cd-1835353cbd70', '55c20be6-a8b7-4e3f-8129-ba6238dbd1ea', null, false),
('6b71a096-3905-4008-a8cd-1835353cbd70', '147a2301-4baa-4cc1-810f-186d1ff19ef1', null, false),
('6b71a096-3905-4008-a8cd-1835353cbd70', 'a956f62e-e0ec-4e94-a71c-48dce5ecdb23', null, true),
('6b71a096-3905-4008-a8cd-1835353cbd70', '9cadee5e-5489-4724-92e4-f82721a4a865', null, false),
('6b71a096-3905-4008-a8cd-1835353cbd70', '50d88775-5c3c-4e06-affc-eb05691ecdbe', null, true),


-- Molhos Batata Frita
('29282015-dd36-4967-846f-b44218122c4f', '55c20be6-a8b7-4e3f-8129-ba6238dbd1ea', null, false),
('29282015-dd36-4967-846f-b44218122c4f', '147a2301-4baa-4cc1-810f-186d1ff19ef1', null, false),
('29282015-dd36-4967-846f-b44218122c4f', 'a956f62e-e0ec-4e94-a71c-48dce5ecdb23', null, true),
('29282015-dd36-4967-846f-b44218122c4f', '9cadee5e-5489-4724-92e4-f82721a4a865', null, false),
('29282015-dd36-4967-846f-b44218122c4f', '50d88775-5c3c-4e06-affc-eb05691ecdbe', null, true),


-- Molhos Salada Veggie
('8e257901-a2fd-4272-9c79-a785b9f4e4b5', '55c20be6-a8b7-4e3f-8129-ba6238dbd1ea', null, false),
('8e257901-a2fd-4272-9c79-a785b9f4e4b5', '147a2301-4baa-4cc1-810f-186d1ff19ef1', null, false),
('8e257901-a2fd-4272-9c79-a785b9f4e4b5', 'a956f62e-e0ec-4e94-a71c-48dce5ecdb23', null, true),
('8e257901-a2fd-4272-9c79-a785b9f4e4b5', '9cadee5e-5489-4724-92e4-f82721a4a865', null, false),
('8e257901-a2fd-4272-9c79-a785b9f4e4b5', '50d88775-5c3c-4e06-affc-eb05691ecdbe', null, true),


-- Molhos Torresmo Crocante
('31bfb9e8-2f66-4712-a90e-ffb0fdcae226', '55c20be6-a8b7-4e3f-8129-ba6238dbd1ea', null, false),
('31bfb9e8-2f66-4712-a90e-ffb0fdcae226', '147a2301-4baa-4cc1-810f-186d1ff19ef1', null, false),
('31bfb9e8-2f66-4712-a90e-ffb0fdcae226', 'a956f62e-e0ec-4e94-a71c-48dce5ecdb23', null, true),
('31bfb9e8-2f66-4712-a90e-ffb0fdcae226', '9cadee5e-5489-4724-92e4-f82721a4a865', null, false),
('31bfb9e8-2f66-4712-a90e-ffb0fdcae226', '50d88775-5c3c-4e06-affc-eb05691ecdbe', null, true),


-- Molhos Frango Frito Crocante
('1dd09eeb-38f3-4394-99d4-6438cc16cc1d', '55c20be6-a8b7-4e3f-8129-ba6238dbd1ea', null, false),
('1dd09eeb-38f3-4394-99d4-6438cc16cc1d', '147a2301-4baa-4cc1-810f-186d1ff19ef1', null, false),
('1dd09eeb-38f3-4394-99d4-6438cc16cc1d', 'a956f62e-e0ec-4e94-a71c-48dce5ecdb23', null, true),
('1dd09eeb-38f3-4394-99d4-6438cc16cc1d', '9cadee5e-5489-4724-92e4-f82721a4a865', null, false),
('1dd09eeb-38f3-4394-99d4-6438cc16cc1d', '50d88775-5c3c-4e06-affc-eb05691ecdbe', null, true),


-- Molhos Frango Porção de Mariscos
('421fa2b1-15fb-42ef-aa93-256cb24fe5ff', '55c20be6-a8b7-4e3f-8129-ba6238dbd1ea', null, false),
('421fa2b1-15fb-42ef-aa93-256cb24fe5ff', '147a2301-4baa-4cc1-810f-186d1ff19ef1', null, false),
('421fa2b1-15fb-42ef-aa93-256cb24fe5ff', 'a956f62e-e0ec-4e94-a71c-48dce5ecdb23', null, true),
('421fa2b1-15fb-42ef-aa93-256cb24fe5ff', '9cadee5e-5489-4724-92e4-f82721a4a865', null, false),
('421fa2b1-15fb-42ef-aa93-256cb24fe5ff', '50d88775-5c3c-4e06-affc-eb05691ecdbe', null, true);





