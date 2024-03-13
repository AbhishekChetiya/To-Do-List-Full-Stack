import UserModel from "../Model/UserModel.js"
import { jsonGenrate } from "../Validation/jsonGenrate.js"

export const GetTodos = async (req,res) =>{
    try{ 
        const list = UserModel.findById(req.userId)
        .select("-password")
        .populate('todos')
        .exec();
        return res.json(jsonGenrate(200,"All Todos",list));
    }
    catch (error){
      return res.json(jsonGenrate(202,"Error",error));
    }
}