// To start any query with knex, first require the "db/connection" we created
const knex = require("./connection");

const query1 = knex
  .insert({ title: "My Post" })
  .into("posts")
  .returning("*");
//   .then(result => console.log(result));

// To look at the generated SQL of the query, use the 'toString()' method
// at the end of your query.
// Note that this will not execute the query in the db.
// This is purely for informational purposes.
console.log(query1.toString());

// To execute a query, use the method '.then' at the end of it.
// This weill send the SQL to your db and execute it asynchronously.
// To get the result of your query, you must pass a callback to 'then'
// which will get the "result" as its argument.
query1.then(result => console.log(result));

const query2 = knex
  .insert([
    { title: "Top 5 Schools", content: "Hogwarts, CodeCore, etc" },
    { title: "Top 3 Rocks", content: "Diamond, ruby, amethyst" },
    { title: "Top 3 Programming Languages", content: "JavaScript, Ruby, PHP" }
  ])
  .into("posts")
  .returning("*");

console.log(query2.toString());

query2.then(result => {
  console.log(result);
  knex.destroy(); // This closes the connection to the database
});