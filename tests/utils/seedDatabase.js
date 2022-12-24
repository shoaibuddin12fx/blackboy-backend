import User from "../../src/Resolvers/UserCollections/usercollections.schema";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const userOne = {
    input: {
        userName: 'testName',
        email: 'testName@gmail.com',
        password: 'myPass123',
        role: 'admin'
    },
    user: undefined,
    jwt: undefined
}

const seedDatabase = async () => {
    // Delete test data
    await User.deleteMany({});

    // Create user one
    userOne.user = await User.create(userOne.input);

    userOne.jwt = jwt.sign({userId: userOne.user._id}, process.env.SIGNATURE_KEY);
}
const startServer = async () => {
    const url = 'mongodb://admin:hotmail1VU@127.0.0.1:27017'
    await mongoose.connect(url, { useNewUrlParser: true })
}
const stopServer = async () => {
    mongoose.disconnect()
}

export {stopServer, startServer, userOne, seedDatabase as default};