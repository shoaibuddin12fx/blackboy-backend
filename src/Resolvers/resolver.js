import userResolver from "./UserCollections/usercollection.resolver";
import chatResolver from "./Chats/chat.resolver";

const resolvers = {
    Query: {
        ...userResolver.Query,
        ...chatResolver.Query,
    },
    Mutation: {
        ...userResolver.Mutation,
        ...chatResolver.Mutation,
    },
    Subscription: {
        ...chatResolver.Subscription
    }
};
export default resolvers
