import {ApolloServer, PubSub } from 'apollo-server'
import mongoose from 'mongoose'

function start({ typeDefs, resolvers}) {

  const DB_HOST = process.env.DB_HOST || 'localhost';
  const DB_PORT = process.env.DB_PORT || '27017'

  const API_HOST = process.env.API_HOST || '127.0.0.1';
  const SERVER_PORT = process.env.SERVER_PORT || '4000';;

  mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/graphql`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to the database...'))
  .catch(() => console.log('Database connection error ...'))

  const pubsub = new PubSub(); /* Resposável por criar o túnel de web-socket */
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: { pubsub },
   });

  server.listen()
  .then(() => console.log(`Server running at http://${API_HOST}:${SERVER_PORT}/`))
  .catch(()=> console.log('Server connection error ...'))
}

export default start