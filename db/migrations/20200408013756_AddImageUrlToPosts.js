exports.up = function(knex, Promise) {
  return knex.schema.table("posts", table => {
    //   Alter table "posts"
    table.string("imageUrl"); // ADD COLUMN "imageUrl" VARCHAR(255)
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("posts", table => {
    // Alter table "posts"
    table.dropColumn("imageUrl"); // DROP COLUMN "imageUrl"
  });
};

exports.down = function(knex, Promise ) {
  return knex.schema.table("Posts",table => {
    //drop the column "imageURL"
    table.dropColumn("imageUrl");


  });

  
};
