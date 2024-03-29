import { JWT_TOKEN_SECRET } from "../Validation/Constant.js";
import { jsonGenrate } from "../Validation/jsonGenrate.js"
import Jwt from "jsonwebtoken";
const AuthMiddle = (req,res,next)=>{
    const token = req.headers['authorization']?.split(" ")[1];
    if(token === undefined){
        return res.json(jsonGenrate(205,req.headers['authorization'],"Access Error"));
    }
    try{
      const decode = Jwt.verify(token,JWT_TOKEN_SECRET);
      req.userId = decode.userId;
      return next();
    }
    catch(error){
        return res.json(jsonGenrate(205,"Invaild Token","Access Error"));
    }
}

export default AuthMiddle;