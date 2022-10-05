import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';
import mongoose from 'mongoose';
import { config } from 'dotenv';

const app = express();
config();

const PORT = process.env.PORT || 4000;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

mongoose.connect(process.env.MONGO_CONNECTION_STRING);
mongoose.connection.once('open', () => {
  console.log('Connected to the database...');
});

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(PORT, () => {
  console.log(`Now listening for requests on port ${PORT}...`);
});
