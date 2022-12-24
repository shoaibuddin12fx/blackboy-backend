import Chat from "./chat.schema";
import {GraphQLUpload} from 'apollo-server-express'
import fs from 'fs';
//import getCurrentUser from '../../utils/auth.js';
import s3 from "../../utils/s3";

const chatResolver = {
    FileUpload: GraphQLUpload,
    Query: {
    },
    Mutation: {
        async createChat(parent, args, { pubsub, currentUser}, info) {
            // const user = await getCurrentUser(req);
            const chat = await Chat.create({message: args.message, from: currentUser._id});
            await pubsub.publish(`CHANNEL ${args.to}`, { messageSent:  chat});
            //console.log(chat)
            return chat
        },
    
        async uploadFile(_, {file}) {
            const {createReadStream, mimetype, encoding, filename} = await file;
            const stream = createReadStream()
            const uploadParams = {
                Body: stream,
                Key: filename,
                ContentType: mimetype,
                Bucket:"sfo3.digitaloceanspaces.com",
                ACL: 'public-read'
            }
            const { Location } = await s3.upload(uploadParams, (err, data) => {
                if (err) {
                    console.log(`err: ${err}`);
                } else {
                    console.log('data', data.Location)
                }
            }).promise()
            return {
                filename,
                mimetype,
                encoding,
                uri: Location
            }


        },


    },
    Subscription: {
        messageSent: {
            async subscribe(parent, args, {  pubsub, currentUser }, info) {
               // const user = await getCurrentUser(req);
                return pubsub.asyncIterator(`CHANNEL ${currentUser._id}`)
            }
        }
    }
}
export default chatResolver;
