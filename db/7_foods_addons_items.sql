DROP TABLE diner.foods_addons_items;
TRUNCATE diner.foods_addons_items;

CREATE TABLE diner.foods_addons_items (
    id_foods_addons_items UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    xid_foods_addons UUID REFERENCES diner.foods_addons(id_foods_addons) ON DELETE CASCADE NOT NULL,
    xid_food UUID NOT NULL REFERENCES diner.foods(id_food) ON DELETE CASCADE NOT NULL,
    xid_food_version UUID REFERENCES diner.foods_version(id_food_version) ON DELETE CASCADE NOT NULL,
    free BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO diner.foods_addons_items (xid_foods_addons, xid_food, xid_food_version) VALUES
('0128aa01-3634-478c-b651-c6bbd53854e0', '1dd09eeb-38f3-4394-99d4-6438cc16cc1d', null),
('0128aa01-3634-478c-b651-c6bbd53854e0', '29282015-dd36-4967-846f-b44218122c4f', '5b92449b-95c7-4c35-a05c-9593f610cd43'),
('0128aa01-3634-478c-b651-c6bbd53854e0', '421fa2b1-15fb-42ef-aa93-256cb24fe5ff', null),
('0128aa01-3634-478c-b651-c6bbd53854e0', '6b71a096-3905-4008-a8cd-1835353cbd70', null),
('0128aa01-3634-478c-b651-c6bbd53854e0', '31bfb9e8-2f66-4712-a90e-ffb0fdcae226', null),

('f1f793fa-f428-4bfc-b2c7-fec27d1f1991', '1dd09eeb-38f3-4394-99d4-6438cc16cc1d', null),
('f1f793fa-f428-4bfc-b2c7-fec27d1f1991', '29282015-dd36-4967-846f-b44218122c4f', '5b92449b-95c7-4c35-a05c-9593f610cd43'),
('f1f793fa-f428-4bfc-b2c7-fec27d1f1991', '421fa2b1-15fb-42ef-aa93-256cb24fe5ff', null),
('f1f793fa-f428-4bfc-b2c7-fec27d1f1991', '6b71a096-3905-4008-a8cd-1835353cbd70', null),
('f1f793fa-f428-4bfc-b2c7-fec27d1f1991', '31bfb9e8-2f66-4712-a90e-ffb0fdcae226', null),

('b5b14413-05c9-4a7a-aa97-3779fe8cc611', '1dd09eeb-38f3-4394-99d4-6438cc16cc1d', null),
('b5b14413-05c9-4a7a-aa97-3779fe8cc611', '29282015-dd36-4967-846f-b44218122c4f', '5b92449b-95c7-4c35-a05c-9593f610cd43'),
('b5b14413-05c9-4a7a-aa97-3779fe8cc611', '421fa2b1-15fb-42ef-aa93-256cb24fe5ff', null),
('b5b14413-05c9-4a7a-aa97-3779fe8cc611', '6b71a096-3905-4008-a8cd-1835353cbd70', null),
('b5b14413-05c9-4a7a-aa97-3779fe8cc611', '31bfb9e8-2f66-4712-a90e-ffb0fdcae226', null),

('f69219ae-8d43-4f4a-853f-ada0c04c4be2', '1dd09eeb-38f3-4394-99d4-6438cc16cc1d', null),
('f69219ae-8d43-4f4a-853f-ada0c04c4be2', '29282015-dd36-4967-846f-b44218122c4f', '5b92449b-95c7-4c35-a05c-9593f610cd43'),
('f69219ae-8d43-4f4a-853f-ada0c04c4be2', '421fa2b1-15fb-42ef-aa93-256cb24fe5ff', null),
('f69219ae-8d43-4f4a-853f-ada0c04c4be2', '6b71a096-3905-4008-a8cd-1835353cbd70', null),
('f69219ae-8d43-4f4a-853f-ada0c04c4be2', '31bfb9e8-2f66-4712-a90e-ffb0fdcae226', null),

('fa8195a4-4e15-45cd-9262-df1750bb1f1e', '1dd09eeb-38f3-4394-99d4-6438cc16cc1d', null),
('fa8195a4-4e15-45cd-9262-df1750bb1f1e', '29282015-dd36-4967-846f-b44218122c4f', '5b92449b-95c7-4c35-a05c-9593f610cd43'),
('fa8195a4-4e15-45cd-9262-df1750bb1f1e', '421fa2b1-15fb-42ef-aa93-256cb24fe5ff', null),
('fa8195a4-4e15-45cd-9262-df1750bb1f1e', '6b71a096-3905-4008-a8cd-1835353cbd70', null),
('fa8195a4-4e15-45cd-9262-df1750bb1f1e', '31bfb9e8-2f66-4712-a90e-ffb0fdcae226', null),

('765b5672-a133-4fb3-927b-256ba2107b27', '1dd09eeb-38f3-4394-99d4-6438cc16cc1d', null),
('765b5672-a133-4fb3-927b-256ba2107b27', '29282015-dd36-4967-846f-b44218122c4f', '5b92449b-95c7-4c35-a05c-9593f610cd43'),
('765b5672-a133-4fb3-927b-256ba2107b27', '421fa2b1-15fb-42ef-aa93-256cb24fe5ff', null),
('765b5672-a133-4fb3-927b-256ba2107b27', '6b71a096-3905-4008-a8cd-1835353cbd70', null),
('765b5672-a133-4fb3-927b-256ba2107b27', '31bfb9e8-2f66-4712-a90e-ffb0fdcae226', null),


-- Bebidas
('e1d6f465-5d2c-4117-84be-c02592c89557', '119dc1a1-9c0e-43e0-8cfb-a4d97464b33a', null),
('e1d6f465-5d2c-4117-84be-c02592c89557', '34fc299d-9833-40c8-8b4f-7079f3d7e4fb', null),
('e1d6f465-5d2c-4117-84be-c02592c89557', 'aebeac60-5d2f-4b7d-9dfe-7a5e6364cfd8', null),

('d20c7e30-b103-4bdc-9ee9-ea6fa01d689c', '119dc1a1-9c0e-43e0-8cfb-a4d97464b33a', null),
('d20c7e30-b103-4bdc-9ee9-ea6fa01d689c', '34fc299d-9833-40c8-8b4f-7079f3d7e4fb', null),
('d20c7e30-b103-4bdc-9ee9-ea6fa01d689c', 'aebeac60-5d2f-4b7d-9dfe-7a5e6364cfd8', null),

('42c6b808-0086-4880-a6bd-016e5dc60c3e', '119dc1a1-9c0e-43e0-8cfb-a4d97464b33a', null),
('42c6b808-0086-4880-a6bd-016e5dc60c3e', '34fc299d-9833-40c8-8b4f-7079f3d7e4fb', null),
('42c6b808-0086-4880-a6bd-016e5dc60c3e', 'aebeac60-5d2f-4b7d-9dfe-7a5e6364cfd8', null),

('3d12ca4c-3d3f-444e-94be-2fbeaed02b53', '119dc1a1-9c0e-43e0-8cfb-a4d97464b33a', null),
('3d12ca4c-3d3f-444e-94be-2fbeaed02b53', '34fc299d-9833-40c8-8b4f-7079f3d7e4fb', null),
('3d12ca4c-3d3f-444e-94be-2fbeaed02b53', 'aebeac60-5d2f-4b7d-9dfe-7a5e6364cfd8', null),

('59b44a20-aef7-4557-bf2a-90f061a058f8', '119dc1a1-9c0e-43e0-8cfb-a4d97464b33a', null),
('59b44a20-aef7-4557-bf2a-90f061a058f8', '34fc299d-9833-40c8-8b4f-7079f3d7e4fb', null),
('59b44a20-aef7-4557-bf2a-90f061a058f8', 'aebeac60-5d2f-4b7d-9dfe-7a5e6364cfd8', null),

('5d538052-19c5-46bd-89ca-e7297d72c3f3', '119dc1a1-9c0e-43e0-8cfb-a4d97464b33a', null),
('5d538052-19c5-46bd-89ca-e7297d72c3f3', '34fc299d-9833-40c8-8b4f-7079f3d7e4fb', null),
('5d538052-19c5-46bd-89ca-e7297d72c3f3', 'aebeac60-5d2f-4b7d-9dfe-7a5e6364cfd8', null),

('1052094b-4255-4065-b955-e22936562bb6', '76dfe17f-cfc7-4b4d-936f-6bbfa3c6c1e8', 'a51d507e-4279-493b-ae23-b5600a453939'),
('1052094b-4255-4065-b955-e22936562bb6', '0c0e06fa-37c8-483b-80e7-a5f68929db8f', '1aa5bdb2-955b-45db-b582-108b56b97736'),
('1052094b-4255-4065-b955-e22936562bb6', '8e257901-a2fd-4272-9c79-a785b9f4e4b5', '44779f21-6aeb-4996-8b58-d78d02a0b504'),

('88d853b5-f332-4878-a75b-4d67cf2ecc0f', '76dfe17f-cfc7-4b4d-936f-6bbfa3c6c1e8', 'a51d507e-4279-493b-ae23-b5600a453939'),
('88d853b5-f332-4878-a75b-4d67cf2ecc0f', '0c0e06fa-37c8-483b-80e7-a5f68929db8f', '1aa5bdb2-955b-45db-b582-108b56b97736'),
('88d853b5-f332-4878-a75b-4d67cf2ecc0f', '8e257901-a2fd-4272-9c79-a785b9f4e4b5', '44779f21-6aeb-4996-8b58-d78d02a0b504'),

('1e0e8a2a-1429-4885-b540-a5956de66354', '76dfe17f-cfc7-4b4d-936f-6bbfa3c6c1e8', 'a51d507e-4279-493b-ae23-b5600a453939'),
('1e0e8a2a-1429-4885-b540-a5956de66354', '0c0e06fa-37c8-483b-80e7-a5f68929db8f', '1aa5bdb2-955b-45db-b582-108b56b97736'),
('1e0e8a2a-1429-4885-b540-a5956de66354', '8e257901-a2fd-4272-9c79-a785b9f4e4b5', '44779f21-6aeb-4996-8b58-d78d02a0b504'),


('aa7f3a58-3d35-4251-b865-244c2e237804', '76dfe17f-cfc7-4b4d-936f-6bbfa3c6c1e8', 'a51d507e-4279-493b-ae23-b5600a453939'),
('aa7f3a58-3d35-4251-b865-244c2e237804', '0c0e06fa-37c8-483b-80e7-a5f68929db8f', '1aa5bdb2-955b-45db-b582-108b56b97736'),
('aa7f3a58-3d35-4251-b865-244c2e237804', '8e257901-a2fd-4272-9c79-a785b9f4e4b5', '44779f21-6aeb-4996-8b58-d78d02a0b504'),


('dad5f4d5-573f-44c6-90ce-15387ffc5850', '76dfe17f-cfc7-4b4d-936f-6bbfa3c6c1e8', 'a51d507e-4279-493b-ae23-b5600a453939'),
('dad5f4d5-573f-44c6-90ce-15387ffc5850', '0c0e06fa-37c8-483b-80e7-a5f68929db8f', '1aa5bdb2-955b-45db-b582-108b56b97736'),
('dad5f4d5-573f-44c6-90ce-15387ffc5850', '8e257901-a2fd-4272-9c79-a785b9f4e4b5', '44779f21-6aeb-4996-8b58-d78d02a0b504'),

('099f75ac-85d7-45c7-83a4-eb12803e7bcd', '76dfe17f-cfc7-4b4d-936f-6bbfa3c6c1e8', 'a51d507e-4279-493b-ae23-b5600a453939'),
('099f75ac-85d7-45c7-83a4-eb12803e7bcd', '0c0e06fa-37c8-483b-80e7-a5f68929db8f', '1aa5bdb2-955b-45db-b582-108b56b97736'),
('099f75ac-85d7-45c7-83a4-eb12803e7bcd', '8e257901-a2fd-4272-9c79-a785b9f4e4b5', '44779f21-6aeb-4996-8b58-d78d02a0b504');
