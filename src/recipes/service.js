const table = {
  name: "recipe",
  orderRow: "recipe_name",
};
const service = {
  getAllRows(knex) {
    return knex.select("*").from(table.name).orderBy(table.orderRow, "ASC");
  },
  getById(knex, row_id) {
    return knex
      .from(table.name)
      .select("*")
      .where(`${table.name}_id`, row_id)
      .first();
  },
  insertRow(knex, newRow) {
    const {
      recipe_name,
      flour_total,
      unit_weight,
      flours,
      ingredients,
    } = newRow;
    return knex
      .insert({
        recipe_name: recipe_name,
        flour_total: flour_total,
        unit_weight: unit_weight,
        flours: JSON.stringify(flours),
        ingredients: JSON.stringify(ingredients),
      })
      .into(table.name)
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  updateRow(knex, row_id, newFields) {
    const {
      recipe_name,
      flour_total,
      unit_weight,
      flours,
      ingredients,
    } = newFields;
    return knex(table.name)
      .where(`${table.name}_id`, row_id)
      .update({
        recipe_name: recipe_name,
        flour_total: flour_total,
        unit_weight: unit_weight,
        flours: JSON.stringify(flours),
        ingredients: JSON.stringify(ingredients),
      });
  },
  deleteRow(knex, row_id) {
    return knex(table.name).where(`${table.name}_id`, row_id).delete();
  },
};

module.exports = service;
