import { JWT_TOKEN_SECRET } from "../Validation/Constant.js";
import { jsonGenrate } from "../Validation/jsonGenrate.js"
import Jwt  from "jsonwebtoken";
const AuthMiddle = (req,res,next)=>{
    if(req.headers['auth']==undefined){
        return res.json(jsonGenrate(205,"Authentication Error","Acces Error"));
    }
    const token = req.headers['auth'];
    try{
      const decode = Jwt.verify(token,JWT_TOKEN_SECRET);
      console.log("Decoded")
      req.userId = decode.userId;
      return next();
    }
    catch(error){
        return res.json(jsonGenrate(205,"Invaild Token","Access Error"));
    }
}

export default AuthMiddle;