CREATE TABLE diner.foods_addons (
    id_foods_addons UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    xid_food UUID REFERENCES diner.foods(id_food) ON DELETE CASCADE NOT NULL,
    xid_foods_categories UUID REFERENCES diner.foods_categories(id_foods_categories) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (xid_food, xid_foods_categories)
);

INSERT INTO diner.foods_addons (id_foods_addons, xid_food, xid_foods_categories) VALUES
--Burger Classic
('1052094b-4255-4065-b955-e22936562bb6','abbfa861-2b5d-455d-b904-f441487f5091','18a6ad4f-9dca-4353-bc2e-dd43c0e31916'), -- Sobremesa
('765b5672-a133-4fb3-927b-256ba2107b27','abbfa861-2b5d-455d-b904-f441487f5091','789bea65-c6b1-4c25-ad74-f7fe485dae99'), -- porções
('e1d6f465-5d2c-4117-84be-c02592c89557','abbfa861-2b5d-455d-b904-f441487f5091','afb1a4a3-00f1-454c-9aac-8b091e269a74'), -- bebidas

--Burger Duplo Supreme
('88d853b5-f332-4878-a75b-4d67cf2ecc0f','2162a6aa-d5cc-463d-98e5-8a6b7b579359','18a6ad4f-9dca-4353-bc2e-dd43c0e31916'), -- Sobremesa
('fa8195a4-4e15-45cd-9262-df1750bb1f1e','2162a6aa-d5cc-463d-98e5-8a6b7b579359','789bea65-c6b1-4c25-ad74-f7fe485dae99'), -- porções
('d20c7e30-b103-4bdc-9ee9-ea6fa01d689c','2162a6aa-d5cc-463d-98e5-8a6b7b579359','afb1a4a3-00f1-454c-9aac-8b091e269a74'), -- bebidas


--Sanduíche de Frango Crocante
('1e0e8a2a-1429-4885-b540-a5956de66354','e9a827a8-a6ef-4916-8b83-4168720a0327','18a6ad4f-9dca-4353-bc2e-dd43c0e31916'), -- Sobremesa
('f69219ae-8d43-4f4a-853f-ada0c04c4be2','e9a827a8-a6ef-4916-8b83-4168720a0327','789bea65-c6b1-4c25-ad74-f7fe485dae99'), -- porções
('42c6b808-0086-4880-a6bd-016e5dc60c3e','e9a827a8-a6ef-4916-8b83-4168720a0327','afb1a4a3-00f1-454c-9aac-8b091e269a74'), -- bebidas

--Wrap de Frango
('aa7f3a58-3d35-4251-b865-244c2e237804','102ebd48-d62e-47b2-8a7e-92eabdea0a1d','18a6ad4f-9dca-4353-bc2e-dd43c0e31916'), -- Sobremesa
('b5b14413-05c9-4a7a-aa97-3779fe8cc611','102ebd48-d62e-47b2-8a7e-92eabdea0a1d','789bea65-c6b1-4c25-ad74-f7fe485dae99'), -- porções
('3d12ca4c-3d3f-444e-94be-2fbeaed02b53','102ebd48-d62e-47b2-8a7e-92eabdea0a1d','afb1a4a3-00f1-454c-9aac-8b091e269a74'), -- bebidas

--Cheddar Melt Smash
('dad5f4d5-573f-44c6-90ce-15387ffc5850','174ba785-a68d-47e6-a89f-a5986d1bef5d','18a6ad4f-9dca-4353-bc2e-dd43c0e31916'), -- Sobremesa
('f1f793fa-f428-4bfc-b2c7-fec27d1f1991','174ba785-a68d-47e6-a89f-a5986d1bef5d','789bea65-c6b1-4c25-ad74-f7fe485dae99'), -- porções
('59b44a20-aef7-4557-bf2a-90f061a058f8','174ba785-a68d-47e6-a89f-a5986d1bef5d','afb1a4a3-00f1-454c-9aac-8b091e269a74'), -- bebidas

--Crispy Bacon Ranch
('099f75ac-85d7-45c7-83a4-eb12803e7bcd','6357d744-1ced-40bb-83fd-1ed66af04226','18a6ad4f-9dca-4353-bc2e-dd43c0e31916'), -- Sobremesa
('0128aa01-3634-478c-b651-c6bbd53854e0','6357d744-1ced-40bb-83fd-1ed66af04226','789bea65-c6b1-4c25-ad74-f7fe485dae99'), -- porções
('5d538052-19c5-46bd-89ca-e7297d72c3f3','6357d744-1ced-40bb-83fd-1ed66af04226','afb1a4a3-00f1-454c-9aac-8b091e269a74'); -- bebidas