
CREATE TABLE IF NOT EXISTS brands (
  id SERIAL PRIMARY KEY,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT (now() at time zone 'utc'),
  date_updated TIMESTAMP WITH TIME ZONE DEFAULT (now() at time zone 'utc'),
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS shampoos (
  id SERIAL PRIMARY KEY,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT (now() at time zone 'utc'),
  date_updated TIMESTAMP WITH TIME ZONE DEFAULT (now() at time zone 'utc'),
  name TEXT NOT NULL UNIQUE,

  brand_id integer NOT NULL REFERENCES brands (id)
);

CREATE TABLE IF NOT EXISTS ingredients (
  id SERIAL PRIMARY KEY,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT (now() at time zone 'utc'),
  date_updated TIMESTAMP WITH TIME ZONE DEFAULT (now() at time zone 'utc'),
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS shampoos_to_ingredients (
  shampoo_id integer NOT NULL REFERENCES shampoos (id),
  ingredient_id integer NOT NULL REFERENCES ingredients (id),
  UNIQUE (shampoo_id, ingredient_id)
);


--This is just some temp test data, can remove once we get admin stuff working
INSERT INTO brands (name)
values
	('Head & Shoulders'),
    ('L''Oréal Garnier'),
    ('Suave');
   
INSERT INTO shampoos (name, brand_id)
VALUES
    ('Head and Shoulders Classic Clean Anti-Dandruff Shampoo', 1);

INSERT INTO ingredients (name)
VALUES
    ('Pyrithione Zinc'),
    ('Water'),
    ('Sodium Lauryl Sulfate'),
    ('Sodium Laureth Sulfate'),
    ('Glycol Distearate'),
    ('Zinc Carbonate'),
    ('Sodium Chloride'),
    ('Sodium Xylenesulfonate'),
    ('Cocamidopropyl Betaine'),
    ('Fragrance'),
    ('Dimethicone'),
    ('Sodium Benzoate'),
    ('Guar Hydroxypropyltrimonium Chloride'),
    ('Magnesium Carbonate Hydroxide'),
    ('Methylchloroisothiazolinone'),
    ('Methylisothiazolinone'),
    ('Blue 1'),
    ('Red 33');
   
INSERT INTO shampoos_to_ingredients (shampoo_id, ingredient_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 5),
    (1, 6),
    (1,7),
    (1,8),
    (1, 9),
    (1, 10),
    (1, 11),
    (1, 12),
    (1, 13),
    (1, 14),
    (1, 15),
    (1, 16),
    (1, 17),
    (1, 18);
   

    