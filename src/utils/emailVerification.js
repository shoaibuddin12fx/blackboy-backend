import express from 'express';
import User from "../Resolvers/UserCollections/usercollections.schema.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get('/confirmation/:id',  async (req, res) => {
    try{
        const user = await User.findOne({ _id: req.params.id});

        if (!user) {
            throw new Error('Your verification link may have expired. Please click on resend for verify your Email.');
        } else if (user.confirmedAt) {
            throw new Error('User has been already verified. Please Login');
        } else if (Date.now() < user.sentAt){
            user.confirmedAt = Date.now();
            user.save();
        } else {
            throw new Error('Your verification link may have expired. Please click on resend for verify your Email')
        }
        console.log(user);
    } catch (e) {
        throw new Error(e);
    }
});

export { router as default }