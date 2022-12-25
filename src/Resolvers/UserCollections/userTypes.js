import { gql } from "apollo-server-express";

const userTypeDefs = gql`
    
    type Query {
        signIn(data: signInInput): UserDetail!,
        getUser(limit: Int, page: Int,fullName: String, role:String, email: String, _id: String): User!,
    }
    
    type Mutation {
        signUp(data: signUpInput): signUp!
        updateUser(id: String!, data: updateUserInput): UserDetail!,
        forgotPassword(email: String): UserDetail,
        deleteUser(id: String!): UserDetail
    }
    
    input updateUserInput {
        email: String,
        fullName: String,
        phoneNumber: String,
        Address: String,
        img: String,
        verified: Boolean
    }
    input signInInput {
        email: String!,
        password: String!
    },

    input signUpInput {
        email: String!,
        password: String!,
        role: String!,
        fullName: String,
        phoneNumber: String,
        Address: String,
        img: String
    },
    
    type UserDetail {
        _id: ID,
        password: String,
        fullName: String,
        phoneNumber: String,
        email: String,
        Address: String,
        role: String!,
        confirmedAt: String,
        sentAt: String,
        token: String,
        logged: Boolean,
        updated: Boolean,
        verified: Boolean
    }
    
    type User {
        user: [UserDetail],
        offset: Int,
        limit: Int,
        totalItem: Int
    }

    type signUp {
        user: [UserDetail],
        code: String,
        token: String
    }
`

export { userTypeDefs as default }
