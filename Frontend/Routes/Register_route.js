import { jsonGenrate } from "../Validation/jsonGenrate.js";
import bcrypt from 'bcrypt';
import UserModel from "../Model/UserModel.js";
import  Jwt  from "jsonwebtoken";
import { JWT_TOKEN_SECRET } from "../Validation/Constant.js";

// const User = express.Router();


const  User = async (req, res) => {
    try {
        const { name, username, password, email } = req.body;

        if (!name || !username || !password || !email) {
            return res.status(400).json(jsonGenrate(400, "Missing required fields"));
        }
       
        const exit = await UserModel.findOne({ $or:[{email:email},{
            username:username
        }]});
        if(exit){
            return res.status(400).json(jsonGenrate(400, "Already Exist"));
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            name: name,
            username: username,
            password: hashPassword,
            email: email,
        });
        const token = Jwt.sign({
            userId:newUser._id
        },JWT_TOKEN_SECRET);
        return res.status(200).json({message: "Registration Successful", userId:newUser._id,token:token});
    } catch (error) {
       return res.status(500).json(jsonGenrate(500, "Internal Server Error",error));
    }
};

export default User;
