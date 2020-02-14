const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();

const schema = require("./schema/schema");

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("app listening on port 4000");
});
