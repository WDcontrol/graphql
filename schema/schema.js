const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema
} = graphql;

let usersArray = [
  {
    id: "1",
    firstName: "Vincent",
    lastName: "Zerbib",
    age: 34,
    size: 180,
    weight: 80
  },
  {
    id: "2",
    firstName: "Vincente",
    lastName: "Zerbiba",
    age: 32,
    size: 170,
    weight: 60
  },
  {
    id: "3",
    firstName: "Vincentina",
    lastName: "Zerbibatina",
    age: 70,
    size: 165,
    weight: 56
  }
];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    size: {
      type: GraphQLInt
    },
    weight: {
      type: GraphQLInt
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return _.find(usersArray, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
  // mutation
});
