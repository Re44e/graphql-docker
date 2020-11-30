import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
import path from 'path'

/* Realiza um merge de todos os typeDefs automaticamente */
const typesArray = fileLoader(path.join(__dirname, 'modules', '**', '*.gql'));
const typeDefs = mergeTypes(typesArray);

export default typeDefs;
