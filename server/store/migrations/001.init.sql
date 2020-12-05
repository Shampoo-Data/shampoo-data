
CREATE TABLE IF NOT EXISTS brands (
  id SERIAL PRIMARY KEY,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT (now() at time zone 'utc'),
  date_updated TIMESTAMP WITH TIME ZONE DEFAULT (now() at time zone 'utc'),
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS shampoos (
  id SERIAL PRIMARY KEY,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT (now() at time zone 'utc'),
  date_updated TIMESTAMP WITH TIME ZONE DEFAULT (now() at time zone 'utc'),
  name TEXT NOT NULL,

  brand_id integer NOT NULL REFERENCES brands (id)
);

CREATE TABLE IF NOT EXISTS ingredients (
  id SERIAL PRIMARY KEY,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT (now() at time zone 'utc'),
  date_updated TIMESTAMP WITH TIME ZONE DEFAULT (now() at time zone 'utc'),
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS shampoos_to_ingredients (
  shampo_id integer NOT NULL REFERENCES shampoos (id),
  ingredient_id integer NOT NULL REFERENCES ingredients (id),
  UNIQUE (shampo_id, ingredient_id)
);


--This is just some temp test data, can remove once we get admin stuff working
INSERT INTO brands (name)
VALUES
    ('L''Oréal Garnier'),
    ('Suave');


INSERT INTO shampoos (name, brand_id)
VALUES
    ('Shampoo 1', 1),
    ('Shampoo 2', 1),
    ('Shampoo 3', 1),
    ('Shampoo 4', 2),
    ('Shampoo 5', 2);


INSERT INTO ingredients (name)
VALUES
    ('Ingredient A'),
    ('Ingredient B'),
    ('Ingredient C'),
    ('Ingredient D'),
    ('Ingredient E'),
    ('Ingredient F');
  

INSERT INTO shampoos_to_ingredients (shampo_id, ingredient_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 5),
    (2,2),
    (2, 6);

