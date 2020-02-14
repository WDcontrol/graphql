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
    _id: {
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
    _id: {
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
        return User.findById(args.id);
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
        return User.find({});
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
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        size: { type: GraphQLInt },
        weight: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let user = new User({
          firstName: args.firstName,
          lastName: args.lastName,
          age: args.age,
          size: args.size,
          weight: args.weight
        });
        return user.save();
      }
    },
    removeUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return User.deleteOne({
          _id: args.id
        });
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        size: { type: GraphQLInt },
        weight: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return User.updateOne(
          {
            _id: args.id
          },
          {
            firstName: args.firstName,
            lastName: args.lastName,
            age: args.age,
            size: args.size,
            weight: args.weight
          }
        );
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
