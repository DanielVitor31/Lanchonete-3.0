CREATE OR REPLACE VIEW diner.foods_full AS
SELECT
    f.id_food        AS id_food,
    f.name           AS name,
    f.description    AS description,
    f.img            AS img,
    f.xid_categorie  AS id_categorie,
    c.name           AS name_categorie,
    f.price          AS price,
    f.promotion      AS promotion,
    f.stock          AS stock,
    f.sale           AS sale,

    COALESCE(v.versions, '[]'::jsonb)                 AS versions,
    COALESCE(a.addons,   '[]'::jsonb)                 AS addons,
    COALESCE(x.extra_ingredients, '[]'::jsonb)        AS extra_ingredients

FROM diner.foods f
JOIN diner.foods_categories c ON c.id_foods_categories = f.xid_categorie

/* versões da comida (ordenadas) */
LEFT JOIN LATERAL (
    SELECT
        COALESCE(
            jsonb_agg(
                jsonb_build_object(
                    'id_version',     fv.id_food_version,
                    'id_food',        fv.xid_food,
                    'id_categorie',   f.xid_categorie,
                    'name_categorie', c.name,
                    'name',           f.name,
                    'name_version',   fv.name,
                    'description',    fv.description,
                    'img',            f.img,
                    'price',          fv.price,
                    'promotion',      fv.promotion,
                    'stock',          fv.stock,
                    'sale',           fv.sale
                )
                ORDER BY fv.price, fv.name
            ),
            '[]'::jsonb
        ) AS versions
    FROM diner.foods_version fv
    WHERE fv.xid_food = f.id_food
) v ON TRUE

/* addons por categoria  */
LEFT JOIN LATERAL (
    WITH catlist AS (
        SELECT DISTINCT
            cat.id_foods_categories,
            cat.name,
            cat.position_addons
        FROM diner.foods_addons fa
        JOIN diner.foods fc ON fc.id_food = fa.xid_food
        JOIN diner.foods_categories cat ON cat.id_foods_categories = fc.xid_categorie
        WHERE fa.xid_food_base = f.id_food
    ),
    items_by_cat AS (
        SELECT
            fc2.xid_categorie                         AS category_id,
            COALESCE(
                jsonb_agg(
                    jsonb_build_object(
                        'id',              fai2.id_foods_addon,
                        'id_food',         fai2.xid_food,
                        'id_food_version', fai2.xid_food_version,
                        'free',            fai2.free
                    )
                    ORDER BY fc2.name NULLS LAST
                ),
                '[]'::jsonb
            ) AS items
        FROM diner.foods_addons fai2
        JOIN diner.foods fc2 ON fc2.id_food = fai2.xid_food
        WHERE fai2.xid_food_base = f.id_food
        GROUP BY fc2.xid_categorie
    )
    SELECT
        COALESCE(
            jsonb_agg(
                jsonb_build_object(
                    'category_id',   cl.id_foods_categories,
                    'category_name', cl.name,
                    'items',         COALESCE(ibc.items, '[]'::jsonb)
                )
                ORDER BY cl.position_addons
            ),
            '[]'::jsonb
        ) AS addons
    FROM catlist cl
    LEFT JOIN items_by_cat ibc ON ibc.category_id = cl.id_foods_categories
) a ON TRUE

/* extra_ingredients por comida */
LEFT JOIN LATERAL (
    SELECT
        COALESCE(
            jsonb_agg(
                jsonb_build_object(
                    'id_foods_extra_ingredients', fei.id_foods_extra_ingredients,

                    'id_extra_ingredient', ei.id_extra_ingredient,
                    'name',               ei.name,
                    'description',        ei.description,
                    'img',                ei.img,
                    'price',              ei.price,
                    'promotion',          ei.promotion,
                    'qty_max',            ei.qty_max,
                    'qty_chosen',         0,
                    'stock',              ei.stock,
                    'sale',               ei.sale,
                    'created_at',         ei.created_at
                )
                ORDER BY ei.price, ei.name
            ),
            '[]'::jsonb
        ) AS extra_ingredients
    FROM diner.foods_extra_ingredients fei
    JOIN diner.extra_ingredients ei ON ei.id_extra_ingredient = fei.xid_extra_ingredient
    WHERE fei.xid_food = f.id_food
) x ON TRUE;
