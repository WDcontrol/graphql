const graphql = require("graphql");
const _ = require("lodash");
const User = require("../models/user");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema,
  GraphQLList
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

let booksArray = [
  {
    id: "1",
    name: "Canigula"
  },
  {
    id: "2",
    name: "Bastien Bastienne"
  },
  {
    id: "3",
    name: "Les cité dor"
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

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return _.filter(usersArray, {
          userId: parent.id
        });
      }
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
    },
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return _.find(booksArray, { id: args.id });
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return usersArray;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString }
      },
      resolve(parent, args) {
        let user = new User({
          firstName: args.firstName,
          lastName: args.lastName
        });
        return user.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
  // mutation
});
