import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { authors, books } from "./_db.js";

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    ID: ID
    name: String
    release: String
    author: Author!
  }

  type User{
    name: String
    age: Int
    address: String
  }

  type Author{
    name: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    book(id: ID!): Book!
    users: [User]
    authors: [Author]
  }
`;


const users = [
    {
      name: 'The Awakening',
      age: 22,
      address: 'Kate Chopin',
    },
    {
      name: 'City of Glass',
      age: 3,
      address: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
      books: () => books,
      book: (_,ID) => {
        return books.find((book) => {
          return book.ID == ID.id
        });
      },
      authors: () => authors,
      users: () => users,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const {url} = await startStandaloneServer(server, {
    listen: {port: 3000}
})

console.log(`🚀  Server ready at: ${url}`);