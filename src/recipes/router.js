const path = require("path");
const express = require("express");
const xss = require("xss");
const endpointService = require("./service");
const logger = require("../logger");

const endpointRouter = express.Router();
const jsonParser = express.json();
//REWRITE, include each row from table

const serializeRow = (row) => ({
  recipe_id: row.recipe_id,
  recipe_name: xss(row.recipe_name),
  flour_total: xss(row.flour_total),
  flours: row.flours,
  ingredients: row.ingredients,
});

const table = {
  name: "recipe",
  columns: ["recipe_name", "flour_total", "flours", "ingredients"],
  columns: ["recipe_name"],
  rowId: "recipe_id",
};

endpointRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    endpointService
      .getAllRows(knexInstance)
      .then((rows) => {
        res.json(rows.map(serializeRow));
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const { recipe_name, flour_total, flours, ingredients } = req.body;
    const newRow = { recipe_name, flour_total, flours, ingredients };

    for (const [key, value] of Object.entries(newRow))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

    endpointService
      .insertRow(req.app.get("db"), newRow)
      .then((row) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${row[table.rowId]}`))
          .json(serializeRow(row));
      })
      .catch(next);
  });

endpointRouter
  .route("/:row_id")
  .all((req, res, next) => {
    endpointService
      .getById(req.app.get("db"), req.params.row_id)
      .then((row) => {
        if (!row) {
          return res.status(404).json({
            error: { message: `Row from table: '${table.name}' doesn't exist` },
          });
        }
        res.row = row;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeRow(res.row));
  })
  .delete((req, res, next) => {
    endpointService
      .deleteRow(req.app.get("db"), req.params.row_id)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    //REWRITE, use table's column names
    const { recipe_name, flour_total, flours, ingredients } = req.body;
    const rowToUpdate = { recipe_name, flour_total, flours, ingredients };
    logger.info(rowToUpdate);

    const numberOfValues = Object.values(rowToUpdate).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body content must contain at least one of the following: ${table.columns}`,
        },
      });

    endpointService
      .updateRow(req.app.get("db"), req.params.row_id, rowToUpdate)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = endpointRouter;
