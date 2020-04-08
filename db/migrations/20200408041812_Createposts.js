
exports.up = function(knex, Promise) {
  return knex.schema.createTable("posts", table => {
    table.increments("id"); // create an autoincrementing column named `id` - "id" SERIAL
    table.string("title"); // "title" VARCHAR(255)
    table.text("content"); // "content" TEXT
    table.integer("viewCount"); // "viewCount" INTEGER
    table.string("tags");
    table.timestamp("createdAt").defaultTo(knex.fn.now()); // createdAt timestamp default ot now()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("posts");
};