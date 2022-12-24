import  { ApolloServer, PubSub } from "apollo-server-express";
import http from 'http'
import typeDefs from "./types/typeDefs.js";
import express from  "express";
import cors from 'cors';
import emailRouter from './utils/emailVerification'
import uploadFile from './utils/uploadFiles'

import resolvers from "./Resolvers/resolver";
import auth from "./utils/auth";
import fileUpload from 'express-fileupload';

const pubsub = new PubSub();

const app = express();
app.use(cors({ origin: true }))
app.use(fileUpload());
app.use(emailRouter);
app.use(uploadFile);


const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
    subscriptions: {
      onConnect: async (connectionParams, websocket) => {
          console.log(connectionParams);
          if (connectionParams.authorization) {
              const currentUser = await auth(connectionParams);
              return {
                  currentUser,
                  pubsub
              }
          }
      }
    },
    context: async ({ req}) => {
        const currentUser = await auth(req.headers);
        return {
            currentUser,
            pubsub,
        }
    }
});

server.applyMiddleware({ app })
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

export default httpServer;
