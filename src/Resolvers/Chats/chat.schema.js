import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    message: {
        type: String
    },
    from: {
        type: String,
    },
    to: {
        type: String
    }
}, { timestamps: { createdAt: 'created_at' }});

const Chat = mongoose.model('chat_collections', chatSchema, 'chat_collection');
export default Chat;