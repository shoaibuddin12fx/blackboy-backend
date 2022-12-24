import express from 'express';
import User from "../Resolvers/UserCollections/usercollections.schema.js";
import jwt from "jsonwebtoken";
import fs from 'fs'
import s3 from './s3.js';
const router = express.Router();

router.post('/uploadFile',  async (req, res) => {
    try{
            console.log(req.files)
            let fileName = Date.now() + req.files.params.name;
            let response = await uploadImage(req, fileName, "params")
            if(response.status){
                res.send({response})
                console.log(response)
            }else{
                res.send({response})
                console.log(response)
            }
            

    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
});

const uploadImage = (req, fileName, key) => {
    
        let response = s3.upload({
            Bucket:"sfo3.digitaloceanspaces.com",
            Key: fileName,
            Body: req.files[key].data,
            ContentType: req.files[key].mimetype,
            ACL: 'public-read'
        }).promise()
        return response.then(data =>{
            return {status: true, data}
        }).catch(err => {
            return {status: false, err}
        })
}

export { router as default }