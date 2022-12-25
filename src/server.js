import app from "./app";
import mongoose from "mongoose";

const PORT = 4000;
const MONGO_USER = "admin";
const MONGO_PASSWORD = "hotmail1VU";
const MONGO_DB = "bbh";
const MONGO_URL = "24.199.72.226:27017";
const sendGridKey = "";
// const dbString = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB}?retryWrites=true&w=majority`;
// mongodb://admin:hotmail1VU@127.0.0.1:27017
const dbString = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}`
mongoose
    .connect(
        dbString
        ,{ useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 started http://localhost:${PORT}/graphql`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

