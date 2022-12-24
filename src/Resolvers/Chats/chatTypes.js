import { gql } from 'apollo-server-express';

const chatTypes = gql `  
    scalar FileUpload
    
    type Subscription {
        messageSent(to: String): Chat
    }
    type File {
        uri: String!
        filename: String!
        mimetype: String!
        encoding: String!
    }


    extend type Mutation {
        createChat(message: String, to: String): Chat!
        uploadFile(file: FileUpload!): File!
    }
    
    type Chat {
        message: String,
        from: String,
        to: String
    }
`
export default chatTypes