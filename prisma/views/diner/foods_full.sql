SELECT
  f.id_food AS id,
  f.name,
  f.description,
  f.img,
  f.xid_categorie AS id_categorie,
  c.name AS name_categorie,
  f.price,
  f.promotion,
  f.stock,
  f.sale,
  COALESCE(v.versions, '[]' :: jsonb) AS versions,
  COALESCE(a.addons, '[]' :: jsonb) AS addons
FROM
  (
    (
      (
        diner.foods f
        JOIN diner.foods_categories c ON ((c.id_foods_categories = f.xid_categorie))
      )
      LEFT JOIN LATERAL (
        SELECT
          jsonb_agg(
            jsonb_build_object(
              'id',
              fv.id_food_version,
              'id_food',
              fv.xid_food,
              'id_categorie',
              f.xid_categorie,
              'name_categorie',
              c.name,
              'name',
              (
                (
                  ((f.name) :: text || ' (' :: text) || (fv.name) :: text
                ) || ')' :: text
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
            ORDER BY
              fv.price,
              fv.name
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
          jsonb_build_object(
            'category_id',
            cat.id_foods_categories,
            'category_name',
            cat.name,
            'items',
            (
              SELECT
                COALESCE(
                  jsonb_agg(
                    jsonb_build_object(
                      'id',
                      fa2.id_foods_addons,
                      'id_food',
                      fai2.xid_food,
                      'id_food_version',
                      fai2.xid_food_version,
                      'free',
                      fai2.free
                    )
                    ORDER BY
                      fc.name
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
          ORDER BY
            cat.name
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
  )
ORDER BY
  f.price,
  f.name;