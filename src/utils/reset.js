import express from 'express';
import User from "../Resolvers/UserCollections/usercollections.schema.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get('/reset/:id',  async (req, res) => {
    try{
        const decode = jwt.verify(req.params.id, 'secretKey');

        const user = await User.findOne({ _id: decode._id});

        if (!user) {
            throw new Error('No User Found');
        }
        user.password = req.body,password
        await user.save();
        console.log(user);

        res.send(user)
    } catch (e) {
        throw new Error(e);
    }
});

export { router as default }
