import { pool } from './db';
import { sql } from 'slonik';

export async function listShampoos() {
  const rows = await pool.many(sql`
    select
        shampoos.id as  shampoo_id,
        shampoos.name as shampoo_name,
        brands.id as brand_id,
        brands.name as brand_name, 
        ingredients.id as ingredient_id,
        ingredients.name as ingredient_name
    from
        shampoos
    join brands on
        brands.id = shampoos.brand_id
    join shampoos_to_ingredients on
        shampoos_to_ingredients.shampoo_id = shampoos.id
    join ingredients on
        ingredients.id = shampoos_to_ingredients.ingredient_id;
      `);

  const shampoosById = rows.reduce((acc, row) => {
    const {
      shampoo_id,
      shampoo_name,
      brand_id,
      brand_name,
      ingredient_id,
      ingredient_name,
    } = row;

    if (!acc[shampoo_id]) {
      acc[shampoo_id] = {
        id: shampoo_id,
        name: shampoo_name,
        brand: {
          id: brand_id,
          name: brand_name,
        },
        ingredients: [],
      };
    }

    acc[shampoo_id].ingredients.push({
      id: ingredient_id,
      name: ingredient_name,
    });
    console.log(acc);

    return acc;
  }, {});

  return Object.values(shampoosById);
}
