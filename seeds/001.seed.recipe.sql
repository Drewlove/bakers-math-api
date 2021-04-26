TRUNCATE recipe RESTART
IDENTITY CASCADE;

INSERT INTO recipe
  (recipe_name, flour_total, flours, ingredients)
VALUES
  (
    'sourdough',
    1000.00,
    '[{"name": "High protein bread flour, malted", "percent": "80"}, {"name": "Whole wheat flour", "percent":"20"}]',
    '[{"name": "water", "percent":"76"}, {"name":"salt", "percent":"1.9"}, {"name":"sourdough starter", "percent" : "0.8"}]'),
  (
    'other',
    800.00,
    '[{"name": "Whole Wheat", "percent": "40"}, {"name": "White", "percent":"60"}]',
    '[{"name": "water", "percent":"70"}, {"name":"salt", "percent":"1.5"}, {"name":"honey", "percent" : "5"}]');