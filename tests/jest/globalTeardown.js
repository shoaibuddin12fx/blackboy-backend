import mongoose from "mongoose";

module.exports = async () => {
    await global.httpServer.close();
}