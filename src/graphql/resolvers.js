import { fileLoader, mergeResolvers } from 'merge-graphql-schemas'
import path from 'path'

/* Realiza um merge de todos os resolvers automaticamente */
const resolversArray = fileLoader(path.join(__dirname, 'modules', '**', 'resolvers.js'));
const resolvers = mergeResolvers(resolversArray);

export default resolvers;