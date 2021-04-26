const knex = require("knex");
const app = require("./app");
const { PORT, DATABASE_URL, NODE_ENV } = require("./config");

let database;

const productionDB = knex({
  client: "pg",
  connection: {
    connectionString: DATABASE_URL,
    // ssl: true,
  },
});

const testDB = knex({
  client: "pg",
  connection: {
    connectionString: DATABASE_URL,
  },
});

NODE_ENV === "production" ? (database = productionDB) : (database = testDB);

app.set("db", database);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
