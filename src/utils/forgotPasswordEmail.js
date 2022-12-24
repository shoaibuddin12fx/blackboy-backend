import express from 'express';
import User from "../Resolvers/UserCollections/usercollections.schema.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get('/recoverPassword/:id',  async (req, res) => {
    try{

        const user = await User.findOne({ _id: req.params.id});

        if (!user) {
            throw new Error('Your verification link may have expired. Please click on resend for verify your Email.');
        } else {
            //TOBE CONTINUED
        }
        console.log(user);
    } catch (e) {
        throw new Error(e);
    }
});

export { router as default }
