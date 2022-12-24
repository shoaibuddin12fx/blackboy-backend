require('@babel/register');
const app = require('../../src/app').default;
import mongoose from "mongoose";

const connectionUrl = 'mongodb://admin:hotmail1VU@127.0.0.1:27017';

module.exports = async () => {
    console.log(connectionUrl)
    global.httpServer = await app.listen(4000, () => {
        console.log(`🚀 started test server`);
    });
    await mongoose.connect(connectionUrl, { useNewUrlParser: true })
}