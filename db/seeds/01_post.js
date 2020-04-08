
const faker = require("faker");

// To run your seed files, do:
// knex seed:run

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("posts")
    .del() // DELETE FROM "posts"
    .then(function() {
      // generate an array of 1000 posts using faker
      const posts = Array.from({ length: 1000 }).map(() => {
        return {
          title: faker.company.catchPhrase(),
          content: faker.lorem.paragraph(),
          imageUrl: faker.image.imageUrl(),
          viewCount: faker.random.number(100),
          createdAt: faker.date.past()
        };
      });
      // Inserts seed entries
      // Inside of a callback passed to the then function, always
      // return the knex query that you create. EVERYTIME!!!!
      return knex("posts").insert(posts);
    });
};