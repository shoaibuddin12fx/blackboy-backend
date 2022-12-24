import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import mongoose from 'mongoose';
import User from '../src/Resolvers/UserCollections/usercollections.schema';
import seedDatabase, { startServer, stopServer } from "./utils/seedDatabase";
import getClient from "./utils/getClient";

const client = getClient();

beforeAll(startServer);
afterAll(stopServer);
beforeEach(seedDatabase);

test('Should create new user', async () => {
    const createUser = gql `
        mutation {
            signUp(data: {
                userName: "testUser",
                email: "testUser@gmail.com",
                password: "myPass123",
                role: "admin"

            }) {
                _id
            }
        }
    `
    const response = await client.mutate({
        mutation: createUser
    });

     const exists =  await User.exists({_id: response.data.signUp._id});
     expect(exists).toBe(true);
});

test('Should fetch users', async () => {
    const getUser = gql `        
        query {
            getUser{
                userName
            }
        }
    `
    const response = await client.query({
        query: getUser
    });
    expect('testUser').toBe(response.data.getUser[0].userName)
});


test('Should login existing user', async () => {
    const signIn = gql `
        query {
            signIn(data: {email: "testUser@gmail.com", password: "myPass123"}){
                token
                logged
            }
        }
    `
    const response = await client.query({
        query: signIn
    });
    expect(response.data.signIn.logged).toBe(true);
});

test('Should not login non-existing user', async () => {
    const signIn = gql `
        query {
            signIn(data: {email: "testUser@gmail.com", password: "myPass123"}){
                token
            }
        }
    `
    await expect(client.query({
        query: signIn
    })).rejects.toThrow("GraphQL error: Error: Unable to login");
});

