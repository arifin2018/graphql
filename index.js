import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { authors, books, lending } from "./_db.js";

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    ID: ID
    name: String
    release: String
    author: Author!,
    lending: [Lending]
  }

  type User{
    name: String
    age: Int
    address: String
  }

  type Author{
    name: String
  }

  type Lending{
    ID: ID
    book: [Book]
    user: User
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    book(id: ID!): Book!
    users: [User]
    authors: [Author]
    lending: [Lending]
  }
`;


const users = [
    {
      ID:1,
      name: 'The Awakening',
      age: 22,
      address: 'Kate Chopin',
    },
    {
      ID:2,
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
      lending: () => lending
    },
    Lending:{
      book(parent) {
        return books.filter((book) => {
          return book.ID == parent.book_id
        });
      },
      user(parent) {
        return users.find((user) => {
          return user.ID == parent.user_id
        });
      },
    },
    Book:{
      author(parent) {
        return authors.find((author) => {
          return author.ID == parent.authors_id
        });
      },
      lending(parent) {
        return lending.filter((lending) => {
          return lending.book_id == parent.ID
        });
      },
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const {url} = await startStandaloneServer(server, {
    listen: {port: 3000}
})

console.log(`🚀  Server ready at: ${url}`);