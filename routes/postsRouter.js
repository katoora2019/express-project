const express = require("express");
const knex = require("../db/connection");

const router = express.Router();

// Name: posts#new, method: GET, path: '/posts/new'
router.get("/new", (request, response) => {
  response.render("posts/new");
});

// Name: posts#create, method: POST, path: /posts
router.post("/", (request, response) => {
  // const title = request.body.title;
  // const content = request.body.content;
  // const imageUrl = request.body.imageUrl;
  const { title, content, imageUrl } = request.body;
  knex("posts")
    .insert({
      title,
      content,
      imageUrl,
    })
    .returning("*")
    .then((post) => {
      // if we want to use a terminating method like
      // response.send, response.render, or response.redirect
      // and we want to do this after inserting something,
      // updating something, reading something, etc from our db
      // we need to use that terminating method
      // withing the callback to '.then'
      response.redirect(`/posts/${post[0].id}`);
    });
});

// Name: posts#index, method: GET, path: /posts
router.get("/", (request, response) => {
  knex("posts")
    .orderBy("createdAt", "desc")
    .then((posts) => {
      //   response.send(posts);
      response.render("posts/index", { posts });
    });
});

// Name: posts#show, method: GET, path: /posts/:id
router.get("/:id", (request, response) => {
  // In the URL above, all the words prefixed with ':'
  // are called URL params. You can view the values of URL params
  // with the 'request.params' object property. It contains an object
  // where the property name corresponds to the name of the url param
  // and its associated value
  // 'request.param' is an object with key value pairs created by
  // pattern-matching against 'variables' named in the URL/path
  // route/posts/:id/:name/:job the route then accessed was:
  // /posts/100/Bob/developer
  // request.params = { id: 100, name: "Bob", job: "developer" }

  const id = request.params.id;
  knex("posts")
    .where("id", id)
    .first()
    .then((post) => {
      console.log(post);
      if (post) {
        response.render("posts/show", { post });
      } else {
        response.redirect("/posts");
      }
    });
});

// Name: posts#destroy, method: DELETE, path: /posts/:id
router.delete("/:id", (request, response) => {
  // console.log("inside delete route: ", request.params.id);
  knex("posts")
    .where("id", request.params.id)
    .del()
    .then(() => {
      response.redirect("/posts");
    });
});

// Name: posts#edit, method: GET, path: /posts/:id/edit
router.get("/:id/edit", (request, response) => {
  knex("posts")
    .where("id", request.params.id)
    .first()
    .then((post) => {
      response.render("posts/edit", { post });
    });
});

// Name: posts#update, method: PATCH, path: /posts/:id
router.patch("/:id", (request, response) => {
  const { title, content, imageUrl } = request.body;
  const updatedPost = {
    title,
    content,
    imageUrl,
  };

  knex("posts")
    .where("id", request.params.id)
    .update(updatedPost)
    .then(() => {
      response.redirect(`/posts/${request.params.id}`);
    });
});

module.exports = router;