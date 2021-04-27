TRUNCATE recipe RESTART
IDENTITY CASCADE;

INSERT INTO recipe
  (recipe_name, unit_weight, flour_total, flours, ingredients)
VALUES
  (
    'sourdough',
    1000.00,
    100,
    '[{"name": "High protein bread flour, malted", "percent": "80", "id": "1"}, {"name": "Whole wheat flour", "percent":"20", "id": "2"}]',
    '[{"name": "water", "percent":"76", "id": "3"}, {"name":"salt", "percent":"1.9", "id": "4"}, {"name":"sourdough starter", "percent" : "0.8", "id": "5"}]'),
  (
    'other',
    800.00,
    150,
    '[{"name": "Whole Wheat", "percent": "40", "id": "6"}, {"name": "White", "percent":"60", "id": "7"}]',
    '[{"name": "water", "percent":"70", "id": "8"}, {"name":"salt", "percent":"1.5", "id": "9" }, {"name":"honey", "percent" : "5", "id": "10"}]');

