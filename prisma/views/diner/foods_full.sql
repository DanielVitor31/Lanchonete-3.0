SELECT
  f.id_food,
  f.name,
  f.description,
  f.img,
  f.xid_categorie,
  f.price,
  f.promotion,
  f.stock,
  f.sale,
  COALESCE(v.versions, '[]' :: jsonb) AS versions,
  COALESCE(a.addons, '[]' :: jsonb) AS addons
FROM
  (
    (
      diner.foods f
      LEFT JOIN LATERAL (
        SELECT
          jsonb_agg(
            DISTINCT jsonb_build_object(
              'id',
              fv.id_food_version,
              'id_food',
              fv.xid_food,
              'id_categorie',
              f.xid_categorie,
              'name',
              (
                ((f.name) :: text || ' - ' :: text) || (fv.name) :: text
              ),
              'description',
              fv.description,
              'img',
              f.img,
              'price',
              fv.price,
              'promotion',
              fv.promotion,
              'stock',
              fv.stock,
              'sale',
              fv.sale
            )
          ) AS versions
        FROM
          diner.foods_version fv
        WHERE
          (fv.xid_food = f.id_food)
      ) v ON (TRUE)
    )
    LEFT JOIN LATERAL (
      SELECT
        jsonb_agg(
          DISTINCT jsonb_build_object(
            'category_id',
            cat.id_foods_categories,
            'category_name',
            cat.name,
            'items',
            (
              SELECT
                COALESCE(
                  jsonb_agg(
                    DISTINCT jsonb_build_object(
                      'id',
                      fa2.id_foods_addons,
                      'id_food',
                      fc.id_food,
                      'id_food_version',
                      fvv.id_food_version,
                      'free',
                      fai2.free
                    )
                  ),
                  '[]' :: jsonb
                ) AS "coalesce"
              FROM
                (
                  (
                    (
                      diner.foods_addons fa2
                      JOIN diner.foods_addons_items fai2 ON ((fai2.xid_foods_addons = fa2.id_foods_addons))
                    )
                    LEFT JOIN diner.foods fc ON ((fc.id_food = fai2.xid_food))
                  )
                  LEFT JOIN diner.foods_version fvv ON ((fvv.id_food_version = fai2.xid_food_version))
                )
              WHERE
                (
                  (fa2.xid_food = f.id_food)
                  AND (
                    fa2.xid_foods_categories = cat.id_foods_categories
                  )
                )
            )
          )
        ) AS addons
      FROM
        (
          diner.foods_addons fa
          JOIN diner.foods_categories cat ON (
            (
              cat.id_foods_categories = fa.xid_foods_categories
            )
          )
        )
      WHERE
        (fa.xid_food = f.id_food)
    ) a ON (TRUE)
  );