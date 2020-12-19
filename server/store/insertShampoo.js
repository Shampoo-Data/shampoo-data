const pool = require('./pool');
const { sql } = require('slonik');

async function insertShampoo(shampooInput) {
  const { brandName, shampooName, ingredientsList } = shampooInput;

  if (!brandName || !shampooName || !ingredientsList) {
    throw new Error(
      `missing one of required properties brandName, shampooName, ingredientsList`
    );
  }

  const brand = await upsertBrandName(brandName);
  const shampoo = await upsertShampoo({ name: shampooName, brandId: brand.id });
  const ingredients = await upsertIngredients(
    ingredientsList.split(',').map((s) => s.trim())
  );
  await upsertShampooToIngredients(
    ingredients.map(({ id }) => ({ shampoo_id: shampoo.id, ingredient_id: id }))
  );

  console.log({ brand, shampoo, ingredients });
}

async function upsertBrandName(name) {
  return pool.one(sql`
  INSERT INTO brands (name)
  values (${name})
  ON CONFLICT (name) 
  DO 
    UPDATE SET name = EXCLUDED.name
    RETURNING *;`);
}

async function upsertShampoo({ name, brandId }) {
  return pool.one(sql`
    INSERT INTO shampoos (name, brand_id)
    values (${name}, ${brandId})
    ON CONFLICT (name) 
    DO 
    UPDATE SET brand_id = ${brandId}
    RETURNING *;`);
}

async function upsertIngredients(ingredientNames) {
  const ingredients = [];

  //this is super not efficient but I don't care right now
  for (let name of ingredientNames) {
    const ingredient = await pool.one(sql`
    INSERT INTO ingredients (name)
    values (${name})
    ON CONFLICT (name)
    DO 
        UPDATE SET name = EXCLUDED.name
        RETURNING *;`);

    ingredients.push(ingredient);
  }

  return ingredients;
}

async function upsertShampooToIngredients(shampooToIngredients) {
  //this is super not efficient but I don't care right now
  for (let { shampoo_id, ingredient_id } of shampooToIngredients) {
    await pool.any(sql`
    INSERT INTO shampoos_to_ingredients (shampoo_id, ingredient_id)
    values (${shampoo_id}, ${ingredient_id})
    ON CONFLICT
    DO NOTHING;`);
  }
}

module.exports = insertShampoo;
