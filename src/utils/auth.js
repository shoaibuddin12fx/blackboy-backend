import jwt from 'jsonwebtoken';
import User from "../Resolvers/UserCollections/usercollections.schema.js";

const auth = async (request) => {
    try{
        if (request.authorization) {
            const secretKey = process.env.SIGNATURE_KEY;
            const header = request.authorization;
            //const header = request.headers.authorization;
            // if (!header) {
            //     throw new Error('Authorize Yourself')
            // }
            const token = header.replace('Bearer ', '');
            const decode = jwt.verify(token, secretKey);
            console.log(decode)
            const user = await User.findOne({ _id: decode._id });
            if (!user) {
                throw new Error('Authorization Failed')
            }
            // else if (!user.confirmedAt) {
            //     throw new Error('Verify Your email');
            // }
            return user;
        } else {
            return null
        }

    }catch (e) {
        throw new Error(e);
    }
}

export default auth;