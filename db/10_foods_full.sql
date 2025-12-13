CREATE OR REPLACE VIEW diner.foods_full AS
SELECT
    f.id_food        AS id,
    f.name           AS name,
    f.description    AS description,
    f.img            AS img,
    f.xid_categorie  AS id_categorie,
    c.name           AS name_categorie,
    f.price          AS price,
    f.promotion      AS promotion,
    f.stock          AS stock,
    f.sale           AS sale,
    COALESCE(v.versions, '[]'::jsonb) AS versions,
    COALESCE(a.addons,   '[]'::jsonb) AS addons
FROM diner.foods f
JOIN diner.foods_categories c ON c.id_foods_categories = f.xid_categorie

-- versões da comida (ordenadas)
LEFT JOIN LATERAL (
    SELECT
        jsonb_agg(
            jsonb_build_object(
                'id',             fv.id_food_version,
                'id_food',        fv.xid_food,
                'id_categorie',   f.xid_categorie,
                'name_categorie', c.name,
                'name',           f.name || ' (' || fv.name || ')',
                'description',    fv.description,
                'img',            f.img,
                'price',          fv.price,
                'promotion',      fv.promotion,
                'stock',          fv.stock,
                'sale',           fv.sale
            )
            ORDER BY fv.price, fv.name
        ) AS versions
    FROM diner.foods_version fv
    WHERE fv.xid_food = f.id_food
) v ON TRUE

-- addons por categoria (ordenados) [AGORA USANDO foods_addons_items2]
LEFT JOIN LATERAL (
    SELECT
        jsonb_agg(
            jsonb_build_object(
                'category_id',   catlist.id_foods_categories,
                'category_name', catlist.name,
                'items',
                    (
                        SELECT COALESCE(
                            jsonb_agg(
                                jsonb_build_object(
                                    'id',              fai2.id_foods_addons_items,
                                    'id_food',         fai2.xid_food,
                                    'id_food_version', fai2.xid_food_version,
                                    'free',            fai2.free
                                )
                                ORDER BY fc2.name NULLS LAST
                            ),
                            '[]'::jsonb
                        )
                        FROM diner.foods_addons_items2 fai2
                        LEFT JOIN diner.foods fc2 ON fc2.id_food = fai2.xid_food
                        LEFT JOIN diner.foods_version fvv2 ON fvv2.id_food_version = fai2.xid_food_version
                        WHERE fai2.xid_food_base = f.id_food
                          AND fc2.xid_categorie = catlist.id_foods_categories
                    )
            )
            ORDER BY catlist.name
        ) AS addons
    FROM (
        SELECT DISTINCT
            cat.id_foods_categories,
            cat.name
        FROM diner.foods_addons_items2 fai
        JOIN diner.foods fc ON fc.id_food = fai.xid_food
        JOIN diner.foods_categories cat ON cat.id_foods_categories = fc.xid_categorie
        WHERE fai.xid_food_base = f.id_food
    ) AS catlist
) a ON TRUE

ORDER BY
    f.price,
    f.name;
