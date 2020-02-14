const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const schema = require("./schema/schema");
const book = require("./schema/book");

app.use(
  "/user",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.use(
  "/book",
  graphqlHTTP({
    book,
    graphiql: true
  })
);

app.get("/userPlayground", expressPlayground({ endpoint: "/user" }));
app.get("/bookPlayground", expressPlayground({ endpoint: "/book" }));

app.listen(4000, () => {
  console.log("app listening on port 4000");
});
