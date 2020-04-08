// Update with your config settings.

// Update with your config settings.

module.exports = {
  development: {
    client: "pg", // This setting corresponds to the db connection js package

    connection: {
      database: "knexpress"

      // The following two fields are required for linux
      // setup. If you don't have a password for your user,
      // you must create one.
      // To set a password, do the following inside your terminal:
      // psql
      // my_user=# \password
      // username: "your postgres username",
      // password: "supersecret"
    },

    migrations: {
      tableName: "migrations",
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  }
};