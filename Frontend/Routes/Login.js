import { validationResult } from "express-validator"
import UserModel from "../Model/UserModel.js";
import { jsonGenrate } from "../Validation/jsonGenrate.js";
import  Jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { JWT_TOKEN_SECRET } from "../Validation/Constant.js";


const Login = async (req,res)=>{
    const error = validationResult(req);
    if(error.isEmpty()){
        const {username,password} = req.body;
        const user = await UserModel.findOne({username:username});
        if(!user){
            return res.json(jsonGenrate(202,"Not Found user","incorrect UserName Or Password"));
        }

        const verfipass = bcrypt.compareSync(password,user.password)
        if(!verfipass){
            return res.json(jsonGenrate(202,"Not Found user","incorrect UserName Or Password"));
        }
        const token = Jwt.sign({userId:user._id},JWT_TOKEN_SECRET)
       
     return res.json(jsonGenrate(200,"Succesfully Login", {userId:user._id,token:token}));
    }
    
    return res.json(jsonGenrate(202,"Validation Erorr",error));
}

export default Login